import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Authapi from "@/Server/Authapi";
import { useParams } from "react-router-dom";

const ManagePermission = () => {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(false);
  const [allPermissions, setAllPermissions] = useState([]);
  const [sections, setSections] = useState([]);
  const [checked, setChecked] = useState({});
  const [roleActivePermissionIds, setRoleActivePermissionIds] = useState(new Set());
  const [checkboxid, setCheckboxid] = useState();

  useEffect(() => {
    const fetchAllAvailablePermissions = async () => {
      try {
        const response = await Authapi.managePermission1();
        setAllPermissions(response.data || []);
      } catch (error) {
        console.error("Error fetching all permissions:", error);
        setAllPermissions([]); // Set to empty array on error
      }
    };

    const fetchRoleSpecificPermissions = async () => {
      try {
        const response = await Authapi.managePermissionid(roleId);
        if (response.data && Array.isArray(response.data)) {
          const activeIds = new Set(response.data.map(p => p.id));
          setRoleActivePermissionIds(activeIds);
        } else {
          setRoleActivePermissionIds(new Set()); 
        }
      } catch (error) {
        console.error("Error fetching role-specific permissions:", error);
        setRoleActivePermissionIds(new Set()); 
      }
    };
    fetchAllAvailablePermissions();
    fetchRoleSpecificPermissions();
  }, [roleId]); 

  useEffect(() => {
    if (allPermissions.length > 0) {
      const organized = allPermissions.reduce((acc, item) => {
        const category = item.category;
        if (!acc[category]) {
          acc[category] = { title: category, items: [] };
        }
        acc[category].items.push(item);
        return acc;
      }, {});
      setSections(Object.values(organized));
    } else {
      setSections([]);
    }
  }, [allPermissions]);


  useEffect(() => {
    if (sections.length > 0) {
      const newCheckedState = {};
      sections.forEach(section => {
        section.items.forEach(item => {
          newCheckedState[item.name] = roleActivePermissionIds.has(item.id);
        });
      });
      setChecked(newCheckedState);
    } else {

      setChecked({});
    }
  }, [sections, roleActivePermissionIds]);


  const hadlesubmit = async () => {
    const data = { permissionIds: checkboxid }
    const respons = await Authapi.managePermissionupdate(roleId, data)
    if (respons.success == true) {
      navigate("/admin/roles")
    }
  }


  const toggleCheck = (itemName) => {
    setChecked((prev) => {
      const newCheckedState = { ...prev, [itemName]: !prev[itemName] };
      const checkedItems = sections.flatMap(section =>
        section.items.filter(item => newCheckedState[item.name])
      );
      const checkedInfo = checkedItems.map(item => (item.id));
      setCheckboxid(checkedInfo);
      return newCheckedState;
    });
  };

  return (
    <div className="font-poppins bg-[#F6F8FA] w-full min-h-screen p-[32px]"> 
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
        <div className="flex">
          <div className="flex justify-center items-center gap-[20px]">
            <h1
              onClick={() => navigate("/manageProfile")}
              className="font-poppins font-medium text-[16px] cursor-pointer text-[#2A85FF]"
            >
              Profile
            </h1>
            <img src="../bread_crumb_sign.svg" alt="" />
            <h1
              className="font-poppins font-medium text-[16px] cursor-pointer text-[#2A85FF]"
              onClick={() => navigate("/admin/roles")}
            >
              Roles & permissions
            </h1>
            <img src="../bread_crumb_sign.svg" alt="" />
            <h1 className="font-poppins font-medium text-[16px] text-[#667085]">
              Manage Permissions
            </h1>
          </div>
        </div>
        <div className="min-w-[165px] h-[37px] bg-[#2A85FF] flex items-center justify-center px-[20px] py-[8px] gap-[9px] rounded-[8px] cursor-pointer"> {/* Added cursor-pointer and justify-center */}
          <h1
            onClick={hadlesubmit}
            className="font-poppins font-semibold text-[#ffffff]" 
          >
            Save Permissions
          </h1>
        </div>
      </div>

      <div className="w-full max-w-[1140px] min-h-[504px] bg-white border border-[#EFF2F1] rounded-lg mt-[38px] p-6 overflow-auto"> {/* Adjusted width to be responsive and use max-width */}
        {sections.length === 0 && allPermissions.length > 0 && <p>Organizing permissions...</p>}
        {sections.length === 0 && allPermissions.length === 0 && <p>Loading permissions...</p>}
        {sections.map((section) => ( 
          <div key={section.title} className="mb-8"> 
            <h2 className="text-[#667085] text-[16px] font-normal font-poppins">
              {section.title}
            </h2>
            <div className="flex flex-wrap gap-x-8 gap-y-5 mt-6">
              {section.items.map((item) => ( 
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.name)}
                  className="flex items-center gap-3 cursor-pointer select-none w-fit"
                >
                  <div
                    className={`w-[28px] h-[28px] rounded-lg flex items-center justify-center transition-colors duration-150 ${checked[item.name] ? "bg-[#2A85FF]" : "bg-gray-200"
                      }`}
                  >
                    {checked[item.name] && (
                      <Check size={18} color="#ffffff" strokeWidth={3} />
                    )}
                  </div>
                  <span className="text-black text-[16px] font-normal font-poppins leading-[100%] tracking-[0.4px]">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePermission;