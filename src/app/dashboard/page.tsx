"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Package, 
  Upload, 
  FileText, 
  Calendar, 
  Download,
  ClipboardCheck,
  CheckCircle
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();

  const handleYourOrdersClick = () => {
    router.push("/your-orders");
  };

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
      <div className="flex-1 p-6 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Cards */}
          <div className="lg:col-span-8">
            <div className="space-y-6 h-full overflow-y-auto">
              {/* First Row - 3 Cards */}
              <div className="grid grid-cols-3 gap-6">
                {/* Your Orders Card */}
                <Card className="bg-[#E6EEFF] border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={handleYourOrdersClick}>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 bg-[#002A80] rounded-full flex items-center justify-center">
                        <Package className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Your Orders</h3>
                        <p className="text-sm text-gray-600">View details of your orders and create quotes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Result Submission Card */}
                <Card className="bg-[#E6EEFF] border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 bg-[#002A80] rounded-full flex items-center justify-center">
                        <Upload className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Result Submission</h3>
                        <p className="text-sm text-gray-600">View and input your Proficiency Test results</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* PT Result / Certificate Card */}
                <Card className="bg-[#E6EEFF] border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 bg-[#002A80] rounded-full flex items-center justify-center">
                        <FileText className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">PT Result / Certificate</h3>
                        <p className="text-sm text-gray-600">Download reports for Proficiency Tests you have participated in</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Second Row - 2 Cards */}
              <div className="grid grid-cols-3 gap-6">
                {/* Download Calendar Card */}
                <Card className="bg-[#E6EEFF] border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 bg-[#002A80] rounded-full flex items-center justify-center">
                        <Calendar className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Download Calender</h3>
                        <div className="space-y-3">
                          <Button className="w-full bg-[#002A80] hover:bg-[#002A80]/90 text-white flex items-center justify-center space-x-2">
                            <span>PT Calender National</span>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button className="w-full bg-[white]  text-[#002A80] flex items-center justify-center space-x-2">
                            <span>PT Calender International</span>
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Survey Card */}
                <Card className="bg-[#E6EEFF] border-0 shadow-sm col-span-2">
                  <CardContent className="p-6">
                    <div className="flex items-center h-full">
                      <div className="w-1/2 pr-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Survey</h3>
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                          We value your feedback and strive to improve our services. Please take a moment to complete our survey to help us understand your needs and enhance your experience. Thank you for your time and support!
                        </p>
                        <Button className="bg-[#002A80] hover:bg-[#002A80]/90 text-white">
                          Go to Survey
                        </Button>
                      </div>
                      <div className="w-1/2 flex justify-center items-center">
                    <img
                      src="/images/survey.png"
                      alt="Survey Illustration"
                      className="w-full h-auto max-w-[200px] object-contain"
                    />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Right Column - PT Table */}
          <div className="lg:col-span-4">
            <div className="h-full">
              <Card className="bg-[#E6EEFF] border-0 shadow-sm h-full flex flex-col">
                <div className="px-4 pb-1">
                  <h2 className="text-2xl font-bold text-gray-800">Ongoing/Upcoming PT</h2>
                </div>
                <div className="flex-1 overflow-hidden">
                  <Table className="h-full">
                    <TableHeader>
                      <TableRow className="bg-[#002A80] hover:bg-[#002A80]">
                        <TableHead className="text-white font-semibold text-[10px]">PT Scheme & Code</TableHead>
                        <TableHead className="text-white font-semibold text-[10px]">Item</TableHead>
                        <TableHead className="text-white font-semibold text-[10px]">Month</TableHead>
                        <TableHead className="text-white font-semibold text-[10px]">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-[10px]">
                          <div>Bakery & Confectionery Products-I</div>
                          <div className="text-gray-500">(FACH-2401)</div>
                        </TableCell>
                        <TableCell className="text-[10px]">Bakery Product</TableCell>
                        <TableCell className="text-[10px]">July</TableCell>
                        <TableCell className="text-[10px]">
                          <Badge className="bg-[#002A80] text-white hover:bg-[#002A80]">Ongoing</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-[10px]">
                          <div>Dairy Products-II</div>
                          <div className="text-gray-500">(FACH-2402)</div>
                        </TableCell>
                        <TableCell className="text-[10px]">Milk Powder</TableCell>
                        <TableCell className="text-[10px]">August</TableCell>
                        <TableCell className="text-[10px]">
                          <Badge className="bg-orange-500 text-white hover:bg-orange-500">Upcoming</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-[10px]">
                          <div>Spices & Condiments-III</div>
                          <div className="text-gray-500">(FACH-2403)</div>
                        </TableCell>
                        <TableCell className="text-[10px]">Turmeric Powder</TableCell>
                        <TableCell className="text-[10px]">September</TableCell>
                        <TableCell className="text-[10px]">
                          <Badge className="bg-orange-500 text-white hover:bg-orange-500">Upcoming</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-[10px]">
                          <div>Cereals & Pulses-IV</div>
                          <div className="text-gray-500">(FACH-2404)</div>
                        </TableCell>
                        <TableCell className="text-[10px]">Rice</TableCell>
                        <TableCell className="text-[10px]">October</TableCell>
                        <TableCell className="text-[10px]">
                          <Badge className="bg-orange-500 text-white hover:bg-orange-500">Upcoming</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
