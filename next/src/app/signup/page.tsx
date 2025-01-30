"use client";

import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "@/graphql/queries"; // Ensure you have this mutation
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    userType: "job_seeker", // Default user type
  });

  const [register, { loading, error }] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      if (data.registerUser.user) {
        alert("Signup successful! You can now log in.");
        router.push("/signin"); // Redirect to login page
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({ variables: formData });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">Sign Up</h2>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <select
          value={formData.userType}
          onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
          required
        >
          <option value="job_seeker">Job Seeker</option>
          <option value="employer">Employer</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" disabled={loading}>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
