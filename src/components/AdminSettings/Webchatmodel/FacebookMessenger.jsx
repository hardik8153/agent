import React from 'react';

// Placeholder for EnvelopeIcon if not using a library like Heroicons
// If you have Heroicons installed (e.g., @heroicons/react), you can import it:
// import { EnvelopeIcon } from '@heroicons/react/24/outline';
const EnvelopeIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);

// Facebook 'f' Icon SVG
const FacebookFIcon = () => (
    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
        {/* A common 'f' path, adjust if you have a specific SVG */}
        <path d="M16.438 21.998V13.5h2.844l.425-3.3H16.44V8.118c0-.955.265-1.605 1.635-1.605h1.745V3.348c-.3-.04-1.33-.053-2.353-.053-2.353 0-3.962 1.432-3.962 4.025v2.233H12.81v3.3h2.262v8.498h3.365z"/>
    </svg>
);

const FacebookMessenger = () => {
    return (
        // Main container, mimicking the white card in the image
        // Adjust max-w-* and mx-auto my-* as needed for your layout
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-4xl mx-auto my-4">
            {/* Header Section */}
            <div className="flex items-center space-x-3 mb-5">
                <div className="bg-blue-600 p-1.5 rounded-full flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10">
                    <FacebookFIcon />
                </div>
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Facebook Messenger</h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                        Connect your Facebook business pages and manage your facebook conversations.
                    </p>
                </div>
            </div>
            <hr className="mb-6 border-gray-200" />

            {/* Content Section */}
            <div className="flex flex-col lg:flex-row lg:space-x-10">
                {/* Left Column */}
                <div className="lg:w-3/5 space-y-5">
                    <h2 className="text-lg font-semibold text-gray-800">Connect your Facebook account</h2>
                    <ul className="list-disc list-inside space-y-2.5 text-sm text-gray-700 pl-1">
                        <li>Make sure you have admin access to your Facebook business page.</li>
                        <li>Click on Start Setup. Log in to your Facebook account.</li>
                        <li>Select the Facebook business pages you want to connect to chat.</li>
                    </ul>
                    
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-5 rounded-md text-sm">
                        Start Setup 
                    </button>

                    <div className="flex items-center space-x-2 pt-4 text-sm">
                        <span className="text-gray-600">Need Help ?</span>
                        <EnvelopeIcon className="w-5 h-5 text-blue-500" />
                        <a href="#" className="text-blue-500 hover:underline font-medium">
                            Talk to our expert
                        </a>
                    </div>
                </div>

                {/* Right Column (Placeholder) */}
                <div className="lg:w-2/5 mt-8 lg:mt-0">
                    <div className="bg-gray-100 h-64 sm:h-80 lg:h-full rounded-lg p-4">
                        {/* This is the placeholder area, content can be added here if needed */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacebookMessenger;