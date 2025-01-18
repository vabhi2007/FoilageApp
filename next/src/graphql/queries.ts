import { gql } from "@apollo/client";

export const GET_ALL_JOBS = gql`
  query GetAllJobs {
    allJobPosts {
      id
      title
      description
      company
      location
      salary
    }
  }
`;

export const GET_ALL_APPLICATIONS = gql`
  query GetAllApplications {
    allApplications {
      id
      applicantName
      applicantEmail
      resume
      jobPost {
        id
        title
      }
    }
  }
`;

export const CREATE_JOB_POST = gql`
  mutation CreateJobPost($title: String!, $description: String!, $company: String!, $location: String!, $salary: Float) {
    createJobPost(title: $title, description: $description, company: $company, location: $location, salary: $salary) {
      jobPost {
        id
        title
      }
    }
  }
`;

export const CREATE_APPLICATION = gql`
  mutation CreateApplication($jobId: Int!, $applicantName: String!, $applicantEmail: String!, $resume: String) {
    createApplication(jobId: $jobId, applicantName: $applicantName, applicantEmail: $applicantEmail, resume: $resume) {
      application {
        id
        applicantName
      }
    }
  }
`;


export const DELETE_JOB_POST = gql`
  mutation DeleteJobPost($jobId: Int!) {
    deleteJobPost(jobId: $jobId) {
      success
    }
  }
`;


export const DELETE_APPLICATION = gql`
  mutation DeleteApplication($applicationId: Int!) {
    deleteApplication(applicationId: $applicationId) {
      success
    }
  }
`;