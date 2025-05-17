import React, { useState, useEffect, useRef } from 'react';
import { MdOutlineSort, MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { FiSearch, FiPlus, FiX } from "react-icons/fi";
import Authapi from '@/Server/Authapi';

// NewCustomViewModal component (remains the same)
const NewCustomViewModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const [viewName, setViewName] = useState("");
    const [conversationStatus, setConversationStatus] = useState(null);
    const [teamMember, setTeamMember] = useState(null);
    const handleSave = () => {
        onClose();
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-end z-40 font-[Poppins]">
            <div className="bg-[#F6F8FA] w-full max-w-md h-full flex flex-col shadow-xl">
                <div className="p-6 flex items-center justify-between border-b border-gray-200">
                    <h2 className="text-lg font-Poppins text-[#101828]">New custom view</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                        <FiX className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex-grow p-6 space-y-6 overflow-y-auto">
                    <div>
                        <label htmlFor="viewName" className="block text-sm font-Poppins text-[#344054] mb-1.5">View Name</label>
                        <input type="text" id="viewName" value={viewName} onChange={(e) => setViewName(e.target.value)} placeholder="Name your view" className="w-full px-3 py-2 text-sm text-[#101828] placeholder-[#667085] border border-[#D0D5DD] rounded-md  focus:outline-none focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC]" />
                    </div>
                    <div className="p-4 bg-white space-y-5">
                        <h3 className="text-sm font-Poppins text-[#101828]">Conversation Properties</h3>
                        <div>
                            <label className="block text-xs font-Poppins text-[#475467] mb-1">Conversation status</label>
                            <div className="flex items-center">
                                <div className="relative flex-grow">
                                    <select value={conversationStatus || ""} onChange={(e) => setConversationStatus(e.target.value)} className="w-full appearance-none px-3 py-2 text-sm text-[#101828] bg-white border border-[#D0D5DD] rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC]">
                                        <option value="" disabled>Filter by conversation status</option>
                                        <option value="open">Open</option><option value="closed">Closed</option><option value="pending">Pending</option>
                                    </select>
                                    <MdKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                                {conversationStatus && (<button onClick={() => setConversationStatus(null)} className="ml-2 text-red-500 hover:text-red-700 p-1"><FiX className="w-4 h-4" /></button>)}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-Poppins text-[#475467] mb-1">Agents</label>
                            <div className="flex items-center">
                                <div className="relative flex-grow">
                                    <select value={teamMember || ""} onChange={(e) => setTeamMember(e.target.value)} className="w-full appearance-none px-3 py-2 text-sm text-[#101828] bg-white border border-[#D0D5DD] rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC]">
                                        <option value="" disabled>Filter by team member</option>
                                        <option value="agent1">Agent 1</option><option value="agent2">Agent 2</option>
                                    </select>
                                    <MdKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                                {teamMember && (<button onClick={() => setTeamMember(null)} className="ml-2 text-red-500 hover:text-red-700 p-1"><FiX className="w-4 h-4" /></button>)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6 flex justify-end space-x-3 ">
                    <button onClick={onClose} className="px-4 py-2.5 text-sm font-Poppins text-[#344054] bg-white border border-[#EFF2F1] rounded-md  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0052CC]">Cancel</button>
                    <button onClick={handleSave} className="px-8 py-2 text-sm font-Poppins text-white bg-[#2A85FF]  rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0052CC]">Save</button>
                </div>
            </div>
        </div>
    );
};


const ConversationList = ({ onSelectConversation, searchTerm }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [conversations, setConversations] = useState([]);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [selectedSortKey, setSelectedSortKey] = useState('newest');
    const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
    const [selectedPopupCategory, setSelectedPopupCategory] = useState(undefined);
    const [categorySearchTerm, setCategorySearchTerm] = useState("");
    const [isCustomViewModalOpen, setIsCustomViewModalOpen] = useState(false);

    const [sortOptionsdata, setsortOptionsdata] = useState([]);
    const [conversationalFiltersdata, setconversationalFiltersdata] = useState([]);

    const [isLoadingConversations, setIsLoadingConversations] = useState(false);
    const [metadataLoaded, setMetadataLoaded] = useState(false);
    const [useFilteredApi, setUseFilteredApi] = useState(false); // New state

    const sortTriggerRef = useRef(null);
    const sortDropdownRef = useRef(null);
    const categoryTriggerRef = useRef(null);
    const categoryPopupRef = useRef(null);

    const getStatusFilterValue = (categoryId, filtersData) => {
        if (categoryId && Array.isArray(filtersData) && filtersData.length > 0) {
            const selectedFilter = filtersData.find(f => f.id === categoryId);
            return selectedFilter ? selectedFilter.key : 'all_open';
        }
        return 'all_open';
    };


    // Renamed for clarity
    const fetchConversationsWithFilters = async (statusFilter, sortKey) => {
        if (!statusFilter || !sortKey) {
            setConversations([]);
            return;
        }
        setIsLoadingConversations(true);
        try {
            const apiResponse = await Authapi.ticketsfiltar({
                statusFilter: statusFilter,
                sortOptions: sortKey
            });
            if (apiResponse && apiResponse.tickets) {
                setConversations(apiResponse.tickets);
            } else {
                setConversations([]);
            }
        } catch (error) {
            setConversations([]);
        } finally {
            setIsLoadingConversations(false);
        }
    };

    useEffect(() => {
        const loadInitialMetadata = async () => {
            setIsLoadingConversations(true);
            const fetchConvFilters = Authapi.conversationalFilters().then(response => {
                if (response?.success === true && Array.isArray(response.data)) {
                    setconversationalFiltersdata(response.data);
                } else { setconversationalFiltersdata([]); }
            }).catch(error => {
                setconversationalFiltersdata([]);
            });

            const fetchSortOpts = Authapi.sortOptions().then(response => {
                if (response?.success === true && Array.isArray(response.data)) {
                    setsortOptionsdata(response.data);
                } else { setsortOptionsdata([]); }
            }).catch(error => {
                setsortOptionsdata([]);
            });

            await Promise.all([fetchConvFilters, fetchSortOpts]);
            setMetadataLoaded(true);
            // Loading state for conversations will be handled by the main data fetching useEffect
        };
        loadInitialMetadata();
    }, []);

    useEffect(() => {
        if (!metadataLoaded) {
            return;
        }

        const fetchInitialConversationsUnfiltered = async () => {
            setIsLoadingConversations(true);
            try {
                // Assuming Authapi.ticket() does not take sort options,
                // or if it does, you might want to pass selectedSortKey here too.
                const response = await Authapi.ticket();
                if (response && Array.isArray(response.data)) {
                    setConversations(response.data);
                } else if (response && response.data && Array.isArray(response.data.data)) { // Handle potential nested data
                    setConversations(response.data.data);
                } else {
                    setConversations([]);
                }
            } catch (error) {
                setConversations([]);
            } finally {
                setIsLoadingConversations(false);
            }
        };

        const fetchFilteredData = async () => {
            const currentSortKey = selectedSortKey;
            const currentStatusFilter = getStatusFilterValue(selectedPopupCategory, conversationalFiltersdata);
            // fetchConversationsWithFilters handles its own loading state
            await fetchConversationsWithFilters(currentStatusFilter, currentSortKey);
        };

        if (useFilteredApi) {
            fetchFilteredData();
        } else {
            // This runs on initial load after metadata is ready, if useFilteredApi is false
            fetchInitialConversationsUnfiltered();
        }
    }, [
        selectedPopupCategory,
        selectedSortKey,
        metadataLoaded,
        conversationalFiltersdata,
        useFilteredApi // Key dependency to switch logic
    ]);


    useEffect(() => {
        const handleClickOutsideSort = (event) => {
            if (isSortDropdownOpen && sortDropdownRef.current && !sortDropdownRef.current.contains(event.target) && sortTriggerRef.current && !sortTriggerRef.current.contains(event.target)) {
                setIsSortDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutsideSort);
        return () => document.removeEventListener('mousedown', handleClickOutsideSort);
    }, [isSortDropdownOpen]);

    useEffect(() => {
        const handleClickOutsideCategory = (event) => {
            if (isCategoryPopupOpen && !isCustomViewModalOpen && categoryPopupRef.current && !categoryPopupRef.current.contains(event.target) && categoryTriggerRef.current && !categoryTriggerRef.current.contains(event.target)) {
                setIsCategoryPopupOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutsideCategory);
        return () => document.removeEventListener('mousedown', handleClickOutsideCategory);
    }, [isCategoryPopupOpen, isCustomViewModalOpen]);

    const handleConversationClick = (index) => {
        setSelectedIndex(index);
        if (onSelectConversation && filteredConversations[index]) {
            onSelectConversation(filteredConversations[index]);
        }
    };

    const handleSortOptionSelect = (optionKey) => {
        setSelectedSortKey(optionKey);
        if (!useFilteredApi) {
            setUseFilteredApi(true);
        }
        setIsSortDropdownOpen(false);
    };

    const getSelectedSortOptionDetails = () => {
        if (!Array.isArray(sortOptionsdata) || sortOptionsdata.length === 0) {
            return selectedSortKey === 'newest' ? { key: 'newest', label: 'Newest' } : null;
        }
        const foundOption = sortOptionsdata.find(opt => opt.key === selectedSortKey);
        return foundOption || sortOptionsdata[0] || null;
    };

    const toggleCategoryPopup = () => setIsCategoryPopupOpen(prev => !prev);

    const handleCategorySelect = (categoryId) => {
        setSelectedPopupCategory(categoryId);
        if (!useFilteredApi) {
            setUseFilteredApi(true);
        }
        setIsCategoryPopupOpen(false);
    };

    const filteredPopupCategories = Array.isArray(conversationalFiltersdata)
        ? conversationalFiltersdata.filter(category =>
            category && category.label && typeof category.label === 'string' &&
            category.label.toLowerCase().includes(categorySearchTerm.toLowerCase())
        )
        : [];

    const openCustomViewModal = () => {
        setIsCategoryPopupOpen(false);
        setIsCustomViewModalOpen(true);
    };
    const closeCustomViewModal = () => setIsCustomViewModalOpen(false);

    const filteredConversations = conversations.filter(conversation => {
        if (!conversation) return false;
        if (typeof searchTerm !== 'string' || searchTerm.trim() === '') return true;
        const searchLower = searchTerm.toLowerCase();
        const nameMatch = conversation.customer?.name?.toLowerCase().includes(searchLower);
        const idMatch = conversation.id?.toLowerCase().includes(searchLower);
        const emailMatch = conversation.customer?.email?.toLowerCase().includes(searchLower);
        const numberMatch = conversation.Number?.toString().includes(searchTerm); // Ensure Number is string for .includes
        return nameMatch || idMatch || emailMatch || numberMatch;
    });

    const selectedSortOption = getSelectedSortOptionDetails();
    const currentViewTitle = (selectedPopupCategory && Array.isArray(conversationalFiltersdata) && conversationalFiltersdata.length > 0
        ? conversationalFiltersdata.find(cat => cat && cat.id === selectedPopupCategory)?.label : undefined
    ) || "All Open & Unassigned";

    return (
        <>
            <div className="flex flex-col w-full h-full bg-white">
                <div className="p-3 border-b flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center">
                        <div ref={categoryTriggerRef} className='mr-3 cursor-pointer relative'>
                            <img onClick={toggleCategoryPopup} className="text-[#667085] w-[16px] h-[16px]" src="/menu.svg" alt="menu" />
                            {isCategoryPopupOpen && (
                                <div ref={categoryPopupRef} className="absolute top-[calc(100%+12px)] left-0 w-[280px] bg-white rounded-lg border border-[#EAECF0] shadow-lg z-30 font-[Poppins]" onClick={(e) => e.stopPropagation()}>
                                    <div className="p-3 border-b border-[#EAECF0]">
                                        <div className="relative">
                                            <FiSearch className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#667085]" />
                                            <input type="text" placeholder="Search Category" value={categorySearchTerm} onChange={(e) => setCategorySearchTerm(e.target.value)} className="w-full pl-8 pr-3 py-2 text-sm leading-5 text-[#101828] placeholder-[#667085] border border-[#D0D5DD] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
                                        </div>
                                    </div>
                                    <div className="p-1.5">
                                        <div className="flex items-center justify-between px-2 py-1.5 mb-1">
                                            <span className="text-[12px] font-medium text-[#475467]">Default</span>
                                            <MdKeyboardArrowUp className="w-4 h-4 text-[#98A2B3]" />
                                        </div>
                                        <ul className="max-h-[200px] overflow-y-auto">
                                            <li onClick={() => handleCategorySelect(undefined)} className={`flex justify-between items-center mx-1 my-0.5 py-2 px-2.5 text-sm rounded-md cursor-pointer hover:bg-[#F9FAFB] ${selectedPopupCategory === undefined ? 'bg-[#F9FAFB]' : ''}`}>
                                                <span className={`${selectedPopupCategory === undefined ? 'font-Poppins text-[#101828]' : 'font-normal text-[#344054]'}`}>All Open & Unassigned</span>
                                            </li>
                                            {filteredPopupCategories.map((category) => (
                                                <li key={category.id} onClick={() => handleCategorySelect(category.id)} className={`flex justify-between items-center mx-1 my-0.5 py-2 px-2.5 text-sm rounded-md cursor-pointer hover:bg-[#F9FAFB] ${selectedPopupCategory === category.id ? 'bg-[#F9FAFB]' : ''}`}>
                                                    <span className={`${selectedPopupCategory === category.id ? 'font-Poppins text-[#101828]' : 'font-normal text-[#344054]'}`}>{category.label}</span>
                                                    <span className="text-xs font-Poppins bg-[#F2F4F7] text-[#344054] px-1.5 py-0.5 rounded-full">{category.count}</span>
                                                </li>
                                            ))}
                                            {conversationalFiltersdata.length > 0 && filteredPopupCategories.length === 0 && categorySearchTerm && (<li className="text-center text-sm text-gray-500 py-2 px-2.5">No categories found matching "{categorySearchTerm}".</li>)}
                                            {conversationalFiltersdata.length === 0 && !categorySearchTerm && (<li className="text-center text-sm text-gray-500 py-2 px-2.5">No categories available.</li>)}
                                        </ul>
                                    </div>
                                    <div className="p-3 border-t border-[#EAECF0]">
                                        <button onClick={openCustomViewModal} className="w-full py-2 px-3 text-sm font-Poppins text-[#2A85FF] hover:text-[#003B95] bg-white hover:bg-[#F9FAFB] border border-[#D0D5DD] rounded-md flex items-center justify-center gap-x-1.5 focus:outline-none focus:ring-1 focus:ring-blue-300">
                                            <FiPlus className="w-4 h-4" />Custom View
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <h2 className="text-[14px] leading-[150%] tracking-[0px] text-[#000000] font-[Poppins] font-medium">{currentViewTitle}</h2>
                    </div>
                    <div className="flex items-center border w-[20px] h-[20px] border-gray-400 rounded-md p-1"><MdOutlineSort className="text-[#667085]" /></div>
                </div>
                <div className="relative p-3 border-b flex items-center text-sm text-gray-600 flex-shrink-0">
                    <div ref={sortTriggerRef} className="flex items-center cursor-pointer" onClick={() => setIsSortDropdownOpen(prev => !prev)}>
                        <MdOutlineSort className="text-gray-500 mr-2 h-[12px] w-[12px]" />
                        <span className="text-[12px] leading-[100%] tracking-[0px] text-[#667085] font-Poppins">
                            {selectedSortOption ? `${selectedSortOption.label}${selectedSortOption.displayTextSuffix || ''}` : (metadataLoaded ? 'Select sort' : 'Loading sort options...')}
                        </span>
                    </div>
                    {isSortDropdownOpen && (
                        <div ref={sortDropdownRef} className="absolute top-full left-3 mt-1 w-[200px] rounded-lg shadow-lg bg-white p-2 z-20">
                            {Array.isArray(sortOptionsdata) && sortOptionsdata.length > 0 ? sortOptionsdata.map((option) => (
                                <button key={option.key} onClick={() => handleSortOptionSelect(option.key)} className={`w-full text-left px-4 py-2.5 text-[14px] font-medium text-[#344054] rounded-md font-[Poppins] ${selectedSortKey === option.key ? 'bg-[#E0EFFF]' : 'bg-white hover:bg-gray-50'} focus:outline-none`}>
                                    {option.label}
                                </button>
                            )) : (<div className="px-4 py-2.5 text-[14px] text-gray-500">No sort options available.</div>)}
                        </div>
                    )}
                </div>
                <ul className="flex-grow overflow-y-auto overflow-x-hidden">
                    {isLoadingConversations ? (
                        <li className="p-4 text-center text-gray-500 font-[Poppins]">Loading conversations...</li>
                    ) : filteredConversations.length === 0 ? (
                        <li className="p-4 text-center text-gray-500 font-[Poppins]">
                            {searchTerm ? 'No conversations match your search.' : (conversations.length === 0 && metadataLoaded) ? 'No conversations found for the current filters.' : 'No conversations available.'}
                        </li>
                    ) : (
                        filteredConversations.map((conversation, index) => (
                            <li key={conversation.id || index} onClick={() => handleConversationClick(index)} className={`flex p-3 hover:bg-gray-100 cursor-pointer ${index === selectedIndex ? 'bg-[#2A85FF26]' : 'bg-white'} sm:flex-row flex-col items-start sm:items-center`}>
                                <div className={`w-[48px] h-[48px] rounded-full mr-4 ${index === selectedIndex ? 'bg-[#FFFFFF]' : 'bg-[#EDEDED]'} flex-shrink-0 sm:w-12 sm:h-12`}></div>
                                <div className="flex-grow mr-2 min-w-0">
                                    <p className="text-[16px] mb-1 leading-[150%] tracking-[0px] text-[#000000] font-[Poppins] truncate">{conversation.customer?.name || 'Unknown Customer'}</p>
                                    <p className="text-[12px] leading-[100%] tracking-[0px] text-[#667085] font-[Poppins] truncate">Return Request ID : {conversation.id ? `${conversation.id.substring(0, 8)}...` : 'N/A'}</p>
                                </div>
                                <div className="flex flex-col items-end text-[12px] font-[Poppins] whitespace-nowrap flex-shrink-0 sm:ml-auto mt-2 sm:mt-0">
                                    <div className="h-[18px] flex items-center mb-[2px]">
                                        {conversation.status === 'pending' && (<div className="flex items-center"><span className="w-[9px] h-[9px] rounded-full mr-[6px] bg-[#2A85FF]"></span><span className="text-[#2A85FF] text-[12px] leading-[100%] tracking-[0px]">First Reply Pending</span></div>)}
                                        {conversation.status === 'timed' && conversation.timestamp && (<div className="flex items-center"><span className="w-[9px] h-[9px] rounded-full mr-[6px] bg-[#F04438]"></span><span className="text-[#F04438] text-[12px] leading-[100%] tracking-[0px]">{conversation.timestamp}</span></div>)}
                                        {conversation.status === 'replied' && (<div className="flex items-center"><span className="w-[9px] h-[9px] rounded-full mr-[6px] bg-[#F79009]"></span><span className="text-[#F79009] text-[12px] leading-[100%] tracking-[0px]">Replied</span></div>)}
                                    </div>
                                    <div className="h-[18px] flex items-center justify-center">
                                        {typeof conversation.badgeCount === 'number' && conversation.badgeCount > 0 && (<div className="min-w-[18px] h-[18px] px-1 bg-[#667085] text-white rounded-full flex items-center justify-center text-[10px] leading-none font-medium">{conversation.badgeCount}</div>)}
                                    </div>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
            <NewCustomViewModal isOpen={isCustomViewModalOpen} onClose={closeCustomViewModal} />
        </>
    );
};

export default ConversationList;