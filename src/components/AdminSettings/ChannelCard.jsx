import { useNavigate } from "react-router-dom";

const ChannelCard = ({ channelId, name, description }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/channels/${channelId}`);
      }}
      className="w-[250px]  h-[60px] flex justify-center items-center gap-[16px] cursor-pointer hover:shadow-lg transition"
    >
      <img src="./dummy.svg" alt={name} />
      <div>
        <h1 className="font-medium text-[14px] text-[#000000]">{name}</h1>
        <p className="text-[12px] text-[#667085]">{description}</p>
      </div>
    </div>
  );
};

export default ChannelCard;
