import React, { useState, useEffect } from 'react';
import ConversationList from '../components/ConversationList';
import Chat from '../components/Chat';
import ContactInfo from '../components/ContactInfo';
import WebsiteInfo from '../components/WebsiteInfo';
import Conversationproperties from '../components/Conversationproperties';
import Topbar from '../components/Topbar';
import Authapi from '@/Server/Authapi';

const Conversations = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [userisdata, setUseriddata] = useState([]);

    // Cleanup function: checkout
    const checkout1 = async () => {
        const dataid2 = {
            "userId": "07866843-681b-417e-a9f6-7f5364f80276"
        }
        const responst = await Authapi.checkout(dataid2)
        if (responst) {
        }
    }


    useEffect(() => {
        usersid(selectedUser?.autoChatLogs[0]?.ticketId);
    }, [selectedUser]);


    useEffect(() => {
        return () => {
            checkout1();
        };
    }, []);

    const usersid = async (data) => {
        const respons = await Authapi.customerDetails(data);
        if (respons.success == true) {
            setUseriddata(respons.data);
        }
    }

    const topbadrdata = {
        title: '',
        togalbutton: true
    }

    return (
        <>
            <div className='bg-[#F6F8FA] w-full p-2'>
                <div className='pl-3 mt-4'>
                    <Topbar topbadrdata={topbadrdata} />
                    <div className='flex flex-col md:flex-row gap-[20px] w-full mt-5'>
                        <div className='rounded-lg w-[25%] overflow-y-auto' style={{ height: 'calc(100vh - 110px)' }}>
                            <ConversationList onSelectConversation={setSelectedUser} searchTerm={searchTerm} />
                        </div>
                        <div className='rounded-lg w-[50%] overflow-y-auto' style={{ maxHeight: 'calc(100vh - 110px)' }}>
                            <Chat selectedConversation={selectedUser} currentUserId="admin" />
                        </div>
                        <div className='rounded-lg w-[25%] overflow-y-auto' style={{ maxHeight: 'calc(100vh - 110px)' }}>
                            <ContactInfo selectedConversation={userisdata} />
                            <WebsiteInfo selectedConversation={userisdata} />
                            <Conversationproperties selectedConversation={userisdata} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Conversations;
