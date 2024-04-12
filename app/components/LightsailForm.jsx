"use client";

import { useState, useEffect } from "react";
import InputFields from "./InputFields";
import { GrDeploy } from "react-icons/gr";
import ConfirmationModal from "./ConfirmationModal";
import ProcessingModal from "./ProcessingModal";
import Divider from "./Divider";

const LightsailForm = ({ closeModal }) => {
  // Session user email data
  const [userEmail, setUserEmail] = useState("");

  // User selected values and inputs
  const [instanceName, setInstanceName] = useState("");
  const [region, setRegion] = useState("");
  const [availabilityZone, setAvailabilityZone] = useState("");
  const [platform, setPlatform] = useState("");
  const [blueprint, setBluePrint] = useState("");
  const [publicSSH, setPublicSSH] = useState("");
  const [instancePlan, setInstancePlan] = useState("");

  // Select input option values dynamically fetched via AWS.
  const [awsRegions, setAwsRegions] = useState([]);
  const [awsAvailabilityZones, setAwsAvailabilityZones] = useState([]);
  const [blueprintOptions, setBluePrintOptions] = useState([]);
  const [bundleOptions, setBundleOptions] = useState([]);
  const [linuxBlueprints, setLinuxBluePrints] = useState([]);
  const [windowsBlueprints, setWindowsBluePrints] = useState([]);
  const [linuxBundles, setLinuxBundles] = useState([]);
  const [windowsBundles, setWindowsBundles] = useState([]);

  const [outputIp, setOutputIp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchData();
    const fetchEmailFromStorage = () => {
      const email = sessionStorage.getItem("userEmail");
      console.log("Lightsail email user", email);
      setUserEmail(email);
    };

    fetchEmailFromStorage();
  }, []);

  async function fetchData() {
    try {
      const regionsResponse = await fetch("http://localhost:3001/api/regions");
      const regionsData = await regionsResponse.json();
      if (regionsData.success) {
        setAwsRegions(regionsData.data.regions);
      } else {
        console.error("Error fetching regions:", regionsData.error);
      }

      const blueprintsResponse = await fetch(
        "http://localhost:3001/api/blueprints"
      );
      const blueprintsData = await blueprintsResponse.json();
      if (blueprintsData.success) {
        const filteredLinuxBlueprints = blueprintsData.data.blueprints.filter(
          (blueprint) => blueprint.platform === "LINUX_UNIX"
        );
        setLinuxBluePrints(filteredLinuxBlueprints);

        const filteredWindowsBlueprints = blueprintsData.data.blueprints.filter(
          (blueprint) => blueprint.platform === "WINDOWS"
        );
        setWindowsBluePrints(filteredWindowsBlueprints);
      } else {
        console.error("Error fetching blueprints:", blueprintsData.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleRegionChange = async (event) => {
    const region = event.target.value;
    setRegion(region);

    try {
      // Fetch availability zones
      const availabilityZonesResponse = await fetch(
        `http://localhost:3001/api/availability-zones/${region}`
      );
      const availabilityZonesData = await availabilityZonesResponse.json();
      if (availabilityZonesData.success) {
        setAwsAvailabilityZones(availabilityZonesData.data);
        console.log(
          "Backend fetched availability zones:",
          awsAvailabilityZones
        );
      } else {
        console.error(
          "Error fetching availability zones:",
          availabilityZonesData.error
        );
      }

      // Fetch bundles
      const bundlesResponse = await fetch(
        `http://localhost:3001/api/available-bundles/${region}`
      );
      const bundlesData = await bundlesResponse.json();
      if (bundlesData.success) {
        const filteredLinuxBundles = bundlesData.data.bundles.filter((bundle) =>
          bundle.supportedPlatforms.includes("LINUX_UNIX")
        );
        setLinuxBundles(filteredLinuxBundles);

        const filteredWindowsBundles = bundlesData.data.bundles.filter(
          (bundle) => bundle.supportedPlatforms.includes("WINDOWS")
        );
        setWindowsBundles(filteredWindowsBundles);
      } else {
        console.error("Error fetching bundles:", bundlesData.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChoosePlatform = async (event) => {
    const platform = event.target.value;
    setPlatform(platform);

    if (platform === "linux") {
      setBluePrintOptions(linuxBlueprints);
      setBundleOptions(linuxBundles);
    } else {
      setBluePrintOptions(windowsBlueprints);
      setBundleOptions(windowsBundles);
    }
  };

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);

  const toggleConfirmationModal = () => {
    if (
      !instanceName ||
      instanceName.trim() === "" ||
      !region ||
      region.trim() === "" ||
      !availabilityZone ||
      availabilityZone.trim() === "" ||
      !blueprint ||
      blueprint.trim() === "" ||
      !instancePlan ||
      instancePlan.trim() === ""
    ) {
      setErrorMessage("Please fill out all required fields marked by *.");
      setShowProcessingModal(true);
      return;
    } else {
      setShowConfirmationModal(!showConfirmationModal);
    }
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const closeProcessingModal = () => {
    setShowProcessingModal(false);
    setErrorMessage("");
    setOutputIp("");
  };

  const deployLightsail = async (e) => {
    e.preventDefault();
    // Log the data before sending
    console.log("Data to be sent to the backend:", {
      instanceName,
      region,
      availabilityZone,
      blueprint,
      publicSSH,
      instancePlan,
      userEmail,
    });
    setShowConfirmationModal(false);
    setShowProcessingModal(true);
    try {
      const response = await fetch(
        "http://localhost:3001/api/deploy-lightsail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            instanceName,
            region,
            availabilityZone,
            blueprint,
            publicSSH,
            instancePlan,
            userEmail,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        if (data.success) {
          console.log("Lightsail deployed successfully");
          console.log("IP Address:", data.ip);
          setOutputIp(data.ip);
        } else {
          console.error("Error deploying:", data.error);
          setErrorMessage(data.error);
        }
      } else {
        console.error("Error deploying:", data.error);
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error("Error deploying Lightsail:", error.error);
      setErrorMessage(error.error);
    }
  };

  return (
    <section>
      <form className="flex flex-col gap-3 px-10 pb-1 overflow-y-auto max-h-[500px]">
        <InputFields
          label="Instance Name *"
          placeholder="Enter instance name"
          inputType="text"
          value={instanceName}
          onChange={(e) => setInstanceName(e.target.value)}
        />

        <div className="flex flex-col gap-1">
          <label className="text-gray-500 font-semibold">
            Instance Location: *
          </label>
          <select
            value={region}
            onChange={handleRegionChange}
            required
            className="rounded-md shadow-sm h-10 pl-2 border text-gray-600 border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="">Select AWS Region</option>
            {awsRegions.map((region, index) => (
              <option key={index} value={region.name}>
                {region.displayName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-500 font-semibold">
            Availability Zone: *
          </label>
          <select
            value={availabilityZone}
            onChange={(e) => setAvailabilityZone(e.target.value)}
            required
            className="rounded-md shadow-sm h-10 pl-2 border text-gray-600 border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="">Select availability zone</option>
            {awsAvailabilityZones.map((availabilityZone, index) => (
              <option key={index} value={availabilityZone}>
                {availabilityZone}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-500 font-semibold">Platform: *</label>
          <select
            required
            value={platform}
            onChange={handleChoosePlatform}
            className="rounded-md shadow-sm h-10 pl-2 border text-gray-600 border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="">Select Platform</option>
            <option value="linux">Linux</option>
            <option value="windows">Windows</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-500 font-semibold">Blueprint: *</label>
          <select
            value={blueprint}
            required
            onChange={(e) => setBluePrint(e.target.value)}
            className="rounded-md shadow-sm h-10 pl-2 border text-gray-600 border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="">Select blueprint</option>
            {blueprintOptions.map((blueprint, index) => (
              <option
                key={index}
                value={blueprint.blueprintId}
                className="capitalize"
              >
                {blueprint.blueprintId}
              </option>
            ))}
          </select>
        </div>

        <InputFields
          label="Customer Public SSH:"
          placeholder="Enter public SSH key"
          inputType="text"
          value={publicSSH}
          onChange={(e) => setPublicSSH(e.target.value)}
        />

        <div className="flex flex-col gap-1">
          <label className="text-gray-500 font-semibold">
            Instance Plan: *
          </label>
          <select
            required
            value={instancePlan}
            onChange={(e) => setInstancePlan(e.target.value)}
            className="rounded-md shadow-sm h-10 pl-2 border text-gray-600 border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="">Select Instance Plan</option>
            {bundleOptions.map((bundle, index) => (
              <option key={index} value={bundle.bundleId}>
                {bundle.bundleId.includes("_ipv6")
                  ? `${bundle.name} (IPv6) - $${bundle.price} USD per month`
                  : `${bundle.name} - $${bundle.price} USD per month`}
              </option>
            ))}
          </select>
        </div>
      </form>
      <Divider />

      <div className="flex justify-end gap-2 px-5">
        <button
          onClick={() => toggleConfirmationModal()}
          className="flex items-center gap-1 px-5 py-2 bg-sky-600 text-gray-100 hover:bg-sky-700 hover:text-white transition-all duration-300 ease-in-out"
        >
          <GrDeploy />
          Deploy
        </button>
        <button
          className="px-5 py-2 border text-gray-600 hover:bg-gray-200 transition-all duration-300 ease-in-out"
          onClick={closeModal}
        >
          Cancel
        </button>

        {showConfirmationModal && (
          <ConfirmationModal
            closeModal={closeConfirmationModal}
            message={"Are you sure you would like to deploy"}
            focusSubject={"Lightsail architecture?"}
            confirmAction={deployLightsail}
          />
        )}

        {showProcessingModal && (
          <ProcessingModal
            closeModal={closeProcessingModal}
            deployedIP={outputIp}
            errorMessage={errorMessage}
            architecture={"Lightsail"}
          />
        )}
      </div>
    </section>
  );
};

export default LightsailForm;
