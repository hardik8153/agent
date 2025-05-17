import React from "react";

const data = [
  {
    title: "Assigned Conversations",
    count: 201,
    color: "bg-[#2F80ED]",
    bgColor: "bg-[#E3ECFD]",
    time: null,
  },
  {
    title: "Assigned and not replied",
    count: 40,
    color: "bg-[#27AE60]",
    bgColor: "bg-[#D3F4E5]",
    time: "2 mins",
  },
  {
    title: "Overdue",
    count: 685,
    color: "bg-[#F4A623]",
    bgColor: "bg-[#FCEED3]",
    time: "2 mins",
  },
  {
    title: "Unassigned",
    count: 1959,
    color: "bg-[#EB5757]",
    bgColor: "bg-[#FDE4E4]",
    time: "2 mins",
  },
];

const ChatAssignmentStatus = () => {
  return (
    <div className="  h-[350px] lg:h-[484px] bg-white border-[1px] font-medium border-[#EFF2F1] rounded-[8px] p-6 xl:p-6 poppins">
      {/* Header */}
      <h2 className="text-[20px] xl:mt-[12px] font-medium leading-[100%] text-[#000000] font-poppins">
        Chat Assignment Status
      </h2>

      {/* Total Conversations */}
      <div className="my-[16px] mb-[16px]">
        <p className="font-poppins text-[16px] font-normal leading-[24px] text-[#667085]">Total Chat Conversations</p>
        <h1 className="font-poppins text-[20px] font-medium leading-[100%] text-[#000000] mt-[8px]">2885</h1>
      </div>

      <hr />

      {/* <div className="w-full h-[1px] bg-[#EAECF0] my-6"></div> */}

      {/* Status List */}
      <div className="mt-[16px]">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between">
            <div className="flex flex-col lg:mt-[8px] xl:mt-[16px] lg:p-[2px] xl:p-0">
              <p className="font-poppins text-[16px] font-normal leading-[24px] text-[#667085]">{item.title}</p>
              <span className="font-poppins text-[20px] font-medium leading-[100%] text-[#000000] mt-[8px]">
                {item.count}
              </span>
            </div>

            <div className="flex flex-col items-end mt-[29px] ">
              <div className={`w-[183px] h-2 ${item.bgColor} rounded-full`}>
                <div
                  className={`h-2 ${item.color} rounded-full`}
                  style={{
                    width: `${(item.count / 2885) * 100}%`,
                  }}
                ></div>
              </div>
              {item.time && (
                <div className="flex items-center mt-1 text-xs text-[#667085]">
                  <span>{item.time}</span>
                  <svg
                    className="ml-1 w-4 h-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="#667085"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>

          
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default ChatAssignmentStatus;


