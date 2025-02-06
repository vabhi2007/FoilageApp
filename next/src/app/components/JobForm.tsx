import React, { useEffect, useState } from "react";
import Button from "./Button";
import Image from "next/image";
import CloseIcon from "../../app/assets/RoundCloseIcon.svg";
import { useMutation } from '@apollo/client';
import {GET_ALL_JOBS, CREATE_JOB_POST, UPDATE_JOB_POST } from '@/graphql/queries';
import { Job } from "../utils/consts";

interface JobFormProps {
  onClose: () => void;
  onJobCreated: () => void;
  existingJob?: Job;
}

const JobForm: React.FC<JobFormProps> = ({ onClose, onJobCreated, existingJob }) => {

  const [formData, setFormData] = useState({
    title: existingJob?.title || '',
    salary: existingJob?.salary || '',
    experience: existingJob?.experience || '',
    gradeLevel: existingJob?.grade || '',
    employment: existingJob?.employment || '',
    workSite: existingJob?.site || '',
    location: existingJob?.location || '',
    description: existingJob?.description || '',
  });

  const [createJob] = useMutation(CREATE_JOB_POST, {refetchQueries: [{query: GET_ALL_JOBS}]});

  const [updateJobPost] = useMutation(UPDATE_JOB_POST, {refetchQueries: [{query: GET_ALL_JOBS}]});

  // Update formData when existingJob prop changes
  useEffect(() => {
    if (existingJob) {
      setFormData({
        title: existingJob.title,
        salary: existingJob.salary,
        experience: existingJob.experience,
        gradeLevel: existingJob.grade,
        employment: existingJob.employment,
        workSite: existingJob.site,
        location: existingJob.location,
        description: existingJob.description,
      });
    }
  }, [existingJob]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {title, description, location, workSite, salary, experience, gradeLevel, employment} = formData;
    // Handle job creation logic here (e.g., submit to API or GraphQL)

      if (existingJob) {
        try {
          await updateJobPost({
            variables: { 
              jobId: existingJob.id,
              title: title,
              description: description,
              location: location,
              salary: salary,
              site: workSite,
              experience: experience,
              grade: gradeLevel,
              employment: employment
            }
          });
          alert('Job successfully updated!');
        } catch (error) {
          console.error('Error updating job:', error);
        }
      } 
      else {
        try {
          await createJob({
            variables: { 
              title: title,
              description: description,
              location: location,
              salary: salary,
              site: workSite,
              experience: experience,
              grade: gradeLevel,
              employment: employment
            }})
            alert('Job successfully created!');
          } catch (error) {
            console.error('Error updating job:', error);
          }
        }
    onClose(); // Close the form after submission
    onJobCreated();
    };

  return (
    <div className="relative bg-white rounded-lg w-[30vw] h-[40vw] p-[2vw] shadow-lg text-tertiary" style={{fontFamily: 'Montserrat'}}>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-[1vw]">
        <div className="text-[1vw] text-black flex justify-between">
          <div>Job Form</div>
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
        
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="p-[0.5vw] text-[0.75vw] border border-gray-300"
        />
        
        <input
          type="text"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="p-[0.5vw] text-[0.75vw] border border-gray-300"
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="p-[0.5vw] text-[0.75vw] border border-gray-300"
        />

        <select
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="p-[0.5vw] text-[0.75vw] border border-gray-300"
        >
          <option value="">Select Experience</option>
          <option value="None">None</option>
          <option value="Entry-level">Entry-level</option>
          <option value="1-2 years">1-2 years</option>
          <option value="3+ years">3+ years</option>
        </select>

        <select
          name="gradeLevel"
          value={formData.gradeLevel}
          onChange={handleChange}
          className="p-[0.5vw] text-[0.75vw] border border-gray-300"
        >
          <option value="">Select Grade Level</option>
          <option value="9th">9th</option>
          <option value="10th">10th</option>
          <option value="11th">11th</option>
          <option value="12th">12th</option>
        </select>

        <select
          name="employment"
          value={formData.employment}
          onChange={handleChange}
          className="p-[0.5vw] text-[0.75vw] border border-gray-300"
        >
          <option value="">Select Employment</option>
          <option value="Volunteer">Volunteer</option>
          <option value="Internship">Internship</option>
          <option value="Part-time">Part-time</option>
          <option value="Full-time">Full-time</option>
        </select>

        <select
          name="workSite"
          value={formData.workSite}
          onChange={handleChange}
          className="p-[0.5vw] text-[0.75vw] border border-gray-300"
        >
          <option value="">Select Work Site</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="On-site">On-site</option>
        </select>

        {/* Job Overview Textarea */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Job Overview"
          className="p-[0.5vw] text-[0.75vw] border border-gray-300 h-[8vw]"
        />

        <div className="flex justify-center text-white">
          <Button text={existingJob ? "Save Job" : "Create Job"} className="" />
        </div>
      </form>
    </div>
  );
};

export default JobForm;
