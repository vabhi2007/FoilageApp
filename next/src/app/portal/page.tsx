'use client'

import "../../app/globals.css";
import Navbar from "../../app/components/Navbar";
import Footer from "../../app/components/Footer";
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_JOBS } from '@/graphql/queries';
import JobBlock from '../../app/components/JobBlock';
import ExtendedJobBlock from '../components/ExtendedJobBlock'; 
import UserApplication from "../components/UserApplication"; 
import JobForm from '../components/JobForm'; // Import JobForm

export default function Portal() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_JOBS);
  const [selectedJob, setSelectedJob] = useState<any | null>(null); // State for selected job
  const [isCreatingJob, setIsCreatingJob] = useState(false); // State for new job form visibility

  const [user] = useState('Employer');

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error fetching jobs: {error.message}</p>;

  const handleCreateJobClick = () => {
    setIsCreatingJob(true); // Show the new job form when the plus sign is clicked
  };

  return (
    <div>
      <Navbar />

      <div className="w-full min-h-[45vw] px-[8vw] py-[3vw] bg-secondary flex justify-center">
        <div className="w-full bg-white" style={{ fontFamily: 'Montserrat' }}>
          <div className="text-tertiary px-[4vw] py-[3vw] font-semibold text-[2vw]"> 
            {user==='Student' ? "Saved Jobs" : 
            user==='Employer' ? "My Job Postings" :
            user==='Admin' ? "Employer Postings" : ""} </div>

          {/* Job Grid (2-column layout) */}
          <div className="grid grid-cols-2 gap-[2vw] px-[4vw] pb-[3vw]">
            {data.allJobs.map((job: any) => (
              <JobBlock
                key={job.id}
                job={job}
                isSelected={selectedJob?.id === job.id} // Pass boolean instead of object
                xBorder={true}
                onClick={() => setSelectedJob(job)} // Open popup on click
              />
            ))}

            {(user === 'Employer' || user === 'Admin') && (
              <div className="w-full h-[7vw] bg-gray-300 flex items-center justify-center cursor-pointer" onClick={handleCreateJobClick}>
                <span className="text-white text-[3vw]">+</span>
              </div>
            )}
            
          </div>
        </div>
      </div>

      {/* Job Details Popup */}
      {selectedJob && (
        <div className="w-full h-full px-[8vw] bg-secondary">
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <ExtendedJobBlock 
              selectedJob={selectedJob}
              onClose={() => setSelectedJob(null)}
              user = {user}
            />
            
            {user === 'Student' && (
              <UserApplication onClose={() => setSelectedJob(null)} id={selectedJob.id.toString()}/>
            )}

          </div>
        </div>
      )}

      {/* New Job Form Popup */}
      {isCreatingJob && (
        <div className="w-full px-[8vw] bg-secondary flex items-center justify-center">
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <JobForm onClose={() => setIsCreatingJob(false)} onJobCreated={refetch}/>
          </div>
        </div>
      )}
      

      <Footer />
    </div>
  );
}
