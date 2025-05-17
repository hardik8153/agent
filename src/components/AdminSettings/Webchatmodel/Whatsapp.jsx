import React from 'react';

// Placeholder for WhatsApp Icon (You can replace this with an actual SVG or an icon from a library)
const WhatsAppIcon = () => (
    <svg
        className="h-8 w-8 mr-3 text-green-500" // WhatsApp green
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a8.836 8.836 0 01-4.421-1.238L1.993 17.354l1.407-3.434A6.963 6.963 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7.438 7.408c-.293.074-.66.147-1.007.221-.543.118-.92.263-1.13.437-.293.24-.438.518-.438.832 0 .314.145.61.438.916.293.305.68.63 1.138.998l.106.088c.59.488 1.118.916 1.53 1.263.412.347.74.61.947.776.293.24.518.385.66.437.145.052.333.074.558.074.224 0 .412-.022.558-.074.145-.052.293-.18.438-.385.145-.204.22-.47.22-.795s-.075-.583-.22-.795c-.145-.212-.293-.367-.438-.468a2.13 2.13 0 00-.558-.263c-.224-.074-.412-.11-.558-.11-.074 0-.145.015-.22.052-.075.037-.145.096-.22.17-.075.075-.145.163-.22.263l-.088.118c-.11.147-.19.24-.24.285-.052.044-.11.066-.177.066-.066 0-.124-.022-.177-.066-.052-.044-.11-.125-.177-.24l-.066-.132c-.318-.627-.558-1.17-.713-1.628a6.358 6.358 0 01-.162-1.043c.06-.08.13-.166.21-.256.08-.09.15-.175.21-.256l.08-.1c.1-.11.17-.21.21-.29.04-.08.06-.17.06-.25 0-.08-.02-.15-.06-.21s-.1-.11-.17-.15c-.07-.04-.15-.06-.24-.06h-.32z"
            clipRule="evenodd"
        ></path>
    </svg>
);

// Placeholder for Mail Icon (You can replace this with an actual SVG or an icon from a library)
const MailIcon = () => (
    <svg
        className="h-5 w-5 mr-1 text-blue-600" // Using blue-600 to match link color
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        ></path>
    </svg>
);

function Whatsapp() {
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white font-sans">
            {/* Header */}
            <div className="flex items-center mb-6">
                <WhatsAppIcon />
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">WhatsApp</h1>
                    <p className="text-sm text-gray-500">
                        Connect WhatsApp business numbers and bring all your conversations to one place.
                    </p>
                </div>
            </div>

            <hr className="mb-6 border-gray-200" />

            {/* Main Content Area with Right Empty Space */}
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-8">
                <div className="md:col-span-2"> {/* Content takes 2/3 of the width on medium screens and up */}
                    {/* Connect Section */}
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-700 mb-3">
                            Connect a new or existing WhatsApp Business number
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                            <li>
                                Click '<strong>Start Setup</strong>' to log into your Facebook Business account and connect WhatsApp.
                            </li>
                            <li>
                                Follow the guided setup to connect your WhatsApp Business number or to register a new one.
                                Make sure to <a href="#" className="text-blue-600 hover:underline">back up your data</a> before linking your personal WhatsApp number.
                            </li>
                            <li>
                                Enjoy the first 1000 conversations per month for free on the account that you add!
                            </li>
                        </ul>
                    </section>

                    {/* Pre-requisites Section */}
                    <section className="mb-8">
                        <h3 className="text-base font-semibold text-gray-700 mb-2">
                            Pre-requisites
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                            <li>
                                A valid phone number that can receive OTP through voice calls or text
                            </li>
                            <li>
                                A Facebook account. (If you don't have an account, <a href="#" className="text-blue-600 hover:underline">create one here</a>)
                            </li>
                        </ul>
                    </section>

                    {/* Start Setup Button */}
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded flex items-center text-sm">
                        Start Setup
                        <svg
                            className="ml-2 h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>

                    {/* Note Section */}
                    <div className="mt-6 text-xs text-gray-500">
                        <p>
                            <span className="font-semibold">Note :</span> Beyond 1000 conversations, WhatsApp charges per conversation,
                            which includes all messages delivered in a 24 hour session. Know more on <a href="#" className="text-blue-600 hover:underline">pricing</a>.
                        </p>
                    </div>
                </div>
                
                {/* The third column remains empty on md:screens and above, creating the whitespace as seen in the image */}
            </div>


            {/* Need Help Section */}
            <footer className="mt-10 pt-4 border-t border-gray-200 flex items-center">
                <p className="text-sm text-gray-600 mr-2">Need Help ?</p>
                <MailIcon />
                <a href="#" className="text-sm text-blue-600 hover:underline ml-1">
                    Talk to our expert
                </a>
            </footer>
        </div>
    );
}

export default Whatsapp;