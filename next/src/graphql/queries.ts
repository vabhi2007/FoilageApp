import { gql } from "@apollo/client";

// 🔹 Fetch all job posts
export const GET_ALL_JOBS = gql`
  query GetAllJobs {
      allJobs {
        id
      title
      employer{
        username
      }
      description
      location
      site
      salary
      experience
      grade
      employment
      postedAt
      isActive
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
      }
    }
  }
`;

// 🔹 Create a new job post (Employer Only)
export const CREATE_JOB_POST = gql`
  mutation CreateJobPost(
    $title: String!
    $description: String!
    $location: String!
    $site: String!
    $salary: Float!
    $experience: String!
    $grade: String!
    $employment: String!
  ) {
    createJobPost(
      title: $title
      description: $description
      location: $location
      site: $site
      salary: $salary
      experience: $experience
      grade: $grade
      employment: $employment
    ) {
      jobPost {
        id
        title
        description
        location
        site
        salary
        experience
        grade
        employment
        postedAt
        isActive
      }
    }
  }
`;

// 🔹 Apply for a job (Job Seeker Only)
export const CREATE_APPLICATION = gql`
  mutation CreateApplication(
    $jobId: Int!,
    $applicantName: String!,
    $applicantEmail: String!,
    $resume: String
  ) {
    createApplication(
      jobId: $jobId,  # ✅ Match the schema
      applicantName: $applicantName,
      applicantEmail: $applicantEmail,
      resume: $resume
    ) {
      application {
        id
        jobPost {
          title
        }
        applicantName
        applicantEmail
        resume
      }
    }
  }
`;

// 🔹 Delete a job post (Employer Only)
export const DELETE_JOB_POST = gql`
  mutation DeleteJobPost($jobPostId: Int!) {
    deleteJobPost(jobPostId: $jobPostId) {
      success
    }
  }
`;

// 🔹 Delete an application (Job Seeker Only)
export const DELETE_APPLICATION = gql`
  mutation DeleteApplication($applicationId: Int!) {
    deleteApplication(applicationId: $applicationId) {
      success
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

export const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!, $userType: String!) {
    registerUser(username: $username, email: $email, password: $password, userType: $userType) {
      user {
        id
        username
        email
        userType
      }
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
      connectedJobs {
        id
        title
        description
        location
        site
        salary
        experience
        grade
        employment
        postedAt
        isActive
      }
        bio
    }
  }
`;


export const ADD_CONNECTED_JOB = gql`
  mutation AddConnectedJob($jobId: Int!) {
    addConnectedJob(jobId: $jobId) {
      success
    }
  }
`;

export const REMOVE_CONNECTED_JOB = gql`
  mutation RemoveConnectedJob($jobId: Int!) {
    removeConnectedJob(jobId: $jobId) {
      success
    }
  }
`;

export const UPDATE_BIO = gql`
  mutation UpdateBio($bio: String!) {
    updateBio(bio: $bio) {
      user {
        id
        bio
      }
    }
  }
`;