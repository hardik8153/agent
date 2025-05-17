import React, { useState, useRef, useEffect } from "react";
import { X, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RightPopup_Roles from "./RightPopup_Roles";
import RightPopup_AssignUsers from "./RightPopup_AssignUsers";
import { setting_icon_svg, assign_user_svg } from "@/utils/additional_svg";
import Authapi from "@/Server/Authapi";

const RolesAndPermission = () => {
  const [roledata, setRoledata] = useState([])

  const navigate = useNavigate();
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopup2open, setIsPopup2open] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [open, setOpen] = useState("");
  const dropdownRef = useRef(null); 

  const handleCloseCannedResponses = () => {
    setIsPopupOpen(false);
    setIsPopup2open(false);
    roleapi()
  };

  useEffect(() => {
    roleapi();
  }, []);

  const roleapi = async () => {
    try {
      const response = await Authapi.roles();
      if (response.success == true) {
        setRoledata(response.data);
      }
    } catch (error) {
      setRoledata([]);
    }
  };


  // Function to handle delete
  const handleDelete = async (id) => {
    const response = await Authapi.deleteroles(id)
    if (response.success == true) {
      roleapi()
    }
    
    // setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
    // setOpen(null); // Close the dropdown after deletion
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(null); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="font-poppins w-full h-[800px] p-[32px]">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-[20px]">Manage Roles & Permissions</h1>
        <div className="flex justify-center items-center gap-[26px]">
          <img src="../gift.svg" alt="gift" />
          <img src="../notificationHeader.svg" alt="notification" />

          <div
            className="w-[219px] h-[48px] bg-white border border-[#EFF2F1] rounded-[8px] flex items-center px-[20px] py-[8px] justify-between ml-[20px]"
            style={{ fontFamily: "Poppins" }}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${isAvailable ? "bg-[#12B76A]" : "bg-[#F04438]"
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
              className={`relative w-[32px] h-[8px] ${isAvailable ? "bg-[#12B76A]" : "bg-[#D9D9D9]"
                } rounded-full cursor-pointer transition-all`}
              onClick={() => setIsAvailable(!isAvailable)}
            >
              <div
                className={`absolute top-[-4px] w-[16px] h-[16px] rounded-full transition-all duration-300 ${isAvailable ? "right-0 bg-[#12B76A]" : "left-0 bg-[#667085]"
                  }`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[20px] flex justify-between items-center">
        <div className="flex justify-center items-center gap-[20px]">
          <h1
            onClick={() => navigate("/manageProfile")}
            className="font-poppins font-medium text-[16px] cursor-pointer text-[#2A85FF]"
          >
            Profile
          </h1>
          <img src="../bread_crumb_sign.svg" alt="" />

          <h1 className="font-poppins font-medium text-[16px] text-[#667085]">
            Roles & permissions
          </h1>
        </div>

        <div className="min-w-[125px] h-[37px] bg-[#2A85FF] flex items-center p-[12px] gap-[9px] rounded-[8px]">
          {setting_icon_svg()}
          <h1
            onClick={() => setIsPopup2open(true)}
            className="font-poppins font-semibold cursor-pointer text-[#ffffff]"
          >
            Create Role
          </h1>
        </div>
      </div>

      <div className="rounded-lg border border-[#EFF2F1] bg-white mt-[20px] font-poppins">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 text-left text-[12px] font-medium text-[#667085]">
              <th className="px-6 py-4">ROLES</th>
              <th className="px-6 py-4">USERS</th>
              <th className="px-6 py-4">CREATED BY</th>
              <th className="px-6 py-4 ">UPDATED BY</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>

          <tbody>
            {roledata.map((role) => (
              <tr key={role.id} className="border-b border-[#EFF2F1]">
                <td className="px-6 py-3 w-[20%] font-poppins font-normal text-[12px] text-[#2A85FF]">
                  {role.name}
                </td>
                <td className="px-6 py-3 w-[20%] font-poppins font-normal text-[12px] text-[#2A85FF]">
                  <div
                    onClick={() => {
                      setSelectedRoleId(role.id); 
                      setIsPopupOpen(true);       
                    }}
                    className="flex items-center gap-2 cursor-pointer"
                  > 
                    {role?._count.users === 0 && assign_user_svg() }
                    {role?._count.users === 0 && "Assign Users" }
                    {role?._count.users=== 0?"":role?._count.users +" "+ "user"}
                  </div>

                </td>
                <td className="px-6 py-3 flex flex-col w-[80%]">
                  {role.createdAt}{" "}
                  {/* <span className="font-normal text-[12px] text-[#667085] underline">
                    {role.updatedAt}
                  </span> */}
                </td>

                <td className="px-6 py-3 w-[20%]">
                  <div className="flex flex-col w-[60%]">
                    <span className="font-poppins font-normal text-[12px] text-[#000000]">
                      {role.updatedAt}
                    </span>
                    {/* <span className="font-normal text-[12px] text-[#667085] underline">
                      {role.updatedAt}
                    </span> */}
                  </div>
                </td>

                <td className="w-[15%]">
                  <div className="relative inline-block">
                    <div
                      onClick={() => setOpen(open === role.id ? null : role.id)}
                      className="cursor-pointer inline-block"
                    >
                      <img
                        src="../menu_bar_three_dots.svg"
                        alt="menu"
                        className="w-6 h-6"
                      />
                    </div>

                    {open === role.id && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-[-95px] mt-[-50px] bg-white border border-zinc-400 text-[11px] rounded-md w-24"
                      >
                        <p
                          className="px-4 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
                          onClick={(event) => {
                            handleDelete(role.id);
                          }}
                        >
                          Delete
                        </p>
                        <p
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setOpen(null);
                            navigate(`/managePermission/${role.id}`);
                          }}
                        >
                          Manage Permissions
                        </p>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isPopup2open && (
        <RightPopup_Roles onClose={handleCloseCannedResponses} />
      )}

      {isPopupOpen && (
        <RightPopup_AssignUsers data={selectedRoleId} onClose={handleCloseCannedResponses} />
      )}
    </div>
  );
};

export default RolesAndPermission;
