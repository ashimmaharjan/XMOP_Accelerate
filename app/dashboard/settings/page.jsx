import { IoSettings } from "react-icons/io5";

const Settings = () => {
  return (
    <section>
      <div className="flex gap-2 text-gray-700">
        <span className="text-3xl mt-1">
          <IoSettings />
        </span>
        <h2 className="font-semibold text-4xl">Settings</h2>
      </div>

      <span className="text-zinc-400">
        Configure application based on your preferences.
      </span>
    </section>
  );
};

export default Settings;
