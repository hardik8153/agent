const SearchBar = () => {
    return (
      <div className="flex gap-[20px]  items-center w-full">
        <div className="w-[100%] h-[48px] border border-[#EFF2F1] bg-white px-[20px] py-[10px] rounded-[8px]">
          <div className="flex items-center gap-[15px]">
            <img src="./search-normal.svg" alt="search icon" />
            <h1 className="text-[16px] text-[#667085]">Search settings...</h1>
          </div>
        </div>
        
      </div>
    );
  };
  
  export default SearchBar;
  