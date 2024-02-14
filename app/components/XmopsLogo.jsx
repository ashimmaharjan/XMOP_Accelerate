import { FaXmark } from "react-icons/fa6";

const XmopsLogo = () => {
  return (
    <div className="w-32 h-12 absolute right-6 top-[-25px] shadow-md flex justify-center items-center text-white bg-gradient-to-br from-[#00B0B7] to-[#05CEA1] rounded-full">
      <FaXmark className="text-3xl" />
      <span className="font-light ml-[-5px] mt-1">MOPS</span>
    </div>
  );
};

export default XmopsLogo;
