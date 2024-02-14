"use client";

import Divider from "@/app/components/Divider";
import { MdWavingHand } from "react-icons/md";
import Link from "next/link";
import InputFields from "@/app/components/InputFields";
import XmopsLogo from "@/app/components/XmopsLogo";
import Lottie from "lottie-react";
import handWaveAnimation from "../../../animations/handWave.json";

const Login = () => {
  return (
    <main>
      <section className="flex justify-center items-center w-full h-screen">
        <div className="w-auto h-auto relative bg-zinc-50 p-12 rounded-2xl border-2 border-gray-300 shadow-lg">
          <XmopsLogo />

          <h2 className="font-extrabold text-4xl text-sky-700 flex items-center gap-1">
            Welcome Back
            <Lottie
              animationData={handWaveAnimation}
              autoPlay
              loop
              className="w-16 h-16 object-scale-down -mt-4"
            ></Lottie>
          </h2>
          <span className="text-gray-400 text-sm">
            Please enter your details to sign in.
          </span>

          <form action="" className="mt-5 flex flex-col gap-3">
            <InputFields
              label="Email:*"
              placeholder="Enter your email."
              inputType="text"
            />

            <InputFields
              label="Password:*"
              placeholder="Enter your password."
              inputType="password"
            />

            <Link
              href=""
              className="text-sky-500 text-sm underline font-semibold text-right"
            >
              Forgot Password?
            </Link>

            <button className="bg-sky-600 p-3 text-white mt-3 rounded-3xl shadow-md font-semibold hover:bg-sky-800 hover:shadow-xl transition-all duration-300 ease-in-out">
              Login
            </button>
          </form>

          <Divider />

          <p className="text-gray-500 flex">
            Don&apos;t have an account?
            <Link href="/auth/signup" className="font-bold ml-1 text-sky-500">
              <p className="flex hover:transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
                Create now.
              </p>
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
