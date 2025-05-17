import React, { useState } from "react";
// import SettingsHeader from "../components/AdminSettings/SettingsHeader";
import SidebarMenu from "../../components/AdminSettings/LeftMenu";
import SearchBar from "../../components/AdminSettings/SearchBar";
import ChannelsSection from "../../components/AdminSettings/ChannelSection";
// import PlaceholderSection from "../../components/AdminSettings/PlaceholderSection";
// import TeamManagement from "@/components/AdminSettings/TeamManagement";
import { useNavigate } from "react-router-dom";
import { Check, Mail, X } from "lucide-react";
import RC_Left_Menu from "./RC_Left_Menu";
import { useParams } from "react-router-dom";
import ChannelApps from "./Webchatmodel/ChannelApps";
import Whatsapp from "./Webchatmodel/Whatsapp";
import FacebookMessenger from "./Webchatmodel/FacebookMessenger";
import Instagram from "./Webchatmodel/Instagram";
import MobileSDK from "./Webchatmodel/MobileSDK";
import SupportEmail from "./Webchatmodel/SupportEmail";

const RecomendationChannels = () => {
  const { id } = useParams(); // URL param like /channels/1
  const numericId = parseInt(id, 10); // convert to number

  const channels = [
    {
      id: 1,
      name: "Web Chat",
    },
    {
      id: 2,
      name: "Whatsapp",
    },
    {
      id: 3,
      name: "SMS",
    },
    {
      id: 4,
      name: "Instagram",
    },
    {
      id: 5,
      name: "Facebook Messenger",
    },
    {
      id: 6,
      name: "Line",
    },
    {
      id: 7,
      name: "Mobile SDK",
    },
  ];

  const selectedItem = channels.find((item) => item.id === numericId);
  const selectedMenu = selectedItem?.name || "Web Chat"; // fallback

  // const [selectedMenu, setSelectedMenu] = useState("Web Chat");

  // const selectedItem = channels.find((item) => item.id === selectedMenu);

  const [isAvailable, setIsAvailable] = useState(false);
  // const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full  px-[32px] bg-[#F6F8FA]  font-poppins py-[32px]">
      <div className="flex items-center  justify-between ">
        <h1 className="font-medium text-[20px] ">Settings</h1>
        <div className="flex justify-center items-center gap-[26px]">
          <img src="../gift.svg" alt="" />
          <img src="../notificationHeader.svg" alt=""></img>

          <div
            className="w-[219px] h-[48px] bg-white border border-[#EFF2F1] rounded-[8px] flex items-center px-[20px] py-[8px] justify-between ml-[20px]"
            style={{ fontFamily: "Poppins" }}
          >
            {/* Left Side: Icon + Text */}
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

            {/* Middle: Vertical Divider */}
            <div className="h-6 border-l border-[#DBE1E7] mx-2" />

            {/* Right Side: Toggle Switch */}
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

      <div className="mt-[20px]  w-full flex gap-[20px]">
        <RC_Left_Menu channels={channels} selectedMenu={selectedMenu} />

        {console.log(selectedMenu)}

        {selectedMenu == "Web Chat" && (
          <ChannelApps />
        )}

        {selectedMenu == "Whatsapp" && (
          <Whatsapp />
        )}
        {selectedMenu == "Facebook Messenger" && (
          <FacebookMessenger />
        )}

        {selectedMenu == "Instagram" && (
          <Instagram />
        )}

        {selectedMenu == "Support Email" && (
          <SupportEmail />
        )}
         {selectedMenu == "Mobile SDK" && (
          <MobileSDK />
        )}

        {/* <RC_Left_Menu
          channels={channels}
          selectedMenu={selectedMenu}
          onSelect={setSelectedMenu}
        /> */}
      </div>
    </div>
  );
};

export default RecomendationChannels;

{
  /* <div className="w-[75%] h-[574px]">
          <SearchBar />
          {selectedMenu === "channels" ? (
            <ChannelsSection channels={channels} />
          ) : selectedMenu === "team" ? (
            <TeamManagement />
          ) : (
            <PlaceholderSection
              title={selectedItem?.title}
              description={selectedItem?.description}
            />
          )}
        </div> */
}
