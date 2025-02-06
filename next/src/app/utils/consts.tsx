export const employerRef = "EMPLOYER";
export const adminRef = "ADMIN";
export const jobSeekerRef = "JOB_SEEKER";

// Define the type of a Job object
export type Job = {
    id: string;
    title: string;
    location: string;
    experience: string;
    grade: string;
    employment: string;
    site: string;
    isActive: boolean;
    description: string;
    companyOverview: string;
    salary: number;
    employer: {
      id: string;
      username: string;
      bio: string;
    };
  };


export type Applicant = {
    id: string;
    applicantName: string;
    applicantEmail: string;
    resume: string;
    bio: string;
    jobPost: {
      id: string;
      title: string;
    };
    me: {
      id: string;
      username: string;
      email: string;
      userType: string;
      bio: string;
      firstName: string;
      lastName: string;
      school: string;
      grade: string;
      connectedJobs: Job[];
    }
  };