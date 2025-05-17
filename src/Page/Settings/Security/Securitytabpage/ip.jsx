import React, { useState } from "react";

const initialIpData = [
    {
        id: 1,
        ip: "192.168.1.1",
        label: "Office LAN",
        addedOn: "Feb 02, 2025",
    },
    {
        id: 2,
        ip: "10.0.0.5",
        label: "Dev Server",
        addedOn: "Jan 15, 2025",
    },
];

const Ip = () => {
    const [isAvailable, setIsAvailable] = useState(false);
    const [ipData, setIpData] = useState(initialIpData); 
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingIp, setEditingIp] = useState(null); 
    const [newIpValue, setNewIpValue] = useState("");
    const [newLabelValue, setNewLabelValue] = useState("");

    const openEditModal = (ipItem) => {
        setEditingIp({ ...ipItem }); 
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditingIp(null);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingIp(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = () => {
        if (editingIp) {
            setIpData(prevIpData =>
                prevIpData.map(item =>
                    item.id === editingIp.id ? editingIp : item
                )
            );
        }
        closeEditModal();
    };

    const handleAddIp = () => {
        if (newIpValue.trim() === "") {
            alert("Please enter an IP address.");
            return;
        }
        const newEntry = {
            id: Date.now(), 
            ip: newIpValue,
            label: newLabelValue || "N/A",
            addedOn: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) 
        };
        setIpData(prevIpData => [...prevIpData, newEntry]);
        setNewIpValue(""); 
        setNewLabelValue("");
    };


    return (
        <div className=" p-[22px] rounded-lg " style={{ fontFamily: 'Poppins' }}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-[20px] font-medium leading-[100%] tracking-[0px] text-black">
                    Enable IP Locking
                </h1>
                <div className="flex items-center space-x-2">
                    <span className={`mr-3 text-sm ${isAvailable ? "text-[#12B76A]" : "text-gray-600"}`}>{isAvailable ? "Available" : "Unavailable"}</span>
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

            <div className="mb-6">
                <div className="mb-4">
                    <label
                        htmlFor="ipAddress"
                        className="block text-[10px] font-normal leading-[100%] tracking-[0px] text-[#667085] mb-1"
                    >
                        Add IP Address
                    </label>
                    <input
                        type="text"
                        id="ipAddress"
                        value={newIpValue}
                        onChange={(e) => setNewIpValue(e.target.value)}
                        placeholder="Enter IPv4/IPv6 Address"
                        className="w-[50%] px-3 py-2 border border-[#EFF2F1] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-sm text-black"
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="labelNote"
                        className="block text-[10px] font-normal leading-[100%] tracking-[0px] text-[#667085] mb-1"
                    >
                        Add Label/Note
                    </label>
                    <input
                        type="text"
                        id="labelNote"
                        value={newLabelValue}
                        onChange={(e) => setNewLabelValue(e.target.value)}
                        placeholder='e.g. "Office VPN", "India HQ"'
                        className="w-[50%] px-3 py-2 border border-[#EFF2F1] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-sm text-black"
                    />
                </div>
                <button
                    onClick={handleAddIp}
                    className="bg-[#2A85FF] hover:bg-blue-700 text-white font-medium py-2 px-5 mt-3 rounded-md text-sm shadow-sm"
                >
                    Save
                </button>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="pb-3 pr-3 text-left text-[12px] font-medium leading-[100%] tracking-[0px] text-[#667085]">
                                IP Address
                            </th>
                            <th className="pb-3 pr-3 text-center text-left text-[12px] font-medium leading-[100%] tracking-[0px] text-[#667085]">Label</th>
                            <th className="pb-3 pr-3 text-center text-left text-[12px] font-medium leading-[100%] tracking-[0px] text-[#667085]">Added On</th>
                            <th className="pb-3 pr-3 text-center text-left text-[12px] font-medium leading-[100%] tracking-[0px] text-[#667085]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ipData.map((item) => (
                            <tr key={item.id} className="border-t border-gray-200">
                                <td className="py-3 pr-3 whitespace-nowrap text-[12px] font-normal leading-[100%] tracking-[0px]  text-[#2A85FF]">
                                    {item.ip}
                                </td>
                                <td className="py-3 px-3 whitespace-nowrap text-[12px] font-normal leading-[100%] tracking-[0px] text-center text-black">
                                    {item.label}
                                </td>
                                <td className="py-3 px-3 text-center whitespace-nowrap text-[12px] font-normal leading-[100%] tracking-[0px] text-center text-center text-black">
                                    {item.addedOn}
                                </td>
                                <td className="py-3 pl-3 justify-items-center whitespace-nowrap text-sm">
                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={() => openEditModal(item)}
                                            className="text-blue-500 hover:text-blue-700"
                                            aria-label="Edit IP"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                        </button>
                                        <button className="text-red-500 hover:text-red-700" aria-label="Delete IP">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {ipData.length === 0 && (
                    <div className="text-center py-4 text-sm text-gray-500 border-t border-gray-200">
                        No IP addresses added yet.
                    </div>
                )}
            </div>

            {isEditModalOpen && editingIp && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-8 rounded-xl w-full max-w-md" style={{ fontFamily: 'Poppins' }}>
                        <div className="flex justify-between items-start mb-7"> 
                            <h2
                                className="text-[20px] font-medium text-black leading-[100%] tracking-[0px]"
                                style={{ fontFamily: 'Poppins' }}
                            >
                                Edit IP Address
                            </h2>

                            <button onClick={closeEditModal} className="text-black hover:text-gray-700 -mt-1 -mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label
                                    htmlFor="editModalIpAddress"
                                    className="block text-[10px] font-normal leading-[100%] tracking-[0px] text-[#667085] mb-1.5"
                                >
                                    Add IP Address
                                </label>
                                <input
                                    type="text"
                                    id="editModalIpAddress"
                                    name="ip" 
                                    value={editingIp.ip}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2.5 border border-[#EFF2F1] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-base text-black placeholder-gray-400"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="editModalLabelNote"
                                    className="block text-[10px] font-normal leading-[100%] tracking-[0px] text-[#667085] mb-1.5"
                                >
                                    Add Label/Note
                                </label>
                                <input
                                    type="text"
                                    id="editModalLabelNote"
                                    name="label" 
                                    value={editingIp.label}
                                    onChange={handleEditInputChange}
                                    className="w-full px-3 py-2.5 border border-[#EFF2F1] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-base text-black placeholder-gray-400"
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={handleSaveChanges}
                                className="bg-[#2A85FF] hover:bg-blue-700 text-white font-medium py-2.5 rounded-md text-sm shadow-sm w-[128px]"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Ip;