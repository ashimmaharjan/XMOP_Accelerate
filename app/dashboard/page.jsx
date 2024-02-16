import NavDrawer from "@/app/components/NavDrawer";

const Dashboard = () => {
  return (
    <section>
      <div className="w-full h-screen grid grid-cols-12">
        <div className="hidden md:block md:col-span-3 lg:col-span-2">
          <NavDrawer />
        </div>

        <div className="col-span-12 md:col-span-9 lg:col-span-10 bg-gray-500 flex justify-center items-center">
          <h2 className="text-4xl text-white text-center font-semibold">
            dashboard contents switch takes place here.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
