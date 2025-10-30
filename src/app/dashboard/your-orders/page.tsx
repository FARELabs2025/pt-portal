"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function YourOrders() {
  const router = useRouter();
  
  interface OrderRow {
    ptScheme: string;
    ptItem: string;
    orderDate: string;
    orderStatus: string;
    labCode: string;
    price: string;
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
  // Extended dummy data for pagination testing
  const ordersData: OrderRow[] = [
    {
      ptScheme: "Cereals And Cereal Based Products (MOMB-2406)",
      ptItem: "Soya/ Corn/Maize/ Rice",
      orderDate: "05/05/2022",
      orderStatus: "On hold",
      labCode: "052022",
      price: "₹400",
    },
    {
      ptScheme: "Cereals And Cereal Based Products (MOMB-2406)",
      ptItem: "Soya/ Corn/Maize/ Rice",
      orderDate: "05/05/2022",
      orderStatus: "Completed",
      labCode: "052022",
      price: "₹400",
    },
    {
      ptScheme: "Cereals And Cereal Based Products (MOMB-2406)",
      ptItem: "Soya/ Corn/Maize/ Rice",
      orderDate: "05/05/2022",
      orderStatus: "On hold",
      labCode: "052022",
      price: "₹400",
    },
    {
      ptScheme: "Cereals And Cereal Based Products (MOMB-2406)",
      ptItem: "Soya/ Corn/Maize/ Rice",
      orderDate: "05/05/2022",
      orderStatus: "Completed",
      labCode: "052022",
      price: "₹400",
    },
    {
      ptScheme: "Cereals And Cereal Based Products (MOMB-2406)",
      ptItem: "Soya/ Corn/Maize/ Rice",
      orderDate: "05/05/2022",
      orderStatus: "On hold",
      labCode: "052022",
      price: "₹400",
    },
    {
      ptScheme: "Cereals And Cereal Based Products (MOMB-2406)",
      ptItem: "Soya/ Corn/Maize/ Rice",
      orderDate: "05/05/2022",
      orderStatus: "Completed",
      labCode: "052022",
      price: "₹400",
    },
    {
      ptScheme: "Cereals And Cereal Based Products (MOMB-2406)",
      ptItem: "Soya/ Corn/Maize/ Rice",
      orderDate: "05/05/2022",
      orderStatus: "On hold",
      labCode: "052022",
      price: "₹400",
    },
    {
      ptScheme: "Cereals And Cereal Based Products (MOMB-2406)",
      ptItem: "Soya/ Corn/Maize/ Rice",
      orderDate: "05/05/2022",
      orderStatus: "Completed",
      labCode: "052022",
      price: "₹400",
    },
    // Additional data for pagination
    {
      ptScheme: "Dairy Products Testing (DAIRY-2407)",
      ptItem: "Milk/ Cheese/ Yogurt",
      orderDate: "12/06/2022",
      orderStatus: "On hold",
      labCode: "062022",
      price: "₹500",
    },
    {
      ptScheme: "Dairy Products Testing (DAIRY-2407)",
      ptItem: "Milk/ Cheese/ Yogurt",
      orderDate: "12/06/2022",
      orderStatus: "Completed",
      labCode: "062022",
      price: "₹500",
    },
    {
      ptScheme: "Water Quality Analysis (WATER-2408)",
      ptItem: "Drinking Water/ Ground Water",
      orderDate: "18/07/2022",
      orderStatus: "On hold",
      labCode: "072022",
      price: "₹350",
    },
    {
      ptScheme: "Water Quality Analysis (WATER-2408)",
      ptItem: "Drinking Water/ Ground Water",
      orderDate: "18/07/2022",
      orderStatus: "Completed",
      labCode: "072022",
      price: "₹350",
    },
    {
      ptScheme: "Food Safety Testing (FOOD-2409)",
      ptItem: "Processed Foods/ Snacks",
      orderDate: "25/08/2022",
      orderStatus: "On hold",
      labCode: "082022",
      price: "₹600",
    },
    {
      ptScheme: "Food Safety Testing (FOOD-2409)",
      ptItem: "Processed Foods/ Snacks",
      orderDate: "25/08/2022",
      orderStatus: "Completed",
      labCode: "082022",
      price: "₹600",
    },
    {
      ptScheme: "Chemical Analysis (CHEM-2410)",
      ptItem: "Pesticides/ Heavy Metals",
      orderDate: "02/09/2022",
      orderStatus: "On hold",
      labCode: "092022",
      price: "₹750",
    },
    {
      ptScheme: "Chemical Analysis (CHEM-2410)",
      ptItem: "Pesticides/ Heavy Metals",
      orderDate: "02/09/2022",
      orderStatus: "Completed",
      labCode: "092022",
      price: "₹750",
    },
    {
      ptScheme: "Microbiological Testing (MICRO-2411)",
      ptItem: "Pathogens/ Bacteria Count",
      orderDate: "10/10/2022",
      orderStatus: "On hold",
      labCode: "102022",
      price: "₹450",
    },
    {
      ptScheme: "Microbiological Testing (MICRO-2411)",
      ptItem: "Pathogens/ Bacteria Count",
      orderDate: "10/10/2022",
      orderStatus: "Completed",
      labCode: "102022",
      price: "₹450",
    },
    {
      ptScheme: "Nutritional Analysis (NUTRI-2412)",
      ptItem: "Protein/ Fat/ Carbohydrates",
      orderDate: "15/11/2022",
      orderStatus: "On hold",
      labCode: "112022",
      price: "₹550",
    },
    {
      ptScheme: "Nutritional Analysis (NUTRI-2412)",
      ptItem: "Protein/ Fat/ Carbohydrates",
      orderDate: "15/11/2022",
      orderStatus: "Completed",
      labCode: "112022",
      price: "₹550",
    },
  ];

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
      key: "orderDate",
      label: "Order Date",
      render: (value: unknown) => (
        <span className="font-bold">
          {String(value ?? '')}
        </span>
      ),
    },
    {
      key: "orderStatus",
      label: "Order Status",
      render: (value: unknown) => (
        <span className="text-[#002A80] font-bold">
          {String(value ?? '')}
        </span>
      ),
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
      key: "price",
      label: "Price",
      render: (value: unknown) => (
        <span className="font-bold">
          {String(value ?? '')}
        </span>
      ),
    },
    {
      key: "trackOrder",
      label: "Track Order",
      render: (_value: unknown, row: Record<string, unknown>) => (
        <Button
          variant={String((row as Record<string, unknown>).orderStatus) === "Completed" ? "default" : "outline"}
          size="sm"
          className={
            String((row as Record<string, unknown>).orderStatus) === "Completed"
              ? "bg-[#002A80] text-white hover:bg-[#002A80]/90"
              : "border-[#002A80] text-[#002A80] hover:bg-[#002A80] hover:text-white"
          }
        >
          Track Order
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
              All PT Scheme
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
              MY ACCOUNT
            </span>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="text-[#002A80] cursor-pointer font-semibold">ORDERS</span>
          </nav>
        </div>

        {/* Data Table */}
        <div className="h-full overflow-hidden">
          <DataTable
            columns={columns}
            data={ordersData as unknown as Record<string, unknown>[]}
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
