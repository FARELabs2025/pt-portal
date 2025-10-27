"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Redirecting to Dashboard...</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002A80] mx-auto"></div>
      </div>
    </div>
  );
}
