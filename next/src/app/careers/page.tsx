'use client'

import "../../app/globals.css";
import Navbar from "../../app/components/Navbar";
import CareersImage from "../../app/assets/CareersImage.svg";
import Image from "next/image";
import InfoTab from "../../app/components/InfoTab";
import Button from "../../app/components/Button";
import Dropdown from "../../app/components/Dropdown";
import BagHandleIcon from "../../app/assets/ionicons/bag-handle.svg";
import PeopleCircleIcon from "../../app/assets/ionicons/people-circle.svg";
import BarChartIcon from "../../app/assets/ionicons/bar-chart.svg";
import Footer from "../../app/components/Footer";
import JobList from '../../app/components/JobList';
import React, { useState } from 'react';

export default function Careers() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<any | null>(null); // New state to hold the selected job

  const closeAllDropdowns = () => {
    setOpenDropdown(null); // Close all dropdowns
  };

  const handleJobClick = (job: any) => {
    setSelectedJob(job); // Update state when a job is clicked
  };

  return (
    <div>
      <Navbar></Navbar>

      <div className="">
        <div className="relative">
          <Image
            src={CareersImage}
            alt="Background"
            className="w-full h-[15vw] object-cover bg-black brightness-[0.5] overflow-hidden"
          />

          <div className="absolute inset-0 flex items-center justify-center text-white" style={{fontFamily: 'Montserrat'}}>
            <div className="text-center space-y-[1vw]">
              <h1 className="text-[2.5vw]"> [Searchbar] </h1>
            </div>
          </div>
        </div>

        <div className="w-full h-full">
            {/*Main Content*/}
            <div className="bg-secondary py-[4vw] rounded-lg flex justify-center">
                <div className="flex space-x-[2vw] mx-[8vw]">
                    {/* Box 1 */}
                    <div className="bg-white rounded-lg drop-shadow-[0_0.4vw_0.1vw_rgba(0,0,0,0.2)] w-[35vw] h-[40vw]" style={{fontFamily: 'Montserrat'}}>
                        <div className="px-[1.5vw] py-[1.5vw] text-black w-full flex flex-row justify-between">
                            <div className="text-[1vw]">Filter</div>
                            <div className="text-[0.75vw]">(Showing 4 results)</div>
                        </div>
                        <div className="flex flex-row text-white px-[1.5vw] pb-[1.5vw] space-x-[1vw]">
                            <Dropdown
                              buttonText="Experience"
                              options={["No experience", "Entry-level", "1-2 years", "3+ years"]}
                              closeAllDropdowns={closeAllDropdowns}
                            />
                            <Dropdown
                              buttonText="Grade level"
                              options={["9th", "10th", "11th", "12th"]}
                              closeAllDropdowns={closeAllDropdowns}
                            />
                            <Dropdown
                              buttonText="Employment"
                              options={["Volunteer", "Internship", "Part-time", "Full-time"]}
                              closeAllDropdowns={closeAllDropdowns}
                            />
                            <Dropdown
                              buttonText="Work site"
                              options={["Remote", "Hybrid", "On-site"]}
                              closeAllDropdowns={closeAllDropdowns}
                            />
                        </div>
                        <div className="flex flex-col h-full pb-[10vw]">
                            <JobList onJobClick={handleJobClick} selectedJob={selectedJob} /> {/* Pass selectedJob */}
                        </div>
                    </div>

                    {/* Box 2 */}
                    <div className="bg-white p-[3vw] rounded-lg drop-shadow-[0_0.4vw_0.1vw_rgba(0,0,0,0.2)] w-[35vw] flex flex-col items-center justify-center">
                        
              

                        {/* Render selected job details */}
                        {selectedJob ? (
                          <div className="space-y-[1vw] text-black">
                            <h3 className="text-[2vw] font-semibold">{selectedJob.title}</h3>
                            <p className="text-[1.5vw]">{selectedJob.company}</p>
                            <p className="text-[1.2vw]">{selectedJob.description}</p>
                            <p className="text-[1vw]">{selectedJob.location}</p>
                            <p className="text-[1vw]">${selectedJob.salary}</p>
                          </div>
                        ) : (
                            <div>
                                <div className="w-[10vw] h-[0.2vw] bg-tertiary mb-[0.5vw]"></div>
                                <div className="w-[10vw] h-[0.2vw] bg-tertiary mb-[0.5vw]"></div>
                                <div className="w-[10vw] h-[0.2vw] bg-tertiary mb-[1vw]"></div>
                                <div className="text-[1.5vw] font-medium text-tertiary" style={{fontFamily: 'Montserrat'}}>Jobs await!</div>
                                {/* "Jobs await!" text */}    
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/*End Main Content*/}
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
