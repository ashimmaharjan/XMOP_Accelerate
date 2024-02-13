import Divider from "@/app/components/Divider";
import { MdWavingHand } from "react-icons/md";
import Link from "next/link";
import { FaXmark } from "react-icons/fa6";

const Login = () => {
  return (
    <main>
      <section className="flex justify-center items-center w-full h-screen">
        <div className="w-auto h-auto relative bg-zinc-50 p-16 rounded-2xl border-2 border-gray-300 shadow-lg">
          <div className="w-32 h-16 absolute right-5 top-[-30px] shadow-md flex justify-center items-center text-white bg-gradient-to-br from-sky-500 to-sky-800 rounded-full">
            <FaXmark className="text-4xl" />
            <span className="font-light ml-[-5px] mt-2">MOPS</span>
          </div>
          <h2 className="font-extrabold tracking-wide text-4xl text-sky-700 flex items-center gap-3">
            Welcome Back!
            <MdWavingHand className="text-[35px] text-sky-700" />
          </h2>
          <span className="text-gray-400 text-sm">
            Please enter your details to sign in.
          </span>

          <form action="" className="mt-5 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="Email" className="text-gray-500 font-semibold">
                Email:
              </label>
              <input
                type="text"
                className="rounded-md shadow-sm h-10 pl-2 border text-gray-600 border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
                placeholder="Enter your email address."
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="Email" className="text-gray-500 font-semibold">
                Password:
              </label>
              <input
                type="password"
                className="rounded-md shadow-sm h-10 text-gray-600 pl-2 border border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
                placeholder="Enter your password."
              />
            </div>

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

          <p className="text-gray-500">
            Don't have an account?
            <Link href="" className="font-bold ml-1">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
