"use client";

import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { GrDeploy } from "react-icons/gr";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ConfirmationModal from "./ConfirmationModal";

const NavDrawer = () => {
  const pathname = usePathname();

  const NavLinks = [
    {
      id: 1,
      label: "Dashboard",
      link: "/dashboard",
      active: true,
      icon: <MdDashboard />,
    },
    {
      id: 2,
      label: "Deployments",
      link: "/dashboard/deployments",
      active: false,
      icon: <GrDeploy />,
    },
    {
      id: 3,
      label: "Settings",
      link: "/dashboard/settings",
      active: false,
      icon: <IoSettings />,
    },
  ];

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const router = useRouter();

  // For Modal
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSignOut = () => {
    // Remove ID token from localStorage
    sessionStorage.removeItem("idToken");
    router.push("/");
  };

  return (
    <div className="w-full h-full bg-sky-600 shadow-inner flex flex-col py-8 overflow-hidden">
      <div className="pl-10 text-gray-50">
        <h2 className="font-black text-4xl">XMOPS</h2>
        <h3 className="italic uppercase text-xl -mt-2">Accelerate</h3>
      </div>
      <div className="w-full h-[1px] bg-white mt-5"></div>

      <div className="flex flex-col gap-3 mt-5 pl-6">
        {NavLinks.map((navLink) => (
          <Link
            key={navLink.id}
            href={navLink.link}
            className={`text-lg flex items-center py-2 pl-5 w-full rounded-l-3xl gap-2 hover:translate-x-3 transition-all duration-300 ease-in-out ${
              pathname === navLink.link
                ? "bg-white text-sky-600 font-semibold shadow"
                : "text-white"
            }`}
            onClick={() => handleLinkClick(navLink.link)}
          >
            <span className="text-xl">{navLink.icon}</span>
            <p>{navLink.label}</p>
          </Link>
        ))}
      </div>

      <button
        onClick={() => toggleModal()}
        className="flex gap-2 p-3 ml-6 items-center mt-auto font-semibold border border-r-0 text-white hover:shadow-xl hover:border-r-0 hover:bg-red-500 transition-all duration-300 ease-in-out"
      >
        Sign out
        <IoIosLogOut />
      </button>

      {showModal && (
        <ConfirmationModal
          closeModal={closeModal}
          message={"Are you sure you would like to"}
          focusSubject={" Sign out?"}
          confirmAction={handleSignOut}
        />
      )}
    </div>
  );
};

export default NavDrawer;
