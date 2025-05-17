import { MoreVertical, Check } from "lucide-react";
import React, { useState, useEffect } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import Authapi from "@/Server/Authapi";

const usersList = [];

for (let i = 1; i <= 8; i++) {
  usersList.push({
    name: "Vimal Gosain",
    email: "vimal" + i + "@powerpush.ai",
  });
}

const AssignUsers = ({ data, onClose }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [user, setUser] = useState([]);


  useEffect(() => {
    userapi();
  }, []);

  const userapi = async () => {
    try {
      const response = await Authapi.users();
      setUser(Array.isArray(response) ? response : []);
    } catch (error) {
      setUser([]);
    }
  };


  const haldlesubmit = async () => {
    const data1 = {
      roleId: data,
      userIds: selectedUsers
    }
    const response = await Authapi.assignusers(data1)
    if (response.success == true) {
      onClose()
    }

  }
  const toggleUser = (email) => {
    setSelectedUsers((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

  const toggleAll = () => {
    if (selectedUsers.length === usersList.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(usersList.map((user) => user.email));
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

      <div className=" bg-[#F6F8FA] p-8 w-[500px] overflow-auto">
        <h1 className="text-[32px] font-medium text-[#000000]">Assign Users</h1>
        <hr className="mt-[20px]" />

        <h2 className="mt-[32px] font-medium text-[20px] text-[#000000]">
          Admin
        </h2>
        <p className="text-[14px] text-[#667085]">Assign users to this role</p>

        <div className="mt-[32px] bg-white border border-[#EFF2F1] rounded-md">
          <div className="mx-4 my-4 flex gap-3 items-center border border-[#EFF2F1] rounded-md px-4 py-2">
            <img className="" src="../search-normal.svg" alt="" />
            <input
              placeholder="Search users"
              type="text"
              className="flex-1 outline-none bg-transparent text-sm"
            />
          </div>

          <div className="flex justify-between px-4 text-xs font-medium text-[#667085] mb-2 mr-[8rem]">
            <div className="flex gap-2 items-center">
              <div
                className={`w-[20px] h-[20px] rounded-[4px] border border-[#EAECF0] cursor-pointer ${selectedUsers.length === usersList.length ? "bg-blue-500" : ""
                  }`}
                onClick={toggleAll}
              >
                {selectedUsers.length === usersList.length && (
                  <Check className="text-white w-4 h-4 mx-auto mt-[2px]" />
                )}
              </div>
              USER
            </div>
            <div>EMAIL</div>
          </div>

          <hr className="mx-[16px]" />

          <div className="min-h-[350px] mr-[2rem]">
            {user.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center px-4 py-3 border-b border-[#EFF2F1] text-sm"
              >
                <div className="flex gap-3 items-center">
                  <div
                    className={`w-[20px] h-[20px] rounded-[4px] border border-[#EAECF0] cursor-pointer flex items-center justify-center ${selectedUsers.includes(user.id) ? "bg-blue-500" : ""
                      }`}
                    onClick={() => toggleUser(user.id)}
                  >
                    {selectedUsers.includes(user.id) && (
                      <Check className="text-white w-4 h-4" />
                    )}
                  </div>
                  {user.name}
                </div>
                <div>{user.email}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end  mt-[106px]">
          <button className="bg-[#2A85FF] text-white px-6 py-2 rounded-md font-semibold text-sm" onClick={haldlesubmit}>
            Assign ({selectedUsers.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignUsers;
