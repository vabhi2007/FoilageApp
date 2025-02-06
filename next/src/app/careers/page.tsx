'use client'

import "../../app/globals.css";
import Navbar from "../../app/components/Navbar";
import CareersImage from "../../app/assets/CareersBg.jpg";
import Dropdown from "../../app/components/Dropdown";
import Footer from "../../app/components/Footer";
import JobList from '../../app/components/JobList';
import React, { useEffect, useState } from 'react';
import SearchBar from "../../app/components/SearchBar";
import ExtendedJobBlock from "../components/ExtendedJobBlock";
import { useQuery } from '@apollo/client';
import { GET_ME } from '@/graphql/queries';
import { useRouter } from "next/navigation";
import { Job } from "../utils/consts";

export default function Careers() {
  const [isClient, setIsClient] = useState(false);
  const [keyword, setKeyword] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  // Ensure useSearchParams only runs on the client-side
  useEffect(() => {
    setIsClient(true);
    const searchParams = new URLSearchParams(window.location.search);
    setKeyword(searchParams.get('keyword') || '');
    setLocation(searchParams.get('location') || '');
  }, []);

  const [, setOpenDropdown] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Store selected dropdown values
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedWorkSite, setSelectedWorkSite] = useState<string | null>(null);

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  const closeJobBlock = () => {
    setSelectedJob(null);
  };

  const router = useRouter();

  const resetFilters = () => {
    router.replace('/careers');
    setSelectedExperience(null);
    setSelectedGradeLevel(null);
    setSelectedType(null);
    setSelectedWorkSite(null);
  }

  const { data: userdata } = useQuery(GET_ME);
  const [userType, setUserType] = useState<string>('');

  useEffect(() => {
    if (userdata?.me?.userType) {
      setUserType(userdata.me.userType);
    } else {
      setUserType(""); // Provide a fallback value
    }
  }, [userdata]);

  return (
    <div>
      <Navbar></Navbar>

      <div className="relative">
        <img
          src={CareersImage.src}
          alt="Background"
          className="w-full h-[15vw] object-cover bg-black brightness-[0.5] overflow-hidden"
        />

        <div className="absolute inset-0 flex items-center justify-center text-white" style={{ fontFamily: 'Montserrat' }}>
          <div className="text-center space-y-[1vw]">
            {isClient && <SearchBar autoFillKeyword={keyword} autoFillLocation={location} />}
          </div>
        </div>
      </div>

      <div className="w-full h-full">
        <div className="bg-secondary py-[4vw] rounded-lg flex justify-center">
          <div className="flex space-x-[2vw] mx-[8vw]">
            {/* Filter Box */}
            <div className="bg-white rounded-lg drop-shadow-[0_0.4vw_0.1vw_rgba(0,0,0,0.2)] w-[35vw] h-[40vw]" style={{ fontFamily: 'Montserrat' }}>
              <div className="px-[1.5vw] py-[1.5vw] text-black w-full flex flex-row justify-between">
                <div className="text-[1vw]">Filter</div>
                <button 
                  className="bg-tertiary text-white py-[0.4vw] px-[0.7vw] rounded-full text-[0.75vw]"
                  onClick={resetFilters}
                >
                  Clear
                </button>
              </div>
              <div className="flex flex-row text-white px-[1.5vw] pb-[1.5vw] space-x-[1vw]">
                <Dropdown
                  buttonText="Experience"
                  options={["None", "Entry-level", "1-2 years", "3+ years"]}
                  closeAllDropdowns={closeAllDropdowns}
                  onSelect={setSelectedExperience} // Capture selected value
                />
                <Dropdown
                  buttonText="Grade level"
                  options={["9th", "10th", "11th", "12th"]}
                  closeAllDropdowns={closeAllDropdowns}
                  onSelect={setSelectedGradeLevel} // Capture selected value
                />
                <Dropdown
                  buttonText="Type"
                  options={["Volunteer", "Internship", "Part-time", "Full-time"]}
                  closeAllDropdowns={closeAllDropdowns}
                  onSelect={setSelectedType} // Capture selected value
                />
                <Dropdown
                  buttonText="Work site"
                  options={["Remote", "Hybrid", "On-site"]}
                  closeAllDropdowns={closeAllDropdowns}
                  onSelect={setSelectedWorkSite} // Capture selected value
                />
              </div>
              <div className="flex flex-col h-full pb-[10vw]">
                <JobList onJobClick={handleJobClick} 
                selectedJob={null} 
                keyword={keyword} 
                location={location} 
                experience={selectedExperience || undefined}
                gradeLevel={selectedGradeLevel || undefined}
                type={selectedType || undefined}
                workSite={selectedWorkSite || undefined}
                />
              </div>
            </div>

            {/* Job Details Box */}
            <div>
              {selectedJob ? (
                <div className="bg-white rounded-lg drop-shadow-[0_0.4vw_0.1vw_rgba(0,0,0,0.2)] w-[30vw] flex flex-col items-center justify-center">
                  <ExtendedJobBlock selectedJob={selectedJob} onClose={closeJobBlock} user={userType} hideApplication={true}/>
                </div>
              ) : (
                <div className="bg-white p-[3vw] rounded-lg drop-shadow-[0_0.4vw_0.1vw_rgba(0,0,0,0.2)] w-[30vw] h-[40vw] flex flex-col items-center justify-center">
                  <div className="w-[10vw] h-[0.2vw] bg-tertiary mb-[0.5vw]"></div>
                  <div className="w-[10vw] h-[0.2vw] bg-tertiary mb-[0.5vw]"></div>
                  <div className="w-[10vw] h-[0.2vw] bg-tertiary mb-[1vw]"></div>
                  <div className="text-[1.5vw] font-medium text-tertiary" style={{ fontFamily: 'Montserrat' }}>Jobs await!</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
