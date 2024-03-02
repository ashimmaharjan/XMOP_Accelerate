"use client";
import { Suspense } from "react";
import Login from "./auth/login/page";
import Loading from "./loading";
import Lottie from "lottie-react";
import deployAnimation from "../animations/deployAnimation.json";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <section className="w-screen h-screen flex justify-center items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 border-gray-300 h-auto w-auto justify-center items-center rounded-[40px] border-4 bg-zinc-50 shadow-lg overflow-hidden">
            <div className="hidden lg:flex flex-col justify-around lg:col-span-1 p-5 text-gray-50 bg-[#242433] w-auto h-full rounded-r-3xl shadow-xl">
              <div className="pl-5">
                <h2 className="font-black text-4xl">XMOPS</h2>
                <h3 className="italic uppercase text-xl">Accelerate</h3>
              </div>

              <Lottie
                animationData={deployAnimation}
                className="w-[270px] h-[270px] mx-auto"
                autoplay
                loop
              ></Lottie>

              <p className="text-center text-gray-200">
                Select &nbsp;&nbsp; | &nbsp;&nbsp; Click &nbsp;&nbsp; |
                &nbsp;&nbsp; Deploy
              </p>
            </div>

            <div className="col-span-1">
              <Login />
            </div>
          </div>
        </section>
      </Suspense>
    </main>
  );
}
