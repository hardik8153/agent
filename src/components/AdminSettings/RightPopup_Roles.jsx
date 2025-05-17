import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";
import Authapi from "@/Server/Authapi";
const RightPopup_Roles = ({ onClose }) => {
  const [formData, setFormData] = useState({
    roleName: "",
    cloneRole: "",
    scope: "All Records",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleScopeChange = (scope) => {
    setFormData({ ...formData, scope });
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    const data = {
      createdById: "5b490f56-c0e2-4c55-9b15-b725e7355c24",
      name: formData.roleName,
      description: "this is account admin dfd",
      defaultScope: formData.scope
    }

    const response = await Authapi.addroles(data)
    if (response.success == true) {
      onClose()
    }
  };

  return (
    <div className="fixed inset-0 flex justify-end bg-black bg-opacity-50 z-10">
      <div className="mt-[25px] mr-[32px]">
        <button
          onClick={onClose}
          className="  
    bg-white/20
    
    box-border w-[64px] h-[64px] flex justify-center items-center backdrop-blur-[157.5px]  cursor-pointer text-white hover:text-white-700 rounded-full p-2 border-2 border-white-500"
        >
          {/* <FaTimes className="w-10 h-10" /> */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_3645_5972)">
              <path
                d="M9.87558 7.99746L15.6032 2.28317C15.854 2.03235 15.9949 1.69217 15.9949 1.33745C15.9949 0.982737 15.854 0.642551 15.6032 0.391731C15.3524 0.14091 15.0122 0 14.6575 0C14.3028 0 13.9626 0.14091 13.7117 0.391731L7.99746 6.11934L2.28317 0.391731C2.03235 0.14091 1.69217 -2.64283e-09 1.33745 0C0.982737 2.64283e-09 0.642551 0.14091 0.391731 0.391731C0.14091 0.642551 2.64283e-09 0.982737 0 1.33745C-2.64283e-09 1.69217 0.14091 2.03235 0.391731 2.28317L6.11934 7.99746L0.391731 13.7117C0.14091 13.9626 0 14.3028 0 14.6575C0 15.0122 0.14091 15.3524 0.391731 15.6032C0.642551 15.854 0.982737 15.9949 1.33745 15.9949C1.69217 15.9949 2.03235 15.854 2.28317 15.6032L7.99746 9.87558L13.7117 15.6032C13.9626 15.854 14.3028 15.9949 14.6575 15.9949C15.0122 15.9949 15.3524 15.854 15.6032 15.6032C15.854 15.3524 15.9949 15.0122 15.9949 14.6575C15.9949 14.3028 15.854 13.9626 15.6032 13.7117L9.87558 7.99746Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_3645_5972">
                <rect width="16" height="15.9973" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>

      <div className="bg-[#F6F8FA] overflow-auto w-full max-w-md  shadow-xl flex flex-col p-[32px] transition-transform transform duration-300 ease-in-out">
        <h2 className="text-[20px] font-semibold text-gray-800">Create Role</h2>
        <hr className="mt-[20px]" />

        <form className="flex flex-col flex-grow" onSubmit={handleSaveClick}>
          {/* Role Name */}
          <div className="mt-[32px]">
            <label
              htmlFor="roleName"
              className="block text-[10px] font-normal text-[#667085]"
            >
              Role name
            </label>
            <input
              type="text"
              id="roleName"
              name="roleName"
              value={formData.roleName}
              onChange={handleInputChange}
              placeholder="Like 'Nikhil Pandey'"
              className="w-[362px] h-[41px] bg-[#FFFFFF] border border-[#EFF2F1] mt-[8px] px-[20px] py-[10px] text-[14px] text-[#000000] font-normal rounded-[8px] focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
              required
            />
          </div>

          {/* Clone Role */}
          <div className="mt-[32px]">
            <label
              htmlFor="cloneRole"
              className="block text-[10px] font-normal text-[#667085]"
            >
              Select a role to clone
            </label>

            <div
              className="
    w-[362px]
    h-[41px]
    mt-[8px]
    bg-[#FFFFFF]
    border
    border-[#EFF2F1]
    rounded-lg
    flex
    items-center
    justify-between
    px-3
    py-[10px]
  "
            >
              <select
                className="
      appearance-none
      w-full
      h-full
      pr-8
      bg-transparent
      outline-none
      text-sm
      text-gray-500
      cursor-pointer
      relative
    "
              >
                <option>Click to select</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>

              <div className="absolute top-[15.6rem] right-[3.8rem] pointer-events-none">
                <img
                  src="../arrow_down.svg"
                  alt="dropdown"
                  className="w-3 h-3"
                />
              </div>
            </div>
          </div>

          <div className="mt-[32px] font-poppins">
            <p className="text-[16px] font-medium text-[#000000] mb-[20px]">
              Set the default scope for this role
            </p>

            {[
              { label: "AlALL_RECORDS", desc: "Can access all records" },
              {
                label: "GROUP_ONLY",
                desc: "Can access records in their groups",
              },
              { label: "OWN_ONLY", desc: "Can access only owned records" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-[16px]  cursor-pointer  mt-[20px] mb-[32px] font-poppins text-[14px] font-normal text-[#0E2339]"
                onClick={() => handleScopeChange(item.label)}
              >
                <div
                  className={`w-[20px] h-[20px] rounded-full border-[2px] flex items-center justify-center ${formData.scope === item.label
                    ? "border-blue-600"
                    : "border-gray-300"
                    }`}
                >
                  {formData.scope === item.label && (
                    <div className="w-[10px] h-[10px] bg-blue-600 rounded-full"></div>
                  )}
                </div>
                <div>
                  <p className="font-poppins text-[14px] font-normal text-[#0E2339]">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-[#667085]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-[132px] h-[37px] rounded-[8px] bg-[#2A85FF] text-center text-[#FFFFFF] font-poppins text-[14px] font-semibold mt-[221px] ml-auto"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default RightPopup_Roles;
