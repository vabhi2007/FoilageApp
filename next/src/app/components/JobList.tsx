'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_JOBS } from '@/graphql/queries';
import JobBlock from './JobBlock'; // Import the new JobBlock component

const JobList = ({ onJobClick, selectedJob }: { onJobClick: (job: any) => void, selectedJob: any }) => {
  const { data, loading, error } = useQuery(GET_ALL_JOBS);

  console.log("Fetching jobs..."); // Debug log
  console.log("Data:", data); // Log returned data
  console.log("Error:", error); // Log errors

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p className="text-red-500">Error fetching jobs: {error.message}</p>;

  // Fix: Ensure correct GraphQL key name (check schema)
  if (!data || !data.allJobs) return <p className="text-red-500">No jobs found.</p>;

  return (
    <div className="flex flex-col h-full border border-gray-300 bg-white">
      <div className="w-full flex-grow overflow-y-auto">
        {data.allJobs.map((job: any) => (
          <JobBlock
            key={job.id}
            job={job}
            isSelected={selectedJob && selectedJob.id === job.id}
            onClick={() => onJobClick(job)}
          />
        ))}
      </div>
    </div>
  );
};

export default JobList;
