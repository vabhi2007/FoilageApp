'use client';

import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_ALL_JOBS,
  GET_ALL_APPLICATIONS,
  CREATE_JOB_POST,
  CREATE_APPLICATION,
  DELETE_JOB_POST,
  DELETE_APPLICATION,
} from '@/graphql/queries';

export default function InteractiveSection() {
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

  const handleJobFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, description, company, location, salary } = jobForm;

    await createJob({
      variables: { title, description, company, location, salary: parseFloat(salary) },
    });
    setJobForm({ title: '', description: '', company: '', location: '', salary: '' });
    alert('Job successfully added!');
  };

  const handleApplicationFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { jobId, applicantName, applicantEmail, resume } = applicationForm;

    await createApplication({
      variables: { jobId: parseInt(jobId), applicantName, applicantEmail, resume },
    });
    setApplicationForm({ jobId: '', applicantName: '', applicantEmail: '', resume: '' });
    alert('Application successfully added!');
  };

  const handleDeleteJobById = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteJob({ variables: { jobId: parseInt(deleteJobId) } });
      alert(`Job with ID ${deleteJobId} successfully deleted!`);
      setDeleteJobId('');
    } catch (error) {
      alert('Failed to delete job. Please check the ID and try again.');
    }
  };

  const handleDeleteApplicationById = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deleteApplication({ variables: { applicationId: parseInt(deleteApplicationId) } });
      alert(`Application with ID ${deleteApplicationId} successfully deleted!`);
      setDeleteApplicationId('');
    } catch (error) {
      alert('Failed to delete application. Please check the ID and try again.');
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    await deleteJob({ variables: { jobId: parseInt(jobId) } });
    alert('Job with ID ${jobId} deleted!');
  };

  const handleDeleteApplication = async (applicationId: string) => {
    await deleteApplication({ variables: { applicationId: parseInt(applicationId) } });
    alert('Application with ID ${applicationId} deleted!');
  };

  if (jobsLoading || applicationsLoading) return <p>Loading...</p>;
  if (jobsError) return <p>Error fetching jobs: {jobsError.message}</p>;
  if (applicationsError) return <p>Error fetching applications: {applicationsError.message}</p>;

  return (
    <div>
      {/* Navigation */}
      <nav>
        <button onClick={() => setShowSection('viewJobs')}>View All Jobs</button>
        <button onClick={() => setShowSection('viewApplications')}>View All Applications</button>
        <button onClick={() => setShowSection('addJob')}>Add Job</button>
        <button onClick={() => setShowSection('addApplication')}>Add Application</button>
        <button onClick={() => setShowSection('deleteJobById')}>Delete Job by ID</button>
        <button onClick={() => setShowSection('deleteApplicationById')}>Delete Application by ID</button>
      </nav>

      {/* Sections */}
      {showSection === 'viewJobs' && (
        <div>
          <h2>All Jobs</h2>
          <ul>
            {jobsData.allJobPosts.map((job: any) => (
              <li key={job.id}>
                <h2>Id: {job.id}</h2>
                <p>
                    <strong>Title: {job.title}</strong>
                </p>
                <p>
                    <strong>Description: {job.description}</strong>
                </p>
                <p>
                  <strong>Company:</strong> {job.company}
                </p>
                <p>
                  <strong>Location:</strong> {job.location}
                </p>
                <p>
                  <strong>Salary:</strong> ${job.salary}
                </p>
                <button onClick={() => handleDeleteJob(job.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showSection === 'viewApplications' && (
        <div>
          <h2>All Applications</h2>
          <ul>
            {applicationsData.allApplications.map((app: any) => (   
              <li key={app.id}>
                <p>
                  <strong>Id:</strong> {app.id}
                </p>
                <p>
                  <strong>Name:</strong> {app.applicantName}
                </p>
                <p>
                  <strong>Email:</strong> {app.email}
                </p>
                <p>
                  <strong>Resume:</strong> {app.resume}
                </p>
                <p>
                  <strong>Applied for Job:</strong> {app.jobPost.title}
                </p>
                <button onClick={() => handleDeleteApplication(app.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showSection === 'addJob' && (
        <div>
          <h2>Add Job</h2>
          <form onSubmit={handleJobFormSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={jobForm.title}
              onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={jobForm.description}
              onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Company"
              value={jobForm.company}
              onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
            />
            <input
              type="text"
              placeholder="Location"
              value={jobForm.location}
              onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
            />
            <input
              type="number"
              placeholder="Salary"
              value={jobForm.salary}
              onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {showSection === 'addApplication' && (
        <div>
          <h2>Add Application</h2>
          <form onSubmit={handleApplicationFormSubmit}>
            <input
              type="number"
              placeholder="Job ID"
              value={applicationForm.jobId}
              onChange={(e) => setApplicationForm({ ...applicationForm, jobId: e.target.value })}
            />
            <input
              type="text"
              placeholder="Applicant Name"
              value={applicationForm.applicantName}
              onChange={(e) => setApplicationForm({ ...applicationForm, applicantName: e.target.value })}
            />
            <input
              type="email"
              placeholder="Applicant Email"
              value={applicationForm.applicantEmail}
              onChange={(e) => setApplicationForm({ ...applicationForm, applicantEmail: e.target.value })}
            />
            <input
              type="text"
              placeholder="Resume (URL)"
              value={applicationForm.resume}
              onChange={(e) => setApplicationForm({ ...applicationForm, resume: e.target.value })}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {showSection === 'deleteJobById' && (
        <div>
          <h2>Delete Job by ID</h2>
          <form onSubmit={handleDeleteJobById}>
            <input
              type="number"
              placeholder="Enter Job ID"
              value={deleteJobId}
              onChange={(e) => setDeleteJobId(e.target.value)}
            />
            <button type="submit">Delete Job</button>
          </form>
        </div>
      )}

      {showSection === 'deleteApplicationById' && (
        <div>
          <h2>Delete Application by ID</h2>
          <form onSubmit={handleDeleteApplicationById}>
            <input
              type="number"
              placeholder="Enter Application ID"
              value={deleteApplicationId}
              onChange={(e) => setDeleteApplicationId(e.target.value)}
            />
            <button type="submit">Delete Application</button>
          </form>
        </div>
      )}
    </div>
  );
}
