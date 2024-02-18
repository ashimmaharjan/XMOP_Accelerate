"use client";

import Link from "next/link";
import { MdDashboard, MdManageHistory } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
      label: "History",
      link: "/dashboard/history",
      active: false,
      icon: <MdManageHistory />,
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
    <div className="w-full h-full bg-sky-600 shadow-inner flex flex-col py-10 overflow-hidden">
      <h2 className="text-2xl font-bold text-white pl-6">XMOPS</h2>
      <div className="w-full h-[1px] bg-white mt-3"></div>

      <div className="flex flex-col gap-3 mt-5 pl-6">
        {NavLinks.map((navLink) => (
          <Link
            key={navLink.id}
            href={navLink.link}
            className={`text-lg flex items-center p-2 w-full rounded-tl-2xl gap-1 hover:translate-x-3 transition-all duration-300 ease-in-out ${
              activeLink === navLink.link
                ? "bg-white text-sky-600 font-semibold"
                : "text-white"
            }`}
            onClick={() => handleLinkClick(navLink.link)}
          >
            {navLink.icon}
            <p>{navLink.label}</p>
          </Link>
        ))}
      </div>

      <button
        onClick={handleSignOut}
        className="flex gap-2 p-3 ml-6 items-center mt-auto font-semibold border border-r-0 text-white hover:shadow-xl hover:border-r-0 hover:bg-red-600 transition-all duration-300 ease-in-out"
      >
        Sign out
        <IoIosLogOut />
      </button>
    </div>
  );
};

export default NavDrawer;
