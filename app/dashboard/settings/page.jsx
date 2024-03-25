"use client";

import { useEffect, useState } from "react";
import { IoSettings } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";

const Settings = () => {
  const [userData, setUserData] = useState({ fullName: "", email: "" });
  const [isMFAEnabled, setIsMFAEnabled] = useState(false);

  useEffect(() => {
    const fullNameFromStorage = sessionStorage.getItem("fullName");
    const emailFromStorage = sessionStorage.getItem("userEmail");

    setUserData({ fullName: fullNameFromStorage, email: emailFromStorage });
  }, []);

  const handleMFAChange = () => {
    // Toggle the state of MFA
    setIsMFAEnabled(!isMFAEnabled);
  };

  return (
    <section>
      <div className="flex gap-2 text-gray-700">
        <span className="text-3xl mt-1">
          <IoSettings />
        </span>
        <h2 className="font-semibold text-4xl">Settings</h2>
      </div>

      <span className="text-zinc-400">
        Configure application based on your preferences.
      </span>

      {/* Profile Card */}

      <div className="w-96 h-auto p-8 text-gray-500 gap-5 border-2 border-gray-300 rounded-xl shadow-sm mt-5">
        <span className="text-gray-400 font-semibold uppercase">Profile</span>
        <div className="w-36 h-36 mt-5 bg-sky-500 border-[6px] border-gray-300 shadow-lg rounded-full mx-auto flex flex-col items-center justify-center text-gray-50">
          <h2 className="font-black text-lg">XMOPS</h2>
          <h3 className="italic uppercase -mt-2">Accelerate</h3>
        </div>

        {/* User Details */}
        <div className="mt-10 flex flex-col gap-1">
          <p>
            <b>Name:</b> {userData.fullName}
          </p>
          <p>
            <b>Email: </b> {userData.email}
          </p>

          {/* Styled checkbox button */}
          <div className="flex items-center gap-2 mt-5">
            <input
              type="checkbox"
              name="enableMFA"
              id="enableMFA"
              className="hidden"
              checked={isMFAEnabled}
              onChange={handleMFAChange}
            />
            <label
              htmlFor="enableMFA"
              className={`w-full h-auto py-4 px-10 border-2 text-white border-gray-300 rounded-lg flex items-center justify-center cursor-pointer gap-1 text-xl font-semibold ${
                isMFAEnabled ? "bg-red-500" : "bg-sky-600"
              }`}
            >
              <MdOutlineSecurity />
              {isMFAEnabled ? "Disable MFA" : "Enable MFA"}
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
