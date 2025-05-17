import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chat_Incoming_Conversation = () => {
  const data = [
    { time: "0-2", value: 500 },
    { time: "2-4", value: 400 },
    { time: "4-6", value: 150 },
    { time: "6-8", value: 450 },
    { time: "8-10", value: 550 },
    { time: "10-12", value: 450 },
    { time: "12-14", value: 612 },
    { time: "14-16", value: 500 },
    { time: "16-18", value: 480 },
    { time: "18-20", value: 400 },
    { time: "20-22", value: 450 },
    { time: "22-24", value: 500 },
  ];

  return (
    <div className=" h-[407px]  bg-white border border-[#EFF2F1] rounded-lg p-6 mt-[32px]">
      <div className="mb-8">
        <h2 className="font-poppins font-medium text-[20px] leading-[100%]">
          Chat Incoming Conversations
        </h2>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid opacity={0.2} vertical={true} horizontal={false} />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#92929D", fontSize: 12 }}
              padding={{left:45}}
              //  tickMargin={15}
             
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#92929D", fontSize: 12 }}
              ticks={[0, 200, 400, 600, 800, 1000]}
              tickFormatter={(value) => (value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value)}
              
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2A85FF"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chat_Incoming_Conversation;
