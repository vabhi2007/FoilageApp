'use client';

import "../../app/globals.css";
import Navbar from "../../app/components/Navbar";
import Footer from "../../app/components/Footer";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProfileIcon from "../../app/assets/StudentIcon.svg";
import Button from "../../app/components/Button";
import { GET_ME } from "@/graphql/queries";
import { UPDATE_USER_INFO } from "@/graphql/queries";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation"; // Import useRouter
import { employerRef, jobSeekerRef } from "../utils/consts";

export default function ProfilePage() {
  const router = useRouter(); // Initialize router

  // Fetch user data
  const { data: medata, loading, error, refetch } = useQuery(GET_ME);
  const [updateUserInfo] = useMutation(UPDATE_USER_INFO);
  const [usertype, setUserType] = useState("");

  // Redirect to login if not signed in
  useEffect(() => {
    if (!loading && !medata?.me) {
      router.push("/login"); // Redirect to login page
    }
  }, [loading, medata, router]);

  // Unified state for all editable fields
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
    firstName: "",
    lastName: "",
    school: "",
    grade: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // 🚀 Redirect to login if not signed in
      router.push("/login");
    }
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("token"); // ✅ Remove token
    router.push("/login"); // 🚀 Redirect to login
  };


  // Ensure `userInfo` is properly set after refetch
  useEffect(() => {
    if (medata?.me) {
      setUserInfo((prev) => ({
        ...prev,
        username: medata.me.username || "",
        email: medata.me.email || "",
        password: "", // Don't store passwords in state
        bio: medata.me.bio || "",
        firstName: medata.me.firstName || "",
        lastName: medata.me.lastName || "",
        school: medata.me.school || "",
        grade: medata.me.grade || "",
      }));
    }
  }, [medata]);

  useEffect(() => {
    if (medata?.me?.userType === "JOB_SEEKER") {
      setUserType("Student");
    } else if (medata?.me?.userType === "EMPLOYER") {
      setUserType("Employer");
    } else if (medata?.me?.userType === "ADMIN") {
      setUserType("Admin");
    }
  }, [medata]);

  // Function to update state dynamically for input fields
  const handleChange = (e: { target: { name: string; value: string } }) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  // New handler for grade button clicks
  const handleGradeClick = (grade: string) => {
    setUserInfo((prev) => ({ ...prev, grade }));
  };

  // Handle Save Button
  const handleSave = async () => {
    try {
      await updateUserInfo({ variables: userInfo });
      await refetch(); // Ensure UI updates with latest values
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error fetching profile: {error.message}</p>;

  return (
    <div>
      <Navbar />
      <div className="bg-secondary flex flex-col gap-[2vw] py-[3vw]" style={{ fontFamily: "Montserrat" }}>
        {/* Top Section */}
        <div className="w-full px-[8vw] flex flex-col justify-center">
          <div className="w-full bg-primary rounded-t-lg h-[3vw]"></div>
          <div className="w-full bg-white rounded-b-lg shadow-lg p-[2vw] text-black">
            <div className="flex justify-between h-[8vw] items-center">
              <div className="flex flex-col">
                <Image src={ProfileIcon} alt="Profile Icon" className="w-[5vw] h-[5vw] rounded-full mb-[1vw]" />
                <div className="text-[1.2vw] font-bold">
                  {(medata?.me?.firstName + " " + medata?.me?.lastName) || "User"}
                </div>
                <div className="text-[1vw] text-gray-500">{usertype || "Role"}</div>
              </div>
              <div className="flex space-x-[1vw] text-white">
                <Button text="Save" primary={true} className="w-[7vw] h-[2.5vw] text-[0.9vw]" onClick={handleSave} />
                <Button text="Sign Out" className="w-[7vw] h-[2.5vw] text-[0.9vw]" primary={false} onClick={handleSignOut} />
              </div>
            </div>
          </div>
        </div>

        {/* Second and Third Sections (Side by Side) */}
        <div className="w-full px-[8vw] flex space-x-[2vw] text-black">
          {/* Account Details Section */}
          <div className="w-1/2 bg-white rounded-lg shadow-lg p-[2vw]">
            <div className="text-[1.2vw] font-bold mb-[1vw]">Account Details</div>

            <div className="mb-[1.2vw]">
              <div className="text-[1vw] text-gray-700">{medata?.me?.userType == employerRef ? "Company Name" : "First Name"}</div>
              <input
                name="firstName"
                value={userInfo.firstName}
                onChange={handleChange}
                className="w-full p-[0.7vw] border border-gray-300 rounded-md text-[1vw]"
              />
            </div>
            {!(medata?.me?.userType == employerRef) && (
              <div className="mb-[1.2vw]">
                <div className="text-[1vw] text-gray-700">Last Name</div>
                <input
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={handleChange}
                  className="w-full p-[0.7vw] border border-gray-300 rounded-md text-[1vw]"
                />
              </div>
            )}

            <div className="mb-[1.2vw]">
              <div className="text-[1vw] text-gray-700">Email</div>
              <input
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                className="w-full p-[0.7vw] border border-gray-300 rounded-md text-[1vw]"
              />
            </div>
          </div>

          {/* Bio Section */}
          <div className="w-1/2 bg-white rounded-lg shadow-lg p-[2vw]">
            <div className="text-[1.2vw] font-bold mb-[1vw]">Bio</div>
            <textarea
              name="bio"
              value={userInfo.bio}
              onChange={handleChange}
              className="w-full p-[0.7vw] border border-gray-300 rounded-md text-[1vw] h-[10vw]"
            />

            {!(medata?.me?.userType == employerRef) && (
              <div>
                <div className="mb-[1.2vw]">
                  <div className="text-[1vw] text-gray-700">School</div>
                  <input
                    name="school"
                    value={userInfo.school}
                    onChange={handleChange}
                    className="w-full p-[0.7vw] border border-gray-300 rounded-md text-[1vw]"
                  />
                </div>
              </div>
            )}


            {(medata?.me?.userType == jobSeekerRef) && (
              <div>
                {/* Grade Selection using button group (first style) */}
            <div className="text-[1vw] mb-[1.2vw] text-gray-700">Grade</div>
            <div className="flex gap-[0.5vw]">
              {['9th', '10th', '11th', '12th'].map((grade) => (
                <button
                  key={grade}
                  type="button"
                  className={`w-full h-[3vw] text-[0.9vw] rounded-md text-white ${userInfo.grade === grade ? 'bg-primary' : 'bg-tertiary'}`}
                  onClick={() => handleGradeClick(grade)}
                >
                  {grade}
                </button>
              ))}
            </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}


