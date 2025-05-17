// components/ChatWindow.jsx
import React, { useState, useEffect, useRef } from 'react';
import { HiChevronDown, HiOutlineDocumentText, HiOutlinePhotograph, HiOutlineEmojiHappy } from 'react-icons/hi';
import { FiSend } from 'react-icons/fi';
import { database } from '@/firebase';
import { ref, push, onValue, remove } from 'firebase/database';
import EmojiPicker from 'emoji-picker-react';
import CannedResponsesInline, { cannedResponses } from './CannedResponsesPopup';
import AssignAgentPopup from './AssignAgentPopup';
import Authapi from '@/Server/Authapi';

const getChatId = (user1, user2) => {
    return [user1, user2].sort().join('_');
};

const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
};

const isToday = (timestamp) => {
    if (!timestamp) return false;
    const today = new Date();
    const messageDate = new Date(timestamp);
    return isSameDay(today, messageDate);
};

const formatDateSeparator = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    if (isToday(timestamp)) {
        return 'Today';
    }
    // Optional: Add yesterday logic if needed
    // const yesterday = new Date();
    // yesterday.setDate(yesterday.getDate() - 1);
    // if (isSameDay(date, yesterday)) {
    //     return 'Yesterday';
    // }
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};


const ChatWindow = ({ selectedConversation, currentUserId }) => {
    const [activeTab, setActiveTab] = useState('Reply');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messagesEndRef = useRef(null);
    const emojiPickerRef = useRef(null);
    const fileInputRef = useRef(null);
    const documentInputRef = useRef(null);
    const [showCannedResponsesPopup, setShowCannedResponsesPopup] = useState(false);
    const [showAssignAgentPopup, setShowAssignAgentPopup] = useState(false);
    const [showfistimemsg, setshowfistimemsg] = useState("");


    // console.log(selectedConversation?.autoChatLogs[0].chatId)

    const scrollToBottom = (behavior = "smooth") => {
        messagesEndRef.current?.scrollIntoView({ behavior });
    };

    useEffect(() => {
        scrollToBottom(messages.length > 0 ? "smooth" : "auto");
    }, [messages]);

    useEffect(() => {
        if (!selectedConversation || !currentUserId) {
            setMessages([]);
            return;
        }

        setMessages([]);

        const chatId = selectedConversation?.autoChatLogs?.[0]?.chatId;

        if (!chatId) return;

        // Main chat messages reference
        const messagesRef = ref(database, `chats/${chatId}`);
        const showMsgRef = ref(database, `showmsg/${chatId}`);

        // Subscribe to main chat messages
        const unsubscribeMain = onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const loadedMessages = Object.entries(data)
                    .map(([id, message]) => ({
                        id,
                        ...message
                    }))
                    .sort((a, b) => a.timestamp - b.timestamp);
                setMessages(loadedMessages);
            } else {
                setMessages([]);
            }

            setTimeout(() => scrollToBottom("auto"), 0);
        }, (error) => {
            console.error("Error fetching main messages:", error);
            setMessages([]);
        });

        // Subscribe to showmsg (for debugging or extra info)
        const unsubscribeShowMsg = onValue(showMsgRef, (snapshot) => {
            const data = snapshot.val();
            const loadedMessages = Object.entries(data)
                .map(([id, message]) => ({
                    id,
                    ...message
                }))
                .sort((a, b) => a.timestamp - b.timestamp);
            setshowfistimemsg(loadedMessages);
            setTimeout(() => scrollToBottom("auto"), 0);
        }, (error) => {
            console.error("Error fetching showmsg:", error);
        });

        // Cleanup both listeners
        return () => {
            unsubscribeMain();
            unsubscribeShowMsg();
        };
    }, [selectedConversation, currentUserId]);


    const sendMessageToFirebase = async (text) => {
        if (!selectedConversation || !text.trim()) return;

        const chatId = selectedConversation.id;
        const messagesRef = ref(database, `chats/${selectedConversation?.autoChatLogs[0]?.chatId}`);

        try {
            await push(messagesRef, {
                message: text.trim(),
                sender: 'You',
                senderId: currentUserId,
                timestamp: Date.now(),
                type: activeTab === 'Reply' ? 'reply' : 'private_note'
            });
            setMessage('');
            setShowEmojiPicker(false);

            remove(ref(database, `showmsg/${selectedConversation?.autoChatLogs[0]?.chatId}`))
                .then(() => {
                    console.log("Message successfully deleted!");
                    setshowfistimemsg("")
                })
                .catch((error) => {
                    console.error("Error deleting message:", error);
                });


        } catch (error) {
        }

        const data = {
            "memberId": "c90a3c4c-8043-43a1-8ed1-9afb5d961a45",
            "customerId": "99d7c044-cee1-4fb3-8c78-15ed74f75907",
            "ticketId": selectedConversation?.autoChatLogs[0]?.chatId,
            "msgSendBy": 0,
            "msgTime": Date.now(),
            "seenStatus": 0,
            "message": text.trim()
        }

        // const response= await Authapi.messages(data)

    };

    const handleSendMessage = () => {
        if (message.trim()) {
            sendMessageToFirebase(message);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleEmojiClick = (emojiObject) => {
        setMessage(prevMessage => prevMessage + emojiObject.emoji);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            alert(`File selected: ${file.name}. Upload not implemented yet.`);
            event.target.value = null;
        }
    };

    const handlePhotoClick = () => {
        fileInputRef.current?.click();
    };

    const handleDocumentClick = () => {
        documentInputRef.current?.click();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCloseCannedResponses = () => {
        setShowCannedResponsesPopup(false);
    };

    const getDescriptionByShortcut = (shortcut) => {
        const cannedResponse = cannedResponses.find(response => response.shortcut === shortcut);
        return cannedResponse ? cannedResponse.description : '';
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setMessage(inputValue);

        const words = inputValue.split(' ');
        const lastWord = words[words.length - 1];
        const description = getDescriptionByShortcut(lastWord);

        if (description) {
            words[words.length - 1] = description;
            setMessage(words.join(' '));
        }
    };



    const handleOpenAssignAgentPopup = () => {
        if (selectedConversation) {
            setShowAssignAgentPopup(true);
        }
    };

    const handleCloseAssignAgentPopup = () => {
        setShowAssignAgentPopup(false);
    };

    const handleAssignAgent = (agentId) => {
        handleCloseAssignAgentPopup();
    };

    let lastMessageTimestamp = null;

    return (
        <div className="w-full mx-auto bg-white h-full rounded-lg border border-gray-200 flex flex-col relative">
            <div className="p-4 flex justify-between items-center border-b border-gray-200 sticky top-0 bg-white z-10">
                <div>
                    <h2 className="text-[16px] font-medium leading-[100%] tracking-[0px] text-[#000000]  font-[Poppins]">
                        {selectedConversation ? `Chat with ${selectedConversation.name}` : 'Web Chat - Chat with us'}
                    </h2>

                    <button
                        className="text-[12px] leading-[100%] font-medium tracking-[0px] text-[#2A85FF] font-[Poppins] underline focus:outline-none disabled:text-gray-400 disabled:cursor-not-allowed"
                        onClick={handleOpenAssignAgentPopup}
                        disabled={!selectedConversation}
                    >
                        +Assign Agent
                    </button>

                </div>
                <AssignAgentPopup
                    isOpen={showAssignAgentPopup}
                    onClose={handleCloseAssignAgentPopup}
                    onAssign={handleAssignAgent}
                    currentUserId={currentUserId}
                />
                <button className="bg-[#2A85FF] hover:bg-blue-600 text-white px-3 py-1.5 rounded-md flex items-center text-[14px] leading-[100%] tracking-[0px] font-semibold font-[Poppins]">
                    Open <HiChevronDown className="ml-1 h-4 w-4" />
                </button>

            </div>

            <div className="p-4 space-y-4 bg-gray-50 flex-1 overflow-y-auto">
                {messages.length === 0 && (
                    <div className="text-center text-gray-500 mt-10">
                        {selectedConversation ? 'No messages yet. Start the conversation!' : 'Select a conversation to view messages.'}
                    </div>
                )}
                {messages.map((msg, index) => {
                    const showDateSeparator = index === 0 || !isSameDay(msg.timestamp, messages[index - 1]?.timestamp);
                    const dateSeparatorLabel = showDateSeparator ? formatDateSeparator(msg.timestamp) : null;

                    return (
                        <React.Fragment key={msg.id}>
                            {showDateSeparator && dateSeparatorLabel && (
                                <div className="flex items-center justify-center my-4">
                                    <span className="flex-grow border-t border-gray-300 mx-4"></span>
                                    <span className="text-[14px] leading-[100%] tracking-[0px] text-[#667085] font-Poppins px-2">
                                        {dateSeparatorLabel}
                                    </span>

                                    <span className="flex-grow border-t border-gray-300 mx-4"></span>
                                </div>
                            )}

                            <div className={`flex items-start space-x-3 ${msg.senderId === currentUserId ? 'justify-end' : ''}`}>
                                {/* {msg.senderId !== currentUserId && <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>} */}

                                <div className={`flex-1 flex flex-col ${msg.senderId === currentUserId ? 'items-end' : 'items-start'}`}>
                                    <div className="flex items-center space-x-2 mb-1">
                                        {msg.senderId === currentUserId ? (
                                            <>
                                                <p className="text-[14px] leading-[100%] tracking-[0px] text-[#667085] font-[Poppins]">
                                                    {msg.timestamp
                                                        ? new Date(msg.timestamp).toLocaleTimeString([], {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            hour12: true,
                                                        })
                                                        : ''}
                                                </p>

                                                <p className="text-[14px] leading-[100%] tracking-[0px] text-[#3D475C] font-Poppins">
                                                    {msg.senderId === currentUserId ? 'You' : msg.sender || selectedConversation?.name || 'Visitor'}
                                                </p>

                                                <p className="w-[37px] h-[37px] rounded-full bg-[#EDEDED]"></p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="w-[37px] h-[37px] rounded-full bg-[#EDEDED]"></p>
                                                <p className="text-[14px] leading-[100%] tracking-[0px] text-[#3D475C] font-Poppins">
                                                    {msg.senderId === currentUserId ? 'You' : msg.sender || selectedConversation?.name || 'Visitor'}
                                                </p>
                                                <p className="text-[14px] leading-[100%] tracking-[0px] text-[#667085] font-[Poppins]">
                                                    {msg.timestamp
                                                        ? new Date(msg.timestamp).toLocaleTimeString([], {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            hour12: true,
                                                        })
                                                        : ''}
                                                </p>
                                            </>
                                        )}

                                    </div>

                                    <div className={`p-3 rounded-lg max-w-md text-[#3D475C] break-words ${msg.senderId === currentUserId ? 'bg-[#EDEDED] ' : 'bg-[#2A85FF26] '}`}>
                                        <p className="text-[14px]">{msg.message}</p>
                                    </div>
                                </div>
                                {/* {msg.senderId === currentUserId && <div className="w-8 h-8 rounded-full bg-blue-300 flex-shrink-0"></div>} */}
                            </div>
                            {showfistimemsg[0]?.mshshow && (
                                <div className='p-2 bg-[#ffc300] w-[150px]'>
                                    <p >{showfistimemsg[0]?.mshshow}</p>
                                </div>
                            )}

                        </React.Fragment>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-200 bg-white  bottom-0">
                <div className="flex border-b border-gray-200">
                    <button
                        className={`py-2 px-4 text-[12px] font-Poppins text-[#0E2339] focus:outline-none ${activeTab === 'Reply' ? ' border-b-[4px] border-[#2A85FF] ' : ' hover:text-gray-700'}`}
                        onClick={() => setActiveTab('Reply')}
                        disabled={!selectedConversation}
                    >
                        Reply
                    </button>
                    <button
                        className={`py-2 px-4 text-[12px] font-Poppins focus:outline-none text-[#0E2339] ${activeTab === 'Private Notes' ? ' border-b-[4px] border-[#2A85FF]' : ' hover:text-gray-700'}`}
                        onClick={() => setActiveTab('Private Notes')}
                        disabled={!selectedConversation}
                    >
                        Private Notes
                    </button>
                </div>

                <div className="p-2">
                    <div className={`relative border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 ${!selectedConversation ? 'bg-gray-100' : ''}`}>
                        <textarea
                            rows={3}
                            className={`block w-full border-0 p-0 text-[#92929D] placeholder-gray-500 focus:ring-0 text-[12px] outline-none resize-none ${!selectedConversation ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                            placeholder={
                                !selectedConversation
                                    ? "Select a conversation to reply"
                                    : activeTab === 'Reply'
                                        ? "Shift + Enter to add a new line"
                                        : "Shift + Enter to add a new line"
                            }
                            value={message}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyPress}
                            disabled={!selectedConversation}
                        />
                    </div>

                    <div className="mt-2 flex justify-between items-center">
                        <div className="flex space-x-3 text-gray-500 items-center">
                            <button
                                onClick={() => setShowCannedResponsesPopup(true)}
                                className={`border border-gray-400 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed`}
                                title="Canned Responses"
                                disabled={!selectedConversation}
                            >
                                <img src="/star.png" alt="" className='w-[16px h-[16px]' />
                            </button>

                            <input
                                type="file"
                                ref={documentInputRef}
                                onChange={handleFileUpload}
                                className="hidden"
                                accept=".pdf,.doc,.docx,.txt,.csv,.xls,.xlsx"
                                disabled={!selectedConversation}
                            />
                            <img src='/attach-file1.png'
                                className={`h-[20px] text-[#667085] w-[20px] ${selectedConversation ? 'cursor-pointer ' : ' cursor-not-allowed'}`}
                                onClick={selectedConversation ? handleDocumentClick : undefined}
                                title="Attach Document"
                            />

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                className="hidden"
                                accept="image/*"
                                disabled={!selectedConversation}
                            />
                            <img src='/imagr.png'
                                className={`h-[16px] text-[#667085] w-[16px] ${selectedConversation ? 'cursor-pointer ' : ' cursor-not-allowed'}`}
                                onClick={selectedConversation ? handlePhotoClick : undefined}
                                title="Attach Image"
                            />

                            <div className="relative" ref={emojiPickerRef}>
                                <HiOutlineEmojiHappy
                                    className={`h-5 w-5 ${selectedConversation ? 'cursor-pointer hover:text-gray-700' : 'text-gray-400 cursor-not-allowed'}`}
                                    onClick={() => selectedConversation && setShowEmojiPicker(!showEmojiPicker)}
                                    title="Insert Emoji"
                                />
                                {showEmojiPicker && selectedConversation && (
                                    <div className="absolute bottom-full left-0 mb-2 z-20">
                                        <EmojiPicker
                                            onEmojiClick={handleEmojiClick}
                                            pickerStyle={{ boxShadow: 'none', border: '1px solid #ccc' }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="button"
                            className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 text-sm font-Poppins"
                            onClick={handleSendMessage}
                            disabled={!message.trim() || !selectedConversation}
                        >
                            <FiSend className="h-4 w-4 inline-block transform -rotate-0" />
                            <span>Send</span>
                        </button>
                    </div>
                </div>
            </div>

            {showCannedResponsesPopup && (
                <div className="absolute bottom-14 w-full z-20 bg-white border border-gray-300 rounded-lg shadow-xl ">
                    <CannedResponsesInline
                        onClose={handleCloseCannedResponses}
                        onSelectResponse={(responseText) => {
                            setMessage(prev => prev + responseText);
                            handleCloseCannedResponses();
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default ChatWindow;