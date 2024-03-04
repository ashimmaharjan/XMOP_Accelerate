import { FaCheckCircle } from "react-icons/fa";
import { GrDeploy, GrInProgress } from "react-icons/gr";
import { GoAlertFill } from "react-icons/go";

const Deployments = () => {
  const deployments = [
    {
      id: 1,
      name: "Deployment 1",
      architectureType: "Monolith",
      status: "Deployed",
      deploymentDate: "Monday, Feb 10, 2023",
    },
    {
      id: 2,
      name: "Deployment 2",
      status: "Deployed",
      architectureType: "Monolith",
      deploymentDate: "Tuesday, Feb 11, 2023",
    },
    {
      id: 3,
      name: "Deployment 3",
      architectureType: "Monolith",
      status: "Deployed",
      deploymentDate: "Wednesday, Feb 12, 2023",
    },
    {
      id: 4,
      name: "Deployment 4",
      architectureType: "Microservice",
      status: "In Progress",
      deploymentDate: "Thursday, Feb 13, 2023",
    },
    {
      id: 5,
      name: "Deployment 5",
      architectureType: "Microservice",
      status: "Deployed",
      deploymentDate: "Friday, Feb 14, 2023",
    },
    {
      id: 6,
      name: "Deployment 6",
      architectureType: "Lightsail",
      status: "Failed",
      deploymentDate: "Saturday, Feb 15, 2023",
    },
  ];
  return (
    <section>
      <div className="flex gap-4 text-gray-700">
        <h2 className="font-semibold text-4xl">Deployed Applications</h2>
        <span className="text-3xl mt-1">
          <GrDeploy />
        </span>
      </div>

      <span className="text-zinc-400">
        Let&apos;s take a look at your recent deployments.
      </span>

      <div className="grid grid-cols-5 gap-3 shadow-inner justify-between mt-5 bg-sky-200 px-5 py-3 text-gray-700 font-bold">
        <div className="col-span-1">S.N.</div>
        <div className="col-span-1">Name</div>
        <div className="col-span-1">Architecture Type</div>
        <div className="col-span-1">Status</div>
        <div className="col-span-1">Deployed Date</div>
      </div>

      {/* Table Data Loop */}
      {deployments.map((deployment) => (
        <div
          key={deployment.id}
          className="grid grid-cols-5 gap-3 shadow-sm justify-between px-5 py-3 text-gray-700 border-b"
        >
          <div className="col-span-1">{deployment.id}</div>
          <div className="col-span-1">{deployment.name}</div>
          <div className="col-span-1">
            <span
              className={`px-4 py-1 text-gray-50 rounded-3xl shadow ${
                deployment.architectureType === "Monolith"
                  ? "bg-[#00A5D5]"
                  : deployment.architectureType === "Microservice"
                  ? "bg-[#00C2C9]"
                  : "bg-[#10DBAA]"
              }`}
            >
              {deployment.architectureType}
            </span>
          </div>
          <div className="col-span-1 flex">
            <div
              className={`w-auto h-auto px-4 py-1 border-2 rounded-3xl flex items-center gap-[6px] ${
                deployment.status === "Deployed"
                  ? "text-green-600 border-green-500"
                  : deployment.status === "In Progress"
                  ? "text-blue-500 border-blue-500"
                  : "text-red-500 border-red-500"
              }`}
            >
              {deployment.status === "Deployed" && <FaCheckCircle />}
              {deployment.status === "In Progress" && <GrInProgress />}
              {deployment.status === "Failed" && <GoAlertFill />}

              <p>{deployment.status}</p>
            </div>
          </div>
          <div className="col-span-1">{deployment.deploymentDate}</div>
        </div>
      ))}
    </section>
  );
};

export default Deployments;
