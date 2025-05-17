const LeftMenu = ({ menuItems, selectedMenu, onSelect }) => {
    return (
      <div className="w-[25%] h-[90%] bg-white rounded-[8px] border border-[#EFF2F1] ">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => onSelect(item.id)}
            className={`w-full h-[82px] rounded-[8px] flex flex-col items-start p-[12px] gap-[4px] 
              cursor-pointer transition-all ${
                selectedMenu === item.id
                  ? "bg-[#2A85FF26]"
                  : "bg-white hover:bg-gray-100"
              }`}
          >
            <h1 className="font-normal text-[16px] text-[#000000]">
              {item.title}
            </h1>
            <p className="font-normal text-[10px] text-[#667085] w-[95%]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    );
  };
  
  export default LeftMenu;
  