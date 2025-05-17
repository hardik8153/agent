import React, { useState } from 'react';
import Topbar from '@/components/Topbar';


const topbadrdata = {
    // title: '',
    Routertitle: "Admin Settings",
    Router: "/AdminSettings",
    Routertitle1: "Conversationhook"
};
const WebhooksSettings = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [webhookUrl, setWebhookUrl] = useState('');
    const [failureEmail, setFailureEmail] = useState('');
    const [authenticationHeader, setAuthenticationHeader] = useState('YOUR_STATIC_HEADER_VALUE_HERE');
    const [copied, setCopied] = useState(false);



    const handleCopy = () => {
        navigator.clipboard.writeText(authenticationHeader).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(err => {
        });
    };

    return (
        <div className="p-6 md:p-8 bg-[#F6F8FA] min-h-screen w-full">
            <Topbar topbadrdata={topbadrdata} />
            <div className="min-h-screen w-full font-sans justify-items-center">
                <div className="flex justify-between gap-[50px] w-full items-start mt-[32px]">
                    <div className=''>
                        <h1 className="font-medium text-[20px] leading-[20px] tracking-[0px] text-black mb-2">
                            Webhooks
                        </h1>
                        <p className="font-poppins font-normal text-[12px] leading-[12px] tracking-[0px] text-[#667085]">
                            Webhooks let you receive notifications for Chat app events like conversation replies, assignments, etc.
                        </p>

                    </div>

                    <div className='flex items-center  space-x-2 bg-white px-3 py-1.5 rounded-md border border-gray-200 shadow-sm'>
                        <h1 className={`text-sm top-[-4px] font-medium ${isEnabled ? 'text-green-600' : 'text-gray-500'}`}>
                            {isEnabled ? 'Enabled' : 'Disabled'}
                        </h1>
                        <div
                            className={`relative w-[32px] h-[8px] ${isEnabled ? "bg-[#12B76A]" : "bg-[#D9D9D9]"
                                } rounded-full cursor-pointer transition-all`}
                            onClick={() => setIsEnabled(!isEnabled)}
                        >

                            <div
                                className={`absolute top-[-4px] w-[16px] h-[16px] rounded-full transition-all duration-300 ${isEnabled ? "right-0 bg-[#12B76A]" : "left-0 bg-[#667085]"
                                    }`}
                            />
                        </div>
                    </div>
                </div>

                {!isEnabled && (
                    <div className=" border bg-white mt-[47px] w-[477px] text-yellow-800 px-4 py-3 rounded-md mb-6 flex items-center">
                        <span className="text-yellow-500 mr-2 text-xl">💡</span>
                        <span className="font-poppins font-normal text-[16px] leading-[16px] tracking-[0px] text-black">
                            Please enable Webhook to customize properties
                        </span>
                    </div>
                )}

                <div className={`bg-white p-6 rounded-lg w-[931px] mt-[32px] transition-opacity duration-300 ${!isEnabled ? 'opacity-60 pointer-events-none' : ''}`}>
                    <div className="mb-6">
                        <h2 className="font-poppins font-medium text-[20px] leading-[20px] tracking-[0px] text-black mb-5">
                            Webhook
                        </h2>
                        <input
                            type="url"
                            placeholder="Enter a valid webhook starting with HTTPS"
                            value={webhookUrl}
                            onChange={(e) => setWebhookUrl(e.target.value)}
                            disabled={!isEnabled}
                            className="w-full px-4 py-2 mb-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  disabled:cursor-not-allowed"
                        />
                    </div>

                    <div className="mb-6">
                        <h2 className="font-poppins font-medium text-[20px] leading-[20px] tracking-[0px] text-black mb-4">
                            Failure Notifications
                        </h2>
                        <div className='flex gap-4 text-center items-center'>
                            <label htmlFor="failureEmail" className="font-poppins font-normal text-[14px] leading-[14px] tracking-[0px] text-black block mb-1">
                                Failure notifications will be sent to
                            </label>

                            <input
                                type="email"
                                id="failureEmail"
                                placeholder="Enter a valid email address"
                                value={failureEmail}
                                onChange={(e) => setFailureEmail(e.target.value)}
                                disabled={!isEnabled}
                                className="max-w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-md mb-6 border border-blue-100">
                        <h3 className="font-poppins mb-2 text-gray-700">Please Note</h3>
                        <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                            <li>
                                There will be a maximum of <span className="font-poppins text-blue-600">5 retries</span> for an API call.
                            </li>
                            <li>
                                If no response is received, the API call will timeout in <span className="font-poppins text-blue-600">3 seconds</span>.
                            </li>
                        </ol>
                    </div>

                    {isEnabled && (
                        <div className="mb-8">
                            <h1 className="font-poppins font-medium mb-[20px] text-[20px] leading-[20px] tracking-[0px] text-black">
                                Authentication
                            </h1>
                            <label className='font-Poppins mb-1 text-[12px]'>All calls to your webhook will have the header</label>
                            <div className="flex items-center  gap-3">
                                <input
                                    type="text"
                                    readOnly
                                    value=""
                                    disabled={!isEnabled}
                                    className="flex-grow px-4 py-2 bg-white border border-gray-300 rounded-md "
                                />
                                <button
                                    onClick={handleCopy}
                                    disabled={!isEnabled}
                                    className={`px-4 py-2 border border-gray-300 bg-white text-sm font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out ${copied ? 'bg-green-100 text-green-700 border-green-300' : 'text-gray-700'}`}
                                >
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                        </div>

                    )}


                    <div>
                        <button
                            disabled={!isEnabled}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => ""}
                        >
                            Save
                        </button>
                    </div>

                </div>
            </div>
        </div >
    );
};

export default WebhooksSettings;