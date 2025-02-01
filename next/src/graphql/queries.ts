import { gql } from "@apollo/client";

// 🔹 Fetch all job posts
export const GET_ALL_JOBS = gql`
  query GetAllJobs {
      allJobs {
        id
      title
      employer{
        username
        bio
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

export const GET_JOB_BY_ID = gql`
  query GetJobById($id: Int!) {
    jobById(id: $id) {
      id
      title
      employer{
        username
        bio
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
      applicantBio
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
    $resume: String,
    $applicantBio: String!
  ) {
    createApplication(
      jobId: $jobId,  # ✅ Match the schema
      applicantName: $applicantName,
      applicantEmail: $applicantEmail,
      applicantBio: $applicantBio,
      resume: $resume
    ) {
      application {
        id
        jobPost {
          title
        }
        applicantName
        applicantEmail
        applicantBio
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
  mutation TokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
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
  query Me {
    me {
      id
      username
      email
      userType
      bio
      firstName
      lastName
      school
      grade
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

export const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfo(
    $username: String,
    $email: String,
    $bio: String,
    $firstName: String,
    $lastName: String,
    $school: String,
    $grade: String
  ) {
    updateUserInfo(
      username: $username,
      email: $email,
      bio: $bio,
      firstName: $firstName,
      lastName: $lastName,
      school: $school,
      grade: $grade
    ) {
      user {
        id
        username
        email
        bio
        firstName
        lastName
        school
        grade
      }
    }
  }
`;


export const UPDATE_JOB_POST = gql`
  mutation UpdateJobPost(
    $jobId: Int!,
    $title: String,
    $description: String,
    $location: String,
    $site: String,
    $salary: Float,
    $experience: String,
    $grade: String,
    $employment: String,
    $isActive: Boolean
  ) {
    updateJobPost(
      jobId: $jobId,
      title: $title,
      description: $description,
      location: $location,
      site: $site,
      salary: $salary,
      experience: $experience,
      grade: $grade,
      employment: $employment,
      isActive: $isActive
    ) {
      jobPost {
        id
        employer {
          id
          username
          bio
        }
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
