import React, { use, useState } from "react";
import { X, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManageProfile = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#F6F8FA] h-screen p-[32px] ">
      
      <div className="flex items-center justify-between ">
        <h1 className="font-medium text-[20px] ">Manage Profiles</h1>
        <div className="flex justify-center items-center gap-[26px]">
          <img src="./gift.svg" alt="" />
          <img src="./notificationHeader.svg" alt=""></img>

          {/* <div
            className="w-[219px] h-[48px] bg-white border border-[#EFF2F1] rounded-[8px] flex items-center px-[20px] py-[8px] justify-between ml-[20px]"
            style={{ fontFamily: "Poppins" }}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  isAvailable ? "bg-[#12B76A]" : "bg-[#F04438]"
                }`}
              >
                {isAvailable ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <X className="w-4 h-4 text-white" />
                )}
              </div>
              <span className="text-[#667085] text-[16px]">
                {isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>

            <div className="h-6 border-l border-[#DBE1E7] mx-2" />
            <div
              className={`relative w-[32px] h-[8px] ${
                isAvailable ? "bg-[#12B76A]" : "bg-[#D9D9D9]"
              } rounded-full cursor-pointer transition-all`}
              onClick={() => setIsAvailable(!isAvailable)}
            >
              <div
                className={`absolute top-[-4px] w-[16px] h-[16px] rounded-full transition-all duration-300 ${
                  isAvailable ? "right-0 bg-[#12B76A]" : "left-0 bg-[#667085]"
                }`}
              />
            </div>
          </div> */}
        </div>
      </div>

      <div className="flex justify-center items-center min-h-[90%] gap-[64px]">
        <div
          onClick={() => navigate("/admin/users")}
          className="min-w-[308px] h-[242px] bg-[#FDFDFD] rounded-[12px]  flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition"
        >
          {/* Icon */}
          <img
            src="/add_user_sign.svg"
            alt="Add User Icon"
            className="w-[64px] h-[64px] mb-4"
          />
         
          {/* Title */}
          <h2 className="text-[20px] font-medium text-black mb-2">Users</h2>

          {/* Description */}
          <p className="text-[16px] text-[#667085] text-center leading-[24px] max-w-[240px]">
            Add users, Edit their information, <br />
            Deactivate them
          </p>
        </div>
        <div
          onClick={() => navigate("/admin/roles")}
          className="w-[308px] h-[242px] bg-[#FDFDFD] rounded-[12px]  flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition"
        >
          {/* Icon */}
          <img
            src="./roles_setting.svg"
            alt="roles_setting icon"
            className="w-[64px] h-[64px] mb-4"
          />

          {/* Title */}
          <h2 className="text-[20px] font-medium text-black mb-2">Roles</h2>

          {/* Description */}
          <p className="text-[16px] text-[#667085] text-center leading-[24px] max-w-[240px]">
            Create roles with permissions, assign users to them
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
