"use client";

import { useState, useEffect } from "react";
import InputFields from "./InputFields";
import ConfirmationModal from "./ConfirmationModal";
import ProcessingModal from "./ProcessingModal";
import Divider from "./Divider";
import { GrDeploy } from "react-icons/gr";
import { saveAs } from "file-saver";

const MonolithForm = ({ closeModal }) => {
  // Session user email data
  const [userEmail, setUserEmail] = useState("");

  const [instanceName, setInstanceName] = useState("");
  const [region, setRegion] = useState("");
  const [availabilityZone, setAvailabilityZone] = useState("");
  const [image, setImage] = useState("");
  const [instanceType, setInstanceType] = useState("");
  const [keyPair, setKeyPair] = useState("");
  const [sshAllowed, setSshAllowed] = useState(false);
  const [httpAllowed, setHttpAllowed] = useState(false);
  const [storage, setStorage] = useState("");
  const [dbType, setDbType] = useState("");
  const [phpVersion, setPhpVersion] = useState("");
  const [webServer, setWebServer] = useState("");

  //  Select Inputs data fetched from AWS
  const [awsRegions, setAwsRegions] = useState([]);
  const [awsAvailabilityZones, setAwsAvailabilityZones] = useState([]);
  const [awsInstanceTypes, setAWSInstanceTypes] = useState([]);
  const [existingKeys, setExistingKeys] = useState([]);

  // For keys
  const [keyPairOption, setKeyPairOption] = useState("");
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyGenerated, setNewKeyGenerated] = useState(false);

  const [outputIp, setOutputIp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);

  useEffect(() => {
    fetchData();

    const fetchEmailFromStorage = () => {
      const email = sessionStorage.getItem("userEmail");
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

      // Fetch available keys
      const availableKeyPairsResponse = await fetch(
        `http://localhost:3001/api/keypairs/${region}`
      );
      const availableKeyPairsData = await availableKeyPairsResponse.json();
      if (availableKeyPairsData.success) {
        setExistingKeys(availableKeyPairsData.data.KeyPairs);
        console.log("Existing Keys", existingKeys);
      } else {
        console.error(
          "Error fetching available keys:",
          availableKeyPairsData.error
        );
      }

      // Fetch Instance Types
      const instanceTypesResponse = await fetch(
        `http://localhost:3001/api/instance-types/${region}`
      );
      const instanceTypesData = await instanceTypesResponse.json();
      if (instanceTypesData.success) {
        setAWSInstanceTypes(instanceTypesData.data);
      } else {
        console.error(
          "Error fetching instance types:",
          instanceTypesData.error
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleKeyPairOptionChange = (option) => {
    setKeyPairOption(option);

    // Initiale empty new key pair name
    if (option === "create-new") {
      setNewKeyName("");
      setNewKeyGenerated(false);
    }
  };

  const handleCreateKeyPair = async () => {
    if (newKeyName === "") {
      alert("Please enter Key Pair Name.");
    } else {
      try {
        const response = await fetch(
          "http://localhost:3001/api/create-key-pair",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              region,
              keyPairName: newKeyName,
            }),
          }
        );

        const newKeyData = await response.json();
        if (newKeyData.success) {
          console.log("Key pair created successfully");
          setNewKeyGenerated(true);

          // Download the private key file
          const blob = new Blob([newKeyData.data.KeyMaterial], {
            type: "text/plain;charset=utf-8",
          });
          saveAs(blob, `${newKeyName}.pem`);
        } else {
          console.error("Error creating key pair:", data.error);
        }
      } catch (error) {
        console.error("Error creating key pair:", error);
      }
    }
  };

  const toggleConfirmationModal = () => {
    if (
      !instanceName ||
      instanceName.trim() === "" ||
      !region ||
      region.trim() === "" ||
      !availabilityZone ||
      availabilityZone.trim() === "" ||
      !image ||
      image.trim() === "" ||
      !instanceType ||
      instanceType.trim() === "" ||
      !keyPair ||
      keyPair.trim() === "" ||
      !storage ||
      storage.trim() === "" ||
      !dbType ||
      dbType.trim() === "" ||
      !phpVersion ||
      phpVersion.trim() === "" ||
      !webServer ||
      webServer.trim() === ""
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

  const deployMonolith = async (e) => {
    e.preventDefault();

    console.log("Data to be sent to the backend for monolith deployment:", {
      instanceName,
      region,
      availabilityZone,
      image,
      instanceType,
      keyPair,
      sshAllowed,
      httpAllowed,
      storage,
      dbType,
      phpVersion,
      webServer,
      userEmail,
    });

    setShowConfirmationModal(false);
    setShowProcessingModal(true);

    try {
      const response = await fetch(
        "http://localhost:3001/api/deploy-monolith",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            instanceName,
            region,
            availabilityZone,
            image,
            instanceType,
            keyPair,
            sshAllowed,
            httpAllowed,
            storage,
            dbType,
            phpVersion,
            webServer,
            userEmail,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        if (data.success) {
          console.log("Monolith deployed successfully");
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
      console.error("Error deploying Monolith:", error.error);
      setErrorMessage(error.error);
    }
  };

  return (
    <section>
      <form className="flex flex-col gap-3 px-5 pb-1 overflow-y-auto max-h-[500px]">
        <InputFields
          label="Instance Name *"
          placeholder="Enter instance name"
          inputType="text"
          value={instanceName}
          onChange={(e) => setInstanceName(e.target.value)}
        />

        <div className="flex flex-col gap-1">
          <label className="text-gray-500 font-semibold">AWS Region: *</label>
          <select
            value={region}
            onChange={handleRegionChange}
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
          <label className="text-gray-500 font-semibold">Image (OS): *</label>
          <select
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="rounded-md shadow-sm h-10 pl-2 border text-gray-600 border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="">Select image</option>
            <option value="ami-09ccb67fcbf1d625c">
              Amazon Linux 2 Kernel 5.10 AMI 2.0.20240223.0 x86_64 HVM gp2
            </option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-500 font-semibold">
            Instance Type: *
          </label>
          <select
            value={instanceType}
            onChange={(e) => setInstanceType(e.target.value)}
            className="rounded-md shadow-sm h-10 pl-2 border text-gray-600 border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="">Select Instance type</option>
            {awsInstanceTypes.map((instanceType, index) => (
              <option key={index} value={instanceType.InstanceType}>
                {instanceType.InstanceType}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-500 font-semibold">Key Pair: *</label>
          <div className="grid grid-cols-2 gap-2 text-gray-600">
            <button
              type="button"
              onClick={() => handleKeyPairOptionChange("create-new")}
              className={`col-span-1 h-14 border border-gray-400 rounded-md shadow-inner hover:bg-sky-600 hover:text-white transition-all ease-in-out duration-200 ${
                keyPairOption === "create-new" ? "bg-sky-600 text-white" : ""
              }`}
            >
              Create New Key Pair
            </button>
            <button
              type="button"
              onClick={() => handleKeyPairOptionChange("select-existing")}
              className={`col-span-1 h-14 border border-gray-400 rounded-md shadow-inner hover:bg-sky-600 hover:text-white transition-all ease-in-out duration-200 ${
                keyPairOption === "select-existing"
                  ? "bg-sky-600 text-white"
                  : ""
              }`}
            >
              Select Existing Key
            </button>
          </div>
        </div>

        {keyPairOption === "create-new" && (
          <section
            className={`border-[3px]  p-5 ${
              newKeyGenerated
                ? "bg-green-600 text-gray-50 rounded-xl shadow"
                : "border-dashed"
            }`}
          >
            {newKeyGenerated ? (
              <div className="w-full h-full justify-center items-center text-center">
                <p className="italic">
                  {newKeyName}, generated and assigned successfully.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex flex-col gap-1">
                  <InputFields
                    label="Key Pair Name: *"
                    placeholder="Enter New Key Pair Name"
                    inputType="text"
                    value={newKeyName}
                    required="required"
                    onChange={(e) => setNewKeyName(e.target.value)}
                  />

                  <button
                    type="button"
                    className="bg-green-600 text-gray-50 py-2 w-20 mt-2"
                    onClick={handleCreateKeyPair}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {keyPairOption === "select-existing" && (
          <div className="flex flex-col gap-1">
            <label className="text-gray-500 font-semibold">
              Existing Keys: *
            </label>
            <select
              value={keyPair}
              onChange={(e) => setKeyPair(e.target.value)}
              className="rounded-md shadow-sm h-10 pl-2 border text-gray-600 border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              <option value="">Select Existing Key</option>
              {existingKeys.map((key, index) => (
                <option key={index} value={key.KeyName}>
                  {key.KeyName}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex items-center gap-2">
          <label
            htmlFor="Security Group Rules"
            className="text-gray-500 font-semibold"
          >
            Security Group Rules:
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="sshAllow"
            checked={sshAllowed}
            onChange={(e) => setSshAllowed(e.target.checked)}
            className="h-5 w-5 text-sky-500 border-gray-300 focus:ring-sky-500"
          />
          <label htmlFor="sshAllow" className="text-gray-500 cursor-pointer">
            Allow SSH
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="httpAllow"
            checked={httpAllowed}
            onChange={(e) => setHttpAllowed(e.target.checked)}
            className="h-5 w-5 text-sky-500 border-gray-300 focus:ring-sky-500"
          />
          <label htmlFor="httpAllow" className="text-gray-500 cursor-pointer">
            Allow HTTP
          </label>
        </div>

        <InputFields
          label="Storage in GiB for EBS Volume: *"
          placeholder="Enter storage"
          inputType="number"
          value={storage}
          onChange={(e) => setStorage(e.target.value)}
        />

        <div className="flex flex-col gap-1">
          <label className="text-gray-500 font-semibold">DB Type: *</label>
          <select
            value={dbType}
            onChange={(e) => setDbType(e.target.value)}
            className="rounded-md shadow-sm h-10 pl-2 border text-gray-600 border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="">Select DB type</option>
            <option value="mysql">MySQL</option>
            <option value="mariadb-server">MariaDB</option>
            <option value="postgresql">PostgreSQL</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-500 font-semibold">PHP Version: *</label>
          <select
            value={phpVersion}
            onChange={(e) => setPhpVersion(e.target.value)}
            className="rounded-md shadow-sm h-10 pl-2 border text-gray-600 border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="">Select PHP version</option>
            <option value="php8.0">PHP 8.0</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-500 font-semibold">
            Web Server (Apache or Nginx) Version: *
          </label>
          <select
            value={webServer}
            onChange={(e) => setWebServer(e.target.value)}
            className="rounded-md shadow-sm h-10 pl-2 border text-gray-600 border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="">Select Web Server</option>
            <option value="httpd">Apache HTTPD</option>
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
            focusSubject={"Monolith architecture?"}
            confirmAction={deployMonolith}
          />
        )}

        {showProcessingModal && (
          <ProcessingModal
            closeModal={closeProcessingModal}
            deployedIP={outputIp}
            errorMessage={errorMessage}
            architecture="Monolith"
          />
        )}
      </div>
    </section>
  );
};

export default MonolithForm;
