import React from 'react';
import { Check, Mail, X } from "lucide-react";


function ChannelApps() {
    return (
        <div className="box-border w-[979px] h-[505px] bg-white border border-[#EFF2F1] rounded-[8px] p-6 font-[Poppins]">
            {/* Title */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <h1 className="text-[20px] font-medium text-black leading-none tracking-[0px]">
                    Web Chat
                </h1>
            </div>

            {/* Description */}
            <p className="text-[#667085] mt-2 text-[12px] font-normal leading-none tracking-[0px]">
                Create multiple web chat widgets for your websites, or storefront to
                allow customers to chat with your business.
            </p>

            <hr className="border-[#EFF2F1] my-6" />

            <div className="flex h-full">
                {/* Left Side */}
                <div className="w-2/3 pr-6">
                    <h2 className="text-[16px] font-medium text-black leading-none tracking-[0px] mb-6">
                        Add your first widget to your website
                    </h2>

                    <ul className="list-disc pl-6 space-y-6 text-[12px] font-normal text-[#667085] leading-none tracking-[0px]">
                        <li>
                            Check out the widget we have already made for you through the{" "}
                            <a href="#" className="text-[#2A85FF] underline">
                                live preview.
                            </a>

                        </li>
                        <li>
                            Use the widget in your website by inserting this code before
                            the <span className="font-mono">&lt;head&gt;</span> tag on
                            your web pages.
                        </li>
                    </ul>

                    {/* Script Block */}
                    <div className="bg-[#F6F8FA] rounded-[10px] p-4 mt-6 relative w-full max-w-[602px] h-[104px]">
                        <pre className="font-mono text-sm text-gray-700">
                            &lt;script src='//in.fw-cdn.com/32329448/1262863.js'
                            chat='true'&gt;&lt;/script&gt;
                        </pre>
                        <button className="absolute right-4 top-4 text-[#2A85FF] font-medium text-[14px] hover:text-blue-700">
                            Copy
                        </button>
                    </div>

                    {/* Need Help */}
                    <div className="flex items-center mt-10 gap-2 text-[16px] font-medium text-black">
                        <p>Need Help?</p>
                        <a
                            href="#"
                            className="flex items-center text-[#2A85FF] underline gap-2"
                        >
                            <Mail size={18} />
                            Talk to our expert
                        </a>
                    </div>
                </div>

                {/* Right Side */}
                <div className="w-1/3 bg-gray-50 rounded-lg" />
            </div>
        </div>
    );
}

export default ChannelApps;