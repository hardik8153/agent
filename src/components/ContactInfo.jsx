import React, { useState, useEffect } from 'react';
import { PiMapPinLineDuotone } from "react-icons/pi";

// --- Chevron Icons ---
const ChevronUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-gray-600"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-gray-600"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

// --- Modal Specific Icons ---
const EditIconModal = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2A85FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </svg>
);

const CloseIconModal = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ChevronDownIconModal = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-5 h-5 text-black"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);


const EditUserContactInfoModal = ({ isOpen, onClose, userData, onSave }) => {
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (userData) {
      setEmail(userData.email || 'Nikhilpandey23@gmail.com');
      setContactNo(userData.mobileNumber || '8130362124');
      const validLocations = ["Maharashtra, Mumbai, India", "Gujarat, Ahmedabad, India", "Karnataka, Bangalore, India"];
      setLocation(validLocations.includes(userData.address) ? userData.address : 'Maharashtra, Mumbai, India');
    } else {
      setEmail('Nikhilpandey23@gmail.com');
      setContactNo('8130362124');
      setLocation('Maharashtra, Mumbai, India');
    }
  }, [userData, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ email, contactNo, location });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 font-Poppins">
      <div className="bg-white rounded-xl  p-6 sm:p-8 w-full max-w-lg">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-Poppins text-black">Edit User Contact Info</h2>
          <button onClick={onClose} className="text-gray-700 hover:text-black">
            <CloseIconModal />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-Poppins text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-[50px]"
                placeholder="Nikhilpandey23@gmail.com"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                <EditIconModal />
              </div>
            </div>
          </div>

          {/* Contact No. Field */}
          <div>
            <label htmlFor="contactNo" className="block text-sm font-Poppins text-gray-700 mb-1">
              Contact No.
            </label>
            <div className="relative">
              <input
                type="text"
                id="contactNo"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-[50px]"
                placeholder="8130362124"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                <EditIconModal />
              </div>
            </div>
          </div>

          {/* Location Field */}
          <div>
            <label htmlFor="location" className="block text-sm font-Poppins text-gray-700 mb-1">
              Location
            </label>
            <div className="relative">
              <select
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-[50px] appearance-none pr-10"
              >
                <option>Maharashtra, Mumbai, India</option>
                <option>Gujarat, Ahmedabad, India</option>
                <option>Karnataka, Bangalore, India</option>
                {/* Add more locations as needed */}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDownIconModal />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-10">
            <button
              onClick={handleSave}
              className="bg-[#2A85FF] hover:bg-blue-600 text-white font-Poppins py-3 px-16 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
              style={{ lineHeight: '100%' }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const ContactInfo = ({ selectedConversation: initialSelectedConversation }) => {
  const [isContentVisible, setIsContentVisible] = useState(true); // Default to visible
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(initialSelectedConversation);
  useEffect(() => {
    setSelectedConversation(initialSelectedConversation);
  }, [initialSelectedConversation]);


  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSaveContactInfo = (updatedData) => {
    setSelectedConversation(prev => ({
      ...prev,
      email: updatedData.email,
      mobileNumber: updatedData.contactNo,
      address: updatedData.location,
      contactInfo: (prev?.contactInfo || []).map(info => {
        if (info.label.toLowerCase() === 'email') return { ...info, value: updatedData.email };
        if (info.label.toLowerCase() === 'contact no.') return { ...info, value: updatedData.contactNo };
        return info;
      })
    }));
  };


  // Placeholder data if selectedConversation is not fully populated
  // const name = selectedConversation?.name || "Nikhil Pandey";
  // const address = selectedConversation?.address || "Maharashtra, Mumbai, India";
  // const customerId = selectedConversation?.id || "CUST12345";

  const defaultContactInfo = [
    { label: "Email", value: selectedConversation?.email || "Nikhilpandey23@gmail.com" },
    { label: "Contact No.", value: selectedConversation?.mobileNumber || "8130362124" },
    { label: "Registration Date", value: selectedConversation?.createdAt || "2023-01-15" },
    { label: "Last Used", value: selectedConversation?.lastLogin || "3 day ago" },
    { label: "Wallet Amount", value: selectedConversation?.amount || "₹500" },
    { label: "Last Recharged", value: "3 Days Ago" }, // This might come from a different source
  ];

  const contactDetails = selectedConversation?.contactInfo && selectedConversation.contactInfo.length > 0
    ? selectedConversation.contactInfo
    : defaultContactInfo.map(info => {
      if (info.label.toLowerCase() === 'email') return { ...info, value: selectedConversation?.email || info.value };
      if (info.label.toLowerCase() === 'contact no.') return { ...info, value: selectedConversation?.mobileNumber || info.value };
      return info;
    });


  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-[20px] font-Poppins">
      <div className=" p-4 flex justify-between items-center border-b border-gray-200">
        <h2 className="font-Poppins" style={{ fontWeight: 500, fontSize: '16px', lineHeight: '100%', letterSpacing: '0px', color: '#000000' }}>
          Contact Info
        </h2>
        <button aria-label="Collapse Contact Info" onClick={toggleContentVisibility}>
          {isContentVisible ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
      </div>

      {isContentVisible && (
        <div className="p-4">
          <div className="flex flex-col md:flex-row items-start md:items-center mb-4">
            <div className="w-[48px] h-[48px] rounded-full bg-[#EDEDED] mr-4 flex-shrink-0 mb-3 md:mb-0"></div>

            <div className="flex-grow">
              <p className="text-[16px] font-Poppins text-[#000000] font-medium leading-[150%] tracking-[0px]">
                {selectedConversation?.customerInfo?.name}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <PiMapPinLineDuotone className="text-gray-500 w-3 h-3" />
                <p className="text-gray-500 font-Poppins font-normal text-[10px] leading-[100%] tracking-[0px] text-[#667085]">
                  {selectedConversation?.customerInfo?.address}
                </p>
              </div>
            </div>

            <button
              onClick={openModal}
              className="font-Poppins font-medium text-[12px] leading-[100%] tracking-[0px] underline text-[#2A85FF] flex-shrink-0 ml-0 md:ml-4 mt-2 md:mt-0 self-start md:self-center"
            >
              Edit
            </button>
          </div>

          <hr className="my-4 border-gray-100" />

          <div className="space-y-3">
            <div>
              <p className="text-[#667085] font-Poppins font-normal text-[10px] leading-[100%] tracking-[0px] mb-0.5">
                Customer Id
              </p>
              <p className="text-[#000000] font-Poppins font-normal text-[14px] leading-[100%] tracking-[0px] mb-2">
                {selectedConversation?.customerInfo?.customerId}
              </p>
              {selectedConversation?.contactInfoList?.map((info, index) => (
                <div key={index} className="mt-2">
                  <p className="text-[#667085] font-Poppins font-normal text-[10px] leading-[100%] tracking-[0px] mb-2">
                    {info.label}
                  </p>
                  <p className="text-[#000000] font-Poppins font-normal text-[14px] leading-[100%] tracking-[0px]">
                    {info.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <EditUserContactInfoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        userData={{
          email: selectedConversation?.email,
          mobileNumber: selectedConversation?.mobileNumber,
          address: selectedConversation?.address
        }}
        onSave={handleSaveContactInfo}
      />
    </div>
  );
};

export default ContactInfo;