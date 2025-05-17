import React, { useState, useEffect } from 'react';
import { IoSend } from "react-icons/io5";
import { MdChevronRight } from "react-icons/md";
import Authapi from '@/Server/Authapi';

const CustomerSupport = ({ flowid }) => {
    const [inputValue, setInputValue] = useState('');
    const [trigger, setTrigger] = useState(null);
    useEffect(() => {

        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await Authapi.idflows(flowid);
        if (response) {
            handleidtrigger(response?.data.triggerBlock.id)
        } else {
            console.error("Failed to fetch data");
        }
    }

    const handleidtrigger =async (optionText) => {
        const response = await Authapi.idtrigger(optionText);
        if (response) {
            handleOptiondata(response?.data.flow.id)
        } else {
            console.error("Failed to fetch data");
        }
    }

    const handleOptiondata =async (optionText) => {
        const response = await Authapi.idpostoptionBlock(optionText);
        if (response) {
            // handleOptiondata(response?.data.flow.id)
        } else {
            console.error("Failed to fetch data");
        }
    }


    const handleSend = () => {
        if (inputValue.trim()) {
            setInputValue('');
        }
    };

    const handleOptionClick = (optionText) => {
        console.log("Option clicked:", optionText);
    };

    const handleExitPreview = () => {
        if (onClose) {
            onClose();
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-10">
            <div className="bg-white w-[350px] max-w-[90%] h-[550px] max-h-[80vh] rounded-[15px] shadow-xl flex flex-col overflow-hidden">

                <div className="bg-blue-500 text-white px-5 py-4 flex items-center rounded-t-[15px]">
                    <div className="w-10 h-10 bg-white rounded-full mr-4 flex-shrink-0"></div>
                    <h2 className="text-lg font-bold">Customer Support</h2>
                </div>

                <div className="flex-grow p-5 overflow-y-auto bg-gray-50 space-y-3">
                    <div className="relative bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 self-start max-w-[85%]">
                        <p className="text-sm">Hello Welcome to Powerpush Support!</p>
                        <span className="absolute bottom-1 right-2 text-xs text-gray-400">05:41 PM</span>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden self-start max-w-[85%] w-full">
                        <button
                            className="flex justify-between items-center w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gray-100 border-b border-gray-200 last:border-b-0"
                            onClick={() => handleOptionClick('Option 1')}
                        >
                            Option 1
                            <MdChevronRight className="text-xl text-blue-600" />
                        </button>
                        <button
                            className="flex justify-between items-center w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gray-100 border-b border-gray-200 last:border-b-0"
                            onClick={() => handleOptionClick('Option 2')}
                        >
                            Option 2
                            <MdChevronRight className="text-xl text-blue-600" />
                        </button>
                        <button
                            className="flex justify-between items-center w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gray-100 border-b border-gray-200 last:border-b-0"
                            onClick={() => handleOptionClick('Option 3')}
                        >
                            Option 3
                            <MdChevronRight className="text-xl text-blue-600" />
                        </button>
                        <button
                            className="flex justify-between items-center w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-gray-100 border-b border-gray-200 last:border-b-0"
                            onClick={() => handleOptionClick('Option 4')}
                        >
                            Option 4
                            <MdChevronRight className="text-xl text-blue-600" />
                        </button>
                    </div>
                </div>

                <div className="bg-white p-4 flex items-center border-t border-gray-200">
                    <input
                        type="text"
                        className="flex-grow text-sm border border-gray-300 rounded-full px-4 py-2.5 mr-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ask something"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button
                        className="w-10 h-10 bg-blue-500 text-white rounded-full flex justify-center items-center flex-shrink-0 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={handleSend}
                    >
                        <IoSend className="text-lg" />
                    </button>
                </div>
            </div>

            <button
                className="fixed bottom-5 right-5 z-20 px-5 py-2.5 bg-red-100 text-red-800 border border-red-200 rounded-md hover:bg-red-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={handleExitPreview}
            >
                Exit Preview
            </button>
        </div>
    );
};

export default CustomerSupport;