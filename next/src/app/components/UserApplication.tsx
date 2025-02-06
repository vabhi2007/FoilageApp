'use client';

import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_ALL_APPLICATIONS,
  CREATE_APPLICATION,
  GET_ME,
} from '@/graphql/queries';

interface ApplicationFormProps {
    onClose: () => void;
    id: string
}

const UserApplication: React.FC<ApplicationFormProps> = ({ onClose, id }) => {

    const { data: medata } = useQuery(GET_ME);

    const { refetch: refetchApplications } =
        useQuery(GET_ALL_APPLICATIONS);

    const [createApplication] = useMutation(CREATE_APPLICATION, {
        onCompleted: () => refetchApplications(),
    });

    // Default values for testing
    const [applicationForm, setApplicationForm] = useState({
        jobId: id, // Use a placeholder jobId for testing
        applicantName: '', // Now editable
        applicantEmail: '', // Now editable
        resume: 'resume.pdf', // Placeholder resume name
    });

    const [resumeFile, setResumeFile] = useState<File | null>(null);

    const handleApplicationFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { jobId, applicantEmail, resume } = applicationForm;

        // Simulate creating an application with the form data
        await createApplication({
            variables: { jobId: parseInt(jobId), applicantName: (medata?.me?.firstName + " " + medata?.me?.lastName), applicantBio: (medata?.me?.bio) , applicantEmail, resume },
        });
        setApplicationForm({ jobId: '', applicantName: '', applicantEmail: '', resume: '' });
        alert('Application successfully added!');

        onClose();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file && file.type === "application/pdf") {
            setResumeFile(file);
            setApplicationForm(prevForm => ({
                ...prevForm,
                resume: file.name // Simulate resume file name for testing
            }));
        } else {
            alert("Please upload a PDF file.");
        }
    };

    // Handle changes to name and email fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setApplicationForm(prevForm => ({
            ...prevForm,
            [name]: value,
        }));
    };

    return (
        <div className="w-[30vw] h-[40vw] bg-white rounded-lg shadow-lg px-[1.7vw] py-[2.05vw] space-y-[1.4vw]" style={{fontFamily:'Montserrat'}}>
            {/* Title */}
            <div className="text-[1vw] text-black">
                User Application
            </div>
            
            {/* Contact Email Field */}
            <div className="space-y-[0.35vw]">
                <div className="text-[0.85vw] text-tertiary">Contact Email</div>
                <input
                    type="email"
                    name="applicantEmail"
                    value={applicationForm.applicantEmail}
                    onChange={handleInputChange} // Handle changes here
                    placeholder="Enter your email"
                    className="w-full h-[2.1vw] p-[0.7vw] border border-gray-300 rounded-lg text-black text-[0.7vw]"
                />
            </div>

            {/* Resume Upload */}
            <div className="space-y-[0.35vw]">
                <div className="text-[0.85vw] text-tertiary">Resume</div>
                <label 
                    htmlFor="file-upload" 
                    className={`border border-gray-300 w-full h-[8.4vw] flex items-center justify-center rounded-lg cursor-pointer`}
                >
                    <div className="text-center text-tertiary">
                        <span className="text-[0.7vw]">📎</span>
                        <div className="text-[0.7vw] mt-[0.7vw]">
                            {resumeFile ? resumeFile.name : "Upload document as .pdf file"}
                        </div>
                    </div>
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>

            {/* Apply Button */}
            <div className="flex justify-center">
                <button className="w-[7vw] h-[2.1vw] bg-primary text-white text-[0.85vw] rounded-lg" onClick={handleApplicationFormSubmit}>
                    Apply
                </button>
            </div>
        </div>
    );
};

export default UserApplication;
