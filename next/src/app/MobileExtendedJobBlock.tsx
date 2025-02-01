'use client';

import React, { useState } from "react";
import Image from "next/image";
import CloseIcon from "../app/assets/CloseIcon.svg";
import Button from "./components/Button";
import JobBlock from "../app/components/JobBlock";
import JobForm from "../app/components/JobForm";
import ApplicantList from "../app/components/ApplicantList";

import { useQuery, useMutation } from '@apollo/client'
import {GET_ALL_JOBS, DELETE_JOB_POST, ADD_CONNECTED_JOB, REMOVE_CONNECTED_JOB, GET_ME} from '@/graphql/queries';
import { adminRef, employerRef, jobSeekerRef } from "./utils/consts";
import MobileJobBlock from "./MobileJobBlock";

interface ExtendedJobBlockProps {
  selectedJob: any;
  onClose: () => void;
  user?: string;
  hideApplication?: boolean
}

const MobileExtendedJobBlock: React.FC<ExtendedJobBlockProps> = ({ selectedJob, onClose, user=jobSeekerRef, hideApplication=false }) => {

  const { data: medata, loading, error } = useQuery(GET_ME);

  const [addConnectedJob] = useMutation(ADD_CONNECTED_JOB, {refetchQueries: [{query: GET_ME}]});
  const [removeConnectedJob] = useMutation(REMOVE_CONNECTED_JOB, {refetchQueries: [{query: GET_ME}]});

  const handleAddJob = async () => {
    try {
      const jobId = parseInt(selectedJob.id);
      const { data } = await addConnectedJob({ variables: {jobId: jobId} });
      if (data.addConnectedJob.success) {
        console.log("Job added successfully");
      }
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const handleRemoveJob = async () => {
    try {
      const jobId = parseInt(selectedJob.id);
      const { data } = await removeConnectedJob({ variables: { jobId: jobId } });
      if (data.removeConnectedJob.success) {
        console.log("Job removed successfully");
      }
    } catch (error) {
      console.error("Error removing job:", error);
    }
  };

  const { data: jobsData, loading: jobsLoading, error: jobsError, refetch: refetchJobs } = useQuery(GET_ALL_JOBS);

  const [deleteJob] = useMutation(DELETE_JOB_POST, {
      onCompleted: () => refetchJobs(),
    });

  const handleDeleteJobById = async (deleteJobId : string) => {
    try {
      await deleteJob({ variables: { jobPostId: parseInt(deleteJobId) } });
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
    <div className="flex items-center justify-center gap-[2vw] mx-[10vw] w-full h-[60vw]">
    <div className="bg-white rounded-lg  shadow-lg relative">
        

        {/* Job Details */}
        <div className="flex flex-col pt-[1.4vw] px-[0.7vw] space-y-[0.7vw]" style={{ fontFamily: "Montserrat" }}>
          <div className="flex justify-between items-start">
          <MobileJobBlock
            key={selectedJob.id}
            job={selectedJob}
            isSelected={false}
          />
          {/* Close Button */}
          <div className="px-[1vw]">
        <Image
          src={CloseIcon}
          alt="Close"
          className="pt-[0.65vw] w-[15vw] h-auto cursor-pointer"
          onClick={onClose}
        />
        </div>
        </div>

          <div className="px-[5vw] pt-[1vw]">

            {user===jobSeekerRef && (
              <Button text={(medata?.me?.connectedJobs?.some((job: { id: any; }) => job.id === selectedJob.id)) ? "Unsave" : "Save"} primary={false} className="w-[15vw] h-[5vw] text-white text-[3vw]" onClick={(medata?.me?.connectedJobs?.some((job: { id: any; }) => job.id === selectedJob.id)) ? handleRemoveJob : handleAddJob}/>
            )}

            {user===employerRef && (
              <div className="flex gap-[0.35vw]">
                <Button text="Edit" className="w-[3.5vw] h-[1.6vw] text-[0.55vw]" onClick={handleEditJobClick}/>
                <Button text="Delete" primary={false} className="w-[3.5vw] h-[1.6vw] text-[0.6vw]" onClick={() => handleDeleteJobById(selectedJob.id)}/>
              </div>
            )}

            {user===adminRef && (
              <div className="flex gap-[0.35vw]">
              <Button text="Accept" className="w-[3.5vw] h-[1.6vw] text-[0.55vw]" />
              <Button text="Reject" primary={false} className="w-[3.5vw] h-[1.6vw] text-[0.6vw]" onClick={() => handleDeleteJobById(selectedJob.id)}/>
            </div>
            )}

          </div>

          {/* Job Overview Section */}
          <div className="px-[5vw] py-[1.4vw] space-y-[0.7vw] text-black">
            <h4 className="text-[5vw]">Job Overview</h4>
            <p className="text-[3vw] text-gray-700">{selectedJob.description}</p>
          </div>

          {/* About Us Section */}
          <div className="px-[5vw] py-[1.4vw] space-y-[0.7vw] text-black">
            <h4 className="text-[5vw]">About Us</h4>
            <p className="text-[3vw] text-gray-700">{selectedJob.companyOverview}</p>
          </div>
        </div>
    </div>
        {isEditingJob && (
          <JobForm onClose={() => setIsEditingJob(false)} existingId={selectedJob.id} onJobCreated={refetchJobs}/>
        )}

        {(user === employerRef || user === adminRef) && (!hideApplication) && (
            <ApplicantList jobId={selectedJob.id.toString()}></ApplicantList>
        )}
    </div>
  );
};

export default MobileExtendedJobBlock;
