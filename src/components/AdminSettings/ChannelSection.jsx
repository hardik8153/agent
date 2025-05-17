// import ChannelCard from "./ChannelCard";
import ChannelCard from "./ChannelCard";

const ChannelsSection = ({ channels }) => {
  return (
    <>
      <h1 className="font-medium text-[20px] mt-[32px]">Channel</h1>
      <p className="text-[12px] text-[#667085]">
        Connect your channels to engage your contacts
      </p>
      <div className="w-[814px] h-[384px] mt-[46px] flex flex-wrap gap-[32px]">
        {channels.map((channel, index) => (
          <ChannelCard
            channelId={channel.id}
            key={index}
            name={channel.name}
            description={channel.description}
          />
        ))}
      </div>
    </>
  );
};

export default ChannelsSection;
