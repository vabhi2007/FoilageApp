import React, { useState } from 'react';
import Image from 'next/image';
import ExtendedJobBlock from './components/ExtendedJobBlock';
import MobileExtendedJobBlock from './MobileExtendedJobBlock';
import FoliageLogo from '../app/assets/FoliageLogo.svg'

const MobileJobBlock = ({ job, isSelected, xBorder = false, onClick, }: {job: any, isSelected: boolean, xBorder?: boolean, onClick?: (() => void) | null }) => {
  

    return (
    <div >
    <div
      className={` group w-auto flex border-gray-300 px-[1.5vw] py-[0.65vw] space-x-[3vw] 
        ${isSelected ? 'bg-secondary' : onClick ? 'hover:bg-secondary cursor-pointer border-y' : ''}
        ${xBorder ? 'border-x' : ''}
        `}
        
      onClick={onClick || undefined} // Prevents errors if onClick is null
      
    >
      {/* Logo Section */}
      <div className="w-[9vw] h-auto flex-shrink-0 flex items-center mx-[3vw]">
        <Image src={FoliageLogo} className="w-full h-full" alt="Logo" />
      </div>

      {/* Job Details Section */}
      <div className="flex flex-col flex-grow ml-[vw] my-[3vw]" style={{ fontFamily: 'Montserrat' }}>
        <div className="space-y-[0.1vw] mb-[3vw]">
          <h3 className="text-[4vw] font-medium text-black">{job.title}</h3>
          <p className="text-[0.85vw] text-tertiary">{job.company}</p>
        </div>

        {/* Labels */}
        <div className="  flex flex-wrap gap-[1vw]  ">
          <span className={`bg-gray-200 text-gray-700 text-[3vw] px-[1.5vw] py-[0.5vw] rounded items-center ${isSelected ? "outline outline-1" : ""}`}>
            {job.location}
          </span>
          <span className={`bg-gray-200 text-gray-700 text-[3vw] px-[1.5vw] py-[0.5vw] rounded items-center ${isSelected ? "outline outline-1" : ""}`}>
            ${job.salary}
          </span>
          <span className={`bg-gray-200 text-gray-700 text-[3vw] px-[1.5vw] py-[0.5vw] rounded items-center ${isSelected ? "outline outline-1" : ""}`}>
            Grade 11
          </span>
          <span className={`bg-gray-200 text-gray-700 text-[3vw] px-[1.5vw] py-[0.5vw] rounded items-center ${isSelected ? "outline outline-1" : ""}`}>
            Remote
          </span>
          <span className={`bg-gray-200 text-gray-700 text-[3vw] px-[1.5vw] py-[0.5vw] rounded items-center ${isSelected ? "outline outline-1" : ""}`}>
            No experience
          </span>
          <span className={`bg-gray-200 text-gray-700 text-[3vw] px-[1.5vw] py-[0.5vw] rounded items-center ${isSelected ? "outline outline-1" : ""}`}>
            Internship
          </span>
        </div>
      </div>
      </div>
      <div className={`${isSelected ? "" : "hidden"}`}>
      </div>
    </div>
  );
};

export default MobileJobBlock;
