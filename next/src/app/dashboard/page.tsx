"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "@/graphql/queries";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data, loading, error } = useQuery(GET_CURRENT_USER);
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  console.log("GraphQL Query Response:", { data, loading, error });

  useEffect(() => {
    if (!loading) {
      if (!data?.userDetails) {
        router.push("/signin");
      } else {
        setIsCheckingAuth(false);
      }
    }
  }, [loading, data, router]);

  if (loading || isCheckingAuth) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {data?.userDetails ? (
        <p>Welcome, <strong>{data.userDetails.username}</strong>!</p>
      ) : (
        <p>Error: User data not available.</p>
      )}
    </div>
  );
}
