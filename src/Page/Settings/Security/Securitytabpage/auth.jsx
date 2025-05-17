import React, { useState } from "react";
import { FiChevronDown } from 'react-icons/fi';

const Auth = () => {
    const [isAvailable, setIsAvailable] = useState(false);



    return (
        <div className="p-[22px]">
            <div className="flex justify-between items-center mb-7">
                <h2
                    className="text-[20px] font-medium leading-[20px] tracking-[0] text-black m-0"
                    style={{ fontFamily: 'Poppins' }}
                >
                    Enable 2FA
                </h2>


                <div className="flex items-center">
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

            <div className="mb-6">
                <label
                    className="block text-[10px] font-normal leading-[10px] tracking-[0] text-[#667085] mb-2"
                    style={{ fontFamily: 'Poppins' }}
                >
                    Enforcement Level
                </label>

                <div className="border border-[#EFF2F1] w-[50%] rounded-md px-3 py-2.5 bg-white text-sm flex justify-between items-center cursor-pointer text-gray-900">
                    <span>Optional / Required for Admins / Required for All</span>
                    <FiChevronDown size={18} className="text-gray-500" />
                </div>
            </div>

            <div>
                <p
                    className="text-[14px] font-normal leading-[14px] tracking-[0] text-[#667085] m-0"
                    style={{ fontFamily: 'Poppins' }}
                >
                    2FA Method : SMS, Email OTP, Authenticator App (TOTP)
                </p>

            </div>
        </div>
    )
}

export default Auth;
