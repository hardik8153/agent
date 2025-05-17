import React from 'react'

const All_Available_Agent = () => {
  return (
    <div className=" h-[357px] bg-white border border-[#EFF2F1] rounded-lg p-6">
      {/* Header with View All */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[20px] font-poppins font-medium leading-[100%] text-[#000000]">All Available Agents</h2>
        <p className="text-[#2A85FF] font-poppins font-semibold text-[16px] leading-[100%] tracking-[0.4px] underline decoration-solid decoration-[0%]">View All</p>
      </div>

      {/* Agent on chat section */}
      <div className="mb-8">
        <p className="text-[#667085] font-poppins text-[16px] leading-[24px] mb-2">Agent on chat</p>
        <p className="font-poppins font-medium text-[20px] leading-[100%]">11 Available</p>
      </div>

      {/* Agent on call section */}
      <div className="mb-8">
        <p className="text-[#667085] font-poppins text-[16px] leading-[24px] mb-2">Agent on call</p>
        <p className="font-poppins font-medium text-[20px] leading-[100%]">Not Available</p>
      </div>

      {/* Agent on tickets section */}
      <div>
        <p className="text-[#667085] font-poppins text-[16px] leading-[24px] mb-2">Agent on tickets</p>
        <p className="font-poppins font-medium text-[20px] leading-[100%]">Not Available</p>
      </div>
    </div>
  )
}

export default All_Available_Agent