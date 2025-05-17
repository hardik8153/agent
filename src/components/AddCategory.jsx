import React, { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";

const AddCategory = ({ onClose }) => {
    const [availability, setAvailability] = useState('myself');
    const [categoryName, setCategoryName] = useState('');

    const handleNameChange = (event) => {
        setCategoryName(event.target.value);
    };

    const handleAvailabilityChange = (event) => {
        setAvailability(event.target.value);
    };
    const handleSaveClick = (e) => {
        e.preventDefault();
        alert('save click');
    }

    return (
        <div className="fixed inset-0 flex justify-end bg-black bg-opacity-50 z-10 ">
            <div className="mt-[25px] mr-[15px]">
                <button
                    onClick={onClose}
                    className="cursor-pointer text-white hover:text-white-700  rounded-full p-2 border-2 border-white-500"
                >
                    <IoCloseOutline className='w-10 h-10' />

                </button>
            </div>
            <div className={`bg-[#F6F8FA] w-full max-w-md h-full shadow-xl flex flex-col p-6 transition-transform transform duration-300 ease-in-out   `}>
                <h2 className="text-[20px] mb-5 leading-[100%] tracking-[0px] font-medium text-black font-Poppins mb-2">
                    New Category
                </h2>

                <hr className='mb-8' />

                <form className="flex flex-col flex-grow" onSubmit={handleSaveClick}>
                    <div className="mb-8">
                        <label htmlFor="categoryName" className="block text-[10px] mb-2 leading-[100%] tracking-[0px] font-normal text-[#667085] font-Poppins mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="categoryName"
                            placeholder='Category name'
                            name="categoryName"
                            value={categoryName}
                            onChange={handleNameChange}
                            className="w-full border border-[#EFF2F1] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <h3 className="text-[16px] leading-[100%] tracking-[0px] font-medium text-black font-Poppins mb-7">
                            Make this category available for
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <input
                                    id="availability-myself"
                                    name="availability"
                                    type="radio"
                                    value="myself"
                                    checked={availability === 'myself'}
                                    onChange={handleAvailabilityChange}
                                    className="h-5 w-5 text-blue-600 border-gray-400 focus:ring-blue-500 mt-0.5 mr-3 flex-shrink-0"
                                />
                                <div className="flex-grow">
                                    <label htmlFor="availability-myself" className="block text-[14px] mb-1 leading-[100%] tracking-[0px] font-normal text-[#0E2339] font-Poppins">
                                        Myself
                                    </label>

                                    <p className="text-[10px] leading-[100%] tracking-[0px] font-normal text-[#667085] font-Poppins">
                                        Only you can use the response
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <input
                                    id="availability-all-agents"
                                    name="availability"
                                    type="radio"
                                    value="allAgents"
                                    checked={availability === 'allAgents'}
                                    onChange={handleAvailabilityChange}
                                    className="h-5 w-5 text-blue-600 border-gray-600 focus:ring-blue-500 mt-0.5 mr-3 flex-shrink-0"
                                />
                                <div className="flex-grow">
                                    <label htmlFor="availability-all-agents" className="block text-[14px] mb-1 leading-[100%] tracking-[0px] font-normal text-[#0E2339] font-Poppins">
                                        All Agents
                                    </label>
                                    <p className="text-[10px] leading-[100%] tracking-[0px] font-normal text-[#667085] font-Poppins">All agents in your team can use the response</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="mt-auto pt-4 flex justify-end">
                        <button
                            type="submit"
                            className=" bg-blue-500 hover:bg-blue-600 text-white font-Poppins py-2.5 px-5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 transition-colors duration-150"
                        >
                            Save
                        </button>
                    </div> */}
                </form>
            </div>
        </div>
    );
};

export default AddCategory;


