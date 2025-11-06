"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { Search, FileText } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/app/api/api";
import axios from "axios";

export default function ResultSubmission() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = api.getUser();
    setUser(userData);
  }, []);

  interface SubmissionRow {
    ptScheme: string;
    ptItem: string;
    labCode: string;
    startDate: string;
    endDate: string;
    uploadResult: string;
  }

  interface Column {
    key: string;
    label: string;
    render?: (
      value: unknown,
      row: Record<string, unknown>,
      localIndex?: number,
      actualIndex?: number
    ) => React.ReactNode;
  }

  // Sample data for result submission matching the design
  const submissionsData: SubmissionRow[] = [
    {
      ptScheme: "Cereals And Cereal Based Products (MOMB-2406)",
      ptItem: "Soya/ Corn/Maize/ Rice",
      labCode: "0121",
      startDate: "27/06/2024",
      endDate: "30/07/2024",
      uploadResult: "",
    },
    {
      ptScheme: "Dairy Products Testing (DAIRY-2407)",
      ptItem: "Milk/ Cheese/ Yogurt",
      labCode: "0121",
      startDate: "05/07/2024",
      endDate: "08/08/2024",
      uploadResult: "",
    },
    {
      ptScheme: "Water Quality Analysis (WATER-2408)",
      ptItem: "Drinking Water/ Ground Water",
      labCode: "0121",
      startDate: "12/07/2024",
      endDate: "15/08/2024",
      uploadResult: "",
    },
    {
      ptScheme: "Food Safety Testing (FOOD-2409)",
      ptItem: "Processed Foods/ Snacks",
      labCode: "0121",
      startDate: "20/07/2024",
      endDate: "23/08/2024",
      uploadResult: "",
    },
    {
      ptScheme: "Chemical Analysis (CHEM-2410)",
      ptItem: "Pesticides/ Heavy Metals",
      labCode: "0121",
      startDate: "01/08/2024",
      endDate: "04/09/2024",
      uploadResult: "",
    },
    {
      ptScheme: "Microbiological Testing (MICRO-2411)",
      ptItem: "Pathogens/ Bacteria Count",
      labCode: "0121",
      startDate: "08/08/2024",
      endDate: "11/09/2024",
      uploadResult: "",
    },
    {
      ptScheme: "Nutritional Analysis (NUTRI-2412)",
      ptItem: "Protein/ Fat/ Carbohydrates",
      labCode: "0121",
      startDate: "15/08/2024",
      endDate: "18/09/2024",
      uploadResult: "",
    },
    {
      ptScheme: "Bakery & Confectionery Products (BAKE-2413)",
      ptItem: "Bread/ Biscuits/ Cookies",
      labCode: "0121",
      startDate: "22/08/2024",
      endDate: "25/09/2024",
      uploadResult: "",
    },
    {
      ptScheme: "Spices & Condiments (SPICE-2414)",
      ptItem: "Turmeric/ Cumin/ Pepper",
      labCode: "0121",
      startDate: "29/08/2024",
      endDate: "02/10/2024",
      uploadResult: "",
    },
    {
      ptScheme: "Fruits & Vegetables (FRUIT-2415)",
      ptItem: "Fresh Produce/ Juices",
      labCode: "0121",
      startDate: "05/09/2024",
      endDate: "09/10/2024",
      uploadResult: "",
    },
    {
      ptScheme: "Meat & Poultry (MEAT-2416)",
      ptItem: "Chicken/ Beef/ Fish",
      labCode: "0121",
      startDate: "12/09/2024",
      endDate: "16/10/2024",
      uploadResult: "",
    },
    {
      ptScheme: "Beverages (BEV-2417)",
      ptItem: "Tea/ Coffee/ Soft Drinks",
      labCode: "0121",
      startDate: "19/09/2024",
      endDate: "23/10/2024",
      uploadResult: "",
    },
  ];

  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleUploadPDF = (rowIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (fileInputRefs.current[rowIndex]) {
      fileInputRefs.current[rowIndex]!.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name, "for row:", rowIndex);
      
      // Here you can add the actual upload logic
      // For example, you could use FormData to upload to a server:
      // const formData = new FormData();
      // formData.append('file', file);
      // formData.append('rowIndex', rowIndex.toString());
      // await axios.post('/api/upload', formData, {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // });
      
      alert(`File "${file.name}" selected for upload.`);
      
      // Optionally show a success message or update UI state
      console.log("Ready to upload file for PT scheme:", submissionsData[rowIndex]?.ptScheme);
    }
  };

  const columns: Column[] = [
    {
      key: "ptScheme",
      label: "PT Scheme & Code",
      render: (value: unknown) => (
        <span className="font-bold">
          {String(value ?? '')}
        </span>
      ),
    },
    {
      key: "ptItem",
      label: "PT Item",
    },
    {
      key: "labCode",
      label: "Lab Code",
      render: (value: unknown) => (
        <span className="font-bold">
          {String(value ?? '')}
        </span>
      ),
    },
    {
      key: "startDate",
      label: "Start Date",
      render: (value: unknown) => (
        <span className="font-bold">
          {String(value ?? '')}
        </span>
      ),
    },
    {
      key: "endDate",
      label: "End Date",
      render: (value: unknown) => (
        <span className="font-bold">
          {String(value ?? '')}
        </span>
      ),
    },
    {
      key: "uploadResult",
      label: "Upload Result",
      render: (_value: unknown, _row: Record<string, unknown>, _localIndex?: number, actualIndex?: number) => {
        const rowIndex = actualIndex ?? 0;
        return (
          <div className="flex items-center">
            <input
              type="file"
              ref={(el) => {
                if (el) {
                  fileInputRefs.current[rowIndex] = el;
                }
              }}
              onChange={(e) => handleFileChange(e, rowIndex)}
              accept=".pdf"
              className="hidden"
            />
            <Button
              size="sm"
              onClick={(e) => handleUploadPDF(rowIndex, e)}
              className="bg-[#002A80] text-white hover:bg-[#002A80]/90 flex items-center gap-2 cursor-pointer"
            >
              <FileText className="h-4 w-4" />
              Upload PDF
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="h-full bg-white flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-3xl font-bold">
              <span className="text-gray-800">Welcome </span>
              <span className="text-[#002A80]">{user?.labCode || user?.name || "User"}</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search here..." 
                className="pl-10 w-80 border-gray-300"
              />
            </div>
            <Button className="bg-[#002A80] hover:bg-[#002A80]/90 text-white px-6">
              All PT Scheme
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-4 overflow-hidden">
        <div className="mb-4">
          <nav className="text-sm">
            <span 
              className="text-gray-600 cursor-pointer hover:text-[#002A80]"
              onClick={() => router.push("/dashboard")}
            >
              MY ACCOUNT
            </span>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="text-[#002A80] cursor-pointer font-semibold">RESULT SUBMISSION</span>
          </nav>
        </div>

        {/* Data Table */}
        <div className="h-full overflow-hidden">
          <DataTable
            columns={columns}
            data={submissionsData as unknown as Record<string, unknown>[]}
            searchable={false}
            pagination={true}
            itemsPerPage={7}
            backButton={
              <Button
                onClick={() => router.push("/dashboard")}
                variant="outline"
                className="border-[#002A80] text-[#002A80] hover:bg-[#002A80] hover:text-white"
              >
                Back to Dashboard
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}

