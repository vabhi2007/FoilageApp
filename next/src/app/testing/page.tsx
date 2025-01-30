'use client'

import { useQuery } from "@apollo/client";
import { GET_ALL_JOBS } from "@/graphql/queries";

const JobsPage = () => {
  const { data, loading, error } = useQuery(GET_ALL_JOBS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Job Listings</h1>
      {data.allJobs.map((job: any) => (
        <div key={job.id}>
          <h2>{job.title} at {job.company}</h2>
          <p>{job.description}</p>
          <p>Location: {job.location}</p>
          <p>Salary: ${job.salary}</p>
          <p>Posted: {job.postedAt}</p>
        </div>
      ))}
    </div>
  );
};

export default JobsPage;
