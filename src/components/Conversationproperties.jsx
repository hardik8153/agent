import React, { useState } from 'react';


const ConversationProperties = () => {
    const [isToggled, setIsToggled] = useState(false);

    const toggleIcon = () => {
        setIsToggled(!isToggled);
    };

    const ChevronUpIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-gray-600"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
    );

    const ChevronDownIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-gray-600"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );

    return (
        <div className=" mx-auto bg-white rounded-lg overflow-hidden border border-gray-200">

            <div className="flex justify-between p-4 items-center ">
                <h2 className="font-Poppins text-gray-800" style={{ fontWeight: 500, fontSize: '16px', lineHeight: '100%', letterSpacing: '0px', color: '#000000' }}>
                    Conversation Properties
                </h2>
                <span className="text-sm text-gray-600 cursor-pointer" onClick={toggleIcon}>
                    {isToggled ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </span>
            </div>


            {isToggled && (
                <>
                    <hr className="border-t border-gray-200 mb-5" />
                    <div className="flex p-4 flex-col gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="label-select" className="text-[#667085] font-Poppins font-normal text-[10px] leading-[100%] tracking-[0px] mb-2">
                                Label
                            </label>

                            <div className="relative w-full">
                                <select
                                    id="label-select"
                                    defaultValue=""
                                    className="w-full py-2.5 pl-3 pr-8 border border-[#EFF2F1] rounded-md bg-white text-sm text-gray-900 cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="" disabled hidden></option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="agent-select" className="text-[#667085] font-Poppins font-normal text-[10px] leading-[100%] tracking-[0px] mb-2">
                                Agent
                            </label>
                            <div className="relative w-full">
                                <select
                                    id="agent-select"
                                    defaultValue=""
                                    className="w-full py-2.5 pl-3 pr-8 border border-[#EFF2F1] rounded-md bg-white text-sm text-gray-900 cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="" disabled hidden></option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="status-select" className="text-[#667085] font-Poppins font-normal text-[10px] leading-[100%] tracking-[0px] mb-2">
                                Status
                            </label>
                            <div className="relative w-full">
                                <select
                                    id="status-select"
                                    defaultValue="open"
                                    className="w-full py-2.5 pl-3 pr-8 border border-[#EFF2F1] rounded-md bg-white text-sm text-gray-900 font-Poppins cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="open">Open</option>
                                    <option value="pending">Pending</option>
                                    <option value="closed">Closed</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="priority-select" className="text-[#667085] font-Poppins font-normal text-[10px] leading-[100%] tracking-[0px] mb-2">
                                Priority
                            </label>
                            <div className="relative w-full">
                                <select
                                    id="priority-select"
                                    defaultValue="low"
                                    className="w-full py-2.5 pl-3 pr-8 border border-[#EFF2F1] rounded-md bg-white text-sm text-gray-900 font-Poppins cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="type-select" className="text-[#667085] font-Poppins font-normal text-[10px] leading-[100%] tracking-[0px] mb-2">
                                Type
                            </label>
                            <div className="relative w-full">
                                <select
                                    id="type-select"
                                    defaultValue=""
                                    className="w-full py-2.5 pl-3 pr-8 border border-[#EFF2F1] rounded-md bg-white text-sm text-gray-900 cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="" disabled hidden></option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>
                        <button
                            className="w-full bg-[#2A85FF] hover:bg-blue-700 text-white font-Poppins font-semibold text-[14px] leading-[100%] tracking-[0px] py-2.5 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-2"
                        >
                            Update
                        </button>

                    </div>
                </>
            )}
        </div>
    );
}

export default ConversationProperties;