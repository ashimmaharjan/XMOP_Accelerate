"use client";

import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { GrDeploy } from "react-icons/gr";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LogoXmops from "./xmops_logo.jpg";

const NavDrawer = () => {
  const [activeLink, setActiveLink] = useState("/dashboard");
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
  ];

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const router = useRouter();

  const handleSignOut = () => {
    router.push("/");
  };

  return (
    <div className="w-full h-full bg-sky-600 shadow-inner flex flex-col py-8 overflow-hidden">
      {/* <h2 className="text-2xl font-bold text-white pl-6">XMOPS</h2> */}
      <Image
        src={LogoXmops}
        width={100}
        height={100}
        alt="XMOPS Logo"
        quality={100}
        objectFit="contain"
        className="mx-auto cursor-pointer"
      />
      <div className="w-full h-[1px] bg-white mt-5"></div>

      <div className="flex flex-col gap-3 mt-5 pl-6">
        {NavLinks.map((navLink) => (
          <Link
            key={navLink.id}
            href={navLink.link}
            className={`text-lg flex items-center py-2 pl-5 w-full rounded-l-3xl gap-2 hover:translate-x-3 transition-all duration-300 ease-in-out ${
              activeLink === navLink.link
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
        onClick={handleSignOut}
        className="flex gap-2 p-3 ml-6 items-center mt-auto font-semibold border border-r-0 text-white hover:shadow-xl hover:border-r-0 hover:bg-red-500 transition-all duration-300 ease-in-out"
      >
        Sign out
        <IoIosLogOut />
      </button>
    </div>
  );
};

export default NavDrawer;
