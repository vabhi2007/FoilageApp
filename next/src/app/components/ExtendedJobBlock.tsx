import React, { useState } from "react";
import Image from "next/image";
import CloseIcon from "../../app/assets/CloseIcon.svg";
import Button from "../components/Button";
import JobBlock from "../../app/components/JobBlock";

interface ExtendedJobBlockProps {
  selectedJob: any;
  onClose: () => void;
}

const ExtendedJobBlock: React.FC<ExtendedJobBlockProps> = ({ selectedJob, onClose }) => {
  return (
    <div className="bg-white rounded-lg w-[28vw] h-[31.5vw] shadow-lg relative">
        {/* Close Button */}
        <Image
          src={CloseIcon}
          alt="Close"
          className="absolute top-[0.7vw] right-[0.7vw] w-[1.75vw] h-auto cursor-pointer"
          onClick={onClose}
        />

        {/* Job Details */}
        <div className="flex flex-col pt-[1.4vw] px-[0.7vw] space-y-[0.7vw]" style={{ fontFamily: "Montserrat" }}>
          <JobBlock
            key={selectedJob.id}
            job={selectedJob}
            isSelected={false}
          />

          <div className="px-[1vw] flex gap-[0.35vw]">
            <Button text="Apply" className="w-[3.5vw] h-[1.6vw] text-[0.55vw]" />
            <Button text="Unsave" primary={false} className="w-[3.5vw] h-[1.6vw] text-[0.55vw]" />
          </div>

          {/* Job Overview Section */}
          <div className="px-[1vw] py-[1.4vw] space-y-[0.7vw] text-black">
            <h4 className="text-[1vw]">Job Overview</h4>
            <p className="text-[0.7vw] text-gray-700">{selectedJob.description}</p>
          </div>

          {/* About Us Section */}
          <div className="px-[1vw] py-[1.4vw] space-y-[0.7vw] text-black">
            <h4 className="text-[1vw]">About Us</h4>
            <p className="text-[0.7vw] text-gray-700">{selectedJob.companyOverview}</p>
          </div>
        </div>
    </div>
  );
};

export default ExtendedJobBlock;
