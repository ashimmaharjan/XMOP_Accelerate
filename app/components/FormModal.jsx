import { MdOutlineCancel } from "react-icons/md";
import Divider from "./Divider";

const FormModal = ({ closeModal, children, title, icon }) => {
  return (
    <section>
      <div
        className="w-screen h-screen bg-gray-900 opacity-90 fixed top-0 left-0 flex justify-center items-center"
        onClick={closeModal}
      ></div>

      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center overflow-hidden">
        <div className="w-auto md:min-w-[600px] h-auto max-h-[700px] outline-none border-none py-5 bg-sky-50 rounded shadow-xl overflow-hidden">
          <div className="flex justify-between items-center font-bold px-5">
            <div className="flex items-center gap-2 h-full text-xl text-gray-700">
              <div className="text-2xl">{icon}</div>
              <h3>{title} Deployment</h3>
            </div>

            <button className="text-2xl" onClick={closeModal}>
              <MdOutlineCancel className="text-red-500" />
            </button>
          </div>

          <Divider />

          <div>{children}</div>
        </div>
      </div>
    </section>
  );
};

export default FormModal;
