import React from 'react';
import Image from 'next/image';
import TemporaryEmployerImage from '../../app/assets/Leaf.svg';

const JobBlock = ({ job, isSelected, xBorder = false, onClick }: { job: any, isSelected: boolean, xBorder?: boolean, onClick?: (() => void) | null }) => {
  return (
    <div
      className={`w-auto flex border-gray-300 px-[1.5vw] py-[0.65vw] space-x-[2vw] 
        ${isSelected ? 'bg-secondary' : onClick ? 'hover:bg-secondary cursor-pointer border-y' : ''}
        ${xBorder ? 'border-x' : ''}
        `}
        
      onClick={onClick || undefined} // Prevents errors if onClick is null
    >
      {/* Logo Section */}
      <div className="w-[3vw] h-auto flex-shrink-0 flex items-center">
        <Image src={TemporaryEmployerImage} className="w-full h-full" alt="Logo" />
      </div>

      {/* Job Details Section */}
      <div className="flex flex-col flex-grow space-y-[0.75vw]" style={{ fontFamily: 'Montserrat' }}>
        <div className="space-y-[0.1vw]">
          <h3 className="text-[1vw] font-medium text-black">{job.title}</h3>
          <p className="text-[0.85vw] text-tertiary">{job.company}</p>
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
            Grade 11
          </span>
          <span className="bg-gray-200 text-gray-700 text-[0.65vw] px-[0.5vw] py-[0.25vw] rounded">
            Remote
          </span>
          <span className="bg-gray-200 text-gray-700 text-[0.65vw] px-[0.5vw] py-[0.25vw] rounded">
            No experience
          </span>
          <span className="bg-gray-200 text-gray-700 text-[0.65vw] px-[0.5vw] py-[0.25vw] rounded">
            Internship
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobBlock;
