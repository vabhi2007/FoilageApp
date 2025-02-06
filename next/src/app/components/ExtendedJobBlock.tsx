'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CloseIcon from "../../app/assets/RoundCloseIcon.svg";
import Button from "../components/Button";
import JobBlock from "../../app/components/JobBlock";
import JobForm from "../../app/components/JobForm";
import ApplicantList from "../../app/components/ApplicantList";
import { Job } from "../utils/consts";

import { useQuery, useMutation } from '@apollo/client';
import { 
  GET_ALL_JOBS, 
  DELETE_JOB_POST, 
  ADD_CONNECTED_JOB, 
  REMOVE_CONNECTED_JOB, 
  GET_ME, 
  GET_JOB_BY_ID, 
  UPDATE_JOB_POST
} from '@/graphql/queries';

import { adminRef, employerRef, jobSeekerRef } from "../utils/consts";

import { hasToken } from "../utils/auth";

interface ExtendedJobBlockProps {
  selectedJob: Job;
  onClose: () => void;
  user?: string;
  hideApplication?: boolean;
}

const ExtendedJobBlock: React.FC<ExtendedJobBlockProps> = ({ selectedJob, onClose, user = jobSeekerRef, hideApplication = false }) => {
  const { data: medata } = useQuery(GET_ME);
  const [currentJob, setCurrentJob] = useState(selectedJob);

  const { data: jobData, refetch } = useQuery(GET_JOB_BY_ID, {
    variables: { id: selectedJob?.id ? parseInt(selectedJob.id, 10) : null },
    skip: !selectedJob?.id, // Avoid fetching if selectedJob is null
  });

  const [updateJobPost] = useMutation(UPDATE_JOB_POST, {refetchQueries: [{query: GET_ALL_JOBS}]});

  // Refetch when `selectedJob` changes
  useEffect(() => {
    if (selectedJob?.id) {
      refetch({ id: parseInt(selectedJob.id, 10) });
    }
  }, [selectedJob, refetch]);

  // Update state when new job data is available
  useEffect(() => {
    if (jobData?.jobById) {
      setCurrentJob(jobData.jobById);
    }
  }, [jobData]);

  const [addConnectedJob] = useMutation(ADD_CONNECTED_JOB, { refetchQueries: [{ query: GET_ME }] });
  const [removeConnectedJob] = useMutation(REMOVE_CONNECTED_JOB, { refetchQueries: [{ query: GET_ME }] });

  const handleAddJob = async () => {
    try {
      const jobId = parseInt(currentJob.id);
      await addConnectedJob({ variables: { jobId } });
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const handleRemoveJob = async () => {
    try {
      const jobId = parseInt(currentJob.id);
      await removeConnectedJob({ variables: { jobId } });
    } catch (error) {
      console.error("Error removing job:", error);
    }
  };

  const { refetch: refetchJobs } = useQuery(GET_ALL_JOBS);
  const [deleteJob] = useMutation(DELETE_JOB_POST, {
    onCompleted: () => refetchJobs(),
  });

  const handleDeleteJobById = async () => {
    try {
      await deleteJob({ variables: { jobPostId: parseInt(currentJob.id) } });
      alert(`Job with ID ${currentJob.id} successfully deleted!`);
      onClose();
    } catch (error) {
      console.error('Failed to delete job.', error);
    }
  };

  const approveJob = async() => {
    try {
      await updateJobPost({
        variables: { 
          jobId: selectedJob.id,
          title: selectedJob.title,
          description: selectedJob.description,
          location: selectedJob.location,
          salary: selectedJob.salary,
          site: selectedJob.site,
          experience: selectedJob.experience,
          grade: selectedJob.grade,
          employment: selectedJob.employment,
          isActive: true
        }
      });
      onClose();
    } catch (error) {
      console.error('Error updating job:', error);
    }
  }

  const [isEditingJob, setIsEditingJob] = useState(false);
  const handleEditJobClick = () => setIsEditingJob(true);

  const isJobCreator = medata?.me?.connectedJobs?.some((job: { id: string }) => job.id === currentJob.id);

  return (
    <div className="flex items-center justify-center gap-[2vw]">
      <div className="bg-white rounded-lg w-[30vw] h-[40vw] shadow-lg relative">
        <div className="flex flex-col pt-[1.4vw] px-[0.7vw] space-y-[0.7vw]" style={{ fontFamily: "Montserrat" }}>
          <div className="flex flex-row items-start">
            <JobBlock key={currentJob.id} job={currentJob} isSelected={false}/>
            <div className="absolute top-0 right-0 pt-[1vw] pr-[1vw]">
              <Image src={CloseIcon} alt="Close" className="w-[1.5vw] h-auto cursor-pointer" onClick={onClose} />
            </div>
          </div>

          {/* Job Seeker Actions: Save / Unsave */}
          {user === jobSeekerRef && hasToken() && (
            <div className="px-[1vw] pt-[1vw]">
              <Button
                text={medata?.me?.connectedJobs?.some((job: { id: string }) => job.id === currentJob.id) ? "Unsave" : "Save"}
                primary={false}
                className="w-[3.5vw] h-[1.75vw] text-[0.7vw]"
                onClick={medata?.me?.connectedJobs?.some((job: { id: string }) => job.id === currentJob.id) ? handleRemoveJob : handleAddJob}
              />
            </div>
          )}

          {/* Employer Actions: Edit / Delete */}
          {user === employerRef && isJobCreator && (
            <div className="px-[1vw] pt-[1vw]">
              <div className="flex gap-[0.35vw]">
                {!hideApplication && <Button text="Edit" className="w-[3.5vw] h-[1.75vw] text-[0.7vw]" onClick={handleEditJobClick} />}
                <Button text="Delete" primary={false} className="w-[3.5vw] h-[1.75vw] text-[0.7vw]" onClick={handleDeleteJobById} />
              </div>
            </div>
          )}

          {/* Admin Actions: Accept / Reject */}
          {user === adminRef && (
            <div className="px-[1vw] pt-[1vw]">
              {!hideApplication && (
              <div className="flex gap-[0.35vw]">        
                <Button text="Accept" className="w-[3.5vw] h-[1.6vw] text-[0.55vw]" onClick={approveJob}/>
                <Button text="Reject" primary={false} className="w-[3.5vw] h-[1.6vw] text-[0.6vw]" onClick={handleDeleteJobById} />
              </div>
              )}
            </div>
          )}

          {/* Job Overview */}
          <div className="px-[1vw] py-[1.4vw] space-y-[0.7vw] text-black">
            <h4 className="text-[1vw]">Job Overview</h4>
            <p className="text-[0.7vw] text-gray-700">{currentJob.description}</p>
          </div>

          {/* About Us */}
          <div className="px-[1vw] py-[1.4vw] space-y-[0.7vw] text-black">
            <h4 className="text-[1vw]">About Us</h4>
            <p className="text-[0.7vw] text-gray-700">{currentJob?.employer?.bio}</p>
          </div>
        </div>
      </div>

      {/* Edit Job Modal */}
      {isEditingJob && (
        <JobForm onClose={() => setIsEditingJob(false)} existingJob={currentJob} onJobCreated={refetchJobs} />
      )}

      {/* Applicant List */}
      {(user === employerRef || user === adminRef) && !hideApplication && (
        <ApplicantList jobId={currentJob.id} />
      )}
    </div>
  );
};

export default ExtendedJobBlock;
