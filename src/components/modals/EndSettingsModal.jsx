// components/modals/EndSettingsModal.js
import React, { useState, useEffect } from 'react';

// Basic Modal Shell (Reuse or import your BaseModal)
const ModalWrapper = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                aria-label="Close"
            >
                ×
            </button>
            {children}
        </div>
    </div>
);

const EndSettingsModal = ({ isOpen, onClose, onSave, blockId, initialSettings }) => {
    const [titleText, setTitleText] = useState('');
    // Default options, will be overridden by initialSettings if available
    const defaultOptions = [
        'Go Back to Main Menu',
        'Talk to an agent',
        'Close My Ticket'
    ];
    const [options, setOptions] = useState([...defaultOptions]); // Initialize with defaults

    useEffect(() => {
         if (initialSettings) {
            // Set title from settings or default to empty
            setTitleText(initialSettings.title || '');

            // Set options from settings if they exist and are valid, otherwise use defaults
            if (Array.isArray(initialSettings.options) && initialSettings.options.length > 0) {
                // Ensure options are strings, filter out any non-strings just in case
                setOptions(initialSettings.options.filter(opt => typeof opt === 'string'));
            } else {
                // Reset to defaults if no valid options found in settings
                setOptions([...defaultOptions]);
            }
        } else {
             // Reset to defaults if no initialSettings at all
             setTitleText('');
             setOptions([...defaultOptions]);
        }
    }, [initialSettings]); // Rerun effect when initialSettings change


    const handleTitleChange = (e) => {
        // Limit title length if needed (e.g., 96 chars)
        const maxLength = 96;
        if (e.target.value.length <= maxLength) {
            setTitleText(e.target.value);
        }
    };

    // Allow editing the existing option text
    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };


    const handleSave = () => {
        // Filter out any potentially empty options before saving
        const validOptions = options.map(opt => opt.trim()).filter(opt => opt !== '');

        // Pass the blockId, title, and the array of option strings back
        onSave(blockId, { title: titleText.trim(), options: validOptions });
    };

    if (!isOpen) return null;

    return (
        <ModalWrapper onClose={onClose}>
            <h2 className="text-xl font-semibold mb-4">End Block Settings</h2>

            <div className="mb-4">
                <label htmlFor="titleText" className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-gray-500 text-xs">(Optional)</span>
                </label>
                <input
                    id="titleText"
                    type="text" // Use input for single line title
                    value={titleText}
                    onChange={handleTitleChange}
                    placeholder="Enter an optional title for this end step"
                    maxLength={96} // Consistent with handleTitleChange limit
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                    {titleText.length}/96
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Options
                    <span className="text-gray-500 text-xs"> (Displayed to user)</span>
                </label>
                {options.map((option, index) => (
                    <div key={index} className="mb-2">
                        <input
                            type="text"
                            id={`option-${index}`}
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                            className="w-full p-2 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:bg-white"
                        />
                         {/* No remove button for End block options based on screenshots/simple use case */}
                    </div>
                ))}
                 {/* If you decide you *do* want adding/removing options here, add buttons */}
            </div>


            {/* No "+ Option" button based on assumption */}

            <div className="flex justify-end mt-6 space-x-3">
                 <button
                    type="button" // Prevent form submission if wrapped in form
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-medium"
                >
                    Cancel
                </button>
                <button
                    type="button" // Prevent form submission
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
                >
                    Save
                </button>
            </div>
        </ModalWrapper>
    );
};

export default EndSettingsModal;