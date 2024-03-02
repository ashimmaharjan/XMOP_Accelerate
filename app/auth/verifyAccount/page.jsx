"use client";

import InputFields from "@/app/components/InputFields";
import XmopsLogo from "@/app/components/XmopsLogo";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Lottie from "lottie-react";
import successAnimation from "../../../animations/successAnimation.json";

const VerifyAccount = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [verifiedStatus, setVerifiedState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleConfirmationCode = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/verifyAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, confirmationCode }),
      });
      const data = await response.json();
      if (response.ok) {
        setVerifiedState(true);
      } else {
        // Handle confirmation error, display error message to user
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };
  return (
    <section className="flex justify-center items-center w-full h-screen">
      <div className="w-auto h-auto relative bg-zinc-50 p-12 rounded-2xl border-4 border-gray-300 shadow-lg">
        <XmopsLogo />

        <h2 className="font-bold tracking-wide text-4xl text-sky-700 flex items-center gap-3">
          Verify your email
          <MdEmail className="text-[35px] text-sky-700" />
        </h2>
        {verifiedStatus ? (
          <span className="text-gray-400 text-sm ml-1">
            Email Verified successfully.
          </span>
        ) : (
          <span className="text-gray-400 text-sm">
            Please enter the 6-digit verification code sent to your email.
          </span>
        )}

        {errorMessage && (
          <span className="text-red-500 text-sm font-semibold mt-3">
            {errorMessage}
          </span>
        )}

        {verifiedStatus ? (
          <div className="flex justify-center items-center flex-col gap-3">
            <Lottie
              animationData={successAnimation}
              autoPlay
              loop
              className="w-28 h-28 object-fit my-4"
            ></Lottie>

            <Link
              href="/"
              className="bg-sky-600 p-3 w-full text-center text-white rounded-3xl shadow-md font-semibold hover:bg-sky-800 hover:shadow-xl transition-all duration-300 ease-in-out"
            >
              Login Now
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleConfirmationCode}
            className="mt-5 flex flex-col gap-3"
          >
            <InputFields
              label="Verification Code*"
              placeholder="Enter the verification code."
              inputType="text"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
            />

            <div className="flex items-center justify-between gap-3">
              <Link
                href="/"
                className="border text-center border-gray-200 w-1/2 py-3 text-gray-600 mt-3 rounded-3xl font-semibold hover:shadow transition-all duration-300 ease-in-out"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="bg-sky-600 p-3 w-1/2 text-white mt-3 rounded-3xl shadow-md font-semibold hover:bg-sky-800 hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                Verify
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default VerifyAccount;
