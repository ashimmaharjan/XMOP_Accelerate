import Divider from "@/app/components/Divider";
import { FaFlag } from "react-icons/fa";
import Link from "next/link";
import InputFields from "@/app/components/InputFields";
import XmopsLogo from "@/app/components/XmopsLogo";

const SignUp = () => {
  return (
    <section className="flex justify-center items-center w-full h-screen">
      <div className="w-auto h-auto relative bg-zinc-50 p-12 rounded-2xl border-2 border-gray-300 shadow-lg">
        <XmopsLogo />

        <h2 className="font-bold tracking-wide text-4xl text-sky-700 flex items-center gap-3">
          Create an account
          <FaFlag className="text-[35px] text-sky-700" />
        </h2>
        <span className="text-gray-400 text-sm">Let&apos;s get started.</span>

        <form action="" className="mt-5 flex flex-col gap-3">
          <InputFields
            label="Full Name:*"
            placeholder="Enter you full name."
            inputType="text"
          />

          <InputFields
            label="Email:*"
            placeholder="Enter you email."
            inputType="text"
          />

          <InputFields
            label="Password:*"
            placeholder="Enter a password."
            inputType="password"
          />

          <InputFields
            label="Confirm Password:*"
            placeholder="Re-enter your password."
            inputType="password"
          />

          <button className="bg-sky-600 p-3 text-white mt-3 rounded-3xl shadow-md font-semibold hover:bg-sky-800 hover:shadow-xl transition-all duration-300 ease-in-out">
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
