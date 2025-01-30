'use client'

import "../../app/globals.css";
import Navbar from "../../app/components/Navbar";
import Footer from "../../app/components/Footer";
import React, { useState } from "react";
import Image from "next/image";
import ProfileIcon from "../../app/assets/StudentIcon.svg"; // You can replace this with your profile icon path
import Button from "../../app/components/Button";

export default function ProfilePage() {
  // State to track the selected grade
  const [selectedGrade, setSelectedGrade] = useState<string>("");

  // Handle button click to set the selected grade
  const handleGradeClick = (grade: string) => {
    setSelectedGrade(grade);
  };

  return (
    <div>
      <Navbar />

      <div className="bg-secondary flex flex-col gap-[2vw] py-[3vw]" style={{ fontFamily: 'Montserrat' }}>
        {/* Top Section */}
        <div className="w-full px-[8vw] flex flex-col justify-center">
          <div className="w-full bg-primary rounded-t-lg h-[3vw]"></div>
          <div className="w-full bg-white rounded-b-lg shadow-lg p-[2vw] text-black">
            {/* User Info Section */}
            <div className="flex justify-between h-[8vw] items-center">
              <div className="flex flex-col">
                {/* Profile Icon */}
                <Image
                  src={ProfileIcon}
                  alt="Profile Icon"
                  className="w-[5vw] h-[5vw] rounded-full mb-[1vw]"
                />
                {/* User Name and Role */}
                <div className="text-[1.2vw] font-bold">John Doe</div>
                <div className="text-[1vw] text-gray-500">Student</div>
              </div>
              {/* Buttons */}
              <div className="flex space-x-[1vw] text-white">
                <Button text="Sign Out" className="w-[7vw] h-[2.5vw] text-[0.9vw]" />
                <Button text="Delete" primary={false} className="w-[7vw] h-[2.5vw] text-[0.9vw]" />
              </div>
            </div>
          </div>
        </div>

        {/* Second and Third Sections (Side by Side) */}
        <div className="w-full px-[8vw] flex space-x-[2vw] text-black">
          {/* Account Details Section */}
          <div className="w-1/2 bg-white rounded-lg shadow-lg p-[2vw]">
            <div className="text-[1.2vw] font-bold mb-[1vw]">Account Details</div>
            {/* Email */}
            <div className="mb-[1.2vw]">
              <div className="text-[1vw] text-gray-700">Email</div>
              <input placeholder="Ex: johndoe@example.com" type="email" className="w-full p-[0.7vw] mt-[0.5vw] border border-gray-300 rounded-md text-[1vw]" />
            </div>
            {/* Password */}
            <div className="mb-[1.2vw]">
              <div className="text-[1vw] text-gray-700">Password</div>
              <input placeholder="********" type="password" className="w-full p-[0.7vw] mt-[0.5vw] border border-gray-300 rounded-md text-[1vw]" />
            </div>
            {/* School */}
            <div className="mb-[1.2vw]">
              <div className="text-[1vw] text-gray-700">School</div>
              <input placeholder="Ex: Example High School" type="text" className="w-full p-[0.7vw] mt-[0.5vw] border border-gray-300 rounded-md text-[1vw]" />
            </div>
            {/* Grade Selection */}
            <div className="text-[1vw] mb-[1.2vw] text-gray-700">Grade</div>
            <div className="flex gap-[0.5vw]">
              {['9th', '10th', '11th', '12th'].map((grade) => (
                <button
                  key={grade}
                  className={`w-full h-[3vw] text-[0.9vw] rounded-md text-white ${selectedGrade === grade ? 'bg-primary' : 'bg-tertiary'}`}
                  onClick={() => handleGradeClick(grade)}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>

          {/* Bio Section */}
          <div className="w-1/2 bg-white rounded-lg shadow-lg p-[2vw]">
            <div className="text-[1.2vw] font-bold mb-[1vw]">Bio</div>
            <textarea
              className="w-full p-[0.7vw] border border-gray-300 rounded-md text-[1vw] h-[10vw]"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
