import React from 'react';
import Topbar from '@/components/Topbar';
import { useNavigate } from 'react-router-dom';


const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
);
const Integration = () => {
const navigate = useNavigate();

    const topbadrdata = {
        title: '',
        Routertitle: "Admin Settings",
        // Router: "/CsSettings",
        // Routertitle1: "Intelliassign"
    };

    return (
        <>
            <div className="p-6 md:p-8 bg-[#F6F8FA] min-h-screen w-full">
                {/* <Topbar topbadrdata={topbadrdata} /> */}

                {/* <div className="mt-[20px] max-w-full mx-auto">
                    <div className="relative flex items-center bg-white rounded-lg border border-gray-200">
                        <div className="pl-4 pr-2 py-3">
                            <SearchIcon />
                        </div>
                        <input
                            type="text"
                            placeholder="Search settings..."
                            className="w-full h-full py-3 pr-4 rounded-r-lg outline-none border-none bg-transparent text-gray-700 placeholder-gray-400 text-sm"
                        />
                    </div>
                </div> */}

                <div className="grid grid-cols-1 mt-[100px] sm:grid-cols-2 gap-6 md:gap-8 max-w-2xl mx-auto">
                    <div className="bg-white max-w-[308px] rounded-lg p-6 md:p-8 text-center flex flex-col items-center justify-start  duration-200 cursor-pointer" onClick={() => navigate("/API_Settings")}>
                        <div className="mb-[20px]">
                            <img src='/api.png' />
                        </div>
                        <h3 className="text-[20px] font-poppins font-medium leading-[100%] tracking-[0px] text-[#000000] text-center mb-4">
                            API Settings
                        </h3>
                        <p className="text-[16px] font-poppins font-normal leading-[100%] tracking-[0px] text-[#667085] text-center">
                            Tokens to access chat and CRM APIs
                        </p>
                    </div>

                    <div className="bg-white rounded-lg max-w-[308px] p-6 md:p-8 text-center flex flex-col items-center justify-start transition-shadow duration-200 cursor-pointer" onClick={() => navigate("/Conversationhook")}>
                        <div className="mb-[20px]">
                            <img src='/loop.png' />
                        </div>
                        <h3 className="text-[20px] font-poppins font-medium leading-[100%] tracking-[0px] text-[#000000] text-center mb-4">
                            Conversationhook
                        </h3>

                        <p className="text-[16px] font-poppins font-normal leading-[100%] tracking-[0px] text-[#667085] text-center">
                            Use webhooks for replies, chat assignments, and more.
                        </p>

                    </div>

                </div>
            </div>
        </>
    );
};

export default Integration;