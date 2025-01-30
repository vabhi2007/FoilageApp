'use client'

import "../../app/globals.css";
import Navbar from "../../app/components/Navbar";
import Footer from "../../app/components/Footer";
import React, { useState } from 'react';
import Image from "next/image";
import SignBackground from "../../app/assets/SignBackground.svg";
import Button from "../../app/components/Button";

export default function Portal() {
  const [hasAccount, setHasAccount] = useState(true);
  const [selectedRole, setSelectedRole] = useState<"Student" | "Employer" | null>(null);

  const handleRoleSelection = (role: "Student" | "Employer") => {
    setSelectedRole(role);
  };

  return (
    <div>
      <Navbar />

      <div className="w-full px-[20vw] py-[3vw] bg-secondary flex flex-row justify-center">
        <div className="w-full bg-white px-[3vw] py-[2vw]" style={{ fontFamily: 'Montserrat' }}>
          <div className="font-bold text-primary text-[2vw]">
            Welcome
          </div>
          <div className="text-black text-[1.5vw]">
            Please enter your details below.
          </div>

          <div>
            {/* Email */}
            <div className="my-[1.2vw] text-black">
              <div className="text-[1vw] text-gray-700">Email</div>
              <input placeholder="Ex: johndoe@example.com" type="email" className="w-full p-[0.7vw] mt-[0.5vw] border border-gray-300 rounded-md text-[1vw]" />
            </div>
            {/* Password */}
            <div className="mb-[1.2vw] text-black">
              <div className="text-[1vw] text-gray-700">Password</div>
              <input placeholder="********" type="password" className="w-full p-[0.7vw] mt-[0.5vw] border border-gray-300 rounded-md text-[1vw]" />
            </div>
            <div className="mb-[1.2vw]">
                {hasAccount && (
                    <div>
                        <div className="text-[1vw] text-gray-700">Who are you?</div>
                        <div className="flex flex-row h-[3.25vw] mt-[0.5vw] text-white bg-stone-400 rounded-[5px] p-[5px]">
                            <Button 
                              text="Student" 
                              className={`w-full ${selectedRole === 'Student' ? 'bg-tertiary shadow-lg' : 'bg-stone-400'}`} 
                              onClick={() => handleRoleSelection('Student')} 
                            />
                            <Button 
                              text="Employer" 
                              className={`w-full ${selectedRole === 'Employer' ? 'bg-tertiary shadow-lg' : 'bg-stone-400'}`} 
                              onClick={() => handleRoleSelection('Employer')} 
                            />
                        </div>
                    </div>
                )}
              <Button text={hasAccount ? "Sign In" : "Sign Up"} className="w-full h-[3vw] mt-[1vw]" />
              <div className="text-center text-[1vw] text-gray-600 mt-[0.5vw]">
                {hasAccount ? "Don't have an account? " : "Already have an account? "}
                <span
                  className="text-primary cursor-pointer underline"
                  onClick={() => setHasAccount(!hasAccount)}
                >
                  {hasAccount ? "Create account" : "Sign in"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Image src={SignBackground} alt="SignBackground" className="w-[20vw] object-cover" />
      </div>

      <Footer />
    </div>
  );
}
