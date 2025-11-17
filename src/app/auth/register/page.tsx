"use client";
import React from "react";
import Image from "next/image";
import axios from "axios";

// Minimal local Button/Input kept same as your code
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
  const baseStyles =
    "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    default: "bg-[#003087] text-white hover:bg-[#002166] focus:ring-[#003087]",
    outline:
      "border-2 border-[#003087] text-[#003087] hover:bg-[#003087] hover:text-white focus:ring-[#003087]",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={`w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003087] focus:border-transparent transition-all ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

/* ---------- Component (paste over file) ---------- */
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/register", {
        name: formData.name,
        labName: formData.labName,
        accreditationNo: formData.accreditationNo || undefined,
        email: formData.email,
        mobileNo: formData.mobileNo,
        county: formData.county || undefined,
        postalZipCode: formData.postalZipCode,
        city: formData.city || undefined,
        address: formData.address || undefined,
      });
      const data = response.data;
      if (data.success) {
        setIsConfirmOpen(true);
        setFormData({
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
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err: unknown) {
      console.error('Registration error:', err);
      if (typeof err === 'object' && err !== null && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        if (axiosErr.response?.data?.message) {
          setError(axiosErr.response.data.message);
        } else {
          setError('Network error. Please check your connection and try again.');
        }
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!isConfirmOpen) return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") setIsConfirmOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isConfirmOpen]);

  return (
    <section className="min-h-screen bg-white pt-16 overflow-x-hidden">
      <h2 className="text-4xl font-bold text-[#003087] mb-8 text-center">
        Register as a new user
      </h2>
      <div className="flex gap-20">
        {/* LEFT: form — give explicit lg width and shrink allowed */}
        <div className="w-2/3 ml-20">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg px-6 py-6 min-w-0"
          >
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-1.5">
                  Name*
                </label>
                <Input
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-1.5">
                  Lab Name*
                </label>
                <Input
                  name="labName"
                  placeholder="Lab Name"
                  value={formData.labName}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-base font-medium text-gray-700 mb-1.5">
                  Accreditation No.
                </label>
                <Input
                  name="accreditationNo"
                  placeholder="Available / Not available"
                  value={formData.accreditationNo}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-1.5">
                  Email*
                </label>
                <Input
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-1.5">
                  Mobile no*
                </label>
                <Input
                  name="mobileNo"
                  placeholder="Mobile no"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-1.5">
                  County
                </label>
                <Input
                  name="county"
                  placeholder="Country"
                  value={formData.county}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-1.5">
                  Postal / Zip Code*
                </label>
                <Input
                  name="postalZipCode"
                  placeholder="Code"
                  value={formData.postalZipCode}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-1.5">
                  City
                </label>
                <Input
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-base font-medium text-gray-700 mb-1.5">
                  Address
                </label>
                <Input
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-6 bg-[#003087] text-white text-lg font-semibold py-3 rounded-md shadow-none disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register as a new user"}
            </Button>

            <p className="text-xs text-gray-700 text-center mt-4">
              For further information about how uses any personal data collected
              from you, please see our Privacy Notice at{" "}
              <a
                href="https://farelabs.com/"
                className="text-[#003087] font-medium hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                https://farelabs.com/
              </a>
            </p>
          </form>
        </div>

        {/* RIGHT: calendar — give explicit width, hide on small screens */}
        <div className="w-full lg:w-[100px] xl:w-[600px] 2xl:w-[650px] min-w-0">
          <div className="bg-[#003087] rounded-2xl p-4 w-full mx-auto">
            <h3 className="text-white text-xl font-bold text-center mb-2">
              PT Calendar Testing/Calibration
            </h3>

            <div className="bg-white rounded-lg shadow-md p-2 flex items-center justify-center">
              <div
                className="relative w-full"
                style={{ paddingTop: "100%" }} /* Taller + wider */
              >
                <Image
                  src="/images/calendar.png"
                  alt="PT Calendar 2024"
                  fill
                  sizes="100vw"
                  className="object-contain rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* If you want calendar visible on XS, remove hidden sm:block above */}
      </div>

      {/* Confirmation modal (unchanged) */}
      <div
        className={
          isConfirmOpen
            ? "fixed inset-0 z-50 flex items-center justify-center"
            : "hidden"
        }
        aria-hidden={!isConfirmOpen}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setIsConfirmOpen(false)}
        />
        <div className="relative mx-4 w-full max-w-lg rounded-lg bg-white px-6 py-8 shadow-xl z-10">
          <div className="w-full flex flex-col items-center">
            <div className="flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="h-28 w-28 rounded-full bg-green-100" />
                <div className="absolute h-24 w-24 rounded-full bg-green-200" />
                <div className="absolute h-20 w-20 rounded-full bg-green-500 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    className="h-10 w-10"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              </div>
            </div>

            <h3 className="mt-8 text-2xl md:text-3xl font-bold text-gray-800 text-center">
              Thank You for Registering!
            </h3>

            <div className="mt-6 w-full rounded-lg bg-green-100 px-6 py-5 text-gray-700">
              <p className="text-sm leading-6 text-center">
                We appreciate your interest in becoming a member of our
                platform. Your application is currently under review, and we
                will notify you via email with your username and password once
                your registration is approved. If your application meets the
                required criteria, you will gain access to our resources and
                services.
              </p>
              <p className="mt-3 text-sm leading-6 text-center">
                Thank you for choosing us, and we look forward to serving you!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
