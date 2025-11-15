'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { categoryData } from './data';
import Link from 'next/link';

const buttonData = [
    { label: "Biological", value: "biological" },
    { label: "Chemical", value: "chemical" },
    { label: "Radiological", value: "radiological" },
    { label: "Mechanical", value: "mechanical" },
];


export default function ptScheme() {
    const [activeFilter, setActiveFilter] = useState<string>("biological");

    const currentData = categoryData[activeFilter as keyof typeof categoryData];

    return (
        <div className=" h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="p-8">
                <div className="flex gap-3">
                    <h1 className="text-4xl">Welcome</h1>
                    <span className="text-blue-900 text-4xl font-bold">MT-0121,</span>
                </div>
                <div className="mt-6">
                    <nav className="flex gap-1">
                        <a href="/dashboard">Dashboard</a>
                        <span className="text-blue-900 font-bold flex "><ChevronRight /> All PT Scheme</span>
                    </nav>
                </div>
                <div className='text-center mt-10'>
                    <span className="text-blue-900 text-5xl font-bold">PT Schemes & Codes</span>
                    <p className='mt-2 mx-auto max-w-xl'>A Reputed Testing, Calibration, Research, and Innovation company, helping businesses achieve quality and regulatory standards while maintaining worldwide leadership.</p>
                </div>
                <div className="text-center mt-6 sm:mt-8 md:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 px-4">
                    {buttonData.map((btn, index) => (
                        <Button
                            key={index}
                            onClick={() => setActiveFilter(btn.value)}
                            className={`rounded-xs h-10 text-sm sm:text-base min-w-[100px] sm:min-w-[201px] shrink-0 
                            ${activeFilter === btn.value
                                    ? "bg-[#002A80] text-white"
                                    : "bg-[#D3D3D3] text-[#323232] hover:bg-[#e6e6e6]"
                                }`}
                        >
                            {btn.label}
                        </Button>
                    ))}
                </div>
                {/* Card Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 mt-5 max-w-full min-w-0">
                    {currentData.items.map((item, index) => (
                        <Link href={`/dashboard/pt-scheme/${activeFilter}/${item.slug}`} key={index}>
                            <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden flex flex-col hover:-translate-y-0.5">
                                <div className="overflow-hidden">
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        className="w-full h-[180px] sm:h-[200px] object-cover rounded-t-xl"
                                    />
                                </div>
                                <div className="p-4 sm:p-5 flex-1 flex items-center">
                                    <h2 className="text-sm sm:text-base font-semibold text-[#002A80] leading-tight">
                                        {item.title}
                                    </h2>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
}