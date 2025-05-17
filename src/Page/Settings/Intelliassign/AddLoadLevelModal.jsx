import React, { useState, useMemo } from 'react';
import Select from 'react-select';

const teamMembers = [
    { id: 1, name: 'Alice Smith' },
    { id: 2, name: 'Bob Johnson' },
    { id: 3, name: 'Charlie Brown' },
    { id: 4, name: 'Diana Prince' },
    { id: 5, name: 'Vimal Gosain' },
    { id: 6, name: 'Eva Green' },
];

const formatOptions = (members) => {
    return members.map(member => ({
        value: member.id,
        label: member.name,
    }));
};

const customSelectStyles = {
    control: (provided, state) => ({
        ...provided,
        borderColor: state.isFocused ? '#2A85FF' : '#D1D5DB',
        boxShadow: state.isFocused ? '0 0 0 1px #2A85FF' : 'none',
        '&:hover': {
            borderColor: state.isFocused ? '#2A85FF' : '#9CA3AF',
        },
        minHeight: '38px',
        height: 'auto',
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: '2px 8px',
        gap: '4px',
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: '#E0F2FE',
        borderRadius: '4px',
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: '#0C4A6E',
        fontSize: '0.875rem',
        paddingLeft: '6px',
        paddingRight: '2px'
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        color: '#0C4A6E',
        borderRadius: '0 4px 4px 0',
        '&:hover': {
            backgroundColor: '#7DD3FC',
            color: '#075985',
        },
        paddingLeft: '4px',
        paddingRight: '4px',
        alignItems: 'center',
        display: 'flex',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#9CA3AF',
    }),
    input: (provided) => ({
        ...provided,
        margin: '0px',
        padding: '0px',
        color: '#1F2937',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: '#6B7280',
        '&:hover': {
            color: '#4B5563',
        },
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#2A85FF' : state.isFocused ? '#DBEAFE' : 'white',
        color: state.isSelected ? 'white' : '#1F2937',
        '&:active': {
            backgroundColor: !state.isSelected ? '#BFDBFE' : undefined,
        },
    }),
};


const AddLoadLevelModal = ({ isOpen, onClose, onSave }) => {
    const [label, setLabel] = useState();
    // /    const vimalOption = formatOptions(teamMembers).find();
    const [selectedAgents, setSelectedAgents] = useState();
    const [maxConversations, setMaxConversations] = useState();
    const agentOptions = useMemo(() => formatOptions(teamMembers), []);

    if (!isOpen) return null;

    const handleSaveClick = () => {
        if (!label || selectedAgents.length === 0 || !maxConversations) {
            alert('Please fill in Label, select at least one Agent, and set Max Conversations.');
            return;
        }
        onSave({
            label,
            agentIds: selectedAgents.map(agent => agent.label),
            maxConversations: parseInt(maxConversations, 10) || 0,
        });
        setLabel('');
        setSelectedAgents([]);
        setMaxConversations('20');
        onClose();
    };
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleOverlayClick}
        >
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-[#000000] font-Poppins font-Poppins text-[20px]">Add Load Level</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                        aria-label="Close modal"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-4">
                        <label htmlFor="loadLabel" className="block text-[10px] font-Poppins text-[#000000] mb-1">
                            Label
                        </label>
                        <input
                            type="text"
                            id="loadLabel"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            placeholder="E.g Beginner"
                            className="w-full px-3 py-2 border border-gray-300 text-[#92929D] text-[14px] leading-[100%] rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-normal font-[Poppins]"
                        />

                    </div>

                    <div className="mb-4">
                        <label htmlFor="addAgents" className="block text-[10px] font-Poppins text-[#000000] mb-1">
                            Add Agents
                        </label>
                        <Select
                            id="addAgents"
                            isMulti
                            options={agentOptions}
                            value={selectedAgents}
                            onChange={setSelectedAgents}
                            placeholder="Select team members..."
                            className="basic-multi-select"
                            classNamePrefix="select"
                            styles={customSelectStyles}
                            closeMenuOnSelect={false}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="maxConversations" className="block text-[10px] font-Poppins text-[#000000] mb-1">
                            Limit maximum active conversations per team member to
                        </label>
                        <input
                            type="number"
                            id="maxConversations"
                            value={maxConversations}
                            onChange={(e) => setMaxConversations(e.target.value)}
                            min="1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={handleSaveClick}
                            className="bg-[#2A85FF] text-white px-6 py-2 rounded-md text-[14px] font-Poppins leading-[100%] tracking-[0px]"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLoadLevelModal;