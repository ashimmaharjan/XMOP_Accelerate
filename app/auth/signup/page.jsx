"use client";

import Divider from "@/app/components/Divider";
import { FaFlag } from "react-icons/fa";
import Link from "next/link";
import InputFields from "@/app/components/InputFields";
import XmopsLogo from "@/app/components/XmopsLogo";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  // Function to handle signup
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User signed up successfully");
        router.push(`/auth/verifyAccount/?email=${email}`);
        // Redirect the user to login page or dashboard upon successful signup
      } else {
        setErrorMessage(data.error);
        console.error("Error signing up:", data.error);
        // Handle signup errors (e.g., display error message to the user)
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center w-full h-screen">
      {loading && <Loader />}
      <div className="w-auto h-auto relative bg-zinc-50 p-12 rounded-2xl border-2 border-gray-300 shadow-lg">
        <XmopsLogo />

        <h2 className="font-bold tracking-wide text-4xl text-sky-700 flex items-center gap-3">
          Create an account
          <FaFlag className="text-[35px] text-sky-700" />
        </h2>
        <span className="text-gray-400 text-sm">Please fill out the form.</span>

        {errorMessage && (
          <span className="text-red-600 text-sm font-semibold">
            {errorMessage}
          </span>
        )}

        <form onSubmit={handleSignUp} className="mt-5 flex flex-col gap-3">
          <InputFields
            label="Full Name:*"
            placeholder="Enter you full name."
            inputType="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <InputFields
            label="Email:*"
            placeholder="Enter you email."
            inputType="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputFields
            label="Password:*"
            placeholder="Enter a password."
            inputType="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputFields
            label="Confirm Password:*"
            placeholder="Re-enter your password."
            inputType="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-sky-600 p-3 text-white mt-3 rounded-3xl shadow-md font-semibold hover:bg-sky-800 hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            Create Account
          </button>
        </form>

        <Divider />

        <div className="flex">
          <span className="text-gray-500">Already have an account?</span>
          <Link href="/auth/login" className="font-bold ml-1 text-sky-500">
            <p className="hover:transform hover:-translate-y-1 hover:underline transition-all duration-300 ease-in-out">
              Login.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
