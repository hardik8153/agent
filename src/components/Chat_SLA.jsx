import React from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import DropDown from "./dropdown/DropDown";

const Chat_SLA = () => {
  const [selected, setSelected] = React.useState("");

  const propertyOptions = [
    { label: "Property A", value: "property-a" },
    { label: "Property B", value: "property-b" },
    { label: "Property C", value: "property-c" },
  ];
  return (
    <div className=" bg-red-10  bg-[#FFFFFF] border border-[#EFF2F1] rounded-lg p-6 mt-[32px] font-poppins">
      <div className="flex justify-between items-center">
        <h2 className="text-[20px] leading-[100%] font-medium ">Chat SLA</h2>
        <button className="flex items-center space-x-2 px-4 py-2  rounded-md">


          {/* dropdown */}
          {/* <div className="w-[126px h-[40px  bg-[#FFFFFF] border border-[#EAECF0] rounded-[8px] flex items-center px-[8px] py-[12px] gap-[2px]  justify-center box-border">
            <select
              className="appearance-none    bg-transparent outline-none cursor-pointer text-[16px] font-normal text-center font-poppins leading-[100%] text-[#000000]"
              defaultValue="today"
            >
              <option
                className="text-[16px]  font-normal font-poppins leading-[100%] text-[#000000]"
                value="today"
              >
                Today
              </option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
            </select>

            <img
              className="w-[16px] h-[16px] mr-3"
              src="./arrow_down.svg"
              alt=""
            />
           
          </div> */}


          <div className="">
            <DropDown
              options={propertyOptions}
              value={selected}
              onChange={setSelected}
              placeholder="Today"
              className="min-w-[126px] h-[40px] bg-[#FFFFFF] border border-[#EAECF0] rounded-[8px] flex items-center px-[20px] py-[8px] gap-[20px] justify-center box-border"
            />
          </div>

          {/* <button className="w-[126px] bg-white h-[40px] border border-[#EAECF0] rounded-md text-sm flex justify-center items-center gap-4">
        <h1 className="text-[16px] font-poppins  leading-[100%] text-[#000000]">
              Today
            </h1>
            <img
              className="h-[16px] w-[16px]"
              src="./arrow_down.svg"
              alt="calender"
            />
        </button> */}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* SLA Compliant Conversations */}
        <div className=" rounded-lg py-4">
          <h3 className="text-[32px] font-medium text-gray-800 mb-2">456</h3>
          <p className="text-gray-600 text-[16px]">
            SLA Compliant Conversations
          </p>
        </div>

        {/* Every response SLA */}
        <div className=" rounded-lg py-4">
          <h3 className="text-[32px] font-medium text-gray-800 mb-2">56%</h3>
          <p className="text-gray-600 text-[16px]">
            Every response SLA achieved
          </p>
        </div>

        {/* First response SLA */}
        <div className=" rounded-lg py-4">
          <h3 className="text-[32px] font-medium text-gray-800 mb-2">45%</h3>
          <p className="text-gray-600 text-[16px]">
            First response SLA achieved
          </p>
        </div>

        {/* Resolution time SLA */}
        <div className=" rounded-lg py-4">
          <h3 className="text-[32px] font-medium text-gray-800 mb-2">37%</h3>
          <p className="text-gray-600 text-[16px]">
            Resolution time SLA achieved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat_SLA;
