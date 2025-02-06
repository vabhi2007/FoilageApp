"use client"; 

import { useQuery } from "@apollo/client";
import { GET_ME } from "@/graphql/queries";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();
  const { data, loading, error, refetch } = useQuery(GET_ME);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin"); // Redirect if not logged in
    } else {
      refetch(); // 🔹 Fetch user data again after login
    }
  }, [router, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Welcome, {data?.me?.username || "User"}!</h1>
      <p className="text-lg">User Type: {data?.me?.userType || "Unknown"}</p>
    </div>
  );
};

export default Dashboard;
