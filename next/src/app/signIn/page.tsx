'use client'

import "../../app/globals.css";
import Navbar from "../../app/components/Navbar";
import Footer from "../../app/components/Footer";
import React, { useState } from 'react';
import Image from "next/image";
import SignBackground from "../../app/assets/SignBackground.svg";
import Button from "../../app/components/Button";

export default function Portal() {
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
                        <div className="text-[1vw] text-gray-700">Who are you?</div>
                        <div className="flex flex-row gap-[2vw] h-[3vw] mt-[0.5vw]">
                            <Button text="Student" className="w-full" primary={false}></Button>
                            <Button text="Employer" className="w-full" primary={false}></Button>
                        </div>
                        <Button text="Sign Up" className="w-full h-[3vw] mt-[1vw]"></Button>
                    </div>
                </div>
            </div>
            <Image src={SignBackground} alt="SignBackground" className="w-[20vw] object-cover"></Image>
        </div>

      <Footer />
    </div>
  );
}
