import React, { useState } from 'react';
import Authapi from '@/Server/Authapi'; // Assuming this is correctly set up
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true); // State for the checkbox, default to true
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); // For displaying login errors

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(''); // Clear previous errors
        try {
            const AutoResponse = await Authapi.login({
                email: userId, // Assuming your API expects 'email'
                password: password
            });

            if (AutoResponse && AutoResponse.token && AutoResponse.token.token) {
                const tokenData = AutoResponse.token.token;
                const userData = AutoResponse.token; // The whole token object with user details

                if (rememberMe) {
                    // Store in localStorage with a 30-day expiry
                    const expiryTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
                    localStorage.setItem('token', tokenData);
                    localStorage.setItem('cduserdata', JSON.stringify(userData));
                    localStorage.setItem('tokenExpiry', expiryTime.toString());

                    // Clear any session storage if user opts for remember me
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('cduserdata');
                } else {
                    // Store in sessionStorage (clears on browser close)
                    sessionStorage.setItem('token', tokenData);
                    sessionStorage.setItem('cduserdata', JSON.stringify(userData));

                    // Clear any localStorage if user opts out of remember me
                    localStorage.removeItem('token');
                    localStorage.removeItem('cduserdata');
                    localStorage.removeItem('tokenExpiry');
                }

                navigate('/'); // Navigate to homepage or dashboard
            } else {
                // Handle cases where AutoResponse or token is not as expected
                setError('Login failed. Invalid response from server.');
                console.error("Login response missing token:", AutoResponse);
            }
        } catch (err) {
            console.error("Login error:", err);
            // Display a user-friendly error message
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else if (err.message) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 rounded-xl sm:px-10">
                    <div className="flex mb-6">
                        <img src="/logo.svg" alt="Logo" className="h-[32px] w-[175px] mr-2" />
                    </div>
                    <div className="mb-8">
                        <h2 className="text-3xl font-Poppins text-gray-900">
                            Sign In
                        </h2>
                        <p className="mt-2 font-Poppins text-sm text-gray-600">
                            Please enter your details
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <input
                                id="userId"
                                name="userId"
                                type="text" // Consider type="email" if it's an email
                                autoComplete="username" // or "email"
                                required
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter Your ID or Email"
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-3"> {/* Changed to justify-between */}
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        checked={rememberMe} // Use checked for controlled component
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block font-Poppins text-sm text-gray-700">
                                        Remember for 30 days
                                    </label>
                                </div>
                                <div className="text-sm"> {/* Aligned Forget Password to the right */}
                                    <a href="/forgetpassword" className="font-Poppins text-[#2A85FF] hover:text-blue-500 underline">
                                        Forget Password?
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md text-sm font-Poppins text-white bg-[#2A85FF] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60"
                            >
                                {loading && (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                    </svg>
                                )}
                                {loading ? "Signing In..." : "Sign In"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;