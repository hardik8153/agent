import React from "react";
import { useNavigate } from "react-router-dom";

const TeamManagement = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="font-medium text-[20px] mt-[32px]">Team Management</h1>
      <p className="text-[12px] text-[#667085]">
        Manage your agents, their permissions and group settings
      </p>

      <h1 className="font-poppins font-normal text-[16px] text-[#667085] mt-[48px]">
        Users and Roles
      </h1>

      <div className="mt-[32px] flex items-center gap-[64px]">
        <div 
          onClick={() => navigate("/admin/users")}
          className="w-[238px] h-[60px] flex justify-center items-center gap-[20px] cursor-pointer hover:shadow-lg transition font-poppins">
          <img src="./add_user_sign.svg" />
          <div>
            <h1 className="font-medium text-[14px] text-[#000000]">Users</h1>
            <p className="text-[12px] text-[#667085]">
              Add users, Edit their information, Deactivate them
            </p>
          </div>
        </div>
        <div 
          onClick={() => navigate("/admin/roles")}
          className="w-[238px] h-[60px] flex justify-center items-center gap-[20px] cursor-pointer hover:shadow-lg transition font-poppins">
          <img src="./roles_setting.svg" />
          <div>
            <h1 className="font-medium text-[14px] text-[#000000]">Roles</h1>
            <p className="text-[12px] font-normal text-[#667085]">
              Create roles with permissions, assign users to them
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamManagement;
