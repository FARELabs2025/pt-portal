'use client';
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react';
export default function PTItemPage() {
    return (
        <div className="p-4">
            <div className="flex flex-col">
                <span className="mt-3">Search by PT</span>
                <div className="relative w-60 mt-1">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                        type="search"
                        placeholder="Search"
                        className="pl-8"
                    />
                </div>
            </div>
            <h1 className="text-4xl mt-3 font-bold text-blue-950">Proficiency Tests</h1>
            <hr className="mt-3 border border-[#d2d2d2] border-t-[0.5px] "/>
        </div>
    )
}
