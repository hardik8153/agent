import React from 'react';

// SDK Icon (approximated from image: blue rounded box with "SDK" text)
const SdkIcon = () => (
    <div className="w-10 h-10 bg-blue-500 flex items-center justify-center rounded-md mr-3 flex-shrink-0">
        <span className="text-white text-xs font-bold">SDK</span>
    </div>
);

// Envelope Icon (standard outline icon)
const EnvelopeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);


const MobileSDK = () => {
    return (
        // Outer container for centering content on the page and setting a background color
        <div className="bg-slate-100 min-h-screen p-4 sm:p-8 flex items-center justify-center font-sans">
            {/* Main Card Container */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-4xl">
                {/* Flex container for two-column layout (stacked on small screens, row on large) */}
                <div className="flex flex-col lg:flex-row">
                    
                    {/* Left Column: Main Content */}
                    <div className="flex-grow lg:pr-10"> {/* pr-10 creates space for the right panel on large screens */}
                        
                        {/* Header Section: Icon, Title, Subtitle */}
                        <div className="flex items-center mb-5"> {/* Increased bottom margin slightly */}
                            <SdkIcon />
                            <div>
                                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Mobile SDK</h1>
                                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                                    Integrate Chat Mobile SDK and manage your in-app conversations.
                                </p>
                            </div>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* Content Section: "Empower your app..." and bullet points */}
                        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
                            Empower your app with Freshchat
                        </h2>

                        <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm mb-6 sm:mb-8">
                            <li>Use iOS and Android guide to know more about the SDK setup.</li>
                            <li>Use the API keys to integrate the mobile SDK into your mobile app.</li>
                            <li>
                                Once the SDK is setup, you can configure the push notifications for iOS
                                and Android.
                            </li>
                            <li>Complete chat and bot configurations for mobile SDK topics.</li>
                            <li>
                                After successful connection, ensure Freshworks app is the primary
                                receiver. <a href="#" className="text-blue-600 hover:underline font-medium">Learn more</a>
                            </li>
                        </ul>

                        {/* Action Button: "Start Setup" */}
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-5 rounded-md text-sm mb-6 sm:mb-8">
                            Start Setup 
                        </button>

                        {/* Need Help Section */}
                        <div className="flex items-center space-x-1.5">
                            <p className="text-sm text-gray-800 font-medium">Need Help ?</p>
                            <EnvelopeIcon />
                            <a href="#" className="text-blue-600 hover:underline text-sm font-medium">
                                Talk to our expert
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Placeholder Area */}
                    {/* Hidden on small screens (stacked), visible as a column on large screens */}
                    <div className="hidden lg:block lg:w-2/5 xl:w-1/3 mt-8 lg:mt-0 flex-shrink-0"> 
                        <div className="bg-gray-50 h-full rounded-lg p-4">
                            {/* This is the placeholder area as seen in the image. 
                                It's intentionally kept minimal. Content can be added if needed.
                                h-full attempts to match the height of the left content column on large screens.
                            */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileSDK;