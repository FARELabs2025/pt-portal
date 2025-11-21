"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function FarelabsLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });

      const data = response.data;

      if (data.success) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        router.push("/dashboard");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err: unknown) {
      console.error("Login error:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="fixed inset-0 w-full h-full overflow-hidden">
    {/* Background */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1920&q=80")',
      }}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
    </div>

    {/* Centered card */}
    <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6">
      <div className="w-[90%] sm:w-[70%] md:w-[55%] lg:w-[45%] xl:w-[35%]">
        <Card
          className="
            w-full
            bg-white/80
            backdrop-blur-xl
            shadow-xl
            rounded-4xl
            border border-white/40
            max-h-[90vh]        /* keep card height within screen */
            overflow-hidden     /* REMOVE scroll entirely */
          "
        >
          <CardContent className="p-8 sm:p-10 space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
                Login
              </h2>
              <p className="text-gray-600 text-center text-base">
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
                  className="text-black h-11 border-[#d2d2d2]"
                  disabled={loading}
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
                    className="pr-10 h-11 border-[#d2d2d2]"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#003087]"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full py-2.5 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed bg-[#002A80]"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Submit"}
              </Button>

              {/* Forgot password */}
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
            <div className="border-t border-gray-200" />

            {/* Register */}
            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-gray-900">
                New customer
              </h3>
              <p className="text-gray-600 text-sm">
                Email us at{" "}
                <a
                  href="mailto:ptprovider@farelabs.com"
                  className="text-[#003087] font-medium hover:underline"
                >
                  ptprovider@farelabs.com
                </a>
              </p>
              <p className="text-gray-600 text-sm">
                and we will set up a new account for you
              </p>

              <Button
                className="mt-2 w-full sm:w-auto px-8 py-2 bg-[#002A80] text-white font-bold"
                onClick={() => router.push("/auth/register")}
              >
                Register Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);
}
