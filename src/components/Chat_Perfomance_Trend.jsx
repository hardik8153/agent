import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { DropdownMenu, DropdownMenuRadioItem } from "./ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import DropDown from "./dropdown/DropDown";

const Chat_Perfomance_Trend = () => {
  // Sample data for the chart
  const data = [
    {
      time: "0-2",
      firstResponse: 600,
      responseTime: 350,
      waitTime: 700,
      resolutionTime: 500,
    },
    {
      time: "2-4",
      firstResponse: 700,
      responseTime: 400,
      waitTime: 800,
      resolutionTime: 600,
    },
    {
      time: "4-6",
      firstResponse: 800,
      responseTime: 650,
      waitTime: 900,
      resolutionTime: 700,
    },
    {
      time: "6-8",
      firstResponse: 750,
      responseTime: 600,
      waitTime: 800,
      resolutionTime: 650,
    },
    {
      time: "8-10",
      firstResponse: 900,
      responseTime: 500,
      waitTime: 1000,
      resolutionTime: 450,
    },
    {
      time: "10-12",
      firstResponse: 850,
      responseTime: 450,
      waitTime: 900,
      resolutionTime: 600,
    },
    {
      time: "12-14",
      firstResponse: 800,
      responseTime: 400,
      waitTime: 300,
      resolutionTime: 400,
    },
    {
      time: "14-16",
      firstResponse: 750,
      responseTime: 500,
      waitTime: 900,
      resolutionTime: 500,
    },
    {
      time: "16-18",
      firstResponse: 800,
      responseTime: 450,
      waitTime: 600,
      resolutionTime: 350,
    },
    {
      time: "18-20",
      firstResponse: 850,
      responseTime: 550,
      waitTime: 450,
      resolutionTime: 700,
    },
  ];

  const [selected, setSelected] = React.useState("");

  const propertyOptions = [
    { label: "Property A", value: "property-a" },
    { label: "Property B", value: "property-b" },
    { label: "Property C", value: "property-c" },
  ];

  const [selected2, setSelected2] = React.useState("");

  const propertyOptions2 = [
    { label: "Property A", value: "property-a" },
    { label: "Property B", value: "property-b" },
    { label: "Property C", value: "property-c" },
  ];

  return (
    <div className="bg-white border border-[#EFF2F1] rounded-lg p-8 mt-[32px] font-poppins">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[20px] leading-[100%] font-medium">
          Chat Performance Trends
        </h2>
        <div className="flex gap-[32px]">
          <div className="">
            <DropDown
              options={propertyOptions}
              value={selected}
              onChange={setSelected}
              placeholder="Average"
              className="min-w-[126px] h-[40px] bg-[#FFFFFF] border border-[#EAECF0] rounded-[8px] flex items-center px-[20px] py-[8px] gap-[20px] justify-center box-border"
            />
          </div>

          <div className="">
            <DropDown
              options={propertyOptions2}
              value={selected2}
              onChange={setSelected2}
              placeholder="Today"
              className="min-w-[126px] h-[40px] bg-[#FFFFFF] border border-[#EAECF0] rounded-[8px] flex items-center px-[20px] py-[8px] gap-[20px] justify-center box-border"
            />
          </div>

          {/* <button className="w-[126px] bg-white h-[40px] border border-[#EAECF0] rounded-md text-sm flex justify-center items-center gap-4">
            <h1 className="text-[16px] font-poppins leading-[100%] text-[#000000]">
              Today
            </h1>
            <img
              className="h-[16px] w-[16px]"
              src="./arrow_down.svg"
              alt="arrow_down"
            />
          </button> */}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8 mb-8">
        <div>
          <div className="text-[32px] font-semibold text-[#2E6EF2]">12s</div>
          <div className="text-gray-600">First Response Time</div>
        </div>
        <div>
          <div className="text-[32px] font-semibold text-[#F5A623]">37s</div>
          <div className="text-gray-600">Response Time</div>
        </div>
        <div>
          <div className="text-[32px] font-semibold text-[#FF5959]">50s</div>
          <div className="text-gray-600">Wait Time</div>
        </div>
        <div>
          <div className="text-[32px] font-semibold text-[#27AE60]">5m 28s</div>
          <div className="text-gray-600">Resolution Time</div>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid opacity={0.2} vertical={true} horizontal={false} />
            <XAxis
              dataKey="time"
              scale="point"
              // tick={<CustomTick />}
              padding={{ left: 60, right: 20 }}
              axisLine={false}
              tickLine={false}
              tickMargin={5}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666666" }}
              tickFormatter={(value) =>
                value >= 1000 ? (value / 1000).toFixed(1) + "k" : value
              }
            />
            <Line
              type="monotone"
              dataKey="firstResponse"
              stroke="#2E6EF2"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="responseTime"
              stroke="#F5A623"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="waitTime"
              stroke="#FF5959"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="resolutionTime"
              stroke="#27AE60"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chat_Perfomance_Trend;

// const CustomTick = (props) => {
//   const { x, y, payload } = props;
//   // Define an offset; modify this calculation based on your needs.
//   const xOffset = 70;

//   return (
//     <text
//       x={x + xOffset}
//       y={y}
//       textAnchor="middle"
//       fill="#666666"
//       fontSize={16}
//     >
//       {payload.value}
//     </text>
//   );
// };
