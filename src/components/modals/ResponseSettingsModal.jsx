import React, { useState, useEffect } from 'react';
import { LuTrash2 } from 'react-icons/lu'; // Import the trash icon

// Basic Modal Shell (Can be a shared component)
const ModalWrapper = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-light"
                aria-label="Close"
            >
                × {/* Standard close icon */}
            </button>
            {children}
        </div>
    </div>
);

const ResponseSettingsModal = ({ isOpen, onClose, onSave, blockId, initialSettings }) => {
    // State for the main response text
    const [responseText, setResponseText] = useState('');
    // State for the block's custom title (optional, but good for organization)
    const [title, setTitle] = useState('');
    // State for Quick Replies (stored as an array of strings)
    const [options, setOptions] = useState(['']); // Start with one empty quick reply input

    useEffect(() => {
        if (initialSettings) {
            // Use existing 'responseText' or fallback to empty string
            setResponseText(initialSettings.responseText || '');
            // Use existing 'title' or fallback
            setTitle(initialSettings.title || '');
            // Use existing 'options' (quick replies) or provide default empty array
            const initialOpts = initialSettings.options || [];
            // Ensure there's always at least one input field shown, even if no options saved
             setOptions(initialOpts.length > 0 ? initialOpts : ['']);
        } else {
            // Default values if no initial settings provided
             setResponseText('');
             setTitle(''); // Default title can be empty or set here
             setOptions(['']);
        }
    }, [initialSettings, blockId]); // Rerun effect if initialSettings or blockId changes

    const handleResponseTextChange = (e) => {
        setResponseText(e.target.value);
        // Optional: Add character limit logic if needed
    };

     const handleTitleChange = (e) => {
        setTitle(e.target.value);
        // Optional: Add character limit logic if needed
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        // Optional: Add character limit for quick replies (e.g., 20 chars)
        // if (value.length <= 20) {
            newOptions[index] = value;
            setOptions(newOptions);
        // }
    };

    const addOption = () => {
        // Optional: Limit the maximum number of quick replies
        // if (options.length < 5) {
            setOptions([...options, '']);
        // } else {
        //     alert("Maximum number of quick replies reached.");
        // }
    };

    const removeOption = (indexToRemove) => {
        const newOptions = options.filter((_, index) => index !== indexToRemove);
         // If removing the option leaves the array empty, add a blank one back
         // This ensures the input field doesn't completely disappear.
         if (newOptions.length === 0) {
             setOptions(['']);
         } else {
             setOptions(newOptions);
         }
    }

    const handleSave = () => {
        // Filter out any completely empty quick replies before saving
        const validOptions = options.filter(opt => typeof opt === 'string' && opt.trim() !== '');

        // Construct the settings object to be passed back to AutoCreateFlow
        const settingsToSave = {
            title: title.trim(), // Save the trimmed title
            responseText: responseText.trim(), // Save the trimmed response text
            options: validOptions // Save the filtered valid quick replies
        };

        onSave(blockId, settingsToSave); // Pass client ID and the new settings
    };

    // Don't render the modal if isOpen is false
    if (!isOpen) return null;

    return (
        <ModalWrapper onClose={onClose}>
            <h2 className="text-xl font-semibold mb-5">Response Block Settings</h2>

            {/* Block Title Input */}
            <div className="mb-4">
                <label htmlFor="blockTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Block Title <span className="text-xs text-gray-500">(Optional, for organization)</span>
                </label>
                <input
                    type="text"
                    id="blockTitle"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="E.g., Welcome Message, Order Confirmation"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
            </div>


            {/* Response Text Input */}
            <div className="mb-4">
                <label htmlFor="responseText" className="block text-sm font-medium text-gray-700 mb-1">
                    Response Text <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="responseText"
                    value={responseText}
                    onChange={handleResponseTextChange}
                    placeholder="Enter the message the user will receive..."
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    required // Basic HTML5 required attribute
                />
                {/* Optional: Add character counter */}
            </div>

             {/* Quick Replies Section */}
             <div className="mb-4">
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                     Quick Replies <span className="text-xs text-gray-500">(Optional buttons shown with the response)</span>
                 </label>
                 {options.map((option, index) => (
                    <div key={index} className="mb-2 relative flex items-center space-x-2">
                        <input
                            type="text"
                            id={`option-${index}`}
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder="Button text (e.g., Yes, Learn More)"
                            className="flex-grow p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                            maxLength={20} // Example max length for quick replies
                        />
                        {/* Show remove button for every option */}
                        <button
                            onClick={() => removeOption(index)}
                            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 flex-shrink-0 transition-colors duration-150"
                            aria-label="Remove quick reply"
                            title="Remove quick reply"
                            type="button" // Prevent form submission if inside a form
                        >
                             <LuTrash2 size="16"/>
                        </button>
                    </div>
                ))}

                <button
                    onClick={addOption}
                    className="mt-2 px-3 py-1.5 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 text-sm font-medium flex items-center transition-colors duration-150"
                    type="button" // Prevent form submission if inside a form
                    // disabled={options.length >= 5} // Example: Disable if max reached
                >
                   <span className="mr-1 text-lg font-light">+</span> Add Quick Reply
                </button>
            </div>


            {/* Action Buttons */}
            <div className="flex justify-end pt-4 border-t border-gray-200 mt-2">
                 <button
                    onClick={onClose} // Use the onClose prop for Cancel
                    type="button"
                    className="px-4 py-2 mr-2 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    type="button" // Explicitly type as button
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium text-sm disabled:opacity-50"
                    // Disable save if response text is empty
                    disabled={!responseText.trim()}
                >
                    Save Changes
                </button>
            </div>
        </ModalWrapper>
    );
};

export default ResponseSettingsModal;