"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/app/api/api";
import type { User } from "@/types/user";
import ProfileMenu from "./Profilemenu"; 

export default function Header() {
  const pathname = usePathname();
  const isAuthRoute = pathname?.startsWith("/auth");
  const [user, setUser] = useState<User | null>(null);

  // ADDED STATE
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!isAuthRoute) {
      const userData = api.getUser();
      
    }
  }, [isAuthRoute]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
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
              <Button
                variant="outline"
                size="lg"
                className="cursor-pointer bg-[#003087] text-white border-[#003087] hover:bg-white hover:text-[#003087]"
              >
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
                <Button variant="ghost" size="icon" className="relative">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Bell className="h-5 w-5 text-blue-600" />
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs bg-red-500 text-white border-0">
                      1
                    </Badge>
                  </div>
                </Button>

                {/* User Profile */}
                <div className="flex items-center space-x-2 relative">
                  <Avatar
                    className="cursor-pointer h-10 w-10"
                    onClick={() => setShowMenu((prev) => !prev)} // ← ADDED
                  >
                    <AvatarImage
                      src="/api/placeholder/40/40"
                      alt="User"
                    />
                    <AvatarFallback className="bg-gray-200 text-gray-600">
                      {user?.labCode?.substring(0, 2) ||
                        user?.name?.substring(0, 2)?.toUpperCase() ||
                        "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.labCode || user?.name || "User"}
                    </p>
                  </div>

                  {/* NEW MENU */}
                  {showMenu && <ProfileMenu />}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
