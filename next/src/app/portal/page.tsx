'use client'

import "../../app/globals.css";
import Navbar from "../../app/components/Navbar";
import Footer from "../../app/components/Footer";
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_JOBS, GET_ME } from '@/graphql/queries';
import JobBlock from '../../app/components/JobBlock';
import ExtendedJobBlock from '../components/ExtendedJobBlock'; 
import UserApplication from "../components/UserApplication"; 
import JobForm from '../components/JobForm'; // Import JobForm
import { adminRef, employerRef, jobSeekerRef } from "../utils/consts";
import { useRouter } from "next/navigation";
import { Job } from "../utils/consts";

export default function Portal() {
  const router = useRouter();
  
  // Fetch user data and jobs
  const { data: userdata, loading: userloading, error: usererror, refetch: refetchMe } = useQuery(GET_ME);
  const { data: allJobsData, loading: jobsLoading, error: jobsError, refetch } = useQuery(GET_ALL_JOBS);

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [userType, setUserType] = useState<string>("employer");

  useEffect(() => {
    console.log("User Data:", userdata);
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redirect if not logged in
    }
    if (userdata?.me?.userType) {
      setUserType(userdata.me.userType);
    }
  }, [router, userdata]);

  useEffect(() => {
    if (allJobsData) {
      refetchMe();
    }
  }, [allJobsData, refetchMe]);

  if (userloading || jobsLoading) return <p>Loading...</p>;
  if (usererror) return <p>Error fetching user data: {usererror.message}</p>;
  if (jobsError) return <p>Error fetching jobs: {jobsError.message}</p>;

  // Select jobs to display based on user type
  let displayedJobs = [];
  if (userType === jobSeekerRef || userType === employerRef) {
    displayedJobs = userdata?.me?.connectedJobs || [];  // Use connectedJobs
  } else if (userType === adminRef) {
    displayedJobs = allJobsData?.allJobs || [];  // Show all jobs for admin
  }

  const handleCreateJobClick = () => {
    setIsCreatingJob(true);
  };

  return (
    <div>
      <Navbar />

      <div className="w-full min-h-[45vw] px-[8vw] py-[3vw] bg-secondary flex justify-center">
        <div className="w-full bg-white" style={{ fontFamily: 'Montserrat' }}>
          <div className="text-tertiary px-[4vw] py-[3vw] font-semibold text-[2vw]"> 
            {userType === jobSeekerRef ? "Saved Jobs" : 
            userType === employerRef ? "My Job Postings" :
            userType === adminRef ? "Employer Postings" : ""} 
          </div>

          {/* Job Grid (2-column layout) */}
          <div className="grid grid-cols-2 gap-[2vw] px-[4vw] pb-[3vw]">
            {displayedJobs.map((job: Job) => (
              <JobBlock
                key={job.id}
                job={job}
                isSelected={selectedJob?.id === job.id}
                xBorder={true}
                onClick={() => setSelectedJob(job)}
                displayStatus={userType === employerRef || userType === adminRef}
              />
            ))}

            {(userType === employerRef || userType === adminRef) && (
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
          <div className="fixed inset-0 flex items-center justify-center gap-[2vw] bg-black bg-opacity-50 z-50">
            <ExtendedJobBlock 
              selectedJob={selectedJob}
              onClose={() => setSelectedJob(null)}
              user={userType}
            />
            
            {userType === jobSeekerRef && (
              <UserApplication onClose={() => setSelectedJob(null)} id={selectedJob.id.toString()} />
            )}
          </div>
        </div>
      )}

      {/* New Job Form Popup */}
      {isCreatingJob && (
        <div className="w-full px-[8vw] bg-secondary flex items-center justify-center">
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <JobForm onClose={() => setIsCreatingJob(false)} onJobCreated={() => {refetch(); refetchMe()}} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
