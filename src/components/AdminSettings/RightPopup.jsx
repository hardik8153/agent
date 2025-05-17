import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Authapi from "@/Server/Authapi";

const RightPopup = ({ onClose }) => {
  const [managersdata, setManagersdata] = useState([])
  const [roledata, setRoledata] = useState([])

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    jobTitle: "",
    workNumber: "",
    mobileNumber: "",
    reportingTo: "",
    role: "",
  });


  useEffect(() => {
    roleapi();
    getManagers()
  }, []);

  const roleapi = async () => {
    try {
      const response = await Authapi.roles();
      if (response.success == true) {
        setRoledata(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setRoledata([]);
    }
  };

  const getManagers = async () => {
    try {
      const response = await Authapi.getManagers();
      if (response) {
        setManagersdata(response.managers);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setManagersdata([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    const data = {
      "name": formData.fullName,
      "email": formData.email,
      "jobTitle": formData.jobTitle,
      "workNumber": formData.workNumber,
      "mobileNumber": formData.mobileNumber,
      "managerId": formData.reportingTo,
      "roleId": formData.role
      // "isActive": false,
      // "lastLogin": "2025-04-30T10:00:00Z",
      // "companyName": "SecureDigital",
      // "language": "English",
      // "timeZone": "Asia/Kolkata"
    }
    const Response = await Authapi.postusers(data)
    if (Response) {
      onClose()
    }
  };
  // };

  return (
    <div className="fixed inset-0 flex justify-end bg-black bg-opacity-50 z-10">
      <div className="mt-[25px] mr-[32px]">
        <button
          onClick={onClose}
          className="  
    bg-white/20
    
     w-[64px] h-[64px]  flex justify-center items-center backdrop-blur-[157.5px]  cursor-pointer text-white hover:text-white-700 rounded-full p-[24px] border-[1.59px] border-white-500"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_3645_6644)">
              <path
                d="M9.87949 7.99746L15.6071 2.28317C15.8579 2.03235 15.9988 1.69217 15.9988 1.33745C15.9988 0.982737 15.8579 0.642551 15.6071 0.391731C15.3563 0.14091 15.0161 0 14.6614 0C14.3067 0 13.9665 0.14091 13.7157 0.391731L8.00137 6.11934L2.28708 0.391731C2.03626 0.14091 1.69607 -2.64283e-09 1.34136 0C0.986644 2.64283e-09 0.646458 0.14091 0.395637 0.391731C0.144816 0.642551 0.00390625 0.982737 0.00390625 1.33745C0.00390625 1.69217 0.144816 2.03235 0.395637 2.28317L6.12324 7.99746L0.395637 13.7117C0.144816 13.9626 0.00390625 14.3028 0.00390625 14.6575C0.00390625 15.0122 0.144816 15.3524 0.395637 15.6032C0.646458 15.854 0.986644 15.9949 1.34136 15.9949C1.69607 15.9949 2.03626 15.854 2.28708 15.6032L8.00137 9.87558L13.7157 15.6032C13.9665 15.854 14.3067 15.9949 14.6614 15.9949C15.0161 15.9949 15.3563 15.854 15.6071 15.6032C15.8579 15.3524 15.9988 15.0122 15.9988 14.6575C15.9988 14.3028 15.8579 13.9626 15.6071 13.7117L9.87949 7.99746Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_3645_6644">
                <rect width="16" height="15.9973" fill="white" />
              </clipPath>
            </defs>
          </svg>

          {/* <FaTimes className="w-10 h-10" /> */}
        </button>
      </div>
      <div className="bg-[#F6F8FA]  w-full max-w-md overflow-auto shadow-xl flex flex-col p-[32px] transition-transform transform duration-300 ease-in-out">
        <h2 className="text-[20px] font-semibold  text-gray-800">Add User</h2>
        <hr className="mt-[20px]" />
        <form className="flex flex-col flex-grow" onSubmit={handleSaveClick}>
          {/* Email */}
          {/* <div className="mt-[32px]">
            <label
              htmlFor="email"
              className="block text-[10px]  font-normal text-[#667085]"
            >
              Email
            </label>

            <div
              className="
    w-[362px]
    h-[41px]
    bg-white
    border
    border-[#EFF2F1]
    rounded-lg
    flex
    items-center
    justify-between
    px-3
    mt-[8px]
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
    "
              >
                <option>Click to select</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>

              <div className="absolute right-[4.2rem] mt-[2px]  pointer-events-none">
                <img
                  src="../arrow_down.svg"
                  alt="dropdown"
                  className="w-3 h-3"
                />
              </div>
            </div>

           
          </div> */}
          <div className="mt-[32px]">
            <label
              htmlFor="fullName"
              className="block text-[10px]  font-normal text-[#667085]"
            >
              email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Like 'Nikhil Pandey'"
              className="w-[362px] h-[41px] bg-[#FFFFFF] border border-[#EFF2F1] mt-[8px]  px-[20px] py-[10px] text-[14px] text-[#000000] font-normal rounded-[8px] focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
              required
            />
          </div>


          {/* Full Name */}
          <div className="mt-[32px]">
            <label
              htmlFor="fullName"
              className="block text-[10px]  font-normal text-[#667085]"
            >
              Full name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Like 'Nikhil Pandey'"
              className="w-[362px] h-[41px] bg-[#FFFFFF] border border-[#EFF2F1] mt-[8px]  px-[20px] py-[10px] text-[14px] text-[#000000] font-normal rounded-[8px] focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
              required
            />
          </div>

          {/* Job Title */}
          <div className="mt-[32px]">
            <label
              htmlFor="jobTitle"
              className="block text-[10px]  font-normal text-[#667085]"
            >
              Job title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              placeholder="Like 'SDR'"
              className="w-[362px] h-[41px] bg-[#FFFFFF] border border-[#EFF2F1] mt-[8px]  px-[20px] py-[10px] text-[14px] text-[#000000] font-normal rounded-[8px] focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
              required
            />
          </div>

          {/* Work Number */}
          <div className="mt-[32px]">
            <label
              htmlFor="workNumber"
              className="block text-[10px]  font-normal text-[#667085]"
            >
              Work number
            </label>
            <input
              type="text"
              id="workNumber"
              name="workNumber"
              value={formData.workNumber}
              onChange={handleInputChange}
              placeholder="User's Official Contact No."
              className="w-[362px] border border-[#EFF2F1] rounded-md px-3 py-2 mt-[8px] text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
              required
            />
          </div>

          {/* Mobile Number */}
          <div className="mt-[32px]">
            <label
              htmlFor="mobileNumber"
              className="block text-[10px]  font-normal text-[#667085]"
            >
              Mobile number
            </label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              placeholder="User's Personal Contact No."
              className="w-[362px] h-[41px] bg-[#FFFFFF] border border-[#EFF2F1] mt-[8px]  px-[20px] py-[10px] text-[14px] text-[#000000] font-normal rounded-[8px] focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
              required
            />
          </div>

          {/* Reporting To */}
          <div className="mt-[32px]">
            <label
              htmlFor="reportingTo"
              className="block text-[10px]  font-normal text-[#667085]"
            >
              Reporting to
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
               id="reportingTo"
                name="reportingTo"
               value={formData.reportingTo}
               onChange={handleInputChange}
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
                {managersdata.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>

              <div className="absolute top-[39.4rem] right-[4.2rem] pointer-events-none">
                <img
                  src="../arrow_down.svg"
                  alt="dropdown"
                  className="w-3 h-3"
                />
              </div>
            </div>

            {/* <select
              id="reportingTo"
              name="reportingTo"
              value={formData.reportingTo}
              onChange={handleInputChange}
              className="w-[362px] h-[41px] bg-[#FFFFFF] border border-[#EFF2F1] mt-[8px]  px-[20px] py-[10px] text-[14px] text-[#000000] font-normal rounded-[8px] focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
              required
            >
              <option value="" disabled>
                Click to select
              </option>
              <option value="Manager1">Manager 1</option>
              <option value="Manager2">Manager 2</option>
            </select> */}
          </div>

          {/* <hr className="mt-[32px]" /> */}

          {/* Role */}
          <div className="mt-[64px]">
            <label
              htmlFor="role"
              className="block text-[10px] font-normal text-[#667085]"
            >
              Role
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
      relative
    "
            >
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
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
  "
                required
              >
                <option value="" disabled>
                  Click to select
                </option>
                {roledata.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>


              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <img src="../arrow_down.svg" alt="dropdown" className="w-3 h-3" />
              </div>
            </div>
          </div>


          <button className="w-[132px] h-[37px] rounded-[8px] bg-[#2A85FF] text-center text-[#FFFFFF] font-poppins text-[14px] font-semibold mt-[32px] ml-auto " >
            Add
          </button>

          {/* Save Button */}
        </form>
      </div>
    </div>
  );
};

export default RightPopup;
