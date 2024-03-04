import { MdOutlineCancel } from "react-icons/md";
import Divider from "./Divider";
import { FiAlertOctagon } from "react-icons/fi";
import { FaCircleCheck } from "react-icons/fa6";

const ConfirmationModal = ({
  closeModal,
  confirmAction,
  message,
  focusSubject,
}) => {
  return (
    <section>
      <div
        className="w-screen h-screen bg-gray-900 opacity-90 fixed top-0 left-0 flex justify-center items-center"
        onClick={closeModal}
      ></div>

      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="w-[400px] outline-none border-none py-5 bg-sky-50 rounded shadow-xl">
          <div className="flex justify-between items-center font-bold px-5">
            <div className="flex items-center gap-2 h-full text-xl text-gray-700">
              <FiAlertOctagon className="text-2xl" />
              <h3>Confirmation</h3>
            </div>

            <button className="text-2xl" onClick={closeModal}>
              <MdOutlineCancel className="text-red-500" />
            </button>
          </div>

          <Divider />

          <p className="text-gray-600 px-6">
            {message}
            <span className="font-semibold"> {focusSubject} </span>
          </p>

          <Divider />

          <div className="flex justify-end gap-2 px-5">
            <button
              onClick={confirmAction}
              className="flex items-center gap-1 px-5 py-2 bg-sky-600 text-gray-100 hover:bg-sky-700 hover:text-white transition-all duration-300 ease-in-out"
            >
              <FaCircleCheck />
              Confirm
            </button>
            <button
              className="px-5 py-2 border text-gray-600 hover:bg-gray-200 transition-all duration-300 ease-in-out"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationModal;
