import React, { useState } from 'react';
import Topbar from '../../../components/Topbar';
import AddLoadLevelModal from './AddLoadLevelModal';
import EditLoadLevelModal from './EditLoadLevelModal';

const Intelliassign = () => {
    const [isAssignEnabled, setIsAssignEnabled] = useState(false);
    const [idleTime, setIdleTime] = useState('15');
    const [inactiveTime, setInactiveTime] = useState('15');
    const [reassignSameMember, setReassignSameMember] = useState(false);
    const [activeConversations, setActiveConversations] = useState('8');
    const [activeConversations1, setActiveConversations1] = useState('30');
    const [avoidOnPhoneCall, setAvoidOnPhoneCall] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoadLevelModalOpen, setIsLoadLevelModalOpen] = useState(false);
    const [loadLevels, setLoadLevels] = useState([]);
    const [isEditLoadLevelModalOpen, setIsEditLoadLevelModalOpen] = useState(false);
    const [editingLoadLevel, setEditingLoadLevel] = useState(null);
    const [openPopupFor, setOpenPopupFor] = useState(null);
    const [delet, setDelete] = useState(false);

    const handleSave = () => {
        // console.log("Saving settings:", {
        //     isAssignEnabled,
        //     idleTime,
        //     inactiveTime,
        //     reassignSameMember,
        //     activeConversations,
        //     avoidOnPhoneCall,
        //     activeConversations1,
        // });
    };
    const handleTogglePopup = (levelId) => {
        setOpenPopupFor((prev) => (prev === levelId ? null : levelId));
    };



    const handleDeleteClick = (level) => {
        setOpenPopupFor(null);
        setDelete(true)
    };



    const handleSaveLoadLevel = (newLoadLevelData) => {
        setLoadLevels(prevLevels => [...prevLevels, newLoadLevelData]);
    };

    const handleEditClick = (levelToEdit) => {
        setEditingLoadLevel(levelToEdit);
        setIsEditLoadLevelModalOpen(true);
    };

    const handleUpdateLoadLevel = (updatedLoadLevelData) => {
        setLoadLevels(prevLevels =>
            prevLevels.map(level =>
                level.id === updatedLoadLevelData.id ? updatedLoadLevelData : level
            )
        );
        setIsEditLoadLevelModalOpen(false);
        setEditingLoadLevel(null);
    };


    const topbadrdata = {
        title: '',
        Routertitle:"Admin Settings",
        Router:"/AdminSettings",
        Routertitle1:"Intelliassign"
    };

    return (
        <div className="p-6 md:p-8 bg-[#F6F8FA] min-h-screen w-full">
            <Topbar topbadrdata={topbadrdata} />
            <div className="justify-items-center">
                <div className="flex justify-between gap-[32px] max-w-[1000px] items-start mt-[32px] ">
                    <div>
                        <h1 className="text-[20px] font-medium font-Poppins text-[#000000] leading-[100%] tracking-[0px]">
                            IntelliAssign
                        </h1>
                        <p className="text-[12px] font-normal font-Poppins text-[#667085] leading-[120%] tracking-[0px] mt-[12px]">
                            Auto-assign conversations within your team based on factors like agent load level, available bandwidth and other parameters. Team members who are logged in and active for conversations for Intelliassign / Omniroute will only be assigned conversations.
                        </p>

                    </div>
                    <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-md border border-gray-200 shadow-sm">
                        <span className="text-[16px] border-r border-[#000000] pr-[12px] font-Poppins text-[#000000] leading-[150%] tracking-[0px]">
                            {isAssignEnabled ? 'Enabled' : 'Disabled'}
                        </span>

                        <ToggleSwitch
                            checked={isAssignEnabled}
                            onChange={setIsAssignEnabled}
                            label="Enable/Disable IntelliAssign"
                        />
                    </div>
                </div>

                {!isAssignEnabled ? (
                    <div className="bg-white  w-full max-w-[526px] justify-center p-[12px]  mt-[32px]  rounded-xl relative flex items-center" role="alert">
                        <>
                            <img src="/Group.png" alt="warning" className="w-[31.51px] h-[31.51px] mr-[12px]" />
                            <span className="block sm:inline text-[16px] font-normal font-Poppins text-[#000000] leading-[100%] tracking-[0px]">
                                Please enable the Intelliassign to customize properties
                            </span>
                        </>
                    </div>
                ) : (
                    <div className="bg-white w-full max-w-[931px] p-[24px] mt-[32px] rounded-xl  items-center  border border-[#EFF2F1]" role="button" tabIndex="0">
                        <div className="flex justify-between">
                            <h2 className="text-[20px]  font-Poppins text-[#000000]">
                                Intelliassign Logic
                            </h2>
                            <div className="">
                                <img src={isOpen ? "/arrowdown.png" : "/arrowup.png"} alt="arrow" className="w-[20px] h-[20px] text-[#000000] cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
                            </div>
                        </div>
                        <p className="text-[12px] text-[#667085] font-Poppins mt-[12px]">
                            Select the type of logic based on your requirement.
                        </p>


                        {isOpen && (
                            <div >
                                <hr className='mt-[20px]' />
                                <div>
                                    <div className="flex items-center mt-[20px]">
                                        <input
                                            type="radio"
                                            id="loadBasedOption"
                                            name="routingPreference"
                                            value="loadBased"
                                            defaultChecked 
                                            className="mr-2 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                        />
                                        <label htmlFor="loadBasedOption" className="font-Poppins pl-1 text-[#000000] text-[16px]">
                                            Load Based
                                        </label>
                                    </div>
                                    <p className="text-[12px] text-[#667085] pl-7 mt-[5px]">
                                        Load based logic auto assigns conversations to a team member based on the highest percentage of free bandwidth (Bandwidth = Number of slots available / Total number of slots) available for an agent at that given time.
                                    </p>
                                </div>


                                <div>
                                    <div className="flex items-center mt-[20px]">
                                        <input
                                            type="radio"
                                            id="roleBasedOption"
                                            name="routingPreference"
                                            value="roleBased"
                                            className="mr-2 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                        />
                                        <label htmlFor="roleBasedOption" className="font-Poppins pl-1 text-[#000000] text-[16px]">
                                            Role Based
                                        </label>
                                    </div>
                                    <p className="text-[12px] text-[#667085] pl-7 mt-[5px]">
                                        Assigns based on an agent's role. In addition, conversations of a particular issue type or from specific customers can be prioritized for assignment. Set up roles{' '}
                                        <a href="#" className="text-blue-600 hover:underline">
                                            Admin &gt; Team Management &gt; Roles
                                        </a>
                                    </p>
                                </div>


                                <div className="mt-[20px]">
                                    <div className="flex items-start p-3 border border-[#F04438EB] bg-[#FFF5F4EB] rounded-2xl">
                                        <img src="/caution.png" alt="warning" className="w-[20px] h-[20px] mr-[12px]" />
                                        <div className="text-[#000000] text-[12px] font-Poppins">
                                            Role based routing will not work properly as there are no role assigned. You can assign roles by going to{' '}
                                            <a href="#" className="font-Poppins text-[#2A85FF]">
                                                Admin &gt; Team Management &gt; Roles
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center mt-[20px]">
                                        <input
                                            type="radio"
                                            id="roundRobinOption"
                                            name="routingPreference"
                                            value="roundRobin"
                                            className="mr-2 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                        />
                                        <label htmlFor="roundRobinOption" className="font-Poppins pl-1 text-[#000000] text-[16px]">
                                            Round Robin
                                        </label>
                                    </div>
                                    <p className="text-[12px] text-[#667085] pl-7 mt-[5px]">
                                        Round Robin logic auto assigns conversation to a team member who hasn’t been assigned a conversation for the longest time and considers the available bandwidth of the team member at that given time.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className={`bg-white p-[24px] w-full max-w-[931px] rounded-lg mt-[32px] ${!isAssignEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
                    <h2 className="text-[20px] mb-[20px] font-Poppins text-[#000000] leading-[100%] tracking-[0px]">
                        Agent Settings
                    </h2>
                    <hr className="mb-[20px]" />
                    <div className="flex items-center gap-4">
                        <label htmlFor="idleTime" className="text-[16px] font-Poppins text-[#000000] leading-[100%] tracking-[0px] text-gray-700 flex-1">Set member as inactive for IntelliAssign if the member is idle for</label>
                        <div className="flex items-center w-[150px] ">
                            <input
                                type="number"
                                id="idleTime"
                                value={idleTime}
                                onChange={(e) => setIdleTime(e.target.value)}
                                className="w-16 text-sm text-center border border-gray-300 rounded-md px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
                                disabled={!isAssignEnabled}
                                min="1"
                            />
                            <span className="text-[16px] font-Poppins text-[#000000] leading-[100%] tracking-[0px] text-[#000000] ml-3">Minutes</span>
                        </div>
                    </div>
                    <div className="flex items-center mt-[20px] gap-4">
                        <label htmlFor="inactiveTime" className="text-[16px] font-Poppins text-[#000000] leading-[100%] tracking-[0px] text-gray-700 flex-1 pr-4">Set a conversation as inactive if customer has not responded in</label>
                        <div className="flex items-center w-[150px]">
                            <input
                                type="number"
                                id="inactiveTime"
                                value={inactiveTime}
                                onChange={(e) => setInactiveTime(e.target.value)}
                                className="w-16 text-sm text-center border border-gray-300 rounded-md px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
                                disabled={!isAssignEnabled}
                                min="1"
                            />
                            <span className="text-[16px] font-Poppins text-[#000000] leading-[100%] tracking-[0px] text-[#000000] ml-3">Minutes</span>
                        </div>
                    </div>
                    <div className="flex items-center mt-[20px] gap-4">
                        <div className="flex-1">
                            <span className="text-[16px] font-Poppins text-[#000000] leading-[100%] tracking-[0px] text-gray-700 pr-4">Reassign conversation to the same member if conversation is reopened</span>
                        </div>
                        <div className='w-[150px] flex '>
                            <ToggleSwitch
                                checked={reassignSameMember}
                                onChange={setReassignSameMember}
                                label="Reassign to same member"
                            />
                        </div>
                    </div>
                    {
                        reassignSameMember && (
                            <div className="flex items-center mt-[20px] gap-4">
                                <label htmlFor="activeConversations1" className="text-[16px] font-Poppins text-[#000000] leading-[100%] tracking-[0px] text-gray-700 flex-1 pr-4">Reassign to same member if conversation is reopened within</label>
                                <div className="flex items-center w-[150px] ">
                                    <input
                                        type="number"
                                        id="activeConversations1"
                                        value={activeConversations1}
                                        onChange={(e) => setActiveConversations1(e.target.value)}
                                        className="w-16 text-sm text-center border border-gray-300 rounded-md px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
                                        disabled={!isAssignEnabled}
                                        min="1"
                                    />
                                    <span className="text-[16px] font-Poppins text-[#000000] leading-[100%] tracking-[0px] text-[#000000] ml-3">Minutes</span>
                                </div>
                            </div>
                        )
                    }
                    <div className="flex items-center mt-[20px] gap-4">
                        <label htmlFor="activeConversations" className="text-[16px] font-Poppins text-[#000000] leading-[100%] tracking-[0px] text-gray-700 flex-1 pr-4">Active conversations per member</label>
                        <div className="flex items-center w-[150px] ">
                            <input
                                type="number"
                                id="activeConversations"
                                value={activeConversations}
                                onChange={(e) => setActiveConversations(e.target.value)}
                                className="w-16 text-sm text-center border border-gray-300 rounded-md px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
                                disabled={!isAssignEnabled}
                                min="1"
                            />
                        </div>
                    </div>
                    <div className="flex items-center mt-[20px] gap-4">
                        <span className="text-[16px] font-Poppins text-[#000000] leading-[100%] tracking-[0px] text-gray-700 flex-1 pr-4">When an agent is on a phone call, don't assign new conversations</span>
                        <div className='w-[150px] flex '>
                            <ToggleSwitch
                                checked={avoidOnPhoneCall}
                                onChange={setAvoidOnPhoneCall}
                                label="Don't assign new conversations when on call"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-8">
                        <button
                            onClick={handleSave}
                            disabled={!isAssignEnabled}
                            className={`px-6 py-2 rounded-md text-[14px] font-Poppins leading-[100%] tracking-[0px] transition-colors ${isAssignEnabled
                                ? 'bg-[#2A85FF] text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            Save
                        </button>
                    </div>
                </div>

                <div className={`bg-white mt-[32px] w-full max-w-[931px] rounded-lg p-[24px] ${!isAssignEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div className="flex justify-between items-center mb-[28px]">
                        <h2 className="text-[20px] font-Poppins text-[#000000] leading-[100%] tracking-[0px]">
                            Agent Settings
                        </h2>
                        <button
                            onClick={() => setIsLoadLevelModalOpen(true)}
                            disabled={!isAssignEnabled}
                            className={`bg-[#2A85FF] text-white px-4 py-2 rounded-md text-[14px] font-Poppins leading-[100%] tracking-[0px] ${!isAssignEnabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                        >
                            + Load Level
                        </button>
                    </div>

                    <p className="text-[12px] font-Poppins text-[#667085] leading-[150%] tracking-[0px] mb-[12px]">
                        If you need to have higher active conversation limits for your experts or need to lower that limit for your new agents you can selectively override the limits for them → Add experts, increase or decrease conversation limits for experts and selectively override overall IntelliAssign conversation limit settings.
                    </p>

                    <div className="mt-4 overflow-x-auto">
                        {loadLevels.length > 0 ? (
                            <div className="inline-block min-w-full align-middle">
                                <table className="min-w-full ">
                                    <thead className="bg-white  divide-y divide-gray-200">
                                        <tr className=''>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-[12px] font-medium font-Poppins text-[#667085] "
                                            >
                                                Load Level
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-[12px] font-medium font-Poppins text-[#667085]"
                                            >
                                                Conversation Limit/Agent
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-[12px] font-medium font-Poppins text-[#667085]"
                                            >
                                                Agents
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-[12px] font-medium font-Poppins text-[#667085]"
                                            >
                                                Enable/Disable
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left font-medium text-[12px] font-Poppins text-[#667085]">
                                                <span className="sr-only">Options</span>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {loadLevels.map((level) => (
                                            <tr key={level.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-[12px] font-medium text-[#000000]">
                                                    {level.label}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-[12px] font-medium text-[#000000]">
                                                    {level.maxConversations}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-[12px] font-medium text-[#000000]">
                                                    {level.agentIds || level.agentId}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <ToggleSwitch />
                                                </td>
                                                <td className="relative px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleTogglePopup(level.id)}
                                                        className="text-gray-400 hover:text-gray-600"
                                                        title={`Edit ${level.label}`}
                                                    >
                                                        <img src="/arrowup.png" alt="Edit Options" className="w-5 h-5" />
                                                    </button>

                                                    {openPopupFor === level.id && (
                                                        <div className="absolute right-6 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-md z-10">
                                                            <button
                                                                onClick={() => handleEditClick(level)}
                                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteClick(level)}
                                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No load levels defined yet.</p>
                        )}
                    </div>

                    {loadLevels.length === 0 && (
                        <p className="text-[12px] font-Poppins text-[#F04438EB] leading-[100%] tracking-[0px] mt-3">
                            Add a load level to modify how many active conversations a team member can handle.
                        </p>
                    )}
                </div>
            </div>

            {
                delet && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        <div
                            className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl transform transition-all duration-300 ease-out"
                            onClick={() => setDelete(false)} 
                        >
                            <button
                                type="button"
                                className="absolute top-4 right-4 text-2xl font-light text-gray-500 hover:text-gray-800 focus:outline-none"
                                onClick={() => setDelete(false)}
                                aria-label="Close"
                            >
                                ×
                            </button>

                            <h2 className="mb-4 text-[20px] font-Poppins text-[#000000]" id="modal-title">
                                Remove Load Level
                            </h2>

                            <p className="mb-6 text-[14px] font-Poppins text-[#667085]">
                                Are you sure you want to delete the load level?
                            </p>

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    className="rounded-md border border-gray-300 bg-white px-5 py-2 text-[14px] font-Poppins text-gray-700  hover:bg-gray-50 "
                                    onClick={() => setDelete(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="rounded-md bg-[#F04438EB] px-5 py-2 text-[14px] font-Poppins text-white  hover:bg-red-700 "
                                    onClick={() => setDelete(false)}
                                >
                                    Yes Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            <AddLoadLevelModal
                isOpen={isLoadLevelModalOpen}
                onClose={() => setIsLoadLevelModalOpen(false)}
                onSave={handleSaveLoadLevel}
            />

            {editingLoadLevel && (
                <EditLoadLevelModal
                    isOpen={isEditLoadLevelModalOpen}
                    onClose={() => {
                        setIsEditLoadLevelModalOpen(false);
                        setEditingLoadLevel(null);
                    }}
                    onSave={handleUpdateLoadLevel}
                    initialData={editingLoadLevel}
                />
            )}
        </div>
    );
};

const ToggleSwitch = ({ checked, onChange, label }) => {
    return (
        <>
            <div
                className={`relative w-[32px] h-[8px] ${checked ? "bg-[#2A85FF]" : "bg-[#D9D9D9]"
                    } rounded-full cursor-pointer transition-all`}
                onClick={() => onChange(!checked)}
            >
                <div
                    className={`absolute  top-[-4px] w-[16px] h-[16px] rounded-full transition-all duration-300 ${checked ? "right-0 bg-[#2A85FF]" : "left-0 bg-[#667085]"
                        }`}
                />
            </div>
        </>
    );
};


export default Intelliassign;