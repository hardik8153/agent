import React, { useState, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';

const allAgents = [
  { id: 'agent1', name: 'Nikhil Pandey', email: 'nikhilpandey23@gmail.com', avatar: null, verified: true },
  { id: 'agent2', name: 'Jane Doe', email: 'jane.doe@example.com', avatar: null, verified: false },
  { id: 'agent3', name: 'John Smith', email: 'john.smith@example.com', avatar: null, verified: true },
  { id: 'agent4', name: 'Alice Brown', email: 'alice.b@sample.net', avatar: null, verified: true },
  { id: 'agent5', name: 'Bob White', email: 'bob.white@company.org', avatar: null, verified: false },
];

const AvatarPlaceholder = ({ name }) => (
  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium flex-shrink-0 text-lg">
    {name ? name.charAt(0).toUpperCase() : '?'}
  </div>
);

// const VerificationBadge = () => (
//   <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white shadow">
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
//       <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//     </svg>
//   </div>
// );


const AssignAgentPopup = ({ isOpen, onClose, onAssign, currentUserId, currentUserDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAgents, setFilteredAgents] = useState([]);
  const popupRef = useRef(null);

  useEffect(() => {
    setFilteredAgents(allAgents);
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredAgents(allAgents);
    } else {
      const lowerCaseSearch = searchTerm.toLowerCase();
      const results = allAgents.filter(agent =>
        agent.name.toLowerCase().includes(lowerCaseSearch) ||
        agent.email.toLowerCase().includes(lowerCaseSearch)
      );
      setFilteredAgents(results);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleAssignToMe = () => {
    if (currentUserId) {
      const me = allAgents.find(agent => agent.id === currentUserId) || currentUserDetails;
      if (me) {
        onAssign(me.id);
      } else {
        onAssign(currentUserId);
      }
      onClose();
    }
  };

  const handleAssignAgent = (agent) => {
    onAssign(agent.id);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={popupRef}
      className="absolute top-16 left-4 z-30 w-80 h-[300px] max-w-[calc(100%-2rem)] bg-white rounded-xl  border border-gray-200 overflow-hidden "
    >
      <div className="p-2">
        <h3 className="text-[14px] leading-[100%] tracking-[0px] text-[#000000] font-Poppins">
          Assign Agent
        </h3>
      </div>

      <div className="p-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            placeholder="Search something ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <button
          onClick={handleAssignToMe}
          className="w-full text-left px-1 py-2 text-[14px] leading-[150%] tracking-[0px] text-[#2A85FF] font-normal font-[Poppins] underline decoration-solid decoration-[0px] underline-offset-[0%] hover:bg-gray-50 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
          disabled={!currentUserId}
        >
          Assign to me
        </button>


        <div className="h-[160px] overflow-y-auto -mr-2 pr-2 custom-scrollbar">
          {filteredAgents.length > 0 ? (
            filteredAgents.map(agent => (
              <button
                key={agent.id}
                onClick={() => handleAssignAgent(agent)}
                className="w-full flex items-center p-2.5 hover:bg-gray-100 rounded-lg text-left mb-1 transition duration-150 ease-in-out focus:outline-none focus:bg-gray-100 focus:ring-1 focus:ring-blue-300"
              >
                <div className="relative mr-3 flex-shrink-0">
                  <AvatarPlaceholder name={agent.name} className="w-[48px] h-[48px] bg-[#EDEDED]" />
                  {/* {agent.verified && <VerificationBadge />} */}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[16px] leading-[150%] tracking-[0px] text-[#000000] font-normal font-[Poppins] truncate">
                    {agent.name}
                  </p>
                  <p className="text-[12px] leading-[100%] tracking-[0px] text-[#667085] font-normal font-[Poppins] truncate">
                    {agent.email}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm py-4">No agents found.</p>
          )}
        </div>
      </div>


    </div>
  );
};

export default AssignAgentPopup;