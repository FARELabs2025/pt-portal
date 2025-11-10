"use client"
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// ShadCN UI Components
type ButtonVariant = 'default' | 'outline';

const Button = ({ children, variant = 'default', className = '', onClick, type = 'button', disabled = false }: { children: React.ReactNode; variant?: ButtonVariant; className?: string; onClick?: () => void; type?: 'button' | 'submit' | 'reset'; disabled?: boolean; }) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    default: 'bg-[#003087] text-white hover:bg-[#002166] focus:ring-[#003087]',
    outline: 'border-2 border-[#003087] text-[#003087] hover:bg-[#003087] hover:text-white focus:ring-[#003087]',
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = '', type = 'text', ...props }, ref) => {
  return (
    <input
      type={type}
      className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003087] focus:border-transparent transition-all ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

const Card = ({ children, className = '', ...props }: CardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`} {...props}>
      {children}
    </div>
  );
};

// Main Login Component
export default function FarelabsLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center overflow-hidden">
        <Card className="w-full max-w-md bg-white mb-15">
          <CardContent>
            {/* Login Header */}
            <div className="">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">
                Login
              </h2>
              <p className="text-gray-600 text-center text-sm">
                Nice to see you again!
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="text-black"
                  disabled={loading}
                />
              </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="cursor-pointer w-5 h-5" />
                  ) : (
                    <Eye className="cursor-pointer w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button 
              onClick={handleSubmit} 
              className="cursor-pointer w-full py-2.5 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Submit'}
            </Button>

              {/* Forgot Password */}
              <div className="text-center">
                <a
                  href="#"
                  className="text-sm text-[#003087] hover:text-[#002166] font-medium hover:underline transition-colors"
                >
                  Forgotten password?
                </a>
              </div>
            </form>

            {/* Divider */}
            <div className="my-2 border-t border-gray-200"></div>

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
                className="px-8 py-2 bg-[#003087]"
                onClick={() => router.push("/auth/register")}
              >
                Register Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
