import React, { useState } from "react";
import SettingsHeader from "../components/AdminSettings/SettingsHeader";
import SidebarMenu from "../components/AdminSettings/LeftMenu";
import SearchBar from "../components/AdminSettings/SearchBar";
import ChannelsSection from "../components/AdminSettings/ChannelSection";
// import PlaceholderSection from "../components/AdminSettings/PlaceholderSection";
import TeamManagement from "@/components/AdminSettings/TeamManagement";
import CsSettings from "./Settings/CsSettings";

import { useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";
import Integration from "./Settings/Integration/Integration";
import AccountBilling from "@/components/AdminSettings/AccountBilling";


const AdminSettings = () => {
  const menuItems = [
    {
      id: "channels",
      title: "Channels",
      description: "Connect your channels to engage your contacts",
    },
    {
      id: "Intelliassign & Auto Response",
      title: "Intelliassign & Auto Response",
      description: "Configure ticket assignment rules and customize the auto-response journey.",
    },
    {
      id: "workflow",
      title: "Configuration and Workflow",
      description:
        "Manage workflows, campaigns, collaboration and other configurations",
    },
    {
      id: "ai",
      title: "Freddy AI and Self Service",
      description: "Manage Bots, FAQs and empower support with Freddy AI",
    },
    {
      id: "marketplace",
      title: "Marketplace and Integrations",
      description: "Manage Marketplace apps, native integrations and APIs",
    },
    {
      id: "team",
      title: "Team Management",
      description: "Manage user teams, their permissions and group settings",
    },
    {
      id: "Integrations",
      title: "Integrations",
      description: "Manage Marketplace apps, native integrations and APIs",
    },
    {
      id: "data",
      title: "Data and Security",
      description:
        "Import your data, and manage account security and compliance",
    },

    {
      id: "account-billing",
      title: "Account & Billing",
      description: "Manage your account settings and billing information"
    },
  ];

  const channels = [
    {
      id: 1,
      name: "Web Chat",
      description: "Customize and install chat widget on your website",
    },
    {
      id: 2,
      name: "Whatsapp",
      description: "Customize and install chat widget on your website",
    },
    {
      id: 3,
      name: "SMS",
      description: "Customize and install chat widget on your website",
    },
    {
      id: 4,
      name: "Instagram",
      description: "Customize and install chat widget on your website",
    },
    {
      id: 5,
      name: "Facebook Messenger",
      description: "Customize and install chat widget on your website",
    },
    {
      id: 6,
      name: "Line",
      description: "Customize and install chat widget on your website",
    },
    {
      id: 7,
      name: "Mobile SDK",
      description: "Customize and install chat widget on your website",
    },
    {
      id: 8,
      name: "Support Email",
      description: "Customize and install chat widget on your website",
    },
    {
      id: 9,
      name: "Phone",
      description: "Customize and install chat widget on your website",
    },
    {
      id: 10,
      name: "Channel Apps",
      description: "Customize and install chat widget on your website",
    },
  ];

  const [selectedMenu, setSelectedMenu] = useState("channels");

  const selectedItem = menuItems.find((item) => item.id === selectedMenu);

  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();

  return (

    <div className="min-h-screen w-full  px-[32px] bg-[#F6F8FA]  font-poppins py-[32px]">


      <div className="flex items-center  justify-between ">
        <h1 className="font-medium text-[20px] ">Settings</h1>
        <div className="flex justify-center items-center gap-[26px]">
          <img src="./gift.svg" alt="" />
          <img src="./notificationHeader.svg" alt=""></img>

          {/* <div
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
          </div> */}
        </div>
      </div>


      {/* <div className="mt-[20px]  w-full flex gap-[20px]"> */}


      <div className="min-h-screen w-full mx-[32px] font-poppins">
        {/* <SettingsHeader /> */}
        <div className="mt-[20px] w-full flex gap-[20px]">

          <SidebarMenu
            menuItems={menuItems}
            selectedMenu={selectedMenu}
            onSelect={setSelectedMenu}
          />

          <div className="w-[75%] h-[574px] px-4 overflow-y-auto  rounded-lg">

            <SearchBar />
            {selectedMenu === "channels" ? (
              <ChannelsSection channels={channels} />
            ):
            selectedMenu === "Intelliassign & Auto Response" ? (
              <CsSettings />
            )
            : selectedMenu === "team" ? (
              <TeamManagement />
            ) 
            : selectedMenu === "Integrations" ? (
              <Integration />
            )
            : selectedMenu === "account-billing" ? (
              <AccountBilling />
            ) : (
              ""
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminSettings;
