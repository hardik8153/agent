import { FaTimes, FaRegImage, FaRegSmile } from 'react-icons/fa';
import React, { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";


const ViewFaq = ({ faq, onClose, onEdit, onSave }) => {

    const handleEdit = onEdit || (() => console.log('Edit clicked'));
    // const handleSave = onSave || (() => console.log('Save clicked'));

    return (
        <div className="fixed inset-0 flex justify-end bg-black bg-opacity-50 z-50">
            <div className="mt-[25px] mr-[32px]">
                <button
                    onClick={onClose}
                    className="cursor-pointer text-white hover:text-gray-300 rounded-full p-2 border-2 border-white"
                >
                    <IoCloseOutline className='w-8 h-8' />
                </button>
            </div>

            <div className="bg-[#F6F8FA] p-6 w-full overflow-y-auto max-h-full max-w-md h-full shadow-xl flex flex-col transition-transform transform duration-300 ease-in-out">
                <div className=" pb-4">
                    <h2 className="text-[20px] leading-[20px] tracking-[0] font-Poppins font-medium text-black">View FAQ</h2>
                    <hr className='mt-5 mb-1 border-t border-gray-200' />
                </div>

                {/* Form */}
                <div className="flex p-3 border-1 rounded-lg flex-col bg-white flex-grow" >

                    <div className="flex justify-between items-start mt-2">
                        <div className=''>
                            <h2 className="text-[16px] leading-[16px] tracking-[0] font-Poppins font-normal text-black mb-3">
                                {faq?.title}
                            </h2>
                            <p className="text-[12px] leading-[12px] tracking-[0] font-Poppins font-normal text-[#667085]">
                                Last Published: {faq?.question}
                            </p>
                        </div>
                        <button
                            onClick={() => onEdit(faq)}
                            className="bg-white text-[#2A85FF] border border-[#EFF2F1] font-Poppins py-2 px-5 rounded-md text-sm transition duration-150 ease-in-out"
                        >
                            Edit
                        </button>
                    </div>

                    <div className="flex flex-col flex-grow  pt-2 mt-5">
                        <p className="text-[12px] leading-[18px] tracking-[0] font-Poppins font-normal text-black">
                            {faq?.introduction}
                        </p>
                    </div>

                </div>
                <div className="mt-auto pt-4 flex justify-end">
                    <button
                        type="submit"
                        className=" w-[132px] h-[37px] bg-[#2A85FF]  text-white font-Poppins font-semibold text-[14px] leading-[14px] tracking-[0] rounded-[8px] py-2 px-4 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewFaq;