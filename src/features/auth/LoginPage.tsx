// src/components/Login.tsx
import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

// Define the props type for the component (if needed)
interface LoginProps {
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

const LoginPage: React.FC<LoginProps> = () => {

  const navigate = useNavigate();

  return (
    // Container
    <div>
      <div className="min-h-screen bg-gray-200 flex items-center justify-center min-w-screen">
        {/* Card */}
        <div className="bg-white p-8 rounded-lg shadow-md w-lg max-w">
          {/* Logo */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-600">Juanito 7up</h1>
          </div>

          {/* Form */}
          <form>
            <h2 className="text-2xl font-semibold text-center mb-6">Sign in</h2>

            {/* Username Input */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <div className="relative">
                <input
                  className="w-full text-black px-4 py-2 border rounded-lg font-color-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  id="username"
                  placeholder="Enter user name"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="password"
                  id="password"
                  placeholder="Enter password"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* Checkbox and Forgot Password */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-600">Recuerdame</span>
              </label>
            </div>

            {/* Sign in Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              onClick={() => navigate("/dashboard")}
            >
              Sign in
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center mt-5">
            <p className="text-sm text-gray-600">Powered by Pedro M. Toribio</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
