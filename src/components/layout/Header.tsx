"use client"
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Bell } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthRoute = pathname?.startsWith("/auth");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="  px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Image
              src="/images/logo1.png"
              alt="FARELABS Logo"
              width={200}
              height={80}
              className="h-14 w-auto"
              priority
            />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {isAuthRoute ? (
              <Button variant="outline" size="lg" className="cursor-pointer bg-[#003087] text-white border-[#003087] hover:bg-white hover:text-[#003087]">
                Contact Us
              </Button>
            ) : (
              <>
                {/* Shopping Cart */}
                <Button variant="ghost" size="icon" className="relative">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 text-blue-600" />
                  </div>
                </Button>

                {/* Notifications */}
                {/* <Button variant="ghost" size="icon" className="relative">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Bell className="h-5 w-5 text-blue-600" />
                    <Badge 
                      className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs bg-red-500 text-white border-0"
                    >
                      1
                    </Badge>
                  </div>
                </Button> */}

                {/* User Profile */}
                <div className="flex items-center space-x-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/api/placeholder/40/40" alt="User" />
                    <AvatarFallback className="bg-gray-200 text-gray-600">
                      MT
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">MT-0121</p>
                  </div>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 top-12 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                      <button
                        onClick={handleEditProfile}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition-colors"
                      >
                        <User className="h-4 w-4" />
                        <span>Edit Profile</span>
                      </button>
                      <button
                        onClick={handleChangePassword}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition-colors"
                      >
                        <Lock className="h-4 w-4" />
                        <span>Change Password</span>
                      </button>
                      <div className="border-t border-gray-200 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
