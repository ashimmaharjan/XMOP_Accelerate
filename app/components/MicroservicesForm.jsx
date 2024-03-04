import { useState } from "react";
import InputFields from "./InputFields";
import ConfirmationModal from "./ConfirmationModal";
import Divider from "./Divider";
import { GrDeploy } from "react-icons/gr";

const MicroservicesForm = ({ closeModal }) => {
  const [awsRegion, setAwsRegion] = useState("");
  const [minInstances, setMinInstances] = useState("");
  const [maxInstances, setMaxInstances] = useState("");
  const [ami, setAmi] = useState("");
  const [instanceType, setInstanceType] = useState("");
  const [keyPair, setKeyPair] = useState("");
  const [securityGroups, setSecurityGroups] = useState("");
  const [storage, setStorage] = useState("");
  const [dbEngine, setDbEngine] = useState("");
  const [engineVersion, setEngineVersion] = useState("");
  const [environment, setEnvironment] = useState("");
  const [specs, setSpecs] = useState("");
  const [availability, setAvailability] = useState("");

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

  return (
    <section>
      <form className="flex flex-col gap-3 px-5 pb-1 overflow-y-auto max-h-[500px]">
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 font-semibold">AWS Region: *</label>
          <select
            value={awsRegion}
            onChange={(e) => setAwsRegion(e.target.value)}
            className="rounded-md shadow-sm h-10 pl-2 border text-gray-600 border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <optgroup label="AWS Regions">
              {awsRegions.map((region, index) => (
                <option key={index} value={region}>
                  {region}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        <InputFields
          label="Minimum Number of Instances: *"
          placeholder="Enter minimum instances"
          inputType="text"
          value={minInstances}
          onChange={(e) => setMinInstances(e.target.value)}
        />

        <InputFields
          label="Maximum Number of Instances: *"
          placeholder="Enter maximum instances"
          inputType="text"
          value={maxInstances}
          onChange={(e) => setMaxInstances(e.target.value)}
        />

        <InputFields
          label="AMI (Linux/Ubuntu/Windows): *"
          placeholder="Enter AMI"
          inputType="text"
          value={ami}
          onChange={(e) => setAmi(e.target.value)}
        />

        <InputFields
          label="Instance Type (e.g., t2.micro): *"
          placeholder="Enter instance type"
          inputType="text"
          value={instanceType}
          onChange={(e) => setInstanceType(e.target.value)}
        />

        <InputFields
          label="Key Pair Name: *"
          placeholder="Enter key pair"
          inputType="text"
          value={keyPair}
          onChange={(e) => setKeyPair(e.target.value)}
        />

        <InputFields
          label="Security Groups: *"
          placeholder="Enter security groups"
          inputType="text"
          value={securityGroups}
          onChange={(e) => setSecurityGroups(e.target.value)}
        />

        <InputFields
          label="Storage Configuration (in GiB): *"
          placeholder="Enter storage"
          inputType="text"
          value={storage}
          onChange={(e) => setStorage(e.target.value)}
        />

        <InputFields
          label="DB Engine Type: *"
          placeholder="Enter DB engine"
          inputType="text"
          value={dbEngine}
          onChange={(e) => setDbEngine(e.target.value)}
        />

        <InputFields
          label="Engine Version: *"
          placeholder="Enter engine version"
          inputType="text"
          value={engineVersion}
          onChange={(e) => setEngineVersion(e.target.value)}
        />

        <InputFields
          label="Environment (Production/Dev/Test): *"
          placeholder="Enter environment"
          inputType="text"
          value={environment}
          onChange={(e) => setEnvironment(e.target.value)}
        />

        <InputFields
          label="Specs (vCPUs, Memory, Storage): *"
          placeholder="Enter specs"
          inputType="text"
          value={specs}
          onChange={(e) => setSpecs(e.target.value)}
        />

        <InputFields
          label="Availability (Multi-AZ/No Replicas): *"
          placeholder="Enter availability"
          inputType="text"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        />
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
            focusSubject={"Microservice architecture?"}
          />
        )}
      </div>
    </section>
  );
};

export default MicroservicesForm;
