// src/components/AdminSettings/PlansAndBillingDetails.jsx
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import darkLogo from '/public/Dark Logo mini@4x 2.svg';  // Add this import

const PlansAndBillingDetails = () => {
  const handleManagePlan = () => {
  };

  return (

    
    <div className="p-8 w-full font-poppins bg-[#F6F8FA] ">
      {/* Breadcrumbs Section */}
      <div className="flex items-center space-x-2 text-base font-medium mb-8 font-poppins">
        <a href="/AdminSettings" className="text-blue-600 hover:underline font-poppins">Admin Settings</a>
        <ChevronRight className="h-5 w-5 text-gray-500" />
        <span className="text-gray-700 font-poppins">Plans and Billing</span>
      </div>

      {/* Main Content Box */}
      <div className="w-full max-w-[1304px] min-h-[656px] bg-white border border-[#EFF2F1] rounded-lg p-6 flex flex-col font-poppins">
        <h2 className="text-[20px] font-medium text-gray-900 leading-tight mb-8 font-poppins">
          Plan Details
        </h2>

        <div className="flex-grow space-y-8">
          {/* Subscription Section */}
          <div>
            <p className="text-[16px] font-normal text-[#667085] leading-tight mb-3 font-poppins">
              Subscription
            </p>
            <div className="flex items-center gap-3">
              <img 
  src={darkLogo} 
  alt="Dark Logo" 
  className="w-5 h-5 flex-shrink-0"
/>
              <span className="text-[20px] font-normal text-gray-900 leading-tight font-poppins">
                Powerpush Customer Support
              </span>
            </div>
            <Badge
              variant="outline"
              className="w-[121px] h-[26px] rounded-[4px] bg-[#EDF4FF] text-[#2A85FF] border-0 
                text-xs font-normal leading-normal flex items-center justify-center 
                whitespace-nowrap mt-3 ml-[31px] overflow-hidden font-poppins"
            >
              Active Agent Plan
            </Badge>
          </div>

          {/* Plan & Agent Section */}
          <div>
            <p className="text-[16px] font-normal text-[#667085] leading-tight mb-3 font-poppins">
              Plan & Agent
            </p>
            <p className="text-[20px] font-normal text-gray-900 leading-tight font-poppins">
              Active Agent - 10 <span className="text-[#2A85FF]">Agents</span>
            </p>
          </div>

          {/* Next Billing Date Section */}
          <div>
            <p className="text-[16px] font-normal text-[#667085] leading-tight mb-3 font-poppins">
              Next Billing Date
            </p>
            <p className="text-[20px] font-normal text-gray-900 leading-tight font-poppins">
              Next Billing at <span className="text-[#2A85FF]">1st May 2025</span>
            </p>
          </div>
        </div>

        {/* Manage Plan Button */}
        <div className="mt-auto pt-6">
          <Button
            onClick={handleManagePlan}
            className="w-[134px] h-[37px] rounded-lg bg-[#2A85FF] hover:bg-[#2577e6] 
              text-white text-[14px] font-medium leading-normal font-poppins"
          >
            Manage Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlansAndBillingDetails;