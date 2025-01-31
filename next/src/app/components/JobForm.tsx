import React, { useState } from "react";
import Button from "./Button";
import Image from "next/image";
import CloseIcon from "../../app/assets/CloseIcon.svg";
import { useQuery, useMutation } from '@apollo/client';
import {GET_ALL_JOBS, DELETE_JOB_POST, CREATE_JOB_POST } from '@/graphql/queries';

interface JobFormProps {
  onClose: () => void;
  onJobCreated: () => void;
  existingId?: string;
}

const JobForm: React.FC<JobFormProps> = ({ onClose, onJobCreated, existingId = null }) => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_JOBS);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    workSite: '',
    salary: '',
    gradeLevel: '',
    employment: '',
    experience: '',
    company: 'Microsoft'
  });

  const [createJob] = useMutation(CREATE_JOB_POST);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {title, salary, location, experience, gradeLevel, employment, workSite, description, company} = formData;
    // Handle job creation logic here (e.g., submit to API or GraphQL)

    if (existingId) {
      {/*Update Job*/}
    }
    else {
      try {
        await createJob({
          variables: { title, description, location, workSite, salary: parseFloat(salary), experience, gradeLevel, employment },
        });
        alert('Job successfully added!');
      } catch (error) {
        console.error('Error creating job:', error);
      }
    }

    onClose(); // Close the form after submission
    onJobCreated();
  };

  return (
    <div className="bg-white rounded-lg w-[30vw] h-[40vw] p-[2vw] shadow-lg text-tertiary" style={{fontFamily: 'Montserrat'}}>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-[1vw]">
        <div className="text-[1vw] text-black flex justify-between">
          <div>Job Form</div>
          {/* Close Button */}
          <Image
            src={CloseIcon}
            alt="Close"
            className="w-[1.75vw] h-auto cursor-pointer"
            onClick={onClose}
          />
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
          <option value="No experience">No experience</option>
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
          <Button text={existingId ? "Save Job" : "Create Job"} className="" />
        </div>
      </form>
    </div>
  );
};

export default JobForm;
