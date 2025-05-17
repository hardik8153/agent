import React from "react";
import { useNavigate } from "react-router-dom";

const RC_Left_Menu = ({ channels, selectedMenu }) => {
  const navigate = useNavigate();

  const handleChannelClick = (id, name) => {
    navigate(`/channels/${id}`);
  };

  // Filter out the selected menu from the channels list
  const filteredChannels = channels.filter((item) => item.name !== selectedMenu);

  return (
    <div className="max-w-[305px] min-h-[619px] bg-white rounded-[8px] border border-[#EFF2F1] p-[20px]">
      <h1 className="text-lg font-semibold">Recommended Channels</h1>

      {selectedMenu && (
        <div className="w-[265px] h-[48px] rounded-[12px] p-[8px] gap-[20px] mt-[20px] bg-[#2A85FF26] flex items-center">
          <img className="w-[32px] h-[32px]" src="../dummy.svg" alt="" />
          <h1 className="text-base font-medium">{selectedMenu}</h1>
        </div>
      )}

      <h1 className="mt-[32px] text-lg font-semibold">More Channels</h1>

      {filteredChannels.map((item) => (
        <div
          key={item.id}
          onClick={() => handleChannelClick(item.id, item.name)}
          className={`w-[265px] h-[48px] rounded-[12px] p-[8px] gap-[20px] mt-[20px] flex items-center cursor-pointer ${
            selectedMenu === item.name ? "bg-[#2A85FF26]" : "hover:bg-[#F5F5F5]"
          }`}
        >
          <img className="w-[32px] h-[32px]" src="../dummy.svg" alt="" />
          <h1 className="text-base font-medium">{item.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default RC_Left_Menu;