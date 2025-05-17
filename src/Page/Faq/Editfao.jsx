import React, { useState } from 'react';
import { FaTimes, FaRegImage, FaRegSmile, FaTrash } from 'react-icons/fa';
import { IoCloseOutline } from "react-icons/io5";


const EditFaq = ({ faq, onClose }) => {
    const [title, setTitle] = useState(faq?.title);
    const [content, setContent] = useState(faq?.introduction);

    const handleSaveClick = (e) => {
        e.preventDefault();
    };
    return (
        <div className="fixed inset-0 flex justify-end bg-black bg-opacity-50 z-50">
            <div className="mt-[25px] mr-[32px]">
                <button
                    onClick={onClose}
                    className="cursor-pointer text-white  rounded-full p-2 border-2 border-white"
                >
                    <IoCloseOutline className='w-8 h-8' />
                </button>
            </div>

            <div className="bg-[#F6F8FA] w-full max-w-md h-full shadow-xl flex flex-col transition-transform transform duration-300 ease-in-out">
                <div className="p-6 pb-4">
                    <h2 className="text-[20px] leading-[20px] tracking-[0] font-Poppins font-medium text-black">Add FAQ</h2>
                    <hr className='mt-5 mb-1 border-t border-gray-200' />
                </div>

                {/* Form */}
                <form className="flex flex-col flex-grow p-6 pt-2" onSubmit={handleSaveClick}>
                    <div className="mb-4">
                        <label htmlFor="faq-title" className="block text-[10px] leading-[10px] tracking-[0] font-Poppins font-normal text-[#667085] mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            id="faq-title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="E.g how to setup"
                            className="w-full h-[41px] px-3 py-2 border border-[#EFF2F1] rounded-[8px] focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-black placeholder-gray-400 placeholder:text-[#92929D] placeholder:font-Poppins placeholder:font-normal placeholder:text-[12px] placeholder:leading-[12px] placeholder:tracking-[0]"
                            required
                        />
                    </div>

                    <div className="mb-4 flex-grow flex flex-col">
                        <div className="relative ">
                            <textarea
                                id="faq-content"
                                name="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Add your FAQ content here..."
                                className="w-full h-[168px] px-3 py-2 border border-[#EFF2F1] rounded-[8px] shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-black resize-none
    placeholder:text-[#92929D] placeholder:font-Poppins placeholder:font-normal placeholder:text-[12px] placeholder:leading-[12px] placeholder:tracking-[0]"
                                rows="5"
                                required
                            />
                            <div className="absolute bottom-2 right-2 mb-3 mr-2 gap-1 flex items-center space-x-2">
                                <button type="button" className="text-gray-400 hover:text-gray-600">
                                    <img src="/img1.png" alt="image" className='w-[20px] h-[20px] text-[#667085]' />
                                </button>
                                <button type="button" className="text-gray-400 hover:text-gray-600">
                                    <img src="/simll.png" alt="image" className='w-[20px] h-[20px] text-[#667085]' />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-auto pt-4">
                        <div className='flex items-center w-[132px] h-[37px] bg-white cursor-pointer border border-[#EFF2F1] rounded-md p-2 gap-2 justify-center'>
                            <img src="/delete.png" alt="image" className='w-[20px] h-[20px] text-[#F04438EB]' />
                            <p className='text-[#F04438EB]'>delete</p>
                        </div>
                        <button
                            type="submit"
                            className=" w-[132px] h-[37px] bg-[#2A85FF]  text-white font-Poppins font-semibold text-[14px] leading-[14px] tracking-[0] rounded-[8px] py-2 px-4 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditFaq;
