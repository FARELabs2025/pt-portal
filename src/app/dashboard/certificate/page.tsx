"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { Search, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Certificate() {
  const router = useRouter();

  // Sample data for result certificates matching the design
  const certificatesData = [
    {
      ptScheme: "Cereals And Cereal Based Products (MOMB-2406)",
      ptItem: "Soya/ Corn/Maize/ Rice",
      labCode: "14289",
      downloadResult: "",
      downloadCertificate: "",
    },
    {
      ptScheme: "Cereals And Cereal Based Products (MOMB-2406)",
      ptItem: "Soya/ Corn/Maize/ Rice",
      labCode: "14289",
      downloadResult: "",
      downloadCertificate: "",
    },
    {
      ptScheme: "Cereals And Cereal Based Products (MOMB-2406)",
      ptItem: "Soya/ Corn/Maize/ Rice",
      labCode: "14289",
      downloadResult: "",
      downloadCertificate: "",
    },
    {
      ptScheme: "Cereals And Cereal Based Products (MOMB-2406)",
      ptItem: "Soya/ Corn/Maize/ Rice",
      labCode: "14289",
      downloadResult: "",
      downloadCertificate: "",
    },
    {
      ptScheme: "Dairy Products Testing (DAIRY-2407)",
      ptItem: "Milk/ Cheese/ Yogurt",
      labCode: "14290",
      downloadResult: "",
      downloadCertificate: "",
    },
    {
      ptScheme: "Water Quality Analysis (WATER-2408)",
      ptItem: "Drinking Water/ Ground Water",
      labCode: "14291",
      downloadResult: "",
      downloadCertificate: "",
    },
    {
      ptScheme: "Food Safety Testing (FOOD-2409)",
      ptItem: "Processed Foods/ Snacks",
      labCode: "14292",
      downloadResult: "",
      downloadCertificate: "",
    },
    {
      ptScheme: "Chemical Analysis (CHEM-2410)",
      ptItem: "Pesticides/ Heavy Metals",
      labCode: "14293",
      downloadResult: "",
      downloadCertificate: "",
    },
  ];

  const handleDownloadResult = (row: any) => {
    // Handle download result logic here
    console.log("Downloading result for:", row.ptScheme);
  };

  const handleDownloadCertificate = (row: any) => {
    // Handle download certificate logic here
    console.log("Downloading certificate for:", row.ptScheme);
  };

  const columns = [
    {
      key: "ptScheme",
      label: "PT Scheme & Code",
      render: (value: string) => (
        <span className="font-medium">
          {value || ''}
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
      render: (value: string) => (
        <span className="font-medium">
          {value || ''}
        </span>
      ),
    },
    {
      key: "downloadResult",
      label: "Download Result",
      render: (value: any, row: any, localIndex?: number, actualIndex?: number) => (
        <Button
          size="sm"
          onClick={() => handleDownloadResult(row)}
          className="bg-white text-[#002A80] border border-[#002A80] hover:bg-[#002A80] hover:text-white flex items-center gap-2 cursor-pointer"
        >
          <FileText className="h-4 w-4" />
          Download Report
        </Button>
      ),
    },
    {
      key: "downloadCertificate",
      label: "Download Certificate",
      render: (value: any, row: any, localIndex?: number, actualIndex?: number) => (
        <Button
          size="sm"
          onClick={() => handleDownloadCertificate(row)}
          className="bg-white text-[#002A80] border border-[#002A80] hover:bg-[#002A80] hover:text-white flex items-center gap-2 cursor-pointer"
        >
          <FileText className="h-4 w-4" />
          Download Certificate
        </Button>
      ),
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
              <span className="text-[#002A80]">MT-0121</span>
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
              All Categories
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-4 overflow-hidden">
        <div className="mb-2">
          <nav className="text-sm">
            <span 
              className="text-gray-600 cursor-pointer hover:text-[#002A80]"
              onClick={() => router.push("/dashboard")}
            >
              My Account
            </span>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="text-[#002A80] cursor-pointer font-semibold">Result</span>
          </nav>
        </div>

        {/* Data Table */}
        <div className="h-full overflow-hidden">
          <DataTable
            columns={columns}
            data={certificatesData}
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

