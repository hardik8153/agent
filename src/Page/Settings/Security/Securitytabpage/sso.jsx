import React, { useState } from "react";
import { FiChevronDown, FiDownload } from 'react-icons/fi';



const Sso = () => {
    const [isEnforceSsoActive, setIsEnforceSsoActive] = useState(true);
    const [isAvailable, setIsAvailable] = useState(false);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
        }
    };

    return (
        <div className=" p-6 md:p-8 rounded-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <div className="flex justify-between items-center mb-8">
                <h1
                    className="text-[20px] font-medium leading-[100%] tracking-[0px] text-black"
                    style={{ fontFamily: 'Poppins' }}
                >
                    Enable SSO
                </h1>
                <div className="flex items-center space-x-2">
                    <span className="mr-3 text-sm text-gray-600">{isAvailable ? "Available" : "Unavailable"}</span>
                    <div
                        className={`relative w-[32px] h-[8px] ${isAvailable ? "bg-[#D9D9D9]" : "bg-[#D9D9D9]"
                            } rounded-full cursor-pointer transition-all`}
                        onClick={() => setIsAvailable(!isAvailable)}
                    >
                        <div
                            className={`absolute top-[-4px] w-[16px] h-[16px] rounded-full transition-all duration-300 ${isAvailable ? "right-0 bg-[#2A85FF]" : "left-0 bg-[#667085]"
                                }`}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label
                        htmlFor="idp"
                        className="block text-[10px] font-normal leading-[100%] tracking-[0px] text-[#667085] mb-1"
                        style={{ fontFamily: 'Poppins' }}
                    >
                        Identity Provider (IdP)
                    </label>

                    <div className="relative w-[50%]">
                        <div className="w-full bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500 sm:text-sm">
                            <span className="block truncate text-gray-800">SAML / OAuth / Google Workspace / Azure AD</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <FiChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="metadata" className="block text-[10px] font-normal leading-[100%] tracking-[0px] text-[#667085] mb-1"
                        style={{ fontFamily: 'Poppins' }}>
                        Metadata URL / XML
                    </label>
                    <input
                        type="text"
                        name="metadata"
                        id="metadata"
                        className="mt-1 block w-[50%] border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-800 placeholder-gray-400"
                        placeholder="Upload or paste IdP metadata"
                    />
                </div>

                <div>
                    <label htmlFor="entityId" className="block text-[10px] font-normal leading-[100%] tracking-[0px] text-[#667085] mb-1"
                        style={{ fontFamily: 'Poppins' }}>
                        Entity ID
                    </label>
                    <input
                        type="text"
                        name="entityId"
                        id="entityId"
                        className="mt-1 block w-[50%] border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-800 placeholder-gray-400"
                        placeholder="SSO service identifier"
                    />
                </div>

                <div>
                    <label htmlFor="idpCertificateFile" className="block text-[10px] font-normal leading-[100%] tracking-[0px] text-[#667085] mb-1"
                        style={{ fontFamily: 'Poppins' }}>
                        Upload IdP certificate
                    </label>
                    <label
                        htmlFor="idpCertificateFile-input"
                        className="mt-1 flex items-center w-[50%] px-3 py-2 border border-gray-300 rounded-md bg-white cursor-pointer hover:border-gray-400 focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500"
                    >
                        <FiDownload className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Drag & Drop / Browse</span>
                    </label>
                    <input
                        id="idpCertificateFile-input"
                        name="idpCertificateFile"
                        type="file"
                        className="sr-only"
                        onChange={handleFileSelect}
                    />
                </div>

                <div>
                    <button
                        type="button"
                        className=" flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2A85FF] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Test Connection
                    </button>
                </div>
            </div>

            <div className="mt-10 flex w-[50%] justify-between items-center">
                <div>
                    <h2
                        className="text-[16px] font-normal leading-[100%] tracking-[0px] text-black"
                        style={{ fontFamily: 'Poppins' }}
                    >
                        Enforce SSO
                    </h2>
                    <p
                        className="text-[10px] font-normal leading-[100%] tracking-[0px] text-[#667085] mt-1"
                        style={{ fontFamily: 'Poppins' }}
                    >
                        Disable regular login once SSO is set
                    </p>

                </div>
                <div
                    className={`relative w-[32px] h-[8px] ${isAvailable ? "bg-[#D9D9D9]" : "bg-[#D9D9D9]"
                        } rounded-full cursor-pointer transition-all`}
                    onClick={() => setIsAvailable(!isAvailable)}
                >
                    <div
                        className={`absolute top-[-4px] w-[16px] h-[16px] rounded-full transition-all duration-300 ${isAvailable ? "right-0 bg-[#2A85FF]" : "left-0 bg-[#667085]"
                            }`}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sso;

