import React, { useState } from 'react';
import { FaSearch, FaFolder, FaChevronUp, FaChevronDown, FaEllipsisV } from 'react-icons/fa';
import Topbar from './Topbar';
import EditResponseModal from './EditResponseModal';
import AddResponseModal from './AddResponseModal';
import AddCategory from './AddCategory';

const CannedResponses = () => {
    const [activeCategory, setActiveCategory] = useState('my-canned-response');
    const [isCreatedByMeOpen, setIsCreatedByMeOpen] = useState(true);
    const [isSharedWithMeOpen, setIsSharedWithMeOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [responseToEdit, setResponseToEdit] = useState(null);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [addcategory, setAddcategory] = useState(false);
    const [responses, setResponses] = useState([
        { id: 1, shortCode: '/Greetings', title: 'Greetings', text: 'Welcome to powerpush', category: 'my-canned-response' },
        { id: 2, shortCode: '/Greetings1', title: 'Greetings1', text: 'Welcome to powerpush1', category: 'my-canned-response' },
        { id: 3, shortCode: '/Greetings2', title: 'Greetings2', text: 'Welcome to powerpush2', category: 'my-canned-response' },
        { id: 4, shortCode: '/Support', title: 'Support Info', text: 'Please contact support@example.com', category: 'general' },
        { id: 5, shortCode: '/Support1', title: 'Support Info1', text: 'Please contact support@example.com1', category: 'general' },
    ]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const [popupResponseId, setPopupResponseId] = useState(null);

    const handleOpenModal = (response) => {
        setResponseToEdit(response);
        setIsModalOpen(true);
    };

    const AddCategory1 = () => {
        setAddcategory(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setResponseToEdit(null);
        setIsModalOpen1(false)
        setAddcategory(false);
    };
    const handleOpenModal1 = () => {
        setIsModalOpen1(true);
    }

    const handleSaveResponse = (updatedResponse) => {

        setResponses(prevResponses =>
            prevResponses.map(res =>
                res.id === updatedResponse.id ? { ...res, ...updatedResponse } : res
            )
        );

        handleCloseModal();
    };

    const handlePopupOpen = (event, responseId) => {
        event.stopPropagation();
        setPopupResponseId(responseId);
    };

    const handlePopupClose = () => {
        setPopupResponseId(null);
    };

    const getCategoryItemClasses = (categoryId) => {
        let baseClasses = "flex items-center py-2  rounded cursor-pointer text-sm mb-1 transition-colors duration-150";
        if (activeCategory === categoryId) {
            return `${baseClasses}  text-[#000000] font-Poppins`;
        }
        return `${baseClasses} hover:bg-gray-100 text-gray-500`;
    };

    //  const getIconColor = (categoryId) => {
    //     return activeCategory === categoryId ? 'text-blue-700' : 'text-gray-500';
    //  }


    const getBadgeClasses = (categoryId) => {
        let baseClasses = "ml-auto text-white text-xs font-Poppins px-2 py-0.5 rounded-full min-w-[24px] text-center";
        return activeCategory === categoryId ? `${baseClasses} bg-gray-600` : `${baseClasses} bg-gray-400`;
    }

    const topbadrdata = {
        title: 'Manage Canned Responses',
        // description: 'Create reply templates to common queries and respond faster.'
    }

    const filteredResponses = responses.filter(res => {
        if (activeCategory === 'my-canned-response') {
            return res.category === 'my-canned-response';
        }
        if (activeCategory === 'general') {
            return res.category === 'general';
        }
        return true;
    });

    return (
        <div className="w-full bg-[#F6F8FA] md:p-8 min-h-screen font-Poppins relative">
            <Topbar topbadrdata={topbadrdata} />

            <div className="flex mt-5 gap-5 rounded-lg overflow-visible">
                <div className="w-[35%] lg:w-[30%] bg-white p-5 rounded-lg shadow-sm">
                    <div className="relative mb-4">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <FaSearch />
                        </span>
                        <input
                            type="text"
                            placeholder="Search Category"
                            className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                        />
                    </div>
                    <button
                        onClick={AddCategory1}
                        className="mb-6 h-[40px] w-full px-4 border  rounded-[8px] text-[16px] leading-[24px] tracking-[0] font-Poppins font-bold text-[#2A85FF] text-center hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-300 transition-colors duration-150"
                    >
                        +Add Category
                    </button>


                    <div className="mb-5">
                        <div
                            className="flex  items-center text-xs font-Poppins text-gray-500 uppercase mb-2 cursor-pointer select-none"
                            onClick={() => setIsCreatedByMeOpen(!isCreatedByMeOpen)}
                        >
                            {isCreatedByMeOpen ? <FaChevronUp className="w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />}
                            <span className="font-Poppins ml-4 font-medium text-[12px] leading-[18px] tracking-[0] text-[#667085]">
                                CREATED BY ME
                            </span>

                        </div>
                        {isCreatedByMeOpen && (
                            <div>
                                <div
                                    className={getCategoryItemClasses('my-canned-response')}
                                    onClick={() => setActiveCategory('my-canned-response')}
                                >
                                    <img src="/folder.png" alt="folder" className={`mr-3 w-4 h-4 }`} />
                                    <span className="font-Poppins font-medium text-[14px] leading-[21px] tracking-[0]">
                                        My canned response
                                    </span>
                                    <span className="ml-auto text-white  text-xs font-Poppins px-2 py-0.5 rounded-full min-w-[24px] text-center bg-[#92929D]">
                                        {responses.filter(r => r.category === 'my-canned-response').length.toString().padStart(2, '0')}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mb-5">
                        <div
                            className="flex items-center text-xs font-Poppins text-gray-500 uppercase mb-2 cursor-pointer select-none"
                            onClick={() => setIsSharedWithMeOpen(!isSharedWithMeOpen)}
                        >
                            {isSharedWithMeOpen ? <FaChevronUp className="mr-3 w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />}
                            <span className="font-Poppins font-medium text-[12px] leading-[18px] tracking-[0] text-[#667085]">SHARED WITH ME</span>
                        </div>
                        {isSharedWithMeOpen && (
                            <div>
                                <div
                                    className={getCategoryItemClasses('general')}
                                    onClick={() => setActiveCategory('general')}
                                >
                                    <img src="/folder.png" alt="folder" className={`mr-3 w-4 h-4`} />
                                    <span className="font-Poppins font-medium text-[14px] leading-[21px] tracking-[0]">
                                        General</span>
                                    <span className="ml-auto text-white  text-xs font-Poppins px-2 py-0.5 rounded-full min-w-[24px] text-center bg-[#92929D]">
                                        {responses.filter(r => r.category === 'general').length.toString().padStart(2, '0')}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-grow bg-white w-[65%] lg:w-[70%] h-[80vh] overflow-y-auto md:p-3 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-4 pb-4 ">
                        <h2 className="md:text-2xl font-Poppins font-medium text-gray-800 text-[20px] leading-[100%] tracking-[0px] text-black">
                            {activeCategory === 'my-canned-response' ? 'My Canned Responses' : 'General'}
                        </h2>

                        <button
                            className="bg-[#2A85FF]  hover:bg-blue-600 text-white font-Poppins py-3 px-[20px] rounded-md text-[14px] font-bold leading-[100%] tracking-[0px] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 transition-colors duration-150"
                            onClick={handleOpenModal1}
                        >
                            +Create Canned Response
                        </button>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center py-2 px-3 text-xs font-Poppins text-gray-500 uppercase bg-white rounded-t-md">
                            <input type="checkbox" className="mr-4 md:mr-6 form-checkbox h-4 w-4 text-blue-500 border-[#EAECF0] rounded focus:ring-blue-400 flex-shrink-0" />
                            <div className="w-36 md:w-48 flex-shrink-0 mr-4 font-Poppins font-medium text-[12px] leading-[100%] tracking-[0px] text-[#667085]">
                                Short Code
                            </div>
                            <div className="w-36 md:w-48 flex-shrink-0 mr-4 font-Poppins font-medium text-[12px] leading-[100%] tracking-[0px] text-[#667085]">Response</div>
                            <div className="w-10 flex-shrink-0">  </div>
                        </div>
                        <hr />
                        {filteredResponses.map((response) => (
                            <div key={response.id} className="flex items-center py-3 px-3 border-b border-[#DBE1E7] hover:bg-gray-50">
                                <input type="checkbox" className="mr-4 md:mr-6 form-checkbox h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400 flex-shrink-0" />
                                <div className="w-36 md:w-48 flex-shrink-0 mr-4 font-Poppins font-normal text-[16px] leading-[100%] tracking-[0px] text-black truncate">
                                    {response.shortCode}
                                </div>

                                <div className="flex-grow mr-4">
                                    <div className="font-Poppins mb-2 font-normal text-[14px] leading-[100%] tracking-[0%] text-black align-middle">
                                        {response.title}
                                    </div>
                                    <div className="font-Poppins font-normal text-[14px] leading-[100%] tracking-[0%] text-[#667085] align-middle">
                                        {response.text}
                                    </div>
                                </div>
                                <div className="w-10 flex-shrink-0 text-right relative">
                                    <button
                                        onClick={(event) => handlePopupOpen(event, response.id)}
                                        className="text-gray-500 hover:text-gray-700 p-1 focus:outline-none"
                                    >
                                        <FaEllipsisV />
                                    </button>
                                    {popupResponseId === response.id && (
                                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                            <button
                                                onClick={() => { handleOpenModal(response); handlePopupClose(); }}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => { handlePopupClose(); }}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {filteredResponses.length === 0 && (
                            <div className="text-center py-10 text-gray-500">
                                No canned responses found in this category.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isModalOpen && responseToEdit && (
                <EditResponseModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSaveResponse}
                    response={responseToEdit}
                    categories={[
                        { id: 'my-canned-response', name: 'My Canned Responses' },
                        { id: 'general', name: 'General' }
                    ]}
                />
            )}
            {isModalOpen1 && (
                <AddResponseModal
                    // isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    // onSave={handleSaveResponse}
                    // response={responseToEdit}
                    categories={[
                        { id: 'my-canned-response', name: 'My Canned Responses' },
                        { id: 'general', name: 'General' }
                    ]}
                />
            )}

            {addcategory && (
                // alert('add category')
                <AddCategory
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default CannedResponses;