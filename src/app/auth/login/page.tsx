"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Network error. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
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

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 text-black"
                    required
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={loading}
                    variant="default"
                  >
                    {showPassword ? (
                      <EyeOff className="cursor-pointer w-5 h-5" />
                    ) : (
                      <Eye className="cursor-pointer w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full text-base font-semibold bg-[#003087]"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Submit"}
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
