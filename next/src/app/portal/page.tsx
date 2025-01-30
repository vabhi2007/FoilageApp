'use client'

import "../../app/globals.css";
import Navbar from "../../app/components/Navbar";
import Footer from "../../app/components/Footer";
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_JOBS } from '@/graphql/queries';
import JobBlock from '../../app/components/JobBlock';
import Image from "next/image";
import CloseIcon from "../../app/assets/CloseIcon.svg"; // Add a close icon

export default function Portal() {
  const { data, loading, error } = useQuery(GET_ALL_JOBS);
  const [selectedJob, setSelectedJob] = useState<any | null>(null); // State for selected job

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error fetching jobs: {error.message}</p>;

  return (
    <div>
      <Navbar />

      <div className="w-full px-[8vw] py-[3vw] bg-secondary flex items-center justify-center">
        <div className="w-full bg-white" style={{ fontFamily: 'Montserrat' }}>
          <div className="text-tertiary px-[4vw] py-[3vw] font-semibold text-[2vw]">Saved Jobs</div>

          {/* Job Grid (2-column layout) */}
          <div className="grid grid-cols-2 gap-[2vw] px-[4vw] pb-[3vw]">
            {data.allJobPosts.map((job: any) => (
              <JobBlock
                key={job.id}
                job={job}
                isSelected={selectedJob?.id === job.id} // Pass boolean instead of object
                xBorder={true}
                onClick={() => setSelectedJob(job)} // Open popup on click
              />
            ))}
          </div>
        </div>
      </div>

      {/* Job Details Popup */}
      {selectedJob && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-[2vw] rounded-lg w-[40vw] shadow-lg relative">
            {/* Close Button */}
            <Image src={CloseIcon} alt="Close"
              className="absolute top-[1vw] right-[1vw] w-[2.5vw] h-auto cursor-pointer"
              onClick={() => setSelectedJob(null)}
            />

            {/* Job Details */}
            <div className="flex flex-col space-y-[1vw]" style={{ fontFamily: 'Montserrat' }}>
                <JobBlock
                key={selectedJob.id}
                job={selectedJob}
                isSelected={false}
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
