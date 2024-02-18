import { MdManageHistory } from "react-icons/md";

const History = () => {
  const deployments = [
    {
      id: 1,
      architectureType: "Monolith",
      deploymentDate: "Monday, Feb 10, 2023",
    },
    {
      id: 2,
      architectureType: "Monolith",
      deploymentDate: "Tuesday, Feb 11, 2023",
    },
    {
      id: 3,
      architectureType: "Monolith",
      deploymentDate: "Wednesday, Feb 12, 2023",
    },
    {
      id: 4,
      architectureType: "Microservice",
      deploymentDate: "Thursday, Feb 13, 2023",
    },
    {
      id: 5,
      architectureType: "Microservice",
      deploymentDate: "Friday, Feb 14, 2023",
    },
    {
      id: 6,
      architectureType: "Lightsail",
      deploymentDate: "Saturday, Feb 15, 2023",
    },
  ];
  return (
    <section>
      <div className="flex gap-5 text-gray-700">
        <h2 className="font-semibold text-4xl">Deployment History</h2>
        <span className="text-3xl mt-1">
          <MdManageHistory />
        </span>
      </div>

      <span className="text-zinc-400">
        Let&apos;s take a look at your recent deployments.
      </span>

      <div className="grid grid-cols-3 gap-3 shadow-inner justify-between mt-5 bg-sky-200 px-5 py-3 text-gray-700 font-bold">
        <div className="col-span-1">S.N.</div>
        <div className="col-span-1">Architecture Type</div>
        <div className="col-span-1">Deployed Date</div>
      </div>

      {/* Table Data Loop */}
      {deployments.map((deployment) => (
        <div
          key={deployment.id}
          className="grid grid-cols-3 gap-3 drop-shadow-lg shadow-sm justify-between px-5 py-3 text-gray-700 border-b"
        >
          <div className="col-span-1">{deployment.id}</div>
          <div className="col-span-1">
            <span
              className={`px-4 py-1 text-gray-50 rounded-3xl ${
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
          <div className="col-span-1">{deployment.deploymentDate}</div>
        </div>
      ))}
    </section>
  );
};

export default History;
