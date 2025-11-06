'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
const Biological = [
    { src: "/images/water.png", title: "Water" },
    { src: "/images/card2.png", title: "Vegetables & Vegetable Products" },
    { src: "/images/vegan-food.png", title: "Vegan Food" },
    { src: "/images/tobacco.png", title: "Tobacco & Tobacco Products" },
    { src: "/images/tea-leaves.png", title: "Tea" },
    { src: "/images/sugar.png", title: "Sugar & Sugar Products" },
    { src: "/images/snack.png", title: "Snacks & Instant Mixes" },
    { src: "/images/pollutin.png", title: "Pollution & Environment" },
    { src: "/images/oil-seed.png", title: "Oilseeds & By-Products" },
    { src: "/images/NS3.png", title: "Nutritional Supplements" },
    { src: "/images/nuts.png", title: "Nut & Nut Products" },
    { src: "/images/GM.png", title: "Molecular Analysis" },
    { src: "/images/milk.png", title: "Milk and Dairy Products" },
    { src: "/images/meat.png", title: "Meat Authenticity" },
    { src: "/images/meat1.png", title: "Meat & Meat Products" },
    { src: "/images/marine.png", title: "Marine/Aqua Culture Food Products" },
    { src: "/images/Jam.png", title: "Jams, Juices, Sauces & Concentrates" },
    { src: "/images/infant.png", title: "Infant Food" },
    { src: "/images/honey.png", title: "Honey & Honey Products" },
    { src: "/images/spices.png", title: "Herbs, Spices & Condiments" },
    { src: "/images/Halal.png", title: "Halal Compliance Check" },
    { src: "/images/gm1.png", title: "GM Products" },
    { src: "/images/fruits.png", title: "Fruit & Fruit Products" },
    { src: "/images/additives.png", title: "Food Additives & Preservatives" },
    { src: "/images/egg.png", title: "Egg & Egg Products" },
    { src: "/images/cosmetic.png", title: "Cosmetics & Essential Oil" },
    { src: "/images/cocoa.png", title: "Coffee & Cocoa Products" },
    { src: "/images/cereal.png", title: "Cereals Pulses & Cereal Products" },
    { src: "/images/types.png", title: "Cereals and Cereal Products" },
    { src: "/images/card3.png", title: "Biopesticides and Biofertilizers" },
    { src: "/images/card4.png", title: "Beverages" },
    { src: "/images/card5.png", title: "Bakery and Confectionery Products" },
    { src: "/images/card6.png", title: "AYUSH Products" },
    { src: "/images/card7.png", title: "Animal Food and Feed" },
];
const Chemical = [
    { src:"/images/ChemicalR1C1.png", title: "Water" },
    { src: "/images/ChemicalR1C3.png", title: "Tea" },
    { src: "/images/ChemicalR1C4.png", title: "Sugar & Sugar Products" },
    { src: "/images/ChemicalR2C1.png", title: "Solid Fuels" },
    { src:"/images/ChemicalR2C2.png", title: "Soil and Rock"},
    { src:"/images/ChemicalR2C3.png", title:"Soap, Detergent & Toiletries"},
    { src: "/images/ChemicalR2C4.png", title: "Poultry & Poultry Products"},
    { src: "/images/ChemicalR3C1.png", title: "Polychlorinated Biphenyls (PCBs)"},
    { src:"/images/ChemicalR3C2.png", title:  "Pollution and Environment"},
    { src:"/images/ChemicalR3C3.png", title: "Plastics and Resins" },
    { src:"/images/ChemicalR3C4.png", title:  "Petroleum and Products"},
    { src:"/images/ChemicalR4C1.png", title:  "Pesticide Residues"},
    { src:"/images/ChemicalR4C2.png", title:"Pesticide Formulations"},
    { src:"/images/ChemicalR4C3.png", title:  "Paper and Pulp"},
    { src:"/images/ChemicalR4C4.png", title:  "Paints and Surface Coating"},
    { src: "/images/ChemicalR5C1.png", title: "Nuts and Nut Products" },
    { src:"/images/ChemicalR5C2.png", title:  "Nutraceuticals & Functional Foods"},
    { src: "/images/ChemicalR5C3.png", title:  "Mycotoxins"},
    { src:"/images/ChemicalR5C4.png", title: "Minerals/Trace Metals" },
    { src:"/images/ChemicalR6C1.png", title: "Milk & Dairy Products" },
    { src: "/images/ChemicalR6C2.png", title:"Marine/Aqua Culture Food Products" },
    { src: "/images/ChemicalR6C3.png", title:  "Lubricants"},
    { src:"/images/ChemicalR6C4.png", title: "Jams, Juices, Sauces and Concentrates"},
    { src: "/images/ChemicalR7C1.png", title: "Infant Food" },
    { src: "/images/ChemicalR7C2.png", title: "Industrial and Fine Chemicals"},
    { src: "/images/ChemicalR7C3.png", title: "Honey & Honey Products" },
    { src: "/images/ChemicalR7C4.png", title: "Herbs, Spices & Condiments"},
    { src:"/images/ChemicalR8C1.png", title:"Food Additives & Preservatives"},
    { src: "/images/ChemicalR8C2.png", title: "Fertilizers" },
    { src:"/images/ChemicalR8C3.png", title: "Edible Oils & Fats" },
    { src:"/images/ChemicalR1C2.png", title: "Vegetables & Vegetable Products" },
    { src:"/images/ChemicalR8C4.png", title:  "Drugs and Pharmaceuticals"},
    { src:"/images/ChemicalR9C1.png", title:  "Cosmetics and Essential Oil"},
    { src:"/images/Contaminants.png", title:  "Contaminants"},
    { src:"/images/ChemicalR9C3.png", title:  "Coffee & Cocoa Products"},
    { src:"/images/ChemicalR9C4.png", title: "Chlorinated Dioxins & Dibenzofurans"},
    { src:"/images/ChemicalR10C1.png", title: "Cereals Pulses & Cereal Products"},
    { src:"/images/ChemicalR10C2.png", title: "Beverages (Alcoholic/Non-Alcoholic)"},
    { src:"/images/ChemicalR10C3.png", title: "Bakery & Confectionery Products"},
    { src:"/images/ChemicalR10C4.png", title: "AYUSH Products"},
    { src:"/images/ChemicalR11C1.png", title: "Atmospheric Pollution"},
    { src:"/images/ChemicalR11C2.png", title: "Antibiotic Residues"},
    { src:"/images/ChemicalR11C3.png", title: "Animal Food and Feed"},
];
const Radiological = [
    { src: "/images/Radiological1.png", title: "Water" },
    { src: "/images/Radiological2.png", title: "Sugar & Sugar Products" },
    { src: "/images/Radiological3.png", title: "Milk & Dairy Products" },
    { src: "/images/Radiological4.png", title: "Meat & Meat Products" },
    { src: "/images/Radiological5.png", title: "Cereals Pulses & Cereal Products" }, 
];
const  Mechanical= [
     { src: "/images/toys.png", title: "Toys" }, 
];
const buttonData = [
    { label: "Biological", value: "biological" },
    { label: "Chemical", value: "chemical" },
    { label: "Radiological", value: "radiological" },
    { label: "Mechanical", value: "mechanical" },
];

// Mapping object to get data and title based on selected filter
const categoryData = {
    biological: { items: Biological, title: "Biological" },
    chemical: { items: Chemical, title: "Chemical" },
    radiological: { items: Radiological, title: "Radiological" },
    mechanical: { items: Mechanical, title: "Mechanical" },
};

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
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden flex flex-col hover:-translate-y-0.5"
                        >
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
                    ))}
                </div>
            </div>

        </div>
    )
}