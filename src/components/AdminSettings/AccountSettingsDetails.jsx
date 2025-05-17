// src/components/AdminSettings/AccountSettingsDetails.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; // <-- Import AlertDialog components
import { ChevronRight, X } from 'lucide-react'; // Import X icon if needed (though often included)

const AccountSettingsDetails = () => {
  const [companyName, setCompanyName] = useState('Powerpush');
  const [firstName, setFirstName] = useState('Vimal');
  const [lastName, setLastName] = useState('Powerpush');
  const [email, setEmail] = useState('vimal@powerpush.ai');
  const [phone, setPhone] = useState('8130362124');

  const handleSave = () => {
    // Add actual save logic here (e.g., API call)
  };

  const handleCancelForm = () => { // Renamed to avoid conflict with AlertDialogCancel
    // Add navigation logic here (e.g., navigate back)
  };

  const handleConfirmCancellation = () => {
    // Add actual cancellation logic here (e.g., API call)
    // You might want to close the dialog manually here if needed,
    // though AlertDialogAction often handles this if not prevented.
  };

  const inputClasses = "mt-1 w-[362px] h-[41px] rounded-lg";

  return (
    <div className="bg-[#F6F8FA] w-full"> {/* Added background color wrapper */}
      <div className="p-8  font-poppins">
        {/* Breadcrumbs Section */}
        <div className="flex items-center space-x-2 text-base font-medium mb-8 font-poppins">
          <a href="/AdminSettings" className="text-blue-600 hover:underline font-poppins">Admin Settings</a>
          <ChevronRight className="h-5 w-5 text-gray-500" />
          <span className="text-gray-700 font-poppins">Account Billing</span>
        </div>

        <div className="flex flex-col md:flex-row gap-[20px]">
          {/* Contact Information Card */}
          <Card className="w-full md:w-[786px] h-auto md:min-h-[618px] border-[#EFF2F1] rounded-lg flex flex-col">
             <CardHeader className="pt-6 px-6">
              <CardTitle className="text-lg font-semibold text-gray-900 font-poppins">
                Contact Information for your Powerpush account
              </CardTitle>
              <CardDescription className="text-sm text-gray-500 font-poppins">
                This person will receive invoices and all other account-related information.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow px-6 space-y-5">
               <div className="grid grid-cols-1 gap-5">
                 <div>
                   <Label htmlFor="companyName" className="text-xs font-medium text-gray-700 font-poppins">Company name</Label>
                   <Input id="companyName" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} 
                     className={`${inputClasses} font-poppins`} placeholder="Enter company name" />
                 </div>
                 <div>
                   <Label htmlFor="firstName" className="text-xs font-medium text-gray-700">First Name</Label>
                   <Input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClasses} placeholder="Enter first name" />
                 </div>
                 <div>
                   <Label htmlFor="lastName" className="text-xs font-medium text-gray-700">Last Name</Label>
                   <Input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClasses} placeholder="Enter last name" />
                 </div>
                 <div>
                   <Label htmlFor="email" className="text-xs font-medium text-gray-700">Email</Label>
                   <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClasses} placeholder="Enter email address" />
                 </div>
                 <div>
                   <Label htmlFor="phone" className="text-xs font-medium text-gray-700">Phone</Label>
                   <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClasses} placeholder="Enter phone number" />
                 </div>
               </div>
             </CardContent>
            <CardFooter className="px-6 py-4 flex justify-end gap-3">
              <Button variant="outline" onClick={handleCancelForm} className="font-poppins">Cancel</Button>
              <Button onClick={handleSave} 
                className="w-[122px] h-[37px] rounded-lg bg-[#2A85FF] hover:bg-[#2577e6] font-poppins">
                Save
              </Button>
            </CardFooter>
          </Card>

          {/* Account Cancellation Card */}
          <Card className="w-full md:w-[498px] h-auto md:h-[195px] border-[#EFF2F1] rounded-lg self-start">
             <CardHeader className="pt-6 px-6">
              <CardTitle className="text-xl font-medium text-gray-900 leading-tight font-poppins">
                Account cancellation request
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6">
              <p className="text-xs font-normal text-[#667085] leading-tight mb-6 font-poppins">
                Your request goes to our customer success team, who'll get in touch with you to take this forward.
              </p>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline"
                    className="w-[198px] h-[37px] border-[#EFF2F1] rounded-lg text-[#F04438] hover:bg-red-50 hover:text-red-700 font-poppins">
                    Request Cancellation
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="sm:max-w-[410px] border-[#EFF2F1] rounded-lg font-poppins">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-medium leading-tight font-poppins">
                      Cancel Account
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm font-normal text-[#667085] leading-tight pt-2 font-poppins">
                      We will permanently delete your account and all related data. Go ahead with your request?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="mt-4 sm:justify-end gap-x-3">
                    <AlertDialogCancel
                      className="w-[98px] h-[37px] rounded-lg border-[#EFF2F1] font-poppins">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleConfirmCancellation}
                      className="w-[122px] h-[37px] rounded-lg bg-[#F04438] hover:bg-[#dd3327] text-white font-poppins">
                      Yes Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
       
      </div>
    </div>
    </div>
  );
};

export default AccountSettingsDetails;