import React, { useState } from 'react';
import { FaFingerprint, FaNetworkWired, FaFileAlt, FaCloudUploadAlt, FaUsersCog } from 'react-icons/fa';
import Auth from './Securitytabpage/auth';
import Ip from './Securitytabpage/ip';
import Audit from './Securitytabpage/audit';
import Sso from './Securitytabpage/sso';
import Data from './Securitytabpage/data';
import CustomTab from '@/components/CustomTab';


const SecuritySettings = () => {
    const [activeTab, setActiveTab] = useState('auth');



    const tabs = [
        {
            title: "Authentication & Access",
            icon: () => <img className="h-[20px] w-[20px]" src="/authorization.png" alt="" />,
            active: true,
            component: (
                <div className="flex flex-col w-full h-full">
                    <Auth />
                </div>
            ),
        },
        {
            title: "IP Whitelisting",
            icon: () => <img className="h-[20px] w-[20px]" src="/ip-address.png" alt="" />,
            active: false,
            component: (
                <div className="flex flex-col w-full h-full">
                    <Ip />
                </div>
            ),
        },
        {
            title: "Audit Logs",
            icon: () => <img className="h-[20px] w-[20px]" src="/audit.png" alt="" />,
            active: true,
            component: <div className="flex flex-col w-full h-full"><Audit /></div>,
        },
        {
            title: "SSO Integration",
            icon: () => <img className="h-[20px] w-[20px]" src="/sso.png" alt="" />,
            active: false,
            component: <div className="flex flex-col w-full h-full"><Sso /></div>,
        },
        {
            title: "Data Retention & Compliance",
            icon: () => <img className="h-[20px] w-[20px]" src="/user-retention.png" alt="" />,
            active: false,
            component: <div className="flex flex-col w-full h-full"><Data /></div>,
        },
    ];


    return (
        <div className="bg-[#F6F8FA] p-6 min-h-full w-full text-gray-800 font-sans">
            <h1 className="text-[16px] font-medium leading-[16px] tracking-[0] align-middle text-black mb-6" style={{ fontFamily: 'Poppins' }}>
                Security Settings
            </h1>
            <div
                className={` mt-[32px] relative z-0
                    rounded-b-md min-h-[calc(100vh-140px)]`}
            >
                <CustomTab
                    tabs={tabs}
                    text={true}
                    align="left"
                    className={"text-[12px]"}
                />
            </div>
        </div>
    );
};

export default SecuritySettings;