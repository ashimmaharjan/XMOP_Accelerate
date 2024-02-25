const InputFields = ({ label, inputType, value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="Email" className="text-gray-500 font-semibold">
        {label}
      </label>
      <input
        type={inputType}
        value={value}
        onChange={onChange}
        className="rounded-md shadow-sm h-10 pl-2 border text-gray-600 border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default InputFields;
