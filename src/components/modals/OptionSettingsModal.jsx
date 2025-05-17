import React, { useState, useEffect } from 'react';

// Basic Modal Shell (You might want a reusable BaseModal component)
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

const OptionSettingsModal = ({ isOpen, onClose, onSave, blockId, initialSettings }) => {
    const [titleText, setTitleText] = useState('');
    const [options, setOptions] = useState(['', '']); // Start with two empty options

    useEffect(() => {
        if (initialSettings) {
            setTitleText(initialSettings.title || '');
            // Ensure at least two options exist, potentially empty
            const initialOpts = initialSettings.options || [];
            while (initialOpts.length < 2) {
                 initialOpts.push('');
            }
            setOptions(initialOpts);
        } else {
             setTitleText('');
             setOptions(['', '']);
        }
    }, [initialSettings]);

    const handleTitleChange = (e) => {
        if (e.target.value.length <= 96) {
            setTitleText(e.target.value);
        }
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, '']);
    };

    const removeOption = (index) => {
        // Prevent removing below minimum options if desired (e.g., minimum 1 or 2)
        // if (options.length <= 1) return;
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    }

    const handleSave = () => {
        // Filter out empty options before saving if needed
        const validOptions = options.filter(opt => opt.trim() !== '');
        onSave(blockId, { title: titleText, options: validOptions.length > 0 ? validOptions : [''] }); // Ensure at least one empty if all were empty/removed
    };

    if (!isOpen) return null;

    return (
        <ModalWrapper onClose={onClose}>
            <h2 className="text-xl font-semibold mb-4">Option Block Settings</h2>

            <div className="mb-4">
                <label htmlFor="titleText" className="block text-sm font-medium text-gray-700 mb-1">
                    Title Text
                </label>
                <textarea
                    id="titleText"
                    value={titleText}
                    onChange={handleTitleChange}
                    placeholder="Write your title text here..."
                    rows="3"
                    maxLength="96"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                    {titleText.length}/96
                </div>
            </div>

            {options.map((option, index) => (
                <div key={index} className="mb-3 relative">
                    <label htmlFor={`option-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Option {index + 1}
                    </label>
                    <input
                        type="text"
                        id={`option-${index}`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder="Eg. Help, Refund, payment..."
                        className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 pr-8" // Add padding for remove button
                    />
                     {/* Simple remove button - style as needed */}
                     {options.length > 1 && ( // Only show remove if more than one option
                        <button
                            onClick={() => removeOption(index)}
                            className="absolute right-2 top-8 text-red-500 hover:text-red-700"
                            aria-label="Remove option"
                            title="Remove option"
                        >
                            ×
                        </button>
                     )}
                </div>
            ))}

            <button
                onClick={addOption}
                className="mb-6 px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 text-sm font-medium"
            >
                + Option
            </button>

            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
                >
                    Save
                </button>
            </div>
        </ModalWrapper>
    );
};

export default OptionSettingsModal;