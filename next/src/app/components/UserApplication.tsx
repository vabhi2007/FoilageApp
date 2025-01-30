import React, { useState } from 'react';

const UserApplication: React.FC = () => {

    const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  return (
    <div className="w-[28vw] h-[31.5vw] bg-white rounded-lg shadow-lg px-[1.7vw] py-[2.05vw] space-y-[1.4vw]" style={{fontFamily:'Montserrat'}}>
      {/* Title */}
      <div className="text-[1vw] text-black">
        User Application
      </div>

      {/* Name Field */}
      <div className="space-y-[0.35vw]">
        <div className="text-[0.85vw] text-tertiary">Name</div>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full h-[2.1vw] p-[0.7vw] border border-gray-300 rounded-lg text-black text-[0.7vw]"
        />
      </div>

      {/* Contact Email Field */}
      <div className="space-y-[0.35vw]">
        <div className="text-[0.85vw] text-tertiary">Contact Email</div>
        <input
          type="email"
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
        <button className="w-[7vw] h-[2.1vw] bg-primary text-white text-[0.85vw] rounded-lg">
          Apply
        </button>
      </div>
    </div>
  );
};

export default UserApplication;
