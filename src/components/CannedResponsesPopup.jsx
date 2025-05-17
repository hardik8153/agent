import React, { useState, useEffect, useRef } from 'react';
import { HiMagnifyingGlass, HiFolder, HiChevronRight } from 'react-icons/hi2';

const cannedResponseFolders = [
    { id: 'general', name: 'General', count: 0 },
    { id: 'my', name: 'My Canned Response', count: 1 },
];

const CannedResponsesInline = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredFolders = cannedResponseFolders.filter(folder =>
        folder.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const [selectedFolder, setSelectedFolder] = useState(null);
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setSelectedFolder(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelectFolder = (folderId) => {
        setSelectedFolder(folderId);
    };

    const handleManageClick = () => {
    };

    const cannedResponses = [
        { id: 1, shortcut: '/Greetings', title: 'Greetings', description: 'Welcome to powerpush' },
        { id: 2, shortcut: '/Greetings1', title: 'Greetings1', description: 'Welcome to powerpush1' }
    ];

    return (
        <div ref={popupRef} className="w-[100%] mx-auto bg-white rounded-lg  overflow-hidden">
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[14px] leading-[100%] tracking-[0px] text-[#000000]  font-[Poppins]">
                        Canned Responses
                    </h3>

                    <button
                        onClick={handleManageClick}
                        className="text-[12px] leading-[100%] tracking-[0px] text-[#2A85FF] font-[Poppins] underline decoration-solid underline-offset-[0%] decoration-[0px] focus:outline-none hover:text-blue-800"
                    >
                        Manage
                    </button>

                </div>

                <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <HiMagnifyingGlass className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        type="search"
                        name="search"
                        id="canned-search"
                        className="block w-full h-10 pl-10 pr-3 py-2 border border-[#EFF2F1] rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Search something..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="Search canned responses"
                    />
                </div>

                {
                    selectedFolder === null && (
                        <div className="space-y-1">
                            {filteredFolders.length > 0 ? (
                                filteredFolders.map((folder) => (
                                    <button
                                        key={folder.id}
                                        className="w-full flex items-center justify-between p-2 rounded-md hover:bg-gray-100 text-left focus:outline-none focus:bg-gray-100 group"
                                        onClick={() => handleSelectFolder(folder.id)}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <img src="/folder.png" alt="folder" className="h-5 w-5 text-[#667085]" />
                                            <span className="text-[12px] leading-[150%] tracking-[0px] text-[#667085] font-normal font-[Poppins]">
                                                {folder.name} ({folder.count})
                                            </span>

                                        </div>
                                        <HiChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                    </button>
                                ))
                            ) : (
                                <p className="text-center text-sm text-gray-500 py-4">
                                    No matching folders found.
                                </p>
                            )}
                        </div>
                    )}


                {
                    selectedFolder === 'general' && (
                        <div className="font-Poppins">
                            <div className="flex items-center mb-6">
                                <button className="mr-2 text-[#667085] hover:text-[#000000]" onClick={() => setSelectedFolder(null)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4  h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                    </svg>
                                </button>
                                <h1 className="text-[10px] leading-[100%] tracking-[0px] align-middle text-[#000000]  font-[Poppins]">
                                    General
                                </h1>
                            </div>
                            <div class="flex flex-col items-center justify-center  text-center bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[32px] h-[32px] text-[#2A85FF] mb-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z M10.5 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z M10.875 11.625c-.375-.621.125-1.375.875-1.375h.375c.75 0 1.25.75 1.25 1.5v1.5c0 .75-.5 1.5-1.25 1.5h-.375c-.75 0-1.25-.75-1.25-1.5v-1.5Z" />
                                </svg>

                                <p className="text-[10px] leading-[100%] tracking-[0px] text-[#000000] font-medium font-[Poppins] mb-3">
                                    No Canned Message Found!
                                </p>


                                <button
                                    type="button"
                                    className="text-[10px] leading-[100%] tracking-[0px] text-[#2A85FF] font-semibold font-[Poppins] underline hover:text-blue-700 decoration-solid underline-offset-[0%] decoration-[0px]"
                                >
                                    +Add Canned Message
                                </button>


                                <a href="#" class="text-blue-600 hover:text-blue-700 font-Poppins hover:underline" />
                            </div>
                        </div>

                    )
                }

                {
                    selectedFolder === 'my' && (
                        <div className="font-Poppins">
                            <div className="flex items-center mb-3">
                                <button className="mr-2 text-[#667085] hover:text-[#000000]" onClick={() => setSelectedFolder(null)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4  h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                    </svg>
                                </button>
                                <h1 className="text-[10px] leading-[100%] tracking-[0px] align-middle text-[#000000]  font-[Poppins]">My Canned Response</h1>
                            </div>

                            <div className="">
                                {cannedResponses.map((response) => (
                                    <div key={response.id} className="flex items-center justify-between p-1 bg-white gap-4 rounded-lg ">
                                        <p className="text-[10px] leading-[100%] mr-10 tracking-[0px] text-[#2A85FF] font-medium font-[Poppins] align-middle">
                                            {response.shortcut}
                                        </p>
                                        <div className="flex-grow ">

                                            <p className="text-[10px] mb-1 leading-[100%] tracking-[0px] text-[#000000] font-normal font-[Poppins] align-middle">
                                                {response.title}
                                            </p>
                                            <p className="text-[10px] leading-[100%] tracking-[0px] text-[#667085] font-normal font-[Poppins] align-middle">
                                                {response.description}
                                            </p>
                                        </div>

                                        <button className="flex-shrink-0 w-[29px] h-[26px] bg-[#2A85FF] hover:bg-blue-600 text-white font-Poppins p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </button>

                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default CannedResponsesInline;

export const cannedResponses = [
    { id: 1, shortcut: '/Greetings', title: 'Greetings', description: 'Welcome to powerpush' },
    { id: 2, shortcut: '/Greetings1', title: 'Greetings1', description: 'Welcome to powerpush1' }
];