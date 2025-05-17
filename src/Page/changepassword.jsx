import React, { useState } from 'react';
import Authapi from '@/Server/Authapi';
import { useLocation, useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const location = useLocation();
    const data = location.state?.data;
    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false); // <-- loading state added

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match");
            return;
        }

        setLoading(true); // start loading
        try {
            const data1 = {
                token: data,
                newPassword: newPassword
            };

            const response = await Authapi.reset_password(data1);
            if (response.success === true) {
                alert("Password changed successfully!");
                navigate("/login");
            } else {
                alert("Failed to change password.");
            }
        } catch (error) {
            console.error("Failed to change password:", error);
            alert("Failed to change password.");
        } finally {
            setLoading(false); // stop loading
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#f6f8fa] flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-xl w-full max-w-md">
                <div className="flex items-center mb-6">
                    <img src="/logo.svg" alt="Logo" className="h-[32px] w-[175px] mr-2" />
                </div>
                <h1 className="text-xl font-Poppins text-gray-700 mb-7">Change Password</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="currentPassword" className="block text-xs font-Poppins text-gray-500 mb-1">
                            Enter Current Password
                        </label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="newPassword" className="block text-xs font-Poppins text-gray-500 mb-1">
                            Enter New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="mb-8">
                        <label htmlFor="confirmPassword" className="block text-xs font-Poppins text-gray-500 mb-1">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex">
                        <button
                            type="submit"
                            className="bg-[#2A85FF] text-white font-Poppins py-2 px-6 rounded-md mr-3 flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <svg
                                        className="animate-spin h-5 w-5 mr-2 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                        ></path>
                                    </svg>
                                    Saving...
                                </div>
                            ) : (
                                'Save'
                            )}
                        </button>
                        <button
                            type="button"
                            className="bg-white hover:bg-gray-100 text-gray-700 font-Poppins py-2 px-6 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition duration-150"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
