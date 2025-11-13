<<<<<<< HEAD
"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
=======
"use client"
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
>>>>>>> 8d0119d0ed17103ffde5dc72af70ef94e3ac059a

type ButtonVariant = "default" | "outline";

<<<<<<< HEAD
const Button = ({
  children,
  variant = "default",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) => {
  const baseStyles =
    "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
=======
const Button = ({ children, variant = 'default', className = '', onClick, type = 'button', disabled = false }: { children: React.ReactNode; variant?: ButtonVariant; className?: string; onClick?: () => void; type?: 'button' | 'submit' | 'reset'; disabled?: boolean; }) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
>>>>>>> 8d0119d0ed17103ffde5dc72af70ef94e3ac059a
  const variants = {
    default: "bg-[#003087] text-white hover:bg-[#002166] focus:ring-[#003087]",
    outline:
      "border-2 border-[#003087] text-[#003087] hover:bg-[#003087] hover:text-white focus:ring-[#003087]",
  };
  return (
<<<<<<< HEAD
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
=======
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyles} ${variants[variant]} ${className}`}>
>>>>>>> 8d0119d0ed17103ffde5dc72af70ef94e3ac059a
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      {...props}
      className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003087] focus:border-transparent transition-all ${className}`}
    />
  )
);
Input.displayName = "Input";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

const Card = ({ children, className = "", ...props }: CardProps) => (
  <div
    {...props}
    className={`bg-white rounded-lg shadow-lg ${className}`}
  >
    {children}
  </div>
);

export default function FarelabsLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
<<<<<<< HEAD
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
=======
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Call login API
      const response = await axios.post('/api/auth/login', {
        username,
        password,
      });

      const data = response.data;

      if (data.success) {
        // Store token and user data
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        // Show error message
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
>>>>>>> 8d0119d0ed17103ffde5dc72af70ef94e3ac059a
    }
  };

  return (
<<<<<<< HEAD
    <div className="relative flex flex-col h-screen w-full overflow-hidden bg-[url('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1920&q=80')] bg-cover bg-center bg-no-repeat">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
=======
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col pt-16">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
      </div>
>>>>>>> 8d0119d0ed17103ffde5dc72af70ef94e3ac059a

      {/* Centered Login Card */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4">
        <Card className="w-full max-w-md p-6 md:p-8 my-4">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Login</h2>
            <p className="text-gray-600 text-sm">Nice to see you again!</p>
          </div>

<<<<<<< HEAD
          <div className="space-y-4">
            {/* Username */}
=======
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Username Input */}
>>>>>>> 8d0119d0ed17103ffde5dc72af70ef94e3ac059a
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
<<<<<<< HEAD
                onChange={(e) => setUsername(e.target.value)}
=======
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                required
                disabled={loading}
>>>>>>> 8d0119d0ed17103ffde5dc72af70ef94e3ac059a
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

<<<<<<< HEAD
            {/* Error Message */}
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            {/* Submit */}
            <Button
              onClick={handleSubmit}
              className="w-full py-2.5 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Submit"}
=======
            {/* Submit Button */}
            <Button 
              type="submit" 
              className="cursor-pointer w-full py-2.5 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Submit'}
>>>>>>> 8d0119d0ed17103ffde5dc72af70ef94e3ac059a
            </Button>

            {/* Forgot Password */}
            <div className="text-center">
              <button
                type="button"
                className="text-sm text-[#003087] hover:text-[#002166] font-medium hover:underline transition-colors"
              >
                Forgotten password?
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-6 border-t border-gray-200"></div>

          {/* Register */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              New customer
            </h3>
            <p className="text-gray-600 text-sm mb-1">
              Email us at{" "}
              <a
                href="mailto:ptprovider@farelabs.com"
                className="text-[#003087] font-medium hover:underline"
              >
                ptprovider@farelabs.com
              </a>
            </p>
            <p className="text-gray-600 text-sm mb-4">
              and we will set up a new account for you
            </p>
            <Button
              onClick={() => router.push("/auth/register")}
              className="px-8 py-2"
            >
              Register Now
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
