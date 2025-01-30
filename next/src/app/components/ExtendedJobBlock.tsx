'use client';

import React, { useState } from "react";
import Image from "next/image";
import CloseIcon from "../../app/assets/CloseIcon.svg";
import Button from "../components/Button";
import JobBlock from "../../app/components/JobBlock";
import JobForm from "../../app/components/JobForm";
import ApplicantList from "../../app/components/ApplicantList";

import { useQuery, useMutation } from '@apollo/client'
import {GET_ALL_JOBS, DELETE_JOB_POST} from '@/graphql/queries';

interface ExtendedJobBlockProps {
  selectedJob: any;
  onClose: () => void;
  user?: string;
}

const ExtendedJobBlock: React.FC<ExtendedJobBlockProps> = ({ selectedJob, onClose, user="Student" }) => {

  const { data: jobsData, loading: jobsLoading, error: jobsError, refetch: refetchJobs } = useQuery(GET_ALL_JOBS);

  const [deleteJob] = useMutation(DELETE_JOB_POST, {
      onCompleted: () => refetchJobs(),
    });

  const handleDeleteJobById = async (deleteJobId : string) => {
    try {
      await deleteJob({ variables: { jobId: parseInt(deleteJobId) } });
      alert(`Job with ID ${selectedJob.id} successfully deleted!`);
    } catch (error) {
      alert('Failed to delete job. Please check the ID and try again.');
    }
    onClose();
  };

  const [isEditingJob, setIsEditingJob] = useState(false);
  
  const handleEditJobClick = () => {
    setIsEditingJob(true);
  };

  return (
    <div className="flex items-center justify-center gap-[2vw]">
    <div className="bg-white rounded-lg w-[30vw] h-[40vw] shadow-lg relative">
        

        {/* Job Details */}
        <div className="flex flex-col pt-[1.4vw] px-[0.7vw] space-y-[0.7vw]" style={{ fontFamily: "Montserrat" }}>
          <div className="flex justify-between items-start">
          <JobBlock
            key={selectedJob.id}
            job={selectedJob}
            isSelected={false}
          />
          {/* Close Button */}
          <div className="px-[1vw]">
        <Image
          src={CloseIcon}
          alt="Close"
          className="pt-[0.65vw] w-[2.75vw] h-auto cursor-pointer"
          onClick={onClose}
        />
        </div>
        </div>

          <div className="px-[1vw] pt-[1vw]">

            {user==='Student' && (
              <Button text="Unsave" primary={false} className="w-[3.5vw] h-[1.6vw] text-[0.55vw]" />
            )}

            {user==='Employer' && (
              <div className="flex gap-[0.35vw]">
                <Button text="Edit" className="w-[3.5vw] h-[1.6vw] text-[0.55vw]" onClick={handleEditJobClick}/>
                <Button text="Delete" primary={false} className="w-[3.5vw] h-[1.6vw] text-[0.55vw]" onClick={() => handleDeleteJobById(selectedJob.id)}/>
              </div>
            )}

            {user==='Admin' && (
              <div className="flex gap-[0.35vw]">
              <Button text="Accept" className="w-[3.5vw] h-[1.6vw] text-[0.55vw]" />
              <Button text="Reject" primary={false} className="w-[3.5vw] h-[1.6vw] text-[0.55vw]" onClick={() => handleDeleteJobById(selectedJob.id)}/>
            </div>
            )}

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
        {isEditingJob && (
          <JobForm onClose={() => setIsEditingJob(false)} existingId={selectedJob.id} onJobCreated={refetchJobs}/>
        )}

        {(user === 'Employer' || user === 'Admin') && (
            <ApplicantList jobId={selectedJob.id.toString()}></ApplicantList>
        )}
    </div>
  );
};

export default ExtendedJobBlock;
