import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import accountSettings from '/account-settings.svg';
import creditCard from '/credit-card.svg';

const AccountBilling = () => {
  return (
    <div className="p-6 md:p-8 relative ">
      {/* Header Section */}
      <div className="absolute top-[32px] left-[20px]"> {/* Fixed positioning */}
        <h2 className="text-xl font-medium text-gray-900 leading-tight ">
          Account and Billing
        </h2>
        <p className="mt-1 text-xs text-gray-500 leading-tight">
          Manage your billing, payment and account settings
        </p>
      </div>

      {/* Cards Container with specific positioning */}
      <div className="absolute top-[168px] left-[176px] flex gap-[65px]">
        {/* Account Settings Card */}
        <Link to="/AccountSettingsDetails" className="no-underline">
          <Card className="w-[308px] h-[242px] bg-[#FDFDFD] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 py-8 px-5">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <img 
                src={accountSettings} 
                alt="Account Settings" 
                className="w-12 h-12 mb-5"
              />
              <h3 className="text-xl font-medium text-gray-900 leading-tight mb-2">
                Account Settings
              </h3>
              <p className="text-base font-normal text-gray-600 leading-tight px-2">
                Edit your signup details, export data, cancel account
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Plans and Billing Card */}
        <Link to="/plans-and-billing" className="no-underline">
          <Card className="w-[308px] h-[242px] bg-[#FDFDFD] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 py-8 px-5">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <img 
                src={creditCard} 
                alt="Credit Card" 
                className="w-12 h-12 mb-5"
              />
              <h3 className="text-xl font-medium text-gray-900 leading-tight mb-2">
                Plans and billing
              </h3>
              <p className="text-base font-normal text-gray-600 leading-tight px-2">
                Find a list of all pricing plans; upgrade or downgrade here
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default AccountBilling;