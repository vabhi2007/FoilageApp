import React from 'react';
import Image from 'next/image';
import StudentIcon from '../../app/assets/StudentIcon.svg'; // Replace with actual student icon path
import { Applicant } from "../utils/consts";


const ApplicantBlock = ({ applicant, isSelected, xBorder = true, onClick }: { applicant: Applicant, isSelected: boolean, xBorder?: boolean, onClick?: (() => void) | null }) => {
  return (
    <div
      className={`h-[5vw] flex items-center border-gray-300 px-[1.5vw] py-[0.65vw] space-x-[2vw] 
        ${isSelected ? 'bg-secondary' : onClick ? 'hover:bg-secondary cursor-pointer border-y' : ''}
        ${xBorder ? 'border-x' : ''}`}
      onClick={onClick || undefined} // Prevents errors if onClick is null
    >
      {/* Student Icon Section */}
      <div className="w-[3vw] h-auto flex-shrink-0 flex items-center">
        <Image src={StudentIcon} className="w-full h-full" alt="Student Icon" />
      </div>

      {/* Applicant Details Section */}
      <div className="flex flex-col flex-grow space-y-[0.75vw]" style={{ fontFamily: 'Montserrat' }}>
        <div className="space-y-[0.1vw]">
          <h3 className="text-[1vw] font-medium text-black">{applicant.applicantName}</h3>
          <p className="text-[0.85vw] text-tertiary">Student</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicantBlock;
