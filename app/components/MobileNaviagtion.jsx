"use client";

import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { GrDeploy } from "react-icons/gr";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ConfirmationModal from "./ConfirmationModal";

const MobileNavigation = () => {
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
    {
      id: 4,
      label: "Signout",
      link: "signout",
      active: false,
      icon: <IoIosLogOut />,
    },
  ];

  const handleLinkClick = (link, event) => {
    if (link === "signout") {
      event.preventDefault();
      toggleModal();
    } else {
      setActiveLink(link);
    }
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
    <div className="w-screen h-[90px] bg-sky-600 shadow-inner px-5">
      <div className="flex w-full h-full gap-3 items-center justify-center">
        {NavLinks.map((navLink) => (
          <Link
            key={navLink.id}
            href={navLink.link}
            className={`flex flex-col items-center w-full ${
              pathname === navLink.link
                ? "font-semibold text-white"
                : "font-normal text-gray-300"
            }`}
            onClick={(event) => handleLinkClick(navLink.link, event)}
          >
            <div
              className={`text-xl p-2 rounded-full ${
                pathname === navLink.link
                  ? "bg-white text-sky-600 font-semibold shadow"
                  : "text-gray-300"
              }`}
            >
              {navLink.icon}
            </div>
            <p>{navLink.label}</p>
          </Link>
        ))}
      </div>

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

export default MobileNavigation;
