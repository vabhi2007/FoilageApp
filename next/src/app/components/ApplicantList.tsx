// src/app/components/JobApplicants.tsx
'use client';

import React, {useState} from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_APPLICATIONS } from '@/graphql/queries';
import ApplicantBlock from './ApplicantBlock';
import ExtendedApplicantBlock from './ExtendedApplicantBlock';
import { Applicant } from "../utils/consts";

interface JobApplicantsProps {
  jobId: string;
}

const JobApplicants: React.FC<JobApplicantsProps> = ({ jobId }) => {
  // Query to fetch all applications
  const { data, loading, error } = useQuery(GET_ALL_APPLICATIONS);

  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  if (loading) return <p>Loading applicants...</p>;
  if (error) return <p>Error fetching applicants: {error.message}</p>;

  // Filter applications for the specific job
  const applicants = data.allApplications.filter((application: Applicant) => application.jobPost && application.jobPost.id === jobId);

  const handleApplicantClick = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    console.log(applicant.id);
  };

  const handleClose = () => {
    setSelectedApplicant(null);
  };


  return (
    <div className="w-[30vw] h-[40vw] text-black bg-white rounded-lg shadow-lg space-y-[2vw]" style={{ fontFamily: 'Montserrat' }}>
      {selectedApplicant ? (
        <ExtendedApplicantBlock selectedApplicant={selectedApplicant} onClose={handleClose} />
      ) : (
        <div className="py-[2.05vw] space-y-[1.4vw]">
          <div className="px-[1.7vw] text-[1vw] text-black">
            Applicants
          </div>
            <div>
                <div className="flex flex-col h-[33vw] pb-[0vw] border border-gray-300">
                    <div className="w-full flex-grow overflow-y-auto">
                        {applicants.map((applicant: Applicant) => (
                        <ApplicantBlock
                            key={applicant.id}
                            applicant={applicant}
                            isSelected={false}
                            onClick={() => handleApplicantClick(applicant)}
                        />
                        ))}
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default JobApplicants;