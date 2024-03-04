import { useState } from "react";
import InputFields from "./InputFields";
import ConfirmationModal from "./ConfirmationModal";
import Divider from "./Divider";
import { GrDeploy } from "react-icons/gr";

const MonolithForm = ({ closeModal }) => {
  const [awsRegion, setAwsRegion] = useState("");
  const [image, setImage] = useState("");
  const [instanceType, setInstanceType] = useState("");
  const [keyPair, setKeyPair] = useState("");
  const [sshAllowed, setSshAllowed] = useState(false);
  const [httpAllowed, setHttpAllowed] = useState(false);
  const [storage, setStorage] = useState("");
  const [dbType, setDbType] = useState("");
  const [phpVersion, setPhpVersion] = useState("");
  const [webServer, setWebServer] = useState("");

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
          label="Image (OS): *"
          placeholder="Enter image"
          inputType="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <InputFields
          label="Instance Type: *"
          placeholder="Enter instance type"
          inputType="text"
          value={instanceType}
          onChange={(e) => setInstanceType(e.target.value)}
        />

        <div className="flex flex-col gap-1">
          <label className="text-gray-500 font-semibold">
            Key Pair Name - New or Existing: *
          </label>
          <input
            type="text"
            value={keyPair}
            onChange={(e) => setKeyPair(e.target.value)}
            className="rounded-md shadow-sm h-10 pl-2 border text-gray-600 border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="sshAllow"
            checked={sshAllowed}
            onChange={(e) => setSshAllowed(e.target.checked)}
            className="h-5 w-5 text-sky-500 border-gray-300 focus:ring-sky-500"
          />
          <label htmlFor="sshAllow" className="text-gray-500">
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
          <label htmlFor="httpAllow" className="text-gray-500">
            Allow HTTP
          </label>
        </div>

        <InputFields
          label="Storage in GiB for EBS Volume: *"
          placeholder="Enter storage"
          inputType="text"
          value={storage}
          onChange={(e) => setStorage(e.target.value)}
        />

        <InputFields
          label="DB Type: *"
          placeholder="Enter DB type"
          inputType="text"
          value={dbType}
          onChange={(e) => setDbType(e.target.value)}
        />

        <InputFields
          label="PHP Version: *"
          placeholder="Enter PHP version"
          inputType="text"
          value={phpVersion}
          onChange={(e) => setPhpVersion(e.target.value)}
        />

        <InputFields
          label="Web Server (Apache or Nginx) Version: *"
          placeholder="Enter web server version"
          inputType="text"
          value={webServer}
          onChange={(e) => setWebServer(e.target.value)}
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
            focusSubject={"Monolith architecture?"}
          />
        )}
      </div>
    </section>
  );
};

export default MonolithForm;
