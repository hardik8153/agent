import React, { useState } from "react";
import Chat_Conversation_Status from "./Chat_Conversation_Status";
import ChatAssignmentStatus from "./Chat_Assignment_Status";
import Chat_SLA from "./Chat_SLA";
import Chat_Perfomance_Trend from "./Chat_Perfomance_Trend";
import Chat_Customer_Satisfaction from "./Chat_Customer_Satisfaction";
import All_Available_Agent from "./All_Available_Agent";
import Chat_Incoming_Conversation from "./Chat_Incoming_Conversation";
import Topbar from "./Topbar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { X, Check } from "lucide-react";
import DropDown from "./dropdown/DropDown";
import DropDownHeader from "./dropdown/DropDownHeader";

const Support_Overview = () => {
  const [isAvailable, setIsAvailable] = useState(false);

  const [selected, setSelected] = React.useState("");

  const propertyOptions = [
    { label: "Property A", value: "property-a" },
    { label: "Property B", value: "property-b" },
    { label: "Property C", value: "property-c" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#F6F8FA] p-4 md:p-6 lg:p-8">
      {/* Main container with responsive padding */}
      <div className="  mx-auto">
        {/* <Topbar topbadrdata={topbadrdata} /> */}

        {/* Filters Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex  gap-[32px] mb-">
            <button className=" max-w-[238px] h-[48px] px-6 py-2 border bg-[#FFFFFF] border-[#EAECF0] rounded-[8px] text-sm flex  gap-[58px] items-center justify-between ">
              <h1 className="text-[16px] font-normal font-poppins  leading-[100%] text-[#000000]">
                All Time
              </h1>
              <img className="w-7 h-7" src="./calender.svg" alt="calendar" />
            </button>

            <div className="">
              <DropDownHeader
                options={propertyOptions}
                value={selected}
                onChange={setSelected}
                placeholder="All Groups"
                className=" w-[175px]
        h-[48px]
        bg-[#FFFFFF]
        border border-[#EAECF0]
        rounded-[8px]
        flex
        items-center
        px-[20px]
        py-[12px]
        gap-[38px]
        text-[16px]
        text-[#000000]
        
        "
              />
            </div>

            {/* <DropdownMenu>
              <DropdownMenuTrigger
                className="px-6 h-[46px]  bg-white  border border-[#EAECF0] rounded-[8px] text-sm flex justify-center items-center gap-4"
                asChild
              >
                <Button
                  variant="outline"
                  className="text-[16px] font-poppins font-normal  leading-[100%] "
                >
                  All Groups{" "}
                  <img
                    className="h-[16px] w-[16px]"
                    src="./arrow_down.svg"
                    alt="calender"
                  />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-[150px] flex justify-between ">
                <DropdownMenuRadioItem value="top" className="text-center">
                  Top
                </DropdownMenuRadioItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>

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

        {/* Main Content Grid */}
        <div className="space-y-8">
          {/* Top Row - Conversation Status and Assignment Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-[22px] gap-10 xl:gap-[32px]">
            <Chat_Conversation_Status />
            <ChatAssignmentStatus />
          </div>

          {/* SLA Section */}
          <Chat_SLA />

          {/* Performance Trend Section */}
          <Chat_Perfomance_Trend />

          {/* Incoming Conversation Section */}
          <Chat_Incoming_Conversation />

          {/* Bottom Row - Customer Satisfaction and Available Agents */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Chat_Customer_Satisfaction />
            <All_Available_Agent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support_Overview;
