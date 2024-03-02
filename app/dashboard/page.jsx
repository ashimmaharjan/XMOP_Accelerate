"use client";

import { BsArrowRightSquare, BsBarChartLineFill } from "react-icons/bs";
import { GiDjedPillar } from "react-icons/gi";
import { GrServices } from "react-icons/gr";
import { TbSailboat2 } from "react-icons/tb";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { motion } from "framer-motion";
import handPeaceSign from "./handPeaceSign.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const statistics = [
    {
      id: 1,
      label: "Total",
      icon: <BsBarChartLineFill />,
      stats: "6",
      backgroundColor: "bg-[#0284C7]",
    },
    {
      id: 2,
      label: "Monolith",
      icon: <GiDjedPillar />,
      stats: "3",
      backgroundColor: "bg-[#00A5D5]",
    },
    {
      id: 3,
      label: "Microservice",
      icon: <GrServices />,
      stats: "2",
      backgroundColor: "bg-[#00C2C9]",
    },
    {
      id: 4,
      label: "Lightsail",
      icon: <TbSailboat2 />,
      stats: "1",
      backgroundColor: "bg-[#10DBAA]",
    },
  ];

  const deploymentArchitectures = [
    {
      id: 1,
      name: "Monolith",
      icon: <GiDjedPillar />,
    },
    {
      id: 2,
      name: "Microservice",
      icon: <GrServices />,
    },
    {
      id: 3,
      name: "Lightsail",
      icon: <TbSailboat2 />,
    },
  ];

  // For Modal
  const [showModal, setShowModal] = useState(false);
  const [chosenArchitecture, setChosenArchitecture] = useState("");

  const toggleModal = (architectureChosen) => {
    setShowModal(!showModal);
    setChosenArchitecture(architectureChosen);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [firstName, setFirstName] = useState("");
  const router = useRouter();
  useEffect(() => {
    const checkSession = () => {
      const fullName = sessionStorage.getItem("fullName");
      if (fullName) {
        const nameParts = fullName.split(" ");
        setFirstName(nameParts[0]);
      } else {
        router.push("/");
      }
    };
    checkSession();
  }, []);

  return (
    <section>
      <div className="flex gap-2">
        <h2 className="text-4xl text-gray-700 font-semibold">Hi {firstName}</h2>
        <div className="-mt-[10px]">
          <Image
            src={handPeaceSign}
            alt="hand-peace-sign"
            width={30}
            height={30}
            quality={100}
          ></Image>
        </div>
      </div>

      <span className="text-zinc-400">
        Here&apos;s what&apos;s happening with your deployments.
      </span>

      {/* Grid to show statistics */}
      <div className="grid grid-cols-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
        {statistics.map((statistic) => (
          <div
            key={statistic.id}
            className={`numberCard ${statistic.backgroundColor}`}
          >
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-lg text-gray-50">
                {statistic.label}
              </h2>
              <span className="text-4xl">{statistic.icon}</span>
            </div>

            <h2 className="font-extrabold text-6xl">{statistic.stats}</h2>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-10 text-gray-700">
        <h2 className="font-semibold text-4xl">Deploy New</h2>
        <span className="text-3xl mt-1">
          <BsArrowRightSquare />
        </span>
      </div>

      <span className="text-zinc-400">
        Please choose a architecture you would like to deploy.
      </span>

      <div className="grid grid-cols-12 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 mt-5">
        {deploymentArchitectures.map((architecture, index) => (
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1 + index * 0.1,
              duration: 300,
            }}
            key={architecture.id}
            className="architectureCard"
          >
            <button
              className="architectureButton"
              onClick={() => toggleModal(architecture.name)}
            >
              <span className="text-6xl">{architecture.icon}</span>
              <p className="text-xl">{architecture.name}</p>
            </button>
          </motion.div>
        ))}
      </div>

      {showModal && (
        <Modal
          closeModal={closeModal}
          message={"Are you sure you would like to deploy"}
          focusSubject={chosenArchitecture + " architecture?"}
        />
      )}
    </section>
  );
};

export default Dashboard;
