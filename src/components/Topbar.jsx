import React, { useState, useEffect } from 'react';
import { Check, PenSquare, MoreVertical } from "lucide-react";
import { X } from "lucide-react";
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Authapi from '@/Server/Authapi';

const Topbar = ({ topbadrdata }) => {
    const navigate = useNavigate();
    const [isAvailable, setIsAvailable] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

   

   

    const togalbutton = async (isAvailable) => {
        if (!isAvailable) {
            checkin2()
        } else {
            checkout1()
        }

    }

    const checkin2 = async () => {
        const dataid = {
            "userId": "07866843-681b-417e-a9f6-7f5364f80276"
        }
        const responst = await Authapi.checkin(dataid)
        if (responst) {
            setIsAvailable(true)

        }
    }

    const checkout1 = async () => {
        const dataid2 = {
            "userId": "07866843-681b-417e-a9f6-7f5364f80276"
        }
        const responst = await Authapi.checkout(dataid2)
        if (responst) {
            setIsAvailable(false)
        }
    }

    return (
        <>
            <div className="flex items-center justify-between ">
                {topbadrdata?.title ? (
                    <h1
                        className="font-Poppins font-medium text-[20px] leading-[20px] tracking-[0] align-middle text-black">
                        {topbadrdata?.title}
                    </h1>
                ) : topbadrdata?.Routertitle ? (
                    <div className="flex items-start">
                        <span
                            className={`${topbadrdata?.Router ? "text-[#2A85FF]" : "text-[#000000]"} cursor-pointer font-Poppins text-[16px]`}
                            onClick={() => navigate(topbadrdata?.Router)}
                        >
                            {topbadrdata?.Routertitle}
                        </span>
                        {topbadrdata?.Router &&
                            <span className="mx-2 mr-2 text-[#2A85FF]">&gt;</span>}
                        <span className={`${topbadrdata?.Router1 ? "text-[#2A85FF]" : "text-[#667085]"} font-poppins cursor-pointer text-[16px]`}
                            onClick={topbadrdata?.Router1 ? () => navigate(topbadrdata?.Router1) : ""}
                        >
                            {topbadrdata?.Routertitle1}
                        </span>
                        {
                            topbadrdata?.Routertitle2 && (
                                <>
                                    <span className="mx-2 mr-2 text-[#2A85FF]">&gt;</span>
                                    <span className={`${topbadrdata?.Router2 ? "text-[#2A85FF]" : "text-[#667085]"} font-poppins cursor-pointer text-[16px]`}
                                        onClick={topbadrdata?.Router2 ? () => navigate(topbadrdata?.Router2) : ""}
                                    >
                                        {topbadrdata?.Routertitle2}
                                    </span>
                                </>
                            )}

                    </div>
                ) : (
                    <div className="flex w-[24%] items-center relative mb-4 md:mb-0">
                        <img src='/search-normal.png' className="absolute left-3 w-4 h-4 text-[#667085]" />
                        <input
                            type="text"
                            placeholder="Search User..."
                            className="p-2 pl-8 border rounded-lg w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                )}


                <div className="flex justify-center items-center gap-3 ">
                    <img src='/gift.png' className=" w-6 h-6 text-[#667085]" />
                    <img src='/notification.png' className=" w-6 h-6 text-[#667085]" />
                    {topbadrdata.togalbutton && (

                        <div
                            className="w-[219px] h-[48px] bg-white border border-[#EFF2F1] rounded-[8px] flex items-center px-[20px] py-[8px] justify-between "
                            style={{ fontFamily: "Poppins" }}
                        >
                            <div className="flex items-center gap-2">
                                <div
                                    className={`w-6 h-6 rounded-full flex items-center justify-center ${isAvailable ? "bg-[#12B76A]" : "bg-[#F04438]"
                                        }`}
                                >
                                    {isAvailable ? (
                                        <Check className="w-4 h-4 text-white" />
                                    ) : (
                                        <X className="w-4 h-4 text-white" />
                                    )}
                                </div>
                                <span className="text-[#667085] text-[16px]">
                                    {isAvailable ? "Available" : "Unavailable"}
                                </span>
                            </div>
                            <div className="h-6 border-l border-[#DBE1E7] mx-2" />
                            <div
                                className={`relative w-[32px] h-[8px] ${isAvailable ? "bg-[#12B76A]" : "bg-[#D9D9D9]"
                                    } rounded-full cursor-pointer transition-all`}
                                onClick={() => togalbutton(isAvailable)}
                            >
                                <div
                                    className={`absolute top-[-4px] w-[16px] h-[16px] rounded-full transition-all duration-300 ${isAvailable ? "right-0 bg-[#12B76A]" : "left-0 bg-[#667085]"
                                        }`}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Topbar;
