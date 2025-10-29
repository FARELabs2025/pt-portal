"use client";
import React from "react";
import Image from "next/image";

// ShadCN UI Components (copied from login/page.tsx)
type ButtonVariant = 'default' | 'outline';

const Button = ({ children, variant = 'default', className = '', onClick, type = 'button' }: { children: React.ReactNode; variant?: ButtonVariant; className?: string; onClick?: () => void; type?: 'button' | 'submit' | 'reset'; }) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    default: 'bg-[#003087] text-white hover:bg-[#002166] focus:ring-[#003087]',
    outline: 'border-2 border-[#003087] text-[#003087] hover:bg-[#003087] hover:text-white focus:ring-[#003087]',
  };
  return (
    <button type={type} onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
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

export default function RegisterPage() {
  return (
    <section className="min-h-screen bg-white">
     

      {/* Main Content */}
      <main className="flex flex-col items-center px-4 pt-2 pb-10">
        <h2 className="text-3xl font-bold text-[#003087] mt-2 mb-8 text-center">
          Register as a new user
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
          {/* Registration Form */}
          <form className="flex-1 bg-white rounded-lg shadow-lg px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div className="col-span-1">
                <label className="block text-base font-medium text-gray-700 mb-1.5">
                  Name*
                </label>
                <Input placeholder="Enter your name" />
              </div>
              <div className="col-span-1">
                <label className="block text-base font-medium text-gray-700 mb-1.5">
                  Lab Name*
                </label>
                <Input placeholder="Lab Name" />
              </div>
              <div className="col-span-2">
                <label className="block text-base font-medium text-gray-700 mb-1.5">
                  Accreditation No.
                </label>
                <Input placeholder="Available / Not available" />
              </div>
              <div className="col-span-1">
                <label className="block text-base font-medium text-gray-700 mb-1.5">
                  Email*
                </label>
                <Input placeholder="Email" type="email" />
              </div>
              <div className="col-span-1">
                <label className="block text-base font-medium text-gray-700 mb-1.5">
                  Mobile no*
                </label>
                <Input placeholder="Mobile no" />
              </div>
              <div className="col-span-1">
                <label className="block text-base font-medium text-gray-700 mb-1.5">
                  County
                </label>
                <Input placeholder="Country" />
              </div>
              <div className="col-span-1">
                <label className="block text-base font-medium text-gray-700 mb-1.5">
                  Postal / Zip Code*
                </label>
                <Input placeholder="Code" />
              </div>
              <div className="col-span-1">
                <label className="block text-base font-medium text-gray-700 mb-1.5">
                  City
                </label>
                <Input placeholder="City" />
              </div>
              <div className="col-span-1">
                <label className="block text-base font-medium text-gray-700 mb-1.5">
                  Address
                </label>
                <Input placeholder="Address" />
              </div>
            </div>
            <Button
              className="w-full mt-8 bg-[#003087] text-white text-lg font-semibold py-3 rounded-md shadow-none cursor-pointer"
            >
              Register as a new user
            </Button>
            <p className="text-xs text-gray-700 text-center mt-4">
              For further information about how uses any personal data collected from you, please see our Privacy Notice at{" "}
              <a
                href="https://farelabs.com/"
                className="text-[#003087] font-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://farelabs.com/
              </a>
            </p>
          </form>

          {/* PT Calendar Card */}
          <div className="flex-1 flex items-start justify-center">
            <div className="bg-[#003087] rounded-2xl p-4 w-full max-w-md">
              <h3 className="text-white text-xl font-bold text-center mb-2">
                PT Calendar Testing/Calibration
              </h3>
              <div className="bg-white rounded-lg shadow-md p-2 flex items-center justify-center">
                <Image
                  src="/images/calendar.png"
                  alt="PT Calendar 2024"
                  width={320}
                  height={420}
                  className="rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}