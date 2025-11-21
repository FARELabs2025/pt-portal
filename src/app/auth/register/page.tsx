"use client";
import React from "react";
import Image from "next/image";
import axios from "axios";

type ButtonVariant = "default" | "outline";

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
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) => {
  const base =
    "px-3 py-1.5 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed";
  const variants: Record<ButtonVariant, string> = {
    default: "bg-[#003087] text-white hover:bg-[#002166] focus:ring-[#003087]",
    outline:
      "border border-[#003087] text-[#003087] hover:bg-[#003087] hover:text-white focus:ring-[#003087]",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className = "", type = "text", ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={`w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#003087] ${className}`}
    {...props}
  />
));
Input.displayName = "Input";

export default function RegisterPage() {
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const [formData, setFormData] = React.useState({
    name: "",
    labName: "",
    accreditationNo: "",
    email: "",
    mobileNo: "",
    county: "",
    postalZipCode: "",
    city: "",
    address: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/register", formData);

      if (response.data?.success) {
        setIsConfirmOpen(true);
      } else {
        setError(response.data?.message || "Registration failed.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <div className="w-full flex flex-col py-6 px-4 md:px-8 lg:px-12 xl:px-20 min-w-[1200px]">
        {/* Header */}
        <h2 className="text-2xl font-bold text-[#003087] mb-4 text-left lg:text-center">
          Register as a new user
        </h2>

        {/* MAIN CONTENT */}
        <div className="flex w-full flex-col lg:flex-row gap-8 lg:gap-10 items-stretch min-h-[500px] lg:min-h-[600px]">

          {/* LEFT: FORM */}
          <div className="w-full lg:w-[60%] xl:w-[55%]">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow px-5 py-4 h-full min-h-[550px] flex flex-col"
            >
              {error && (
                <div className="mb-3 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-xs">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm flex-grow">
                {[
                  ["Name*", "name"],
                  ["Lab Name*", "labName"],
                  ["Accreditation No.", "accreditationNo"],
                  ["Email*", "email", "email"],
                  ["Mobile no*", "mobileNo"],
                  ["Country", "county"],
                  ["Postal / Zip Code*", "postalZipCode"],
                  ["City", "city"],
                ].map(([label, name, type]) => (
                  <div
                    key={name}
                    className={name === "accreditationNo" ? "md:col-span-2" : ""}
                  >
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {label}
                    </label>
                    <Input
                      name={name}
                      type={(type as string) || "text"}
                      value={(formData as any)[name as keyof typeof formData]}
                      onChange={handleInputChange}
                      required={label.includes("*")}
                    />
                  </div>
                ))}

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-4 py-2 text-sm font-semibold"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register as a new user"}
              </Button>

              <p className="mt-3 text-[10px] text-gray-500 text-center leading-snug">
                For further information about how FARE Labs uses any personal
                data collected from you, please see our Privacy Notice at{" "}
                <a
                  href="https://farelabs.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-[#003087]"
                >
                  https://farelabs.com/
                </a>
              </p>
            </form>
          </div>

          {/* RIGHT: CALENDAR CARD */}
          <div className="w-full lg:w-[40%] xl:w-[45%] hidden lg:block">
            <div className="bg-[#003087] rounded-xl p-3 h-full min-h-[550px]">

              <h3 className="text-white text-base font-medium text-center mb-2">
                PT Calendar Testing/Calibration
              </h3>

              <div className="bg-white rounded-md shadow p-2 flex items-center justify-center min-h-[480px]">
                {/* Card height is now only based on image + padding */}
                <div className="relative w-full max-w-xs mx-auto aspect-[3/4]">
                  <Image
                    src="/images/calendar.png"
                    fill
                    alt="PT Calendar"
                    className="object-contain rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsConfirmOpen(false)}
          />
          <div className="relative bg-white rounded-lg shadow-xl px-8 py-10 max-w-2xl w-full">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-green-100 opacity-40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center relative">
                  <svg 
                    className="w-14 h-14 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={3} 
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Title */}
            <h4 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Thank You for Registering!
            </h4>

            {/* Message Box */}
            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <p className="text-gray-700 text-base leading-relaxed mb-4 text-center">
                We appreciate your interest in becoming a member of our platform. 
                Your application is currently under review, and we will notify you 
                via email with your username and password once your registration is 
                approved. If your application meets the required criteria, you will 
                gain access to our resources and services.
              </p>
              <p className="text-gray-700 text-base leading-relaxed text-center font-medium">
                Thank you for choosing us, and we look forward to serving you!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}