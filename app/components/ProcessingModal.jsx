import { GrInProgress } from "react-icons/gr";
import { BiError } from "react-icons/bi";
import { BsClipboardCheck } from "react-icons/bs";
import Divider from "./Divider";
import drinkAnimation from "../../animations/drinkAnimation.json";
import successAnimation from "../../animations/successAnimation.json";
import errorAnimation from "../../animations/errorAnimation.json";
import Lottie from "lottie-react";
import Link from "next/link";

const ProcessingModal = ({ closeModal, deployedIP, errorMessage }) => {
  return (
    <section>
      <div
        className="w-screen h-screen bg-gray-900 opacity-90 fixed top-0 left-0 flex justify-center items-center"
        onClick={closeModal}
      ></div>

      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="w-[400px] outline-none border-none py-5 bg-sky-50 rounded shadow-xl">
          <div className="flex justify-between items-center font-bold px-5">
            {errorMessage ? (
              <div className="flex items-center gap-2 h-full text-xl text-gray-700">
                <BiError className="text-3xl" />
                <h3>Oops, Sorry! </h3>
              </div>
            ) : deployedIP ? (
              <div className="flex items-center gap-2 h-full text-xl text-gray-700">
                <BsClipboardCheck className="text-2xl" />
                <h3>Deployment Successful</h3>
              </div>
            ) : (
              <div className="flex items-center gap-2 h-full text-xl text-gray-700">
                <GrInProgress className="text-2xl" />
                <h3>Deployment in progress</h3>
              </div>
            )}
          </div>

          <Divider />

          {errorMessage ? (
            <div className="px-5 pb-5">
              <Lottie
                animationData={errorAnimation}
                autoPlay
                loop
                className="w-48 h-48 mx-auto"
              ></Lottie>

              <p className="text-gray-500 text-center">
                Sorry! We have encountered an error.
              </p>
              <p className="text-red-500 font-semibold mt-2 text-center">
                {errorMessage}
              </p>
              <button
                onClick={closeModal}
                className="py-3 w-full mt-5 text-center shadow bg-green-600 text-sky-50 rounded-3xl hover:bg-green-700 hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                Try Again
              </button>
            </div>
          ) : deployedIP ? (
            <div className="px-5 pb-5">
              <Lottie
                animationData={successAnimation}
                autoPlay
                loop
                className="w-48 h-48 mx-auto"
              ></Lottie>

              <p className="text-gray-500 text-center">
                Congratulations! Your Lightsail instance has been deployed
                successfully.
              </p>
              <p className="text-gray-700 mt-5 text-center">
                Deployed at: &nbsp;
                <Link
                  href={deployedIP}
                  target="_blank"
                  className="text-blue-500 underline"
                >
                  {deployedIP}
                </Link>
              </p>
              <button
                onClick={closeModal}
                className="py-3 w-full mt-5 text-center shadow bg-red-600 text-sky-50 rounded-3xl hover:bg-red-700 hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="px-5 pb-5">
              <Lottie
                animationData={drinkAnimation}
                autoPlay
                loop
                className="w-56 h-56 mx-auto -mt-5"
              ></Lottie>

              <p className="text-gray-500 text-center -mt-3">
                Relax and grab yourself a drink while your application is
                deploying.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProcessingModal;
