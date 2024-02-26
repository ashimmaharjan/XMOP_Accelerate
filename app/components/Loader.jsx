"use client";

import Lottie from "lottie-react";
import loadingAnimation from "../../animations/loadingAnimation.json";

const Loader = () => {
  return (
    <section>
      <div className="flex absolute top-0 left-0 w-screen h-screen bg-gray-700 justify-center items-center text-white z-30">
        <Lottie
          animationData={loadingAnimation}
          autoPlay
          loop
          className="w-36 h-36 object-scale-down mt-4"
        ></Lottie>
      </div>
    </section>
  );
};

export default Loader;
