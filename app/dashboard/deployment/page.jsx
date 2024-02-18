import { GiDjedPillar } from "react-icons/gi";
import { GrServices } from "react-icons/gr";
import { TbSailboat2 } from "react-icons/tb";

const Deployment = () => {
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
  return (
    <section>
      <h2 className="text-4xl text-gray-700 flex gap-2 font-semibold">
        Let&apos;s deploy!
      </h2>
      <span className="text-zinc-400">
        Please choose a architecture you would like to deploy.
      </span>

      <div className="grid grid-cols-12 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 mt-5">
        {deploymentArchitectures.map((architecture) => (
          <div key={architecture.id} className="architectureCard">
            <span className="text-6xl">{architecture.icon}</span>
            <h3 className="text-xl">{architecture.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Deployment;
