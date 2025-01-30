'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_JOBS } from '@/graphql/queries';
import JobBlock from './JobBlock'; // Import the new JobBlock component

const JobList = ({ onJobClick, selectedJob }: { onJobClick: (job: any) => void, selectedJob: any }) => {
  const { data, loading, error } = useQuery(GET_ALL_JOBS);

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error fetching jobs: {error.message}</p>;

  return (
    <div className="flex flex-col h-full border border-gray-300 bg-white">
      {/* Job List Container */}
      <div className="w-full flex-grow overflow-y-auto"> {/* Ensures max height and scrolls */}
        {data.allJobPosts.map((job: any) => (
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
