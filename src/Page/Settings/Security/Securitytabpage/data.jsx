import React, { useState } from "react";
import { FiChevronDown } from 'react-icons/fi';

const Data = () => {
    const [isAvailable, setIsAvailable] = useState(true);


    return (
        <div className="p-[22px] bg-white rounded-lg">
            <h1
                className="text-[20px] font-medium leading-[100%] tracking-[0px] text-black mb-8"
                style={{ fontFamily: 'Poppins' }}
            >
                Data Retention Policies
            </h1>

            <div className="mb-8 w-[50%]">
                <label htmlFor="retention-period" className="block text-xs font-medium text-gray-500 mb-1">Retention Period</label>
                <div className="relative ">
                    <button
                        id="retention-period"
                        className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-left flex justify-between items-center text-sm"
                    >
                        <span>30 days, 90 days, 1 year, Custom</span>
                        <FiChevronDown className="h-5 w-5 text-gray-400" />
                    </button>
                </div>
            </div>

            <div className="mb-8">
                <h2
                    className="text-[16px] font-normal leading-[100%] tracking-[0px] text-black mb-4"
                    style={{ fontFamily: 'Poppins' }}
                >
                    Campaign Types
                </h2>
                <div className="flex flex-wrap gap-x-8 gap-y-2 items-center">
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="h-4 w-4 accent-blue-600 border-gray-300 rounded-sm focus:ring-blue-500" defaultChecked />
                        <span className="ml-2 text-gray-700 text-sm">Events</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="h-4 w-4 accent-blue-600 border-gray-300 rounded-sm focus:ring-blue-500" defaultChecked />
                        <span className="ml-2 text-gray-700 text-sm">User Profiles</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="h-4 w-4 accent-blue-600 border-gray-300 rounded-sm focus:ring-blue-500" defaultChecked />
                        <span className="ml-2 text-gray-700 text-sm">Logs</span>
                    </label>
                </div>
            </div>

            <div className="mb-10 w-[50%]">
                <div className="flex justify-between items-center">
                    <h2
                        className="text-[16px] font-normal leading-[100%] tracking-[0px] text-black mr-4"
                        style={{ fontFamily: 'Poppins' }}
                    >
                        Auto-Delete After Period
                    </h2>
                    <div
                        className={`relative w-[32px] h-[8px] ${isAvailable ? "bg-[#D9D9D9]" : "bg-[#D9D9D9]"
                            } rounded-full cursor-pointer transition-all`}
                        onClick={() => setIsAvailable(!isAvailable)}
                    >
                        <div
                            className={`absolute top-[-4px] w-[16px] h-[16px] rounded-full transition-all duration-300 ${isAvailable ? "right-0 bg-[#2A85FF]" : "left-0 bg-[#667085]"
                                }`}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-12 flex flex-wrap gap-4">
                <button
                    className="py-2 px-4 border border-[#EFF2F1] rounded-md text-[14px] font-normal leading-[150%] tracking-[0px] text-[#2A85FF] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    style={{ fontFamily: 'Poppins' }}
                >
                    Data Export Request
                </button>

                <button
                    className="py-2 px-4 border border-[#EFF2F1] rounded-md text-[14px] font-normal leading-[150%] tracking-[0px] text-[#F04438EB] hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    style={{ fontFamily: 'Poppins' }}
                >
                    Data Deletion Request
                </button>

            </div>

            <div>
                <h2
                    className="text-[20px] font-medium leading-[100%] tracking-[0px] text-black mb-6"
                    style={{ fontFamily: 'Poppins' }}
                >
                    Request History
                </h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th
                                    className="py-3 px-4 text-left text-[12px] font-medium leading-[100%] tracking-[0px] text-[#667085] whitespace-nowrap"
                                    style={{ fontFamily: 'Poppins' }}
                                >
                                    Request Type
                                </th>

                                <th className="py-3 px-4 text-left text-center text-[12px] font-medium leading-[100%] tracking-[0px] text-[#667085] whitespace-nowrap"
                                    style={{ fontFamily: 'Poppins' }}>User ID / Email</th>
                                <th className="py-3 px-4 text-left text-center text-[12px] font-medium leading-[100%] tracking-[0px] text-[#667085] whitespace-nowrap"
                                    style={{ fontFamily: 'Poppins' }}>Status</th>
                                <th className="py-3 px-4 text-left text-center text-[12px] font-medium leading-[100%] tracking-[0px] text-[#667085] whitespace-nowrap"
                                    style={{ fontFamily: 'Poppins' }}>Requested On</th>
                                <th className="py-3 px-4 text-left text-center text-[12px] font-medium leading-[100%] tracking-[0px] text-[#667085] whitespace-nowrap"
                                    style={{ fontFamily: 'Poppins' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr className="text-Poppins">
                                <td className="py-3.5 px-4 whitespace-nowrap  text-sm text-gray-700">Export</td>
                                <td className="py-3.5 px-4 whitespace-nowrap text-center text-sm text-gray-700">jane@example.com</td>
                                <td className="py-3.5 px-4 whitespace-nowrap text-center text-sm font-medium text-green-600">Completed</td>
                                <td className="py-3.5 px-4 whitespace-nowrap text-center text-sm text-gray-700">Apr 26, 2025</td>
                                <td className="py-3.5 px-4 whitespace-nowrap text-center text-sm">
                                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Download</a>
                                </td>
                            </tr>
                            <tr className="text-Poppins">
                                <td className="py-3.5 px-4 whitespace-nowrap text-sm text-gray-700">Export</td>
                                <td className="py-3.5 px-4 whitespace-nowrap text-center text-sm text-gray-700">jane@example.com</td>
                                <td className="py-3.5 px-4 whitespace-nowrap text-center text-sm font-medium text-orange-500">Pending</td>
                                <td className="py-3.5 px-4 whitespace-nowrap text-center text-sm text-gray-700">Apr 26, 2025</td>
                                <td className="py-3.5 px-4 whitespace-nowrap text-center text-sm">
                                    <a href="#" className="text-gray-700 hover:text-gray-900 font-medium underline">Cancel</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Data;