"use client"; 

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/graphql/queries";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      if (data.tokenAuth.token) {
        localStorage.setItem("token", data.tokenAuth.token);
        router.push("/dashboard");
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ variables: { username, password } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">Login</h2>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>Login</button>
      </form>
    </div>
  );
};

export default Login;
