// Sidebar.jsx - MODIFIED
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  // Main Icons:
  LayoutGrid, Calendar, Filter, Search, Bell, BarChart, Settings, LogOut,
  MessageCircle, Gift,
  // Utility/State Icons:
  ChevronDown, ChevronUp, Menu, X, ArrowRightToLine
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- Configuration ---
const EXPANDED_WIDTH = "w-64";
const CONTRACTED_WIDTH_LG = "lg:w-[72px]";
const LOGO_EXPANDED_URL = "/sidebar_logo.svg";
const LOGO_CONTRACTED_URL = "../logo_mobile.svg";
const LOGO_ALT_TEXT = "PowerPush Logo";
const ACTIVE_BG_COLOR = "bg-[#F2F2F2]";
const ACTIVE_TEXT_COLOR = "text-black";
const ACTIVE_ICON_COLOR = "text-black";
const INACTIVE_TEXT_COLOR = "text-[#667085]";
const INACTIVE_ICON_COLOR = "text-[#667085]";
const HOVER_BG_COLOR = "hover:bg-gray-200";
const SIDEBAR_BG_COLOR = "bg-gray-50";
const BORDER_COLOR = "border-gray-200";
const NAV_ITEM_ROUNDING = "rounded-lg";
const ICON_STROKE_WIDTH = 1.75;
const BOTTOM_CIRCLE_COLOR = "bg-[#2A85FF]";

// --- Component Definition ---
const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);
  const [isSegmentOpen, setIsSegmentOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isGamificationOpen, setIsGamificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);


  const logut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cduserdata');
    navigate("/Login")
  };

  useEffect(() => {
    setActivePage(location.pathname);

    // Close dropdowns when navigating away from their sections
    const segmentPaths = ['/Segment', '/segments', '/Rfm', '/Cohort'];
    const chatbotPaths = ['/chatbot'];
    const gamificationPaths = ['/gamification', '/bonus', '/jackpot', '/minigames'];

    if (!segmentPaths.some(path => location.pathname.startsWith(path))) {
      setIsSegmentOpen(false);
    }
    if (!chatbotPaths.some(path => location.pathname.startsWith(path))) {
      setIsChatbotOpen(false);
    }
    if (!gamificationPaths.some(path => location.pathname.startsWith(path))) {
      setIsGamificationOpen(false);
    }
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      const largeScreen = window.innerWidth >= 1024;
      setIsLargeScreen(largeScreen);
      if (!largeScreen) {
        setIsExpanded(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseEnter = () => { if (isLargeScreen) setIsExpanded(true); };
  const handleMouseLeave = () => { if (isLargeScreen) setIsExpanded(false); };
  const handleLinkClick = (path) => { setActivePage(path); setIsMobileMenuOpen(false); };
  const toggleSegment = () => setIsSegmentOpen(!isSegmentOpen);
  const toggleChatbot = () => setIsChatbotOpen(!isChatbotOpen);
  const toggleGamification = () => setIsGamificationOpen(!isGamificationOpen);

  const showExpanded = isLargeScreen ? isExpanded : isMobileMenuOpen;

  // --- Dynamic Classes ---
  const sidebarClasses = `
    fixed top-0 left-0 h-full ${SIDEBAR_BG_COLOR} border-r ${BORDER_COLOR} shadow-sm z-40
    flex flex-col
    transition-all duration-200 ease-in-out
    ${isMobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full'}
    lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen
    ${isExpanded ? EXPANDED_WIDTH : CONTRACTED_WIDTH_LG}
  `;

  // Helper function for navigation item classes
  const getNavItemClasses = (path, isSubItem = false, isActiveOverride = null) => {
    const isActive = isActiveOverride !== null ? isActiveOverride : (
      activePage === path ||
      (path === '/Segment' && ['/Segment', '/segments', '/Rfm', '/Cohort'].includes(activePage)) ||
      (path === '/chatbot' && ['/chatbot'].includes(activePage)) ||
      (path === '/gamification' && ['/gamification', '/bonus', '/jackpot', '/minigames'].includes(activePage)) ||
      (isSubItem && activePage === path)
    );

    return `
      flex items-center w-full text-left font-medium
      h-10
      ${isSubItem
        ? 'pl-10 pr-3 text-[12px]'
        : `px-3 ${showExpanded ? '' : 'lg:justify-center'} text-[12px]`
      }
      ${isActive
        ? `${ACTIVE_BG_COLOR} ${ACTIVE_TEXT_COLOR}`
        : `${INACTIVE_TEXT_COLOR} ${HOVER_BG_COLOR}`
      }
      ${NAV_ITEM_ROUNDING}
      transition-colors duration-150 whitespace-nowrap overflow-hidden text-ellipsis
    `;
  };




  // Helper function for navigation icon classes
  const getNavIconClasses = (path, isSubItem = false, isActiveOverride = null) => {
    const isActive = isActiveOverride !== null ? isActiveOverride : (
      activePage === path ||
      (path === '/Segment' && ['/Segment', '/segments', '/Rfm', '/Cohort'].includes(activePage)) ||
      (path === '/chatbot' && ['/chatbot'].includes(activePage)) ||
      (path === '/gamification' && ['/gamification', '/bonus', '/jackpot', '/minigames'].includes(activePage)) ||
      (isSubItem && activePage === path)
    );

    return `
      w-5 h-5 flex-shrink-0
      ${isActive ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR}
      ${isSubItem ? 'mr-3' : (showExpanded ? 'mr-3' : '')}
    `;
  };

  return (
    <>
      <button
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md ${SIDEBAR_BG_COLOR} ${BORDER_COLOR} border shadow-sm hover:bg-gray-100`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={sidebarClasses} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className={`flex-none flex items-center border-b ${BORDER_COLOR} h-[68px] flex-shrink-0 ${showExpanded ? 'px-[24px] justify-start' : 'lg:px-0 lg:justify-center'}`}>
          {showExpanded ? (
            <img src={LOGO_EXPANDED_URL} alt={LOGO_ALT_TEXT} className="h-8 w-auto" />
          ) : (
            <img src="/sidbar_logo2.png" alt="" className="h-8 w-auto" />
          )}
        </div>

        <div className="flex flex-col flex-grow overflow-y-auto overflow-x-hidden custom-scrollbar p-3">
          <div className="space-y-1">
            <Link to="/" className={getNavItemClasses('/')} onClick={() => handleLinkClick('/')}>
              <img src="/Dashboard.png" alt="Dashboard" className={`${getNavIconClasses('/')} w-5 h-5`} strokeWidth={ICON_STROKE_WIDTH} />
              {/* <LayoutGrid className={getNavIconClasses('/')} strokeWidth={ICON_STROKE_WIDTH} /> */}
              {showExpanded && <span>Dashboard</span>}
            </Link>

            <div className="h-1 lg:block hidden"></div>

            <Link to="/Conversations" className={getNavItemClasses('/Conversations')} onClick={() => handleLinkClick('/Conversations')}>
              {/* <Calendar className={getNavIconClasses('/Conversations')} strokeWidth={ICON_STROKE_WIDTH} /> */}
              <img src="/Chat.png" alt="Chat" className={`${getNavIconClasses('/Conversations')} w-5 h-5`} strokeWidth={ICON_STROKE_WIDTH} />
              {showExpanded && <span>Chat Inbox</span>}
            </Link>

            <Link to="/manageProfile" className={getNavItemClasses('/manageProfile')} onClick={() => handleLinkClick('/manageProfile')}>
              <img src="/User.png" alt="manageProfile" className={`${getNavIconClasses('/manageProfile')} w-5 h-5`} strokeWidth={ICON_STROKE_WIDTH} />
              {/* <Bell className={getNavIconClasses('/campaigns')} strokeWidth={ICON_STROKE_WIDTH} /> */}
              {showExpanded && <span>Profile</span>}
            </Link>


            <Link to="/Cannedresponses" className={getNavItemClasses('/Cannedresponses')} onClick={() => handleLinkClick('/Cannedresponses')}>
              <img src="/Start2.png" alt="Canned" className={`${getNavIconClasses('/Cannedresponses')} w-5 h-5`} strokeWidth={ICON_STROKE_WIDTH} />
              {/* <Filter className={getNavIconClasses('/Cannedresponses')} strokeWidth={ICON_STROKE_WIDTH} /> */}
              {showExpanded && <span>Canned Response</span>}
            </Link>


            <Link to="/Faq" className={getNavItemClasses('/Faq')} onClick={() => handleLinkClick('/Faq')}>
              <img src="/FAQ.png" alt="FAQ" className={`${getNavIconClasses('/Faq')} w-5 h-5 `} strokeWidth={ICON_STROKE_WIDTH} />
              {/* <BarChart className={getNavIconClasses('/UserJourney')} strokeWidth={ICON_STROKE_WIDTH} /> */}
              {showExpanded && <span>FAQ</span>}
            </Link>

            <Link to="/AdminSettings" className={getNavItemClasses('/AdminSettings')} onClick={() => handleLinkClick('/AdminSettings')}>
              <Settings className={getNavIconClasses('/AdminSettings')} strokeWidth={ICON_STROKE_WIDTH} />
              {showExpanded && <span>Settings</span>}
            </Link>
          </div>

          <div className="mt-auto pt-4">
            {showExpanded && (
              <div className={`flex items-center p-3 border-t ${BORDER_COLOR} mt-2`}>
                <div className="w-8 h-8 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                <div className="text-sm overflow-hidden mr-2">
                  <p className="font-semibold text-gray-800 whitespace-nowrap leading-tight">
                    {JSON.parse(localStorage.getItem('cduserdata'))?.name}
                  </p>

                  <p className="text-gray-500 text-xs whitespace-nowrap leading-tight"> {JSON.parse(localStorage.getItem('cduserdata'))?.email}</p>
                </div>
                <button
                  className="ml-auto text-gray-500 hover:text-gray-700 flex-shrink-0 pl-1"
                  aria-label="Profile options"
                  onClick={logut} // <-- સાચું અહીં
                >
                  <ArrowRightToLine size={18} strokeWidth={ICON_STROKE_WIDTH} />
                </button>
              </div>
            )}

            {!showExpanded && isLargeScreen && (
              <>
                <div className={`space-y-1 pt-2 border-t ${BORDER_COLOR} mt-2`}>

                  <button
                    className={getNavItemClasses('/logout', false, false)}
                    onClick={() => { }}
                    aria-label="Logout"
                  >
                    <LogOut className={getNavIconClasses('/logout', false, false)} strokeWidth={ICON_STROKE_WIDTH} />
                  </button>
                </div>
                <div className={`w-8 h-8 ${BOTTOM_CIRCLE_COLOR} rounded-full mx-auto mt-4 mb-1`}></div>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;