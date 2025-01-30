import { gql } from "@apollo/client";

// 🔹 Fetch all job posts
export const GET_ALL_JOBS = gql`
  query GetAllJobs {
    allJobs {
      id
      title
      description
      company
      location
      salary
      postedAt
    }
  }
`;

// 🔹 Fetch all applications
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
        company
      }
    }
  }
`;

// 🔹 Create a new job post (Employer Only)
export const CREATE_JOB_POST = gql`
  mutation CreateJobPost(
    $title: String!
    $description: String!
    $company: String!
    $location: String!
    $salary: Int!
  ) {
    createJobPost(
      title: $title
      description: $description
      company: $company
      location: $location
      salary: $salary
    ) {
      jobPost {
        id
        title
        company
      }
    }
  }
`;

// 🔹 Apply for a job (Job Seeker Only)
export const CREATE_APPLICATION = gql`
  mutation CreateApplication(
    $jobPostId: Int!
    $applicantName: String!
    $applicantEmail: String!
    $resume: String
  ) {
    createApplication(
      jobPostId: $jobPostId
      applicantName: $applicantName
      applicantEmail: $applicantEmail
      resume: $resume
    ) {
      application {
        id
        applicantName
        jobPost {
          title
          company
        }
      }
    }
  }
`;

// 🔹 Delete a job post (Employer Only)
export const DELETE_JOB_POST = gql`
  mutation DeleteJobPost($jobPostId: Int!) {
    deleteJobPost(jobPostId: $jobPostId) {
      success
      message
    }
  }
`;

// 🔹 Delete an application (Job Seeker Only)
export const DELETE_APPLICATION = gql`
  mutation DeleteApplication($applicationId: Int!) {
    deleteApplication(applicationId: $applicationId) {
      success
      message
    }
  }
`;

// 🔹 Authenticate User (Login)
export const LOGIN_USER = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

// 🔹 Fetch Current Logged-in User
export const GET_ME = gql`
  query GetMe {
    me {
      id
      username
      email
      userType
    }
  }
`;
