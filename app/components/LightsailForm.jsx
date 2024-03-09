"use client";

import { useState } from "react";
import InputFields from "./InputFields";
import { GrDeploy } from "react-icons/gr";
import ConfirmationModal from "./ConfirmationModal";
import ProcessingModal from "./ProcessingModal";
import Divider from "./Divider";

const LightsailForm = ({ closeModal }) => {
  const [region, setRegion] = useState("");
  const [platform, setPlatform] = useState("");
  const [blueprint, setBluePrint] = useState("");
  const [publicSSH, setPublicSSH] = useState("");
  const [instancePlan, setInstancePlan] = useState("");

  const [outputIp, setOutputIp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const awsRegions = [
    "us-east-1",
    "us-west-1",
    "us-west-2",
    "eu-west-1",
    "eu-central-1",
    "ap-southeast-1",
    "ap-southeast-2",
    "ap-northeast-1",
    "ap-northeast-2",
    "sa-east-1",
    "ca-central-1",
    "eu-north-1",
    "ap-south-1",
    "af-south-1",
    "me-south-1",
  ];

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const toggleConfirmationModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const [showProcessingModal, setShowProcessingModal] = useState(false);

  const closeProcessingModal = () => {
    setShowProcessingModal(false);
    setErrorMessage("");
    setOutputIp("");
  };

  const deployLightsail = async (e) => {
    e.preventDefault();
    // Log the data before sending
    console.log("Data to be sent to the backend:", {
      region,
      blueprint,
      instancePlan,
    });
    setShowConfirmationModal(false);
    setShowProcessingModal(true);
    try {
      const response = await fetch(
        "http://localhost:3001/api/deploy-lightsail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ region, blueprint, instancePlan }),
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
      <form className="flex flex-col gap-3 px-10 pb-1">
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 font-semibold">
            Instance Location: *
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
            className="rounded-md shadow-sm h-10 pl-2 border text-gray-600 border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <optgroup label="AWS Regions">
              <option value="">Select AWS Region</option>
              {awsRegions.map((region, index) => (
                <option key={index} value={region}>
                  {region}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-500 font-semibold">
            Select Platform: *
          </label>
          <select
            required
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="rounded-md shadow-sm h-10 pl-2 border text-gray-600 border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <optgroup label="Platform">
              <option value="linux">Linux</option>
              <option value="windows">Windows</option>
            </optgroup>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-500 font-semibold">
            Select Blueprint: *
          </label>
          <select
            value={blueprint}
            required
            onChange={(e) => setBluePrint(e.target.value)}
            className="rounded-md shadow-sm h-10 pl-2 border text-gray-600 border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <optgroup label="Blueprint">
              <option value="">Select Blueprint</option>
              <option value="wordpress">Wordpress</option>
            </optgroup>
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
            Select Instance Plan: *
          </label>
          <select
            required
            value={instancePlan}
            onChange={(e) => setInstancePlan(e.target.value)}
            className="rounded-md shadow-sm h-10 pl-2 border text-gray-600 border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <optgroup label="Instance Plan">
              <option value="">Select Instance Plan</option>
              <option value="small_3_2">Small</option>
            </optgroup>
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
          />
        )}
      </div>
    </section>
  );
};

export default LightsailForm;
