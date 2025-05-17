import React, { useState, useEffect } from 'react';
import { FaTimes, FaCode, FaPaperclip, FaSmile } from 'react-icons/fa';
import { IoCloseOutline } from "react-icons/io5";

const EditResponseModal = ({ isOpen, onClose, onSave, response, categories }) => {
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        text: '',
        shortCode: '',
        category: ''
    });

    useEffect(() => {
        if (response) {
            setFormData({
                id: response.id,
                title: response.title || '',
                text: response.text || '',
                shortCode: response.shortCode ? response.shortCode.substring(1) : '',
                category: response.category || ''
            });
        }
    }, [response]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTextAreaChange = (e) => {
        setFormData(prev => ({ ...prev, text: e.target.value }));
    }

    const handleSelectChange = (e) => {
        setFormData(prev => ({ ...prev, category: e.target.value }));
    }


    const handleSaveClick = (e) => {
        e.preventDefault();
        onSave({ ...formData, shortCode: `/${formData.shortCode}` });
    };

    if (!isOpen || !response) {
        return null;
    }

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
            <div className={`bg-[#F6F8FA] w-full max-w-md h-full shadow-xl flex flex-col p-6 transition-transform transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <h2 className="text-[20px] mt-2 font-medium leading-[100%] tracking-[0px] text-black font-[Poppins] mb-5">
                    Edit Canned Response
                </h2>

                <hr className=' mb-6 border-t border-gray-200' />

                <form className="flex flex-col flex-grow" onSubmit={handleSaveClick}>
                    <div className="mb-7">
                        <label htmlFor="title" className="block mb-2 text-[10px] font-normal leading-[100%] tracking-[0px] text-[#667085] font-[Poppins]">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full border border-[#EFF2F1] rounded-md px-3 py-2 text-[14px] font-normal leading-[100%] tracking-[0px] text-[#000000] focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                            required
                        />

                    </div>

                    <div className="mb-4">
                        <textarea
                            id="text"
                            name="text"
                            rows="6"
                            value={formData.text}
                            onChange={handleTextAreaChange}
                            className="w-full border border-[#EFF2F1] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 resize-none"
                            required
                        />
                        {/* <div className="flex items-center justify-end space-x-3 mt-1 text-gray-500">
                            <button type="button" className="hover:text-gray-700"><FaCode /></button>
                            <button type="button" className="hover:text-gray-700"><FaPaperclip /></button>
                            <button type="button" className="hover:text-gray-700"><FaSmile /></button>
                        </div> */}
                    </div>

                   


                    <div className="mb-4">
                        <label htmlFor="shortCode" className="block text-[10px] font-normal leading-[100%] tracking-[0px] text-[#667085] font-[Poppins] mb-2">
                            Short Code
                        </label>
                        <div className="flex items-center border border-[#EFF2F1] bg-white rounded-md focus-within:ring-1 focus-within:ring-blue-400 focus-within:border-blue-400">
                            <span className="px-3  text-gray-500 text-sm">/</span>
                            <input
                                type="text"
                                id="shortCode"
                                name="shortCode"
                                value={formData.shortCode}
                                onChange={handleInputChange}
                                placeholder='Setup'
                                // onChange={handleInputChange}
                                className="w-full border-l border-[#EFF2F1] text-[#000000] px-3 py-2 text-sm focus:outline-none "
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-6">
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

                    <div className="flex mt-auto pt-4 justify-end ">
                        <button
                            type="submit"
                            className=" bg-blue-500 hover:bg-blue-600 text-white font-Poppins py-2.5 px-5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 transition-colors duration-150"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditResponseModal;