import React from 'react';

// Instagram Logo Icon Component - approximates the logo in the image
const InstagramLogoIcon = () => (
  <div
    className="w-7 h-7 rounded-md flex items-center justify-center" // Outer container with gradient
    style={{
      background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%)',
    }}
  >
    {/* SVG for the white camera outline on top of the gradient */}
    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Camera body */}
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="white" strokeWidth="2.5"/>
      {/* Camera lens */}
      <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2.5"/>
      {/* Camera flash/dot */}
      <circle cx="18.5" cy="5.5" r="1.5" fill="white"/>
    </svg>
  </div>
);

// Mail Icon Component (Envelope)
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91A2.25 2.25 0 012.25 6.993V6.75" />
  </svg>
);

const Instagram = () => {
    return (
        // Main container for the component, styled as a card
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md font-sans max-w-3xl mx-auto">
            
            {/* Header Section: Instagram Logo, Title, and Subtitle */}
            <div className="flex items-center space-x-3">
                <InstagramLogoIcon />
                <div>
                    <h1 className="text-xl font-bold text-gray-800">Instagram</h1>
                    <p className="text-sm text-gray-500">Connect your Instagram business accounts and manage your Instagram conversations</p>
                </div>
            </div>

            {/* Horizontal Separator Line */}
            <hr className="my-6 border-gray-200" />

            {/* Main Content Layout: Left Column (Instructions) and Right Column (Grey Placeholder) */}
            <div className="flex flex-col md:flex-row md:space-x-8">
                
                {/* Left Column: Instructions and Setup Button */}
                <div className="flex-1"> {/* This column will take up the majority of the space */}
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Connect Instagram with chat</h2>
                    <ul className="list-disc list-inside space-y-3 text-sm text-gray-700 mb-6">
                        <li>Make sure your Instagram business account is connected to your Facebook business page. You should have admin access to both.</li>
                        <li>Ensure message control is enabled in your Instagram account. <a href="#" className="text-blue-600 hover:underline">Learn more</a></li>
                        <li>Click on Start Setup to log in to your Facebook account</li>
                        <li>Choose the Instagram business accounts you want to connect.</li>
                        <li>After successful connection, ensure Freshworks app is the primary receiver. <a href="#" className="text-blue-600 hover:underline">Learn more</a></li>
                    </ul>

                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md text-sm">
                        Start Setup ›
                    </button>
                </div>

                {/* Right Column: Grey Placeholder Box */}
                <div className="w-full md:w-56 lg:w-60 mt-6 md:mt-0 bg-gray-100 rounded-lg min-h-[200px] sm:min-h-[240px] md:min-h-[280px] flex-shrink-0">
                    {/* This box is intentionally empty as per the image. 
                        Its height is managed by min-h classes.
                        md:w-56 lg:w-60 sets a fixed width on medium and large screens.
                        flex-shrink-0 prevents it from shrinking if space is tight.
                    */}
                </div>
            </div>

            {/* Footer Help Section */}
            <div className="mt-8 flex items-center space-x-2 text-sm">
                <p className="text-gray-700">Need Help ?</p>
                <MailIcon />
                <a href="#" className="text-blue-600 hover:underline font-medium">Talk to our expert</a>
            </div>
        </div>
    );
};

export default Instagram;