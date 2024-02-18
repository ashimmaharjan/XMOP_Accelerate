import { MdOutlineCancel } from "react-icons/md";
import Divider from "./Divider";

const Modal = ({ closeModal, architectureChosen }) => {
  return (
    <section>
      <div
        className="w-screen h-screen bg-gray-900 opacity-90 fixed top-0 left-0 flex justify-center items-center"
        onClick={closeModal}
      ></div>

      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="w-[400px] outline-none border-none py-5 bg-sky-50 rounded shadow-xl">
          <p className="flex justify-between items-center font-bold px-5">
            <h3 className="text-xl text-gray-700">Confirmation</h3>

            <button className="text-3xl" onClick={closeModal}>
              <MdOutlineCancel className="text-red-500" />
            </button>
          </p>

          <Divider />

          <p className="text-gray-600 ml-3">
            Are you sure you would like to deploy{" "}
            <span className="font-semibold">{architectureChosen}</span> &nbsp;
            architecture?
          </p>

          <Divider />

          <div className="flex justify-end gap-2 px-5">
            <button className="px-5 py-2 bg-sky-600 text-gray-100 hover:bg-sky-900 transition-all duration-300 ease-in-out">
              Confirm
            </button>
            <button
              className="px-5 py-2 border text-gray-600 hover:bg-red-600 hover:text-gray-100 transition-all duration-300 ease-in-out"
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

export default Modal;
