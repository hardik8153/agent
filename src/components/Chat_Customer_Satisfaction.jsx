import React from "react";

const Chat_Customer_Satisfaction = () => {
  return (
    <div className=" h-[357px] bg-white border border-[#EFF2F1] rounded-lg p-6 ]">
      <h1 className="text-[20px] font-poppins font-medium leading-[100%] text-[#000000] mb-6">
        Chat Customer Satisfaction
      </h1>

      <div className="mb-4">
        <p className="text-[#667085] font-poppins text-[16px] leading-[24px] mb-2">Response Recieved</p>
        <p className="text-[20px] font-poppins leading-[100%] text-[#000000] font-medium">1905</p>
      </div>

      <hr/>

      <div className="flex justify-center items-center gap-24 mt-8">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-2">
            <img src="./happy.svg" alt="happy" />
          </div>
          <p className="text-[#22C55E] font-medium mb-1">Positive</p>
          <p className="text-2xl font-bold">39.7%</p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-2">
            <img src="./disappoint.svg" alt="disappoint" />
          </div>
          <p className="text-[#EF4444] font-medium mb-1">Disappointed</p>
          <p className="text-2xl font-bold">60.7%</p>
        </div>
      </div>
    </div>
  );
};

export default Chat_Customer_Satisfaction;
