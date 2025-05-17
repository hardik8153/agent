import React, { useState, useEffect, useRef } from 'react';
import Topbar from '@/components/Topbar';
import { FiSearch, FiChevronDown } from 'react-icons/fi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Authapi from '@/Server/Authapi';

// const LOCAL_STORAGE_KEY = 'autoResponseFlows'; // Not used with API

const AutoResponse = () => {
    const navigate = useNavigate();
    const [flows, setFlows] = useState([]);
    const [openId, setOpenId] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [flowToDelete, setFlowToDelete] = useState(null);
    const dropdownRef = useRef(null);

    const fetchFlowsList = async () => { // Renamed for clarity
        try {
            const response = await Authapi.flows();
            if (response.success && response.statusCode === 200) {
                console.log("Fetched flows from API:", response.data);
                setFlows(response.data); // Assuming response.data is the array of flows
            } else {
                console.error("Failed to fetch flows from API:", response.error);
                // Handle error display to user if needed
            }
        } catch (error) {
            console.error("API Error fetching flows:", error);
        }
    };

    useEffect(() => {
        fetchFlowsList();
    }, []);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !event.target.closest(`[data-flow-id="${openId}"]`)) {
                setOpenId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openId]);


    const CreateFlow = async () => {
        // Consider getting clientId dynamically if it's user-specific
        const flowData = { name: "Untitled Flow", description: "", clientId: "1bb884a9-452d-4164-a82f-54c0487719a9" };
        try {
            const response = await Authapi.postflows(flowData);
            if (response.success && response.data?.id) {
                const flowId = response.data.id;
                navigate('/AutoCreateFlow', { state: { flowId, flowName: response.data.name } });
            } else {
                console.error("Failed to create flow or response missing data.id:", response);
                alert("Failed to create flow: " + (response.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Error creating initial flow:", error);
            alert("Error creating flow.");
        }
    }


    const handleEdit = (flowId) => {
        navigate(`/AutoCreateFlow/edit/${flowId}`); // Route for editing
        setOpenId(null);
    };

    const openDeleteConfirmation = (flow) => {
        setFlowToDelete(flow);
        setDeleteModalOpen(true);
        setOpenId(null);
    };

    const closeDeleteConfirmation = () => {
        setDeleteModalOpen(false);
        setFlowToDelete(null);
    };

    const handleDelete = async () => {
        if (!flowToDelete) return;
        try {
            const response = await Authapi.deleteFlow(flowToDelete.id);
            // API for DELETE /flows/{flowId} returns 204 No Content on success
            if (response.success && response.statusCode === 204) {
                fetchFlowsList(); // Refresh the list
            } else {
                 console.error("Failed to delete flow:", response.error);
                 alert("Error deleting flow: " + (response.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Exception deleting flow:", error);
            alert("Error deleting flow.");
        } finally {
            closeDeleteConfirmation();
        }
    };

    const handleToggleStatus = async (flowId, currentIsActive) => {
        const action = currentIsActive ? "deactivate" : "activate";
        try {
            const response = await Authapi.toggleFlowStatus(flowId, action);
            if (response.success && response.statusCode === 200) { // API returns updated flow
                fetchFlowsList(); // Refresh list
            } else {
                console.error(`Failed to ${action} flow:`, response.error);
                alert(`Error toggling status: ` + (response.error || "Unknown error"));
            }
        } catch (error) {
            console.error(`Exception toggling status for flow ${flowId}:`, error);
            alert("Error toggling status.");
        }
    };

    const topbadrdata = {
        title: '',
        Routertitle: 'Admin Settings',
        Router: '/AdminSettings',
        Routertitle1: 'Auto Response',
    };

    // Format date function
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric',
                // hour: '2-digit', minute: '2-digit' // Optional: if you want time
            });
        } catch (e) {
            return 'Invalid Date';
        }
    };


    return (
        <div className="p-6 md:p-8 bg-[#F6F8FA] min-h-screen w-full font-Poppins">
            <Topbar topbadrdata={topbadrdata} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F6F8FA] mt-[22px]">
                <div className="bg-white pt-[24px] px-4 md:p-6 rounded-lg shadow-sm w-full max-w-full min-h-full mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-[32px]">
                        {/* Search and filter controls remain the same */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                            <div className="relative w-full sm:w-auto">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FiSearch className="text-gray-400" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search Flow..."
                                    className="pl-10 pr-4 py-2 border border-[#D0D5DD] font-Poppins text-[#667085] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                                />
                            </div>

                            <div className="relative w-full sm:w-auto">
                                <select
                                    defaultValue=""
                                    className="appearance-none w-full bg-white border border-[#D0D5DD] text-[#667085] font-Poppins py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500 focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="" disabled>Trigger Type</option>
                                    <option value="Keyword">Keyword</option>
                                    <option value="Option Selection">Option Selection</option>
                                    <option value="Unknown">Unknown</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <FiChevronDown />
                                </div>
                            </div>

                            <div className="relative w-full sm:w-auto">
                                <select
                                    defaultValue=""
                                    className="appearance-none w-full bg-white border border-[#D0D5DD] text-[#667085] font-Poppins py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500 focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="" disabled>Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <FiChevronDown />
                                </div>
                            </div>
                        </div>
                        <button className="bg-[#2A85FF] hover:bg-blue-700 text-white font-Poppins py-2 px-5 rounded-md w-full md:w-auto flex-shrink-0 text-[14px] font-semibold leading-[100%]" onClick={CreateFlow}>
                            + Create Flow
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <div className="min-w-full">
                            <div className="flex items-center text-[12px] font-Poppins font-medium leading-[100%] tracking-[0px] text-[#667085] uppercase py-3 px-4 border-b border-gray-200 bg-gray-50 rounded-t-md">
                                <div className="w-[30%] px-2">Flow Name</div>
                                <div className="w-[20%] px-2">Trigger Type</div>
                                <div className="w-[20%] px-2">Last Modified</div>
                                <div className="w-[15%] px-2 text-center">Status</div>
                                <div className="w-[15%] px-2 text-right pr-2">Action</div>
                            </div>
                            <div className="bg-white">
                                {flows.length === 0 ? (
                                    <div className="text-center py-10 text-gray-500 font-Poppins text-[14px]">
                                        No flows found. Create one to get started!
                                    </div>
                                ) : (
                                    flows.map((flow) => (
                                        <div key={flow.id} className="flex items-center py-4 px-4 border-b border-gray-200 hover:bg-gray-50 text-sm text-gray-800">
                                            <div className="w-[30%] px-2">
                                                <span className="text-[12px] font-Poppins font-normal leading-[100%] tracking-[0px] text-[#2A85FF] hover:underline cursor-pointer truncate" title={flow.name}>
                                                    {flow?.name || 'Unnamed Flow'}
                                                </span>
                                            </div>
                                            <div className="w-[20%] px-2 text-[12px] font-Poppins font-normal leading-[100%] tracking-[0px] text-[#000000] truncate"
                                                title={flow?.triggerBlock?.type || 'N/A'}
                                            >
                                                {flow?.triggerBlock?.type || 'N/A'}
                                            </div>
                                            <div className="w-[20%] px-2 text-[12px] font-Poppins font-normal leading-[100%] tracking-[0px] text-[#000000]">
                                                {/* Assuming 'updatedAt' or 'createdAt' exists on the flow object */}
                                                {formatDate(flow?.updatedAt || flow?.triggerBlock?.updatedAt || flow?.createdAt)}
                                            </div>
                                            <div className="w-[15%] px-2 flex justify-center">
                                                <ListingToggleSwitch
                                                    checked={flow.isActive}
                                                    onChange={() => handleToggleStatus(flow.id, flow.isActive)}
                                                />
                                            </div>
                                            <div className="relative w-[15%] px-2 text-right pr-2">
                                                <button
                                                    onClick={() => setOpenId(openId === flow.id ? null : flow.id)}
                                                    className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100"
                                                    data-flow-id={flow.id}
                                                >
                                                    <BsThreeDotsVertical size={18} />
                                                </button>
                                                {openId === flow.id && (
                                                    <div
                                                        ref={dropdownRef}
                                                        className="absolute right-2 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                                                        <button
                                                            // onClick={() => handleEdit(flow.id)}
                                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-Poppins"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => openDeleteConfirmation(flow)}
                                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 font-Poppins"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Delete Confirmation Modal remains the same */}
            {deleteModalOpen && flowToDelete && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    onClick={closeDeleteConfirmation} // Close on backdrop click
                >
                    <div
                        className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl transform transition-all duration-300 ease-out"
                        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
                    >
                        <h2 className="mb-4 text-[20px] font-Poppins font-semibold text-[#101828]" id="modal-title">
                            Delete Flow?
                        </h2>
                        <p className="mb-6 text-[14px] font-Poppins text-[#667085]">
                            Are you sure you want to delete the flow "<strong>{flowToDelete.name}</strong>"? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                className="rounded-md border border-gray-300 bg-white px-5 py-2 text-[14px] font-semibold font-Poppins text-gray-700 hover:bg-gray-50"
                                onClick={closeDeleteConfirmation}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="rounded-md bg-[#D92D20] px-5 py-2 text-[14px] font-semibold font-Poppins text-white hover:bg-red-700"
                                onClick={handleDelete}
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ListingToggleSwitch = ({ checked, onChange }) => {
    return (
        <div
            className={`relative w-[32px] h-[8px] ${checked ? "bg-[#2A85FF]" : "bg-[#D9D9D9]"
                } rounded-full cursor-pointer transition-all`}
            onClick={(e) => {
                e.stopPropagation(); // Prevent row click or other underlying events
                onChange();
            }}
        >
            <div
                className={`absolute top-[-4px] w-[16px] h-[16px] rounded-full transition-all duration-300 ${checked ? "right-0 bg-[#2A85FF]" : "left-0 bg-[#667085]"
                    }`}
                style={{ boxShadow: '0px 1px 2px 0px #1018280D' }}
            />
        </div>
    );
};

export default AutoResponse;