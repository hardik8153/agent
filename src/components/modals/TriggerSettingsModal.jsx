import React, { useState, useEffect } from 'react';
import { LuX } from 'react-icons/lu'; // Import close icon

const TriggerSettingsModal = ({ isOpen, onClose, onSave, blockId, initialSettings }) => {
    // Internal state for the form fields
    // Initialize state from initialSettings or defaults
    const [triggerType, setTriggerType] = useState(initialSettings?.type || 'Keyword');
    const [keyword, setKeyword] = useState(initialSettings?.keyword || '');
    // Add state for other potential settings if needed later
    // const [message, setMessage] = useState(initialSettings?.message || '');
    // const [delay, setDelay] = useState(initialSettings?.delaySeconds || '');

    // Effect to update internal state if initialSettings change *while the modal is open*
    // (More relevant if you implement editing existing blocks later)
    useEffect(() => {
        if (isOpen) {
            setTriggerType(initialSettings?.type || 'Keyword');
            setKeyword(initialSettings?.keyword || '');
            // Reset other fields too if they exist
            // setMessage(initialSettings?.message || '');
            // setDelay(initialSettings?.delaySeconds || '');
        }
    }, [isOpen, initialSettings]); // Rerun when isOpen or initialSettings change

    const handleSave = () => {
        // Basic validation (optional)
        if (triggerType === 'Keyword' && !keyword.trim()) {
            alert('Please enter at least one keyword.');
            return;
        }

        const settings = {
            type: triggerType,
            // Add other settings based on triggerType later
            ...(triggerType === 'Keyword' && { keyword: keyword.trim() }),
            // Include other settings if added to the form:
            // message: message,
            // delaySeconds: delay ? parseInt(delay, 10) : null,
        };
        onSave(blockId, settings); // Pass blockId and the collected settings back
        // onClose(); // Let the parent handle closing after async save if needed, or close here
                     // In our current AutoCreateFlow, onSave is async, but modal closes immediately
                     // by calling onClose from within its onSave prop. Let's keep it simple for now.
         onClose(); // Close the modal after triggering save
    };

    const handleClose = () => {
        onClose(); // Just close the modal
    };

    // Prevent rendering if not open
    if (!isOpen) {
        return null;
    }

    return (
        // Modal Overlay
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 font-Poppins">
            {/* Modal Content */}
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Trigger Block Settings</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-800 transition-colors"
                        aria-label="Close modal"
                    >
                        <LuX size={24} />
                    </button>
                </div>

                {/* Body - Form */}
                <div className="space-y-4">
                    {/* Trigger Type Selection */}
                    <div>
                        <label htmlFor="triggerType" className="block text-sm font-medium text-gray-700 mb-1">
                            Select Trigger Type
                        </label>
                        <select
                            id="triggerType"
                            value={triggerType}
                            onChange={(e) => setTriggerType(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        >
                            <option value="Keyword">Keyword</option>
                            {/* Add other trigger types here later */}
                            {/* <option value="API">API Call</option> */}
                            {/* <option value="Schedule">Schedule</option> */}
                        </select>
                    </div>

                    {/* Keyword Input (Conditional) */}
                    {triggerType === 'Keyword' && (
                        <div>
                            <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
                                Enter Keywords (comma-separated)
                            </label>
                            <input
                                type="text"
                                id="keyword"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Eg. Help, Refund, payment"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm placeholder-gray-400"
                            />
                            <p className="text-xs text-gray-500 mt-1">Separate multiple keywords with a comma (,).</p>
                        </div>
                    )}

                    {/* Add more conditional fields for other trigger types or settings here */}
                    {/* Example for Message (if needed)
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Response Message (Optional)
                        </label>
                        <input
                            type="text"
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Initial response for this trigger"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm placeholder-gray-400"
                        />
                    </div>
                    */}
                    {/* Example for Delay (if needed)
                     <div>
                         <label htmlFor="delay" className="block text-sm font-medium text-gray-700 mb-1">
                             Delay (seconds, optional)
                         </label>
                         <input
                             type="number"
                             id="delay"
                             value={delay}
                             onChange={(e) => setDelay(e.target.value)}
                             placeholder="e.g., 5"
                             min="0"
                             className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm placeholder-gray-400"
                         />
                     </div>
                    */}

                </div>

                {/* Footer - Actions */}
                <div className="mt-8 flex justify-end space-x-3">
                     {/* Optional Cancel Button */}
                    {/* <button
                        onClick={handleClose}
                        type="button" // Prevent form submission if inside a <form> tag
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button> */}
                    <button
                        onClick={handleSave}
                        type="button" // Set type to button
                        className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TriggerSettingsModal;