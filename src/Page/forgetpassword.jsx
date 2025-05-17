import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Authapi from '@/Server/Authapi';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false); // loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const response = await Authapi.forgot_password({ email });
            if (response) {
                const data = response.resetToken;
                navigate('/changepassword', { state: { data } });
            }
        } catch (error) {
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#f6f8fa] flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-2xl w-full max-w-md">
                <a
                    href="/login"
                    className="flex font-Poppins items-center text-sm text-gray-600 hover:text-blue-600 transition-colors duration-150 mb-6"
                >
                    <span className=' mr-2'>&lt;</span>
                    <span>Back to login page</span>
                </a>

                <div className="flex items-center mb-8">
                    <img src="/logo.svg" alt="Logo" className="h-[32px] w-[175px] mr-2" />
                </div>

                <h1 className="text-3xl font-Poppins text-gray-900 mb-2">Reset Your Password</h1>
                <p className="text-sm text-gray-500 mb-8">
                    Enter your registered email and we'll send you a reset link.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Your Registered Email"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 
                                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                       transition-shadow duration-150"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center items-center gap-2 bg-[#2A85FF] text-white font-Poppins py-3 px-4 rounded-lg
                            focus:ring-blue-500 focus:ring-opacity-50 transition-opacity duration-150 
                            ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                        ) : null}
                        {loading ? 'Sending...' : 'Send Link'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;
