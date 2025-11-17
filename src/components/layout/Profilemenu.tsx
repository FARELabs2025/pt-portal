"use client";
import { useRouter } from "next/navigation";

export default function ProfileMenu() {
  const router = useRouter();

  return (
    <div
      className="
        absolute top-12 right-0
        w-40 bg-white shadow-lg border border-gray-200
        rounded-md py-2 z-9999
        flex flex-col text-center text-sm
      "
    >
      <button
        className="cursor-pointer py-2 hover:bg-gray-100 text-gray-700"
        onClick={() => router.push("/profile")}
      >
        Edit Profile
      </button>

      <button
        className="cursor-pointer py-2 hover:bg-gray-100 text-gray-700 border-t border-gray-200"
        onClick={() => router.push("/change-password")}
      >
        Change Password
      </button>

      <button
        className="cursor-pointer
          py-2 hover:bg-red-50 text-red-600
          border-t border-gray-200
        "
        onClick={() => {
          // add logout logic here
          router.push("/auth/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
