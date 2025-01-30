'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_JOBS } from '@/graphql/queries';
import TemporaryEmployerImage from "../../app/assets/TemporaryEmployerImage.svg";
import Image from "next/image";

const JobList = () => {
  const { data, loading, error } = useQuery(GET_ALL_JOBS);

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error fetching jobs: {error.message}</p>;

  return (
    <div className="flex flex-col h-full border border-gray-300 bg-white">
      {/* Job List Container */}
      <div className="w-full flex-grow overflow-y-auto"> {/* Ensures max height and scrolls */}
        {data.allJobPosts.map((job: any) => (
          <div
            key={job.id}
            className="flex items-center border-t border-b border-gray-300 hover:bg-secondary px-[1.5vw] py-[1vw] space-x-[2vw]"
          >
            {/* Logo Section */}
            <div className="w-[4vw] h-auto flex-shrink-0 flex items-center">
              <Image
                src={TemporaryEmployerImage}
                className="w-full h-full"
                alt="Logo"
              />
            </div>

            {/* Job Details Section */}
            <div className="flex flex-col flex-grow space-y-[0.75vw]" style={{fontFamily: 'Montserrat'}}>
              <div className="space-y-[0.1vw]">
                <h3 className="text-[1.1vw] font-medium text-black">{job.title}</h3>
                <p className="text-[0.9vw] text-black">{job.company}</p>
              </div>

              {/* Labels */}
              <div className="flex gap-[1vw]">
                <span className="bg-gray-200 text-gray-700 text-[0.75vw] px-[0.5vw] py-[0.25vw] rounded">
                  {job.location}
                </span>
                <span className="bg-gray-200 text-gray-700 text-[0.75vw] px-[0.5vw] py-[0.25vw] rounded">
                  ${job.salary}
                </span>
                <span className="bg-gray-200 text-gray-700 text-[0.75vw] px-[0.5vw] py-[0.25vw] rounded">
                  ${job.salary}
                </span>
                <span className="bg-gray-200 text-gray-700 text-[0.75vw] px-[0.5vw] py-[0.25vw] rounded">
                  ${job.salary}
                </span>
                <span className="bg-gray-200 text-gray-700 text-[0.75vw] px-[0.5vw] py-[0.25vw] rounded">
                  ${job.salary}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
