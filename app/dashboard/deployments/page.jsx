"use client";

import { GrDeploy, GrInProgress } from "react-icons/gr";
import { useState, useEffect } from "react";
import { TbWorldWww } from "react-icons/tb";
import { IoCalendarOutline } from "react-icons/io5";
import { GiDjedPillar } from "react-icons/gi";
import { TbSailboat2 } from "react-icons/tb";
import { Ri24HoursLine } from "react-icons/ri";
import Link from "next/link";
import Lottie from "lottie-react";
import noDataFoundAnimation from "../../../animations/noDataFoundAnimation.json";
import dataLoadingAnimation from "../../../animations/dataLoadingAnimation.json";

const Deployments = () => {
  const [deploymentsData, setDeploymentsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeploymentData();
  }, []);

  // Function to fetch deployment data from the backend API
  const fetchDeploymentData = async () => {
    try {
      const email = sessionStorage.getItem("userEmail");
      const deploymentsResponse = await fetch(
        `http://localhost:3001/api/deployments?userEmail=${email}`
      );
      const userDeploymentData = await deploymentsResponse.json();
      if (userDeploymentData.success) {
        // Transform the createdAt property of each deployment object
        const transformedDeploymentsData = userDeploymentData.data.map(
          (deployment) => ({
            ...deployment,
            createdAt: formatDate(deployment.createdAt),
          })
        );

        setDeploymentsData(transformedDeploymentsData);
        setLoading(false);
      } else {
        console.error(
          "Error fetching user deployment data:",
          userDeploymentData.error
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching deployment data:", error);
      setLoading(false);
    }
  };

  // Function to convert ISO date string to human-readable format
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    // Format the date into desired format (e.g., "April 12, 2024, 11:19 AM")
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <section className="-z-10">
      <div className="flex gap-4 text-gray-700">
        <span className="text-3xl mt-1">
          <GrDeploy />
        </span>
        <h2 className="font-semibold text-3xl md:text-4xl">
          Deployed Applications
        </h2>
      </div>

      <span className="text-zinc-400">
        Let&apos;s take a look at your recent deployments.
      </span>

      {loading ? (
        <div className="flex flex-col gap-10 py-10 px-5 justify-center items-center mt-5 border-2 border-gray-300">
          <p className="text-gray-500 text-center">
            Beep boop beep... Retrieving data from the digital cosmos! 🤖🔍✨
          </p>
          <div>
            <Lottie
              animationData={dataLoadingAnimation}
              autoPlay
              loop
              className="w-60 h-60"
            />
          </div>
        </div>
      ) : deploymentsData.length === 0 ? (
        <div className="flex flex-col gap-10 py-10 px-5 justify-center items-center mt-5 border-2 border-gray-300">
          <p className="text-red-500 text-center">
            Oops! Seems like you have not deployed any application yet.
          </p>
          <div>
            <Lottie
              animationData={noDataFoundAnimation}
              autoPlay
              loop
              className="w-60 h-60"
            />
          </div>
        </div>
      ) : (
        <section>
          {/* For Large Devices */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-5 gap-3 shadow-inner justify-between mt-5 bg-sky-200 px-5 py-3 text-gray-600 font-bold">
              <div className="col-span-1">S.N.</div>
              <div className="col-span-1">Instance Name</div>
              <div className="col-span-1">Architecture Type</div>
              <div className="col-span-1">Deployed At</div>
              <div className="col-span-1">Deployed Date</div>
            </div>

            {/* Table Data Loop */}
            {deploymentsData.map((deployment, index) => (
              <div
                key={index}
                className="grid grid-cols-5 gap-3 shadow-sm justify-between px-5 py-3 text-gray-600 border-b"
              >
                <div className="col-span-1 flex items-center text-sm">
                  {index + 1}
                </div>
                <div className="col-span-1 flex items-center">
                  {deployment.instanceName}
                </div>
                <div className="col-span-1 flex items-center">
                  <div
                    className={`px-4 py-2 text-gray-50 rounded-3xl gap-1 flex items-center shadow ${
                      deployment.architectureType === "Monolith"
                        ? "bg-[#00A5D5]"
                        : deployment.architectureType === "Highly Available"
                        ? "bg-[#00C2C9]"
                        : "bg-[#10DBAA]"
                    }`}
                  >
                    {deployment.architectureType === "Monolith" ? (
                      <p className="text-xl">
                        <GiDjedPillar />
                      </p>
                    ) : deployment.architectureType === "Highly Available" ? (
                      <p className="text-xl">
                        <Ri24HoursLine />
                      </p>
                    ) : (
                      <p className="text-xl">
                        <TbSailboat2 />
                      </p>
                    )}
                    {deployment.architectureType}
                  </div>
                </div>
                <div className="col-span-1 flex text-blue-500">
                  <div className="w-auto h-10 px-4 py-1 border border-gray-500 rounded-md cursor-pointer flex items-center gap-[6px] bg-cyan-50 shadow-inner">
                    <TbWorldWww className="text-2xl" />
                    <div className="truncate max-w-[115px]">
                      <Link target="_blank" href={`http://${deployment.ip}`}>
                        {deployment.ip}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 flex items-center gap-2">
                  <IoCalendarOutline />
                  {deployment.createdAt}
                </div>
              </div>
            ))}
          </div>

          {/* For Mobile Device */}
          <div className="flex flex-col gap-5 mt-5 lg:hidden text-gray-500">
            {deploymentsData.map((deployment, index) => (
              <div
                key={index}
                className="w-full h-auto p-8 border-[1.5px] border-gray-300 rounded-2xl shadow hover:border-sky-600 hover:shadow-lg transition-all ease-in-out duration-200"
              >
                {/* Deployment Icon */}
                <div
                  className={`ml-auto rounded-full w-10 h-10 flex justify-center items-center text-white text-2xl shadow-md ${
                    deployment.architectureType === "Monolith"
                      ? "bg-[#00A5D5]"
                      : deployment.architectureType === "Highly Available"
                      ? "bg-[#00C2C9]"
                      : "bg-[#10DBAA]"
                  }`}
                >
                  {deployment.architectureType === "Monolith" ? (
                    <GiDjedPillar />
                  ) : deployment.architectureType === "Highly Available" ? (
                    <Ri24HoursLine />
                  ) : (
                    <TbSailboat2 />
                  )}
                </div>

                <p className="font-semibold text-lg text-gray-500 -mt-4">
                  {deployment.instanceName}
                </p>

                <p className="mt-3 italic text-gray-400">
                  {deployment.architectureType}
                </p>

                <div className="w-40 text-blue-500 h-10 px-4 py-1 border border-gray-500 rounded-md cursor-pointer flex items-center gap-[6px] bg-cyan-50 shadow-inner mt-3">
                  <TbWorldWww className="text-2xl" />
                  <div className="truncate max-w-[115px]">
                    <Link target="_blank" href={`http://${deployment.ip}`}>
                      {deployment.ip}
                    </Link>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <IoCalendarOutline />
                  {deployment.createdAt}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default Deployments;
