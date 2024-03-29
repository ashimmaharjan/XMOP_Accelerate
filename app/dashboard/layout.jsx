"use client";
import NavDrawer from "../components/NavDrawer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Function to check if session is available
const checkSession = () => {
  const idToken = sessionStorage.getItem("idToken");
  return idToken ? true : false;
};

export default function DashboardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = checkSession();
    if (!isAuthenticated) {
      // Redirect user to login page if session is not available
      router.push("/");
    }
  }, []);

  return (
    <section className="w-full h-screen overflow-hidden grid grid-cols-12">
      <div className="hidden h-screen md:block md:col-span-3 lg:col-span-2">
        <NavDrawer />
      </div>

      <div className="col-span-12 md:col-span-9 lg:col-span-10 bg-white p-10 overflow-x-hidden overflow-y-auto">
        {children}
      </div>
    </section>
  );
}
