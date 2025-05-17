import React, { useState } from 'react';
import Topbar from '@/components/Topbar';

const ApiDetailRow = ({ label, value, masked = false, actions = [] }) => {
    const displayValue = masked ? '********************' : value;

    const handleCopy = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log('Copied to clipboard:', textToCopy);
                alert('Copied!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                alert('Failed to copy.');
            });
    };

    return (
        <div className="">
            <label className="block text-sm font-Poppins text-gray-700 mb-1">{label}</label>
            <div className="flex items-center space-x-2">
                <div className="flex-grow bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 font-Poppins truncate">
                    {displayValue}
                </div>
                {actions.map((action, index) => {
                    const baseButtonStyles = "px-4 py-2 rounded-md text-sm font-Poppins border transition duration-150 ease-in-out";
                    let specificStyles = '';
                    if (action.primary) {
                        specificStyles = 'bg-blue-600 text-white hover:bg-blue-700 border-transparent';
                    } else if (action.text === 'Reset Key') {
                        specificStyles = 'bg-white text-[#2A85FF] hover:bg-gray-50 border-gray-300 hover:text-[#2066CC]';
                    } else {
                        specificStyles = 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300';
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => {
                                if (action.type === 'copy') {
                                    handleCopy(value);
                                } else if (action.onClick) {
                                    action.onClick();
                                }
                            }}
                            className={`${baseButtonStyles} ${specificStyles}`}
                        >
                            {action.text}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};


const ApiSection = ({ title, description, children }) => {
    return (
        <div className="bg-white p-6 rounded-lg ">
            <h2 className="text-xl font-Poppins text-gray-800 mb-1">{title}</h2>
            <p className="text-sm text-gray-600 mb-6">{description}</p>
            {children}
        </div>
    );
};


const topbadrdata = {
    // title: '',
    Routertitle: "Admin Settings",
    Router: "/AdminSettings",
    Routertitle1: "API Settings"
};

const API_Settings = () => {
    const [chatApiKey, setChatApiKey] = useState('********************');
    const chatUrl = 'creativecats-b8f6ec60e55157b174492l4.freshchat.com/v2';
    const crmApiKey = 'qQDrm55eltRXZf7u6U5zbw';
    const crmBundleAlias = 'creativecats.myfreshworks.com/crm/sales';
    const phoneApiKey = '91f2f87af71c6db6a4dee0f729f66b6b';

    const handleGenerateToken = () => {
        console.log('Generate Token clicked');
        alert('Generate Token action triggered (implement API call)');
    };

    const handleResetCrmKey = () => {
        console.log('Reset CRM Key clicked');
        alert('Reset CRM Key action triggered (implement API call)');
    };

    const handleResetPhoneKey = () => {
        console.log('Reset Phone Key clicked');
        alert('Reset Phone Key action triggered (implement API call)');
    };

    return (
        <div className="p-6 md:p-8 bg-[#F6F8FA] min-h-screen w-full">
            <Topbar topbadrdata={topbadrdata} />
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-6">
                <div className="flex-grow bg-white lg:w-2/3">
                    <ApiSection
                        title="API details for chat"
                        description="Use APIs to manage chat integrations and bots."
                    >
                        <ApiDetailRow
                            label="Your API Key"
                            value={chatApiKey}
                            masked={true}
                            actions={[
                                { text: 'Generate Token', onClick: handleGenerateToken }
                            ]}
                        />
                        <ApiDetailRow
                            label="Your chat URL"
                            value={chatUrl}
                            actions={[
                                { text: 'Copy', type: 'copy' }
                            ]}
                        />
                    </ApiSection>
                    <ApiSection
                        title="CRM API details"
                        description="Use APIs to manage the contacts, accounts, deals, and sales activities relevant to your business."
                    >
                        <ApiDetailRow
                            label="Your API Key"
                            value={crmApiKey}
                            actions={[
                                { text: 'Copy', type: 'copy' },
                                { text: 'Reset Key', onClick: handleResetCrmKey }
                            ]}
                        />
                        <ApiDetailRow
                            label="Your bundle alias"
                            value={crmBundleAlias}
                            actions={[
                                { text: 'Copy', type: 'copy' }
                            ]}
                        />
                    </ApiSection>
                    <ApiSection
                        title="API details for phone"
                        description="Use APIs to manage phone integrations."
                    >
                        <ApiDetailRow
                            label="Your API Key"
                            value={phoneApiKey}
                            actions={[
                                { text: 'Copy', type: 'copy' },
                                { text: 'Reset Key', onClick: handleResetPhoneKey }
                            ]}
                        />
                    </ApiSection>
                </div>
                <div className="lg:w-1/3">
                    <div className="bg-white p-6 font-Poppins rounded-lg shadow-sm">
                        <h2 className="text-xl font-Poppins text-gray-800 mb-3">API Settings</h2>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Use your API key to let other applications access your Freshchat account.
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed mt-3">
                            To stop an application from accessing your account, reset your API key. Resetting will however deny access to all the applications that are connected to your account. To grant them access, you'll need to share the new API key.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default API_Settings;