import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import DropDown from "./dropdown/DropDown";

// Initial data
const initialData = [
  { name: "Waiting on Internal team", value: 465, color: "#2F80ED" },
  { name: "Waiting on Customer", value: 402, color: "#F4A623" },
  { name: "Open", value: 620, color: "#EB5757" },
  { name: "Resolved", value: 1698, color: "#27AE60" },
];

const Chat_Conversation_Status = () => {
  const [data, setData] = useState(initialData);
  const [hoveredSegment, setHoveredSegment] = useState(null);

  const calculateArc = (startAngle, endAngle, radius) => {
    const start = (startAngle - 90) * (Math.PI / 180);
    const end = (endAngle - 90) * (Math.PI / 180);
    const centerX = 150;
    const centerY = 150;

    const startX = centerX + radius * Math.cos(start);
    const startY = centerY + radius * Math.sin(start);
    const endX = centerX + radius * Math.cos(end);
    const endY = centerY + radius * Math.sin(end);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  };

  const calculateSegments = () => {
    let currentAngle = -90;
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const minPercentage = 10; // Minimum percentage for any segment

    // First pass: calculate initial angles and adjust if needed
    const segmentData = data.map((item) => {
      const percentage = (item.value / total) * 100;
      return {
        ...item,
        percentage: Math.max(percentage, minPercentage),
        originalPercentage: percentage,
      };
    });

    // Second pass: normalize the percentages to maintain 100% total
    const totalAdjusted = segmentData.reduce(
      (sum, item) => sum + item.percentage,
      0
    );
    const scale = 100 / totalAdjusted;

    return segmentData.map((item, index) => {
      const angle = item.percentage * scale * 3.6; // Convert percentage to degrees
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle += angle;

      // Increase overlap for better visual effect
      const extendedEndAngle = endAngle + 8;
      const extendedStartAngle = startAngle - 8;

      return {
        ...item,
        path: calculateArc(extendedStartAngle, extendedEndAngle, 120),
        zIndex: data.length - index, // Reverse the z-index order
        displayValue: item.value,
      };
    });
  };

  const segments = calculateSegments();
  const totalConversations = data.reduce((acc, item) => acc + item.value, 0);

  const [selected, setSelected] = React.useState("");

  const propertyOptions = [
    { label: "Property A", value: "property-a" },
    { label: "Property B", value: "property-b" },
    { label: "Property C", value: "property-c" },
  ];

  return (
    <div className="h-[484px] bg-white border-[1px] border-[#EFF2F1] rounded-[8px] p-6 font-poppins">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[20px] font-medium leading-[100%] text-[#000000]">
          Chat Conversation Status
        </h2>
        <div className="flex gap-4">
          {/* <button
            onClick={updateRandomValues}
            className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
          >
            Test Dynamic Update
          </button> */}

          <div className="">
            <DropDown
              options={propertyOptions}
              value={selected}
              onChange={setSelected}
              placeholder="Today"
              className="min-w-[126px] h-[40px] bg-[#FFFFFF] border border-[#EAECF0] rounded-[8px] flex items-center px-[20px] py-[8px] gap-[20px] justify-center box-border"
            />
          </div>

          {/* create a dropdown  */}

          {/* <label for="cars">Choose a car:</label> */}
        </div>
      </div>

      {/* Chart & Legends */}
      <div className="flex items-center">
        <div className="relative" style={{ width: "300px", height: "300px" }}>
          <svg width="270" height="270" viewBox="0 0 300 300">
            {/* Background circle for hover effect */}
            {hoveredSegment && (
              <circle
                cx="150"
                cy="150"
                r="140"
                fill="none"
                stroke={hoveredSegment.color}
                strokeWidth="2"
                strokeDasharray="5,5"
                style={{ pointerEvents: "none" }}
              />
            )}

            {/* Segments */}
            {segments.map((segment, index) => (
              <g key={index}>
                <path
                  d={segment.path}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth="50"
                  strokeLinecap="round"
                  style={{
                    zIndex: segment.zIndex,
                    transition: "all 0.3s ease-in-out",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setHoveredSegment(segment)}
                  onMouseLeave={() => setHoveredSegment(null)}
                />
              </g>
            ))}

            {/* Center text */}
            <text
              x="150"
              y="150"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-poppins text-[38px] font-semibold"
              fill="#101828"
            >
              {totalConversations}
            </text>

            {/* Tooltip */}
            {hoveredSegment && (
              <g style={{ pointerEvents: "none" }}>
                <rect
                  x="50"
                  y="20"
                  width="200"
                  height="60"
                  fill="white"
                  stroke={hoveredSegment.color}
                  strokeWidth="1"
                  rx="4"
                />
                <text
                  x="150"
                  y="45"
                  textAnchor="middle"
                  className="font-poppins text-[14px] font-medium"
                  fill={hoveredSegment.color}
                >
                  {hoveredSegment.name}
                </text>
                <text
                  x="150"
                  y="65"
                  textAnchor="middle"
                  className="font-poppins text-[16px] font-semibold"
                  fill={hoveredSegment.color}
                >
                  {hoveredSegment.value}
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Legends */}
        <div className=" md:ml-[120px] lg:ml-[-16px] xl:ml-12 ">
          {data.map((item, index) => (
            <div
              key={index}
              className="w-[235px] h-[62px] flex items-center mt-[32px]"
            >
              <div
                className="h-[20px] w-[20px] rounded-full mr-[12px] mt-[-26px]"
                style={{ backgroundColor: item.color }}
              ></div>
              <div className="font-poppins  text-[14px] lg:text-[16px] font-normal leading-[24px] text-[#667085]">
                <p className="lg:w-[140px]  xl:w-[200px] ">{item.name}</p>

                <p className="font-poppins text-[20px] font-medium leading-[100%] text-[#000000] mt-[8px]">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat_Conversation_Status;
