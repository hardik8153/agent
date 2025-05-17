import React, { useState } from "react";
import { FiChevronDown } from 'react-icons/fi';

const Audit = () => {

    return (
        <div className="p-6 md:p-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <h1
                className="text-[20px] font-medium leading-[100%] tracking-[0px] text-black mb-6"
                style={{ fontFamily: 'Poppins' }}
            >
                Audit Logs
            </h1>

            <div className="space-y-6 mb-8">
                <div>
                    <label
                        htmlFor="filterUser"
                        className="block text-[10px] font-normal mb-2 leading-[100%] tracking-[0px] text-[#667085] mb-1"
                        style={{ fontFamily: 'Poppins' }}
                    >
                        Filter by User
                    </label>

                    <div className="relative w-[50%]">
                        <select
                            id="filterUser"
                            name="filterUser"
                            className="block w-full appearance-none bg-white border border-[#EFF2F1] text-[#000000] py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        >
                            <option>Admins / Managers</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                            <FiChevronDown className="h-5 w-5" />
                        </div>
                    </div>
                </div>

                <div className="relative w-[50%]">
                    <label htmlFor="filterAction" className="block text-[10px] font-normal mb-2 leading-[100%] tracking-[0px] text-[#667085] mb-1"
                        style={{ fontFamily: 'Poppins' }}>
                        Filter by Action
                    </label>
                    <input
                        type="text"
                        id="filterAction"
                        name="filterAction"
                        placeholder="Login / Data Export / API Key Edit / Campaign Launch"
                        className="block w-full bg-white border border-[#EFF2F1] text-[#000000] py-2 px-4 rounded-md leading-tight"
                    />
                </div>

                <div className="relative w-[50%]">
                    <label htmlFor="filterDate" className="block text-[10px] font-normal mb-2 leading-[100%] tracking-[0px] text-[#667085] mb-1"
                        style={{ fontFamily: 'Poppins' }}>
                        Filter by Date
                    </label>
                    <div className="relative">
                        <select
                            id="filterDate"
                            name="filterDate"
                            className="block w-full appearance-none bg-white border border-[#EFF2F1] text-[#000000] py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        >
                            <option>Last 30 days / 60 days / Custom Range</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                            <FiChevronDown className="h-5 w-5" />
                        </div>
                    </div>
                </div>
            </div>

            <button
                className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-[14px] font-semibold leading-[100%] tracking-[0px] text-white py-3 px-6 rounded-md mb-10 transition duration-150 ease-in-out"
                style={{ fontFamily: 'Poppins' }}
            >
                Download CSV / JSON
            </button>


            <h2
                className="text-[20px] font-medium leading-[100%] tracking-[0px] text-black mb-4"
                style={{ fontFamily: 'Poppins' }}
            >
                Log Table Example
            </h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th
                                className="py-3 px-4 text-left text-[12px] font-medium leading-[100%] tracking-[0px] text-[#667085] uppercase"
                            >
                                Date & Time
                            </th>

                            <th className="py-3 px-4 text-left text-[12px] text-center font-medium leading-[100%] tracking-[0px] text-[#667085] uppercase">User</th>
                            <th className="py-3 px-4 text-left text-[12px] text-center font-medium leading-[100%] tracking-[0px] text-[#667085] uppercase">Action</th>
                            <th className="py-3 px-4 text-left text-[12px] text-center font-medium leading-[100%] tracking-[0px] text-[#667085] uppercase">IP Address</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <tr>
                            <td className="py-4 px-4 whitespace-nowrap  text-sm text-gray-700">Apr 27, 10:15 AM</td>
                            <td className="py-4 px-4 whitespace-nowrap text-center text-sm text-gray-700">John (Admin)</td>
                            <td className="py-4 px-4 whitespace-nowrap text-center text-sm text-gray-700">Edited API Key</td>
                            <td className="py-4 px-4 whitespace-nowrap text-center text-sm text-blue-500">203.0.113.45</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Audit;