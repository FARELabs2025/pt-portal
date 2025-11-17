"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

export interface DataTableColumn<T extends object> {
  key: keyof T;
  label: string;
  render?: (
    value: T[keyof T],
    row: T,
    localIndex?: number,
    actualIndex?: number
  ) => React.ReactNode;
}

export interface DataTableProps<T extends object> {
  columns: DataTableColumn<T>[];
  data: T[];
  searchable?: boolean;
  pagination?: boolean;
  searchPlaceholder?: string;
  itemsPerPage?: number;
  className?: string;
  backButton?: React.ReactNode;
}

export function DataTable<T extends object>({
  columns = [] as DataTableColumn<T>[],
  data = [] as T[],
  searchable = true,
  pagination = true,
  searchPlaceholder = "Search...",
  itemsPerPage = 10,
  className = "",
  backButton,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  // Filter data based on search term
  const filteredData = React.useMemo(() => {
    if (!searchable || !searchTerm) return data;
    
    return data.filter((row) =>
      columns.some((column) => {
        const value = row[column.key];
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, columns, searchable]);

  // Paginate data
  const paginatedData = React.useMemo(() => {
    if (!pagination) return filteredData;
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, itemsPerPage, pagination]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Search Bar */}
      {searchable && (
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="flex-1 border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#D9D9D9]">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((row, index) => {
              const actualIndex = pagination ? (currentPage - 1) * itemsPerPage + index : index;
              const localIndex = index;
              return (
                <tr key={index} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {column.render
                        ? column.render(row[column.key], row, localIndex, actualIndex)
                        : String(row[column.key] ?? "")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination/Back Button - Always at bottom */}
      {(pagination || backButton) && (
        <div className="flex items-center justify-between mt-4 relative">
          {/* Back Button on the left */}
          <div className="shrink-0">
            {backButton}
          </div>
          
          {/* Pagination in the center */}
          <div className="flex-1 flex justify-center">
            {pagination && totalPages > 1 && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className={
                      currentPage === page 
                        ? "bg-[#002A80] text-white hover:bg-[#002A80]/90 cursor-pointer" 
                        : "border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                    }
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          {/* Empty div to balance the layout */}
          <div className="shrink-0 w-[120px]"></div>
        </div>
      )}
    </div>
  );
}
