import { useEffect, useState } from "react";

const CustomTab = ({ tabs, text, onSelectTab, align = "left", className }) => {
  const [selectedTab, setSelectedTab] = useState(null);

  const handleSelect = (tab) => {
    setSelectedTab(tab);
    if (onSelectTab) onSelectTab(tab);
  };

  useEffect(() => {
    const activeTab = tabs.find((it) => it?.active) || tabs[0];
    setSelectedTab(activeTab);
  }, [tabs]);

  return (
    <div className="flex flex-col h-[calc(100vh-60px-38px)]">
      {" "}
      {/* 60px header + 48px padding */}
      {/* Tab buttons */}
      <div
        className={`w-fit flex items-center justify-between mb-6 ${
          align === "right" ? "ml-auto" : "mr-auto"
        }`}
      >
        <div className="flex items-center">
          {tabs?.map((it, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(it);
              }}
              className={`flex items-center font-medium text-[#000] shadow border-x py-[10px] px-[20px] tap-effect ${
                className || "text-[15px]"
              } h-full bg-white gap-4
              ${index === 0 ? "rounded-l-lg" : ""}
              ${index === tabs.length - 1 ? "rounded-r-lg" : ""}
              ${
                selectedTab?.title === it?.title
                  ? "border-t-4 border-t-gray-300"
                  : "border-t-4 border-white"
              }`}
            >
              {it.icon && <>{it.icon()}</>}
              {text && <>{it.title}</>}
            </button>
          ))}
        </div>
      </div>
      {/* Tab content area */}
      <div className="flex-grow overflow-auto bg-white rounded-[12px]">
        {selectedTab?.component || <></>}
      </div>
    </div>
  );
};

export default CustomTab;
