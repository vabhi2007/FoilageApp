"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SignOut = () => {
  const router = useRouter();

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">Sign Out</h2>
      <p>Are you sure you want to sign out?</p>
      <button 
        onClick={handleSignOut} 
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;
