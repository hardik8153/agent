import React, { useState } from 'react';
import { FaTimes, FaCode, FaPaperclip, FaSmile } from 'react-icons/fa';
import { IoCloseOutline } from "react-icons/io5";

const AddResponseModal = ({ onClose, categories }) => {


    const handleSaveClick = (e) => {
        e.preventDefault();

    };

    return (

        <div className="fixed inset-0 flex justify-end bg-black bg-opacity-50 z-10">
            <div className="mt-[25px] mr-[15px]">
                <button
                    onClick={onClose}
                    className="cursor-pointer text-white hover:text-white-700  rounded-full p-2 border-2 border-white-500"
                >
                    <IoCloseOutline className='w-10 h-10' />

                </button>
            </div>
            <div className={`bg-[#F6F8FA] w-full max-w-md h-full shadow-xl flex flex-col p-8 transition-transform transform duration-300 ease-in-out overflow-y-auto max-h-full`}>
                <h2 className="text-[20px] font-medium leading-[100%] tracking-[0px] text-black font-[Poppins] mb-3">
                    Add New Canned Response
                </h2>
                <h2 className="text-[12px] font-normal leading-[100%] tracking-[0px] text-[#667085] font-[Poppins] mb-5">
                    IN MY CANNED RESPONSE
                </h2>

                <hr className='mb-5' />

                <form className="flex flex-col flex-grow" onSubmit={handleSaveClick}>
                    <div className="mb-7">
                        <label htmlFor="title" className="block text-[10px] mb-2 font-normal leading-[100%] tracking-[0px] text-[#667085] font-[Poppins] mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder='E.g how to setup'
                            value=""
                            // onChange={handleInputChange}
                            className="w-full border border-[#EFF2F1] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                            required
                        />
                    </div>

                    <div className="mb-7">
                        {/* <label htmlFor="text" className="block text-[10px] mb-2 font-normal leading-[100%] tracking-[0px] text-[#667085] font-[Poppins] mb-1">Response</label> */}
                        <textarea
                            id="text"
                            name="text"
                            rows="6"
                            placeholder='type your response...'
                            value=""
                            // onChange={handleTextAreaChange}
                            className="w-full border border-[#EFF2F1] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 resize-none"
                            required
                        />
                        {/* <div className="flex items-center justify-end space-x-3 mt-1 text-gray-500">
                            <button type="button" className="hover:text-gray-700"><FaCode /></button>
                            <button type="button" className="hover:text-gray-700"><FaPaperclip /></button>
                            <button type="button" className="hover:text-gray-700"><FaSmile /></button>
                        </div> */}
                    </div>

                    <div className="mb-7">
                        <label htmlFor="shortCode" className="block text-[10px] font-normal leading-[100%] tracking-[0px] text-[#667085] font-[Poppins] mb-2">
                            Short Code
                        </label>
                        <div className="flex items-center border border-[#EFF2F1] bg-white rounded-md focus-within:ring-1 focus-within:ring-blue-400 focus-within:border-blue-400">
                            <span className="px-3  text-gray-500 text-sm">/</span>
                            <input
                                type="text"
                                id="shortCode"
                                name="shortCode"
                                value=""
                                placeholder='Setup'
                                // onChange={handleInputChange}
                                className="w-full border-l border-[#EFF2F1] text-[#92929D] px-3 py-2 text-sm focus:outline-none "
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-7">
                        <label htmlFor="category" className="block text-[10px] font-normal leading-[100%] tracking-[0px] text-[#667085] font-[Poppins] mb-2">Category</label>
                        <select
                            id="category"
                            name="category"
                            value=""
                            // onChange={handleSelectChange}
                            className="w-full border border-[#EFF2F1] rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                            required
                        >
                            <option className='text-[#92929D]' value="" disabled>Select a category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-auto pt-4 flex justify-end">
                        <button
                            type="submit"
                            className=" w-[132px] h-[37px] bg-[#2A85FF]  text-white font-Poppins font-semibold text-[14px] leading-[14px] tracking-[0] rounded-[8px] py-2 px-4 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "                    >
                            Scve
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddResponseModal;
