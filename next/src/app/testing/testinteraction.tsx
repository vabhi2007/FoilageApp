'use client';

{/*
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_ALL_JOBS,
  GET_ALL_APPLICATIONS,
  CREATE_JOB_POST,
  CREATE_APPLICATION,
  DELETE_JOB_POST,
  DELETE_APPLICATION,
} from '@/graphql/queries';

*/}

export default function InteractiveSection() {

  {/*
  const { data: jobsData, loading: jobsLoading, error: jobsError, refetch: refetchJobs } = useQuery(GET_ALL_JOBS);
  const { data: applicationsData, loading: applicationsLoading, error: applicationsError, refetch: refetchApplications } =
    useQuery(GET_ALL_APPLICATIONS);

  const [createJob] = useMutation(CREATE_JOB_POST, {
    onCompleted: () => refetchJobs(),
  });
  const [createApplication] = useMutation(CREATE_APPLICATION, {
    onCompleted: () => refetchApplications(),
  });
  const [deleteJob] = useMutation(DELETE_JOB_POST, {
    onCompleted: () => refetchJobs(),
  });
  const [deleteApplication] = useMutation(DELETE_APPLICATION, {
    onCompleted: () => refetchApplications(),
  });

  const [showSection, setShowSection] = useState('viewJobs');
  const [jobForm, setJobForm] = useState({ title: '', description: '', company: '', location: '', salary: '' });
  const [applicationForm, setApplicationForm] = useState({ jobId: '', applicantName: '', applicantEmail: '', resume: '' });
  const [deleteJobId, setDeleteJobId] = useState('');
  const [deleteApplicationId, setDeleteApplicationId] = useState('');

  useEffect(() => {
    console.log("Jobs Data:", jobsData);
    console.log("Applications Data:", applicationsData);
  }, [jobsData, applicationsData]);

  if (jobsLoading || applicationsLoading) return <p>Loading...</p>;
  if (jobsError) return <p className="text-red-500">Error fetching jobs: {jobsError.message}</p>;
  if (applicationsError) return <p className="text-red-500">Error fetching applications: {applicationsError.message}</p>;

  */}

  return (

    {/*

    <div className="p-6">
      // Navigation
      <nav className="flex space-x-4 mb-4">
        <button onClick={() => setShowSection('viewJobs')} className="bg-blue-500 text-white px-4 py-2 rounded">
          View Jobs
        </button>
        <button onClick={() => setShowSection('viewApplications')} className="bg-green-500 text-white px-4 py-2 rounded">
          View Applications
        </button>
        <button onClick={() => setShowSection('addJob')} className="bg-blue-700 text-white px-4 py-2 rounded">
          Add Job
        </button>
        <button onClick={() => setShowSection('addApplication')} className="bg-green-700 text-white px-4 py-2 rounded">
          Add Application
        </button>
      </nav>

      // View Jobs
      {showSection === 'viewJobs' && (
        <div>
          <h2 className="text-xl font-bold">All Jobs</h2>
          <ul className="mt-4">
            {jobsData?.allJobs?.map((job: any) => (
              <li key={job.id} className="border p-4 mb-2 rounded shadow">
                <p><strong>{job.title}</strong> at {job.company}</p>
                <p>{job.location} - ${job.salary}</p>
                <p>{job.description}</p>
                <button 
                  onClick={() => deleteJob({ variables: { jobPostId: parseInt(job.id) } })} 
                  className="bg-red-500 text-white px-3 py-1 mt-2 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      //View Applications
      {showSection === 'viewApplications' && (
        <div>
          <h2 className="text-xl font-bold">All Applications</h2>
          <ul className="mt-4">
            {applicationsData?.allApplications?.map((app: any) => (
              <li key={app.id} className="border p-4 mb-2 rounded shadow">
                <p><strong>{app.applicantName}</strong> applied for {app.jobPost.title}</p>
                <p>Email: {app.applicantEmail}</p>
                <p>Resume: {app.resume || 'No resume uploaded'}</p>
                <button 
                  onClick={() => deleteApplication({ variables: { applicationId: parseInt(app.id) } })} 
                  className="bg-red-500 text-white px-3 py-1 mt-2 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      // Add Job
      {showSection === 'addJob' && (
        <div>
          <h2 className="text-xl font-bold">Add Job</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createJob({
                variables: {
                  title: jobForm.title,
                  description: jobForm.description,
                  company: jobForm.company,
                  location: jobForm.location,
                  salary: parseFloat(jobForm.salary) * 1.0,
                },
              });
              setJobForm({ title: '', description: '', company: '', location: '', salary: '' });
            }}
            className="space-y-3"
          >
            <input type="text" placeholder="Title" className="border p-2 rounded w-full"
              value={jobForm.title} onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })} required />
            <input type="text" placeholder="Description" className="border p-2 rounded w-full"
              value={jobForm.description} onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })} required />
            <input type="text" placeholder="Company" className="border p-2 rounded w-full"
              value={jobForm.company} onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })} required />
            <input type="text" placeholder="Location" className="border p-2 rounded w-full"
              value={jobForm.location} onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })} required />
            <input type="number" placeholder="Salary" className="border p-2 rounded w-full"
              value={jobForm.salary} onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })} required />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Job</button>
          </form>
        </div>
      )}

      // Add Application
      {showSection === 'addApplication' && (
        <div>
          <h2 className="text-xl font-bold">Apply for a Job</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createApplication({
                variables: {
                  jobId: parseInt(applicationForm.jobId), 
                  applicantName: applicationForm.applicantName,
                  applicantEmail: applicationForm.applicantEmail,
                  resume: applicationForm.resume,
                },
              });
              setApplicationForm({ jobId: '', applicantName: '', applicantEmail: '', resume: '' });
            }}
            className="space-y-3"
          >
            <input type="number" placeholder="Job ID" className="border p-2 rounded w-full"
              value={applicationForm.jobId} onChange={(e) => setApplicationForm({ ...applicationForm, jobId: e.target.value })} required />
            <input type="text" placeholder="Name" className="border p-2 rounded w-full"
              value={applicationForm.applicantName} onChange={(e) => setApplicationForm({ ...applicationForm, applicantName: e.target.value })} required />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Apply</button>
          </form>
        </div>
      )}
    </div>
    */}
  );
}