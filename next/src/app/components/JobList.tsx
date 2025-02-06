'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_JOBS } from '@/graphql/queries';
import JobBlock from './JobBlock'; // Import the new JobBlock component
import { Job } from "../utils/consts";

type JobListProps = {
  onJobClick: (Job: Job) => void;
  selectedJob: Job | null;
  keyword?: string;
  location?: string;
  experience?: string;
  gradeLevel?: string;
  type?: string;
  workSite?: string;
};

const JobList: React.FC<JobListProps> = ({onJobClick, selectedJob, keyword='', location='', experience='', gradeLevel='', type='', workSite=''}) => {
  const { data, loading, error } = useQuery(GET_ALL_JOBS);

  console.log("Fetching jobs..."); // Debug log
  console.log("Data:", data); // Log returned data
  console.log("Error:", error); // Log errors

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p className="text-red-500">Error fetching jobs: {error.message}</p>;

  // Fix: Ensure correct GraphQL key name (check schema)
  if (!data || !data.allJobs) return <p className="text-red-500">No jobs found.</p>;

  const filteredJobs = data.allJobs.filter((job: Job) => (
    job.isActive &&
    (!keyword || job.title.toLowerCase().includes(keyword.toLowerCase())) &&
    (!location || job.location.toLowerCase().includes(location.toLowerCase())) &&
    (!experience || job.experience.toLowerCase().includes(experience.toLowerCase())) &&
    (!gradeLevel || job.grade.toLowerCase().includes(gradeLevel.toLowerCase())) &&
    (!type || job.employment.toLowerCase().includes(type.toLowerCase())) &&
    (!workSite || job.site.toLowerCase().includes(workSite.toLowerCase()))
  ));

  return (
    <div className="flex flex-col h-full border border-gray-300 bg-white">
      <div className="w-full flex-grow overflow-y-auto">
      {filteredJobs
      .map((job: Job) => (
        <JobBlock
          key={job.id}
          job={job}
          isSelected={selectedJob != null && selectedJob.id === job.id}
          onClick={() => onJobClick(job)}
        />
      ))}
      </div>
    </div>
  );
};

export default JobList;
