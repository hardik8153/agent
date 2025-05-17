import React, { useState, useEffect } from "react";
import { Check, PenSquare, MoreVertical, X } from "lucide-react"; // Added X back
import { useNavigate } from "react-router-dom";
import RightPopup from "./RightPopup";
import Authapi from "@/Server/Authapi";

const Users = () => {
  const [selectedUsers, setSelectedUsers] = useState([1]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [user, setUser] = useState([]); // This will hold users from API
  const [userCategory, setUserCategory] = useState("all"); // Initial category
  const [searchTerm, setSearchTerm] = useState(""); // Add this line

  useEffect(() => {
    userapi();
  }, []);

  const userapi = async () => {
    try {
      const response = await Authapi.users();
      setUser(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setUser([]);
    }
  };

  const filteredUsers = () => {
    let filtered = user;
    if (userCategory === "active") {
      filtered = filtered.filter((u) => u.isActive === true);
    } else if (userCategory === "deactivated") {
      filtered = filtered.filter((u) => u.isActive === false);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((u) => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  // Hardcoded users array (currently not used for display if API call is successful)
  // const users_hardcoded = [ ... ]; // Kept for reference if needed, but filteredUsers uses `user` state

  const toggleUserSelection = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };


  const userupadatestatus1 = async (id, status) => {
    const data = {
      isActive: status
    }
    const response = await Authapi.userupadatestatus(id, data)
    if (response) {
      userapi()
    }
  }

  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCloseCannedResponses = () => {
    setIsPopupOpen(false);
    userapi()
  };

  // Calculate counts for active and deactivated users
  const activeUsersCount = user.filter(u => u.isActive === true).length;
  const deactivatedUsersCount = user.filter(u => u.isActive === false).length;

  return (
    <div className="font-poppins w-full p-[32px] ">
      {/* Header Section */}
      <div className="flex items-center justify-between ">
        <h1 className="font-medium text-[20px] ">Manage Users</h1>
        <div className="flex justify-center items-center gap-[26px]">
          <img src="../gift.svg" alt="gift icon" />
          <img src="../notificationHeader.svg" alt="notification icon" />
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

      {/* Breadcrumbs */}
      <div className="mt-[20px] flex">
        <h1
          onClick={() => navigate("/manageProfile")}
          className="font-poppins font-medium text-[16px] cursor-pointer text-[#2A85FF]"
        >
          Profile
          <span className="text-[#2A85FF] mx-[20px]"> &gt; </span>
        </h1>
        <h1 className="font-poppins font-medium text-[16px] text-[#667085]">
          Users
        </h1>
      </div>

      {/* Filter and Search Section */}
      <div className="flex justify-between mt-[35px] ">
        <div className="flex items-center">
          {/* All Users Button */}
          <div
            className={`w-[149px] h-[48px] border border-[#EAECF0]  flex justify-center items-center rounded-l-[8px] rounded-bl-[8px] cursor-pointer ${userCategory === 'all' ? 'bg-gray-100 shadow-inset-custom' : 'bg-white'
              }`}
            onClick={() => setUserCategory("all")}
          >
            <div className="flex gap-[16px] items-center">
              <h1 className="font-poppins font-normal text-[16px] text-[#000000]">
                All Users
              </h1>
              <button className="bg-[#667085] font-poppins text-[#FFFFFF] text-[10px] w-[26px] h-[23px] font-medium rounded-[8px] flex items-center justify-center">
                {user.length}
              </button>
            </div>
          </div>
          {/* Active Users Button */}
          <div
            className={`w-[149px] h-[48px] flex justify-center items-center border border-l-0 border-[#EAECF0] cursor-pointer ${userCategory === 'active' ? 'bg-gray-100 shadow-inset-custom' : 'bg-white'
              }`}
            onClick={() => setUserCategory("active")}
          >
            <div className="flex gap-[16px] items-center">
              <h1 className="font-poppins font-normal text-[16px] text-[#000000]">
                Active Users
              </h1>
              {/* Optional: Count for active users */}
              <button className="bg-[#12B76A] font-poppins text-[#FFFFFF] text-[10px] w-[26px] h-[23px] font-medium rounded-[8px] flex items-center justify-center">
                {activeUsersCount}
              </button>
            </div>
          </div>
          {/* Deactivated Users Button */}
          <div
            className={`min-w-[170px] h-[48px] flex justify-center items-center border border-l-0 border-[#EAECF0] rounded-r-[8px] rounded-br-[8px] cursor-pointer ${userCategory === 'deactivated' ? 'bg-gray-100 shadow-inset-custom' : 'bg-white'
              }`}
            onClick={() => setUserCategory("deactivated")}
          >
            <div className="flex gap-[16px] px-[20px] py-[12px] items-center">
              <h1 className="font-poppins font-normal text-[16px] text-[#000000]">
                Deactivated Users
              </h1>
              {/* Optional: Count for deactivated users */}
              <button className="bg-[#F04438] font-poppins text-[#FFFFFF] text-[10px] w-[26px] h-[23px] font-medium rounded-[8px] flex items-center justify-center">
                {deactivatedUsersCount}
              </button>
            </div>
          </div>
        </div>

        <div className="w-[397px] h-[48px] bg-[#ffffff] border border-[#EFF2F1] rounded-[8px] flex gap-[12px] px-[20px] items-center py-[10px]">
          <img className="" src="../search-normal.svg" alt="search icon" />
          <input
            placeholder="Search users"
            type="text"
            className="flex-1 outline-none bg-transparent text-[16px] font-normal text-[#667085]"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Add User Button */}
      <div className="w-[125px] h-[37px] bg-[#2A85FF] flex items-center p-[10px] gap-[9px] rounded-[8px] mt-[20px] cursor-pointer"
        onClick={() => setIsPopupOpen(true)}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M10.0033 0.832031C7.25167 0.832031 5.0017 3.082 5.0017 5.83363C5.0017 7.40445 5.73669 8.81026 6.87834 9.72859C3.35839 11.0102 0.830085 14.3785 0.830085 18.3335C0.829644 18.4435 0.850984 18.5525 0.892873 18.6542C0.934763 18.7559 0.996374 18.8483 1.07415 18.9261C1.15193 19.0038 1.24434 19.0655 1.34605 19.1073C1.44775 19.1492 1.55675 19.1706 1.66674 19.1701H10.0033C11.115 19.1701 11.115 17.5035 10.0033 17.5035H2.84173C3.31005 13.8069 6.17585 10.8352 10.0033 10.8352C12.7549 10.8352 14.9966 8.58527 14.9966 5.83363C14.9966 3.082 12.7549 0.832031 10.0033 0.832031ZM10.0033 2.49868C10.4412 2.49735 10.8751 2.58277 11.2798 2.75C11.6846 2.91723 12.0522 3.16296 12.3615 3.47301C12.6708 3.78307 12.9156 4.1513 13.0818 4.55647C13.248 4.96163 13.3324 5.39571 13.3299 5.83363C13.3299 7.68445 11.8541 9.16693 10.0033 9.16693C9.56503 9.16858 9.13076 9.0835 8.7255 8.91659C8.32025 8.74968 7.95203 8.50424 7.64204 8.19441C7.33205 7.88458 7.08643 7.51648 6.91932 7.11131C6.75221 6.70614 6.66691 6.27191 6.66834 5.83363C6.6668 5.39525 6.75201 4.96089 6.91906 4.55558C7.08611 4.15027 7.33171 3.78201 7.64169 3.47203C7.95168 3.16204 8.31994 2.91645 8.72525 2.7494C9.13056 2.58234 9.56492 2.49714 10.0033 2.49868ZM14.9849 10.8219C14.7648 10.8259 14.5551 10.9168 14.4018 11.0748C14.2485 11.2328 14.1639 11.4451 14.1666 11.6652V14.1685H11.6699C11.6411 14.167 11.6122 14.167 11.5833 14.1685C11.3679 14.1875 11.1682 14.2894 11.0264 14.4526C10.8845 14.6158 10.8115 14.8277 10.8228 15.0437C10.834 15.2596 10.9286 15.4628 11.0866 15.6104C11.2446 15.7581 11.4537 15.8386 11.6699 15.8352H14.1666V18.3335C14.1666 18.5547 14.2545 18.7669 14.4109 18.9233C14.5673 19.0798 14.7795 19.1676 15.0007 19.1676C15.222 19.1676 15.4341 19.0798 15.5906 18.9233C15.747 18.7669 15.8349 18.5547 15.8349 18.3335V15.8352H18.3315C18.5525 15.8352 18.7645 15.7474 18.9208 15.5911C19.0771 15.4348 19.1649 15.2229 19.1649 15.0019C19.1649 14.7808 19.0771 14.5689 18.9208 14.4126C18.7645 14.2563 18.5525 14.1685 18.3315 14.1685H15.8349V11.6652C15.8363 11.5535 15.8152 11.4427 15.7728 11.3393C15.7305 11.236 15.6679 11.1422 15.5886 11.0635C15.5093 10.9848 15.415 10.9229 15.3113 10.8814C15.2076 10.8399 15.0966 10.8197 14.9849 10.8219Z" fill="white" />
        </svg>
        <h1 className="font-poppins font-semibold text-[#ffffff]">
          Add User
        </h1>
      </div>

      {/* Users Table */}
      <div className="min-w-[1140px] rounded-lg border border-[#EFF2F1] bg-white mt-[20px]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 text-left text-sm font-medium text-gray-600">
              <th className="px-6 py-4 font-normal">
                <div className="w-[24px] h-[24px] bg-[#FFFFFF] rounded-[4px] border border-[#EAECF0]" />
              </th>
              <th className="px-6 py-4 font-medium">USER</th>
              <th className="px-6 py-4 font-medium">EMAIL</th>
              <th className="px-6 py-4 font-medium">REPORTING MANAGER</th>
              <th className="px-6 py-4 font-medium">ROLE</th>
              <th className="px-6 py-4 font-medium">LAST LOGIN</th>
              <th className="px-6 py-4 font-medium">STATUS</th> {/* Added Status Header */}
            </tr>
          </thead>
          <tbody>
            {filteredUsers().map((u) => ( // Changed user to u to avoid conflict if any
              <tr key={u.id} className="border-b border-gray-200 text-sm">
                <td className="px-6 py-4">
                  <div
                    className={`w-[24px] h-[24px] bg-[#FFFFFF] rounded-[4px] cursor-pointer ${selectedUsers.includes(u.id)
                      ? "bg-blue-500"
                      : "border-2 border-[#EAECF0]"
                      }`}
                    onClick={() => toggleUserSelection(u.id)}
                  >
                    {selectedUsers.includes(u.id) && (
                      <Check className="text-white" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 font-poppins font-normal text-[14px] flex justify-between items-center">
                  {u.name}
                  <div className="flex gap-[16px]">
                    <img src="../pen.svg" alt="edit icon" className="cursor-pointer" />
                    <MoreVertical className="h-4 w-4 cursor-pointer" />
                  </div>
                </td>
                <td className="px-6 py-4 font-poppins font-normal text-[14px]">
                  {u.email}
                </td>
                <td className="px-6 py-4 font-poppins font-normal text-[14px]">
                  {u?.manager?.name || "-"} {/* Handle if manager or manager.name is undefined */}
                </td>
                <td className="px-6 py-4 font-poppins font-normal text-[14px]">
                  <span className="text-[#2A85FF] underline">
                    {u?.role?.name || "N/A"} {/* Handle if role or role.name is undefined */}
                  </span>
                </td>
                <td className="px-6 py-4 font-poppins font-normal text-[14px]">
                  {u.lastLogin || "Never"}
                </td>
                <td className="px-6 py-4 font-poppins font-normal text-[14px]">
                  {/* {u.isActive ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    <span className="text-red-600">Deactivated</span>
                  )} */}
                  <div
                    className={`relative w-[32px] h-[8px] ${u.isActive ? "bg-[#12B76A]" : "bg-[#D9D9D9]"
                      } rounded-full cursor-pointer transition-all`}
                    onClick={() => userupadatestatus1(u.id, !u.isActive)}
                  >
                    <div
                      className={`absolute top-[-4px] w-[16px] h-[16px] rounded-full transition-all duration-300 ${u.isActive ? "right-0 bg-[#12B76A]" : "left-0 bg-[#667085]"
                        }`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {filteredUsers().length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  No users found for the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isPopupOpen && <RightPopup onClose={handleCloseCannedResponses} />}
    </div>
  );
};

export default Users;