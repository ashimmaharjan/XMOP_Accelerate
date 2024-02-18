"use client";

import { FaHandPeace } from "react-icons/fa6";
import { BsArrowRightSquare, BsBarChartLineFill } from "react-icons/bs";
import { GiDjedPillar } from "react-icons/gi";
import { GrServices } from "react-icons/gr";
import { TbSailboat2 } from "react-icons/tb";
import { useState } from "react";
import Modal from "../components/Modal";

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

  return (
    <section>
      <h2 className="text-4xl text-gray-700 flex gap-2 font-semibold">
        Hi Ashim
        <FaHandPeace className="text-green-500" />
      </h2>
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
              <h2 className="font-semibold text-lg text-gray-100">
                {statistic.label}
              </h2>
              <span className="text-4xl">{statistic.icon}</span>
            </div>

            <h2 className="font-extrabold text-6xl">{statistic.stats}</h2>
          </div>
        ))}
      </div>

      <div className="flex gap-5 mt-10 text-gray-700">
        <h2 className="font-semibold text-4xl">Deploy New</h2>
        <span className="text-3xl mt-1">
          <BsArrowRightSquare />
        </span>
      </div>

      <span className="text-zinc-400">
        Please choose a architecture you would like to deploy.
      </span>

      <div className="grid grid-cols-12 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 mt-5">
        {deploymentArchitectures.map((architecture) => (
          <button
            key={architecture.id}
            className="architectureCard"
            onClick={() => toggleModal(architecture.name)}
          >
            <span className="text-6xl">{architecture.icon}</span>
            <p className="text-xl">{architecture.name}</p>
          </button>
        ))}
      </div>

      {showModal && (
        <Modal
          closeModal={closeModal}
          architectureChosen={chosenArchitecture}
        />
      )}
    </section>
  );
};

export default Dashboard;
