import React, { useState } from 'react';

const WebsiteInfo = () => {
    const [isContentVisible, setIsContentVisible] = useState(true);

    const toggleContentVisibility = () => {
        setIsContentVisible(!isContentVisible);
    };

    return (
        <div className=" mx-auto bg-white rounded-lg mb-[20px] overflow-hidden border border-gray-200">
            <div className="p-4">
                <div className="flex justify-between items-center ">
                    <h2 className="font-Poppins" style={{ fontWeight: 500, fontSize: '16px', lineHeight: '100%', letterSpacing: '0px', color: '#000000' }}>Website Info</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-700 cursor-pointer" onClick={toggleContentVisibility}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={!isContentVisible ? "m4.5 15.75 7.5-7.5 7.5 7.5" : "m19.5 8.25-7.5 7.5-7.5-7.5"} />
                    </svg>
                </div>

                {!isContentVisible && (
                    <>
                        <div className="border-t border-gray-200 mt-4"></div>
                        <div className=" flex-col md:flex-row mt-4 justify-between">
                            <div className="mb-4">
                                <p className="text-[#667085] font-Poppins font-normal text-[10px] leading-[100%] tracking-[0px] mb-1">
                                    Last Conversation Initiated from
                                </p>
                                <p className="font-Poppins text-[#000000] font-normal text-[14px] leading-[100%] tracking-[0px]">
                                    Iphone 16 128 gb
                                </p>
                            </div>
                            <div>
                                <p className="text-[#667085] font-Poppins font-normal text-[10px] leading-[100%] tracking-[0px] mb-1">Last Reply sent from</p>
                                <p className="font-Poppins text-[#000000] font-normal text-[14px] leading-[100%] tracking-[0px]">Iphone 16 128 gb</p>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </div >
    );
};

export default WebsiteInfo;