'use client'

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

export default function ProfilePage() {
  // Fetch user data
  const { data: medata, loading, error, refetch } = useQuery(GET_ME);
  const [updateUserInfo] = useMutation(UPDATE_USER_INFO);

  // Unified state for all editable fields
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
    firstName: "",
    lastName: "",
    school: "",
    grade: ""
  });

  // **Fix:** Ensure `userInfo` is properly set after refetch
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
        grade: medata.me.grade || ""
      }));
    }
  }, [medata]); // ✅ Now updates when `medata` changes

  // Function to update state dynamically
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  // Handle Save Button
  const handleSave = async () => {
    try {
      await updateUserInfo({ variables: userInfo });
      await refetch(); // ✅ Ensure UI updates with latest values
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

      <div className="bg-secondary flex flex-col gap-[2vw] py-[3vw]" style={{ fontFamily: 'Montserrat' }}>
        {/* Top Section */}
        <div className="w-full px-[8vw] flex flex-col justify-center">
          <div className="w-full bg-primary rounded-t-lg h-[3vw]"></div>
          <div className="w-full bg-white rounded-b-lg shadow-lg p-[2vw] text-black">
            <div className="flex justify-between h-[8vw] items-center">
              <div className="flex flex-col">
                <Image src={ProfileIcon} alt="Profile Icon" className="w-[5vw] h-[5vw] rounded-full mb-[1vw]" />
                <div className="text-[1.2vw] font-bold">{userInfo.username || "User"}</div>
                <div className="text-[1vw] text-gray-500">{medata?.me?.userType || "Role"}</div>
              </div>
              <div className="flex space-x-[1vw] text-white">
                <Button text="Sign Out" className="w-[7vw] h-[2.5vw] text-[0.9vw]" />
                <Button text="Delete" primary={false} className="w-[7vw] h-[2.5vw] text-[0.9vw]" />
                <Button text="Save" primary={true} className="w-[7vw] h-[2.5vw] text-[0.9vw]" onClick={handleSave} />
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
              <div className="text-[1vw] text-gray-700">First Name</div>
              <input name="firstName" value={userInfo.firstName} onChange={handleChange} className="w-full p-[0.7vw] border border-gray-300 rounded-md text-[1vw]" />
            </div>

            <div className="mb-[1.2vw]">
              <div className="text-[1vw] text-gray-700">Last Name</div>
              <input name="lastName" value={userInfo.lastName} onChange={handleChange} className="w-full p-[0.7vw] border border-gray-300 rounded-md text-[1vw]" />
            </div>

            <div className="mb-[1.2vw]">
              <div className="text-[1vw] text-gray-700">Email</div>
              <input name="email" value={userInfo.email} onChange={handleChange} className="w-full p-[0.7vw] border border-gray-300 rounded-md text-[1vw]" />
            </div>

            <div className="mb-[1.2vw]">
              <div className="text-[1vw] text-gray-700">Password</div>
              <input name="password" type="password" value={userInfo.password} onChange={handleChange} className="w-full p-[0.7vw] border border-gray-300 rounded-md text-[1vw]" />
            </div>
          </div>

          {/* Bio Section */}
          <div className="w-1/2 bg-white rounded-lg shadow-lg p-[2vw]">
            <div className="text-[1.2vw] font-bold mb-[1vw]">Bio</div>
            <textarea name="bio" value={userInfo.bio} onChange={handleChange} className="w-full p-[0.7vw] border border-gray-300 rounded-md text-[1vw] h-[10vw]" />

            <div className="mb-[1.2vw]">
              <div className="text-[1vw] text-gray-700">School</div>
              <input name="school" value={userInfo.school} onChange={handleChange} className="w-full p-[0.7vw] border border-gray-300 rounded-md text-[1vw]" />
            </div>

            <div className="text-[1vw] mb-[1.2vw] text-gray-700">Grade</div>
            <select name="grade" value={userInfo.grade} onChange={handleChange} className="w-full p-[0.7vw] border border-gray-300 rounded-md text-[1vw]">
              {['9th', '10th', '11th', '12th'].map((grade) => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
