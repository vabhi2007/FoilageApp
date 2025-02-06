import React from "react";
import Image from "next/image";
import CloseIcon from "../../app/assets/RoundCloseIcon.svg";
import ApplicantBlock from "./ApplicantBlock";
import { Applicant } from "../utils/consts";

interface ExtendedApplicantBlockProps {
  selectedApplicant: Applicant;
  onClose: () => void;
}

const ExtendedApplicantBlock: React.FC<ExtendedApplicantBlockProps> = ({ selectedApplicant, onClose }) => {
  return (
    <div className="relative">
      {/* Applicant Details */}
      <div className="flex flex-col pt-[1.4vw] px-[0.7vw]" style={{ fontFamily: "Montserrat" }}>
      <div className="flex justify-between items-start">
        {/* Applicant Block */}
        <ApplicantBlock
          key={selectedApplicant.id}
          applicant={selectedApplicant}
          isSelected={false}
          xBorder = {false}
        />

        {/* Close Button */}
        <div className="absolute top-0 right-0 pt-[1vw] pr-[1vw]">
            <Image
              src={CloseIcon}
              alt="Close"
              className="w-[1.5vw] h-auto cursor-pointer"
              onClick={onClose}
            />
          </div>
      </div>
        <div className="pt-[2vw] flex gap-[4vw]">
            {/* Contact Email Section */}
            <div className="px-[1vw] space-y-[0.7vw] text-black">
            <h4 className="text-[1vw]">Contact Email</h4>
            <p className="text-[0.7vw] text-gray-700">{selectedApplicant.applicantEmail}</p>
            </div>

            {/* Resume Section */}
            <div className="px-[1vw] space-y-[0.7vw] text-black">
            <h4 className="text-[1vw]">Resume</h4>
            <p className="text-[0.7vw] text-gray-700">
                <a href={selectedApplicant.resume} target="_blank" className="text-blue-500 hover:underline">
                View Resume
                </a>
            </p>
            </div>
        </div>

        {/* Bio Section */}
        <div className="px-[1vw] py-[1.4vw] space-y-[0.7vw] text-black">
          <h4 className="text-[1vw]">Bio</h4>
          <p className="text-[0.7vw] text-gray-700">{selectedApplicant.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ExtendedApplicantBlock;
