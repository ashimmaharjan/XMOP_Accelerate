"use client";

import Divider from "@/app/components/Divider";
import Link from "next/link";
import InputFields from "@/app/components/InputFields";
import XmopsLogo from "@/app/components/XmopsLogo";
import Lottie from "lottie-react";
import handWaveAnimation from "../../../animations/handWave.json";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Loader from "@/app/components/Loader";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User logged in successfully");
        router.push("/dashboard");
        // Redirect the user to the dashboard or home page upon successful login
      } else {
        setErrorMessage(data.error);
        console.error("Error logging in:", data.error);
        // Handle login errors (e.g., display error message to the user)
      }
    } catch (error) {
      // Log and handle the error
      setErrorMessage(error);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="flex justify-center items-center w-full h-screen">
        {loading && <Loader />}
        <div className="w-auto h-auto relative bg-zinc-50 p-12 rounded-2xl border-2 border-gray-300 shadow-lg">
          <XmopsLogo />

          <h2 className="font-bold text-4xl text-sky-700 flex items-center gap-1">
            Welcome Back
            <Lottie
              animationData={handWaveAnimation}
              autoPlay
              loop
              className="w-16 h-16 object-scale-down -mt-4"
            ></Lottie>
          </h2>

          {!errorMessage && (
            <span className="text-gray-400 text-sm">
              Please enter your details to sign in.
            </span>
          )}

          {errorMessage && (
            <span className="text-red-600 text-sm font-semibold">
              {errorMessage}
            </span>
          )}

          <form onSubmit={handleLogin} className="mt-5 flex flex-col gap-3">
            <InputFields
              label="Email:*"
              placeholder="Enter your email."
              inputType="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputFields
              label="Password:*"
              placeholder="Enter your password."
              inputType="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Link
              href=""
              className="text-sky-500 text-sm underline font-semibold text-right"
            >
              Forgot Password?
            </Link>

            <button
              type="submit"
              className="bg-sky-600 p-3 text-white mt-3 rounded-3xl shadow-md font-semibold hover:bg-sky-800 hover:shadow-xl transition-all duration-300 ease-in-out"
            >
              Login
            </button>
          </form>

          <Divider />

          <div className="flex">
            <span className="text-gray-500">Don&apos;t have an account?</span>
            <Link href="/auth/signup" className="font-bold ml-1 text-sky-500">
              <p className="hover:transform hover:-translate-y-1 hover:underline transition-all duration-300 ease-in-out">
                Create now.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
