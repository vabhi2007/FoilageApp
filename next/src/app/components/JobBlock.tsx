import React from 'react';
import Image from 'next/image';
import TemporaryEmployerImage from '../../app/assets/TemporaryLeaf.svg';
import { Job } from "../utils/consts";

const JobBlock = ({ job, isSelected, xBorder = false, displayStatus = false, onClick }: { job: Job, isSelected: boolean, xBorder?: boolean, displayStatus?: boolean, onClick?: (() => void) | null }) => {
  return (
    <div
      className={`w-auto flex border-gray-300 px-[1.5vw] py-[0.65vw] space-x-[2vw] 
        ${isSelected ? 'bg-secondary' : onClick ? 'hover:bg-secondary cursor-pointer border-y' : ''}
        ${xBorder ? 'border-x' : ''}
        `}
        
      onClick={onClick || undefined} // Prevents errors if onClick is null
    >
      {/* Logo Section */}
      <div className="w-[4vw] h-auto flex-shrink-0 flex items-center">
        <Image src={TemporaryEmployerImage} className="w-full h-full" alt="Logo" />
      </div>

      {/* Job Details Section */}
      <div className="flex flex-col flex-grow space-y-[0.75vw]" style={{ fontFamily: 'Montserrat' }}>
        <div className="space-y-[0.1vw]">
          <div className="flex justify-between">
            <h3 className="text-[1vw] font-medium text-black">{job.title}</h3>

            {displayStatus && (
              <div>
              {!job.isActive ? (
                <div className='text-yellow-500 font-bold'>
                  <span>• In review</span>
                </div>
              ) : 
                <div className='text-green-500 font-bold'>
                  <span>• Approved</span>
                </div>
              }
              </div>
          )}

          </div>
          <p className="text-[0.85vw] text-tertiary">Employer</p>
        </div>

        {/* Labels */}
        <div className="flex flex-wrap gap-[0.5vw]">
          <span className="bg-gray-200 text-gray-700 text-[0.65vw] px-[0.5vw] py-[0.25vw] rounded">
            {job.location}
          </span>
          <span className="bg-gray-200 text-gray-700 text-[0.65vw] px-[0.5vw] py-[0.25vw] rounded">
            ${job.salary}
          </span>
          <span className="bg-gray-200 text-gray-700 text-[0.65vw] px-[0.5vw] py-[0.25vw] rounded">
            {job.grade}
          </span>
          <span className="bg-gray-200 text-gray-700 text-[0.65vw] px-[0.5vw] py-[0.25vw] rounded">
            {job.site}
          </span>
          <span className="bg-gray-200 text-gray-700 text-[0.65vw] px-[0.5vw] py-[0.25vw] rounded">
            {job.experience}
          </span>
          <span className="bg-gray-200 text-gray-700 text-[0.65vw] px-[0.5vw] py-[0.25vw] rounded">
            {job.employment}
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobBlock;
