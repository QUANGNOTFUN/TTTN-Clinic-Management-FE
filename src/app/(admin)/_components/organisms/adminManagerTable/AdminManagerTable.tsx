"use client";

import {useMemo, useState} from "react";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {format} from 'date-fns';
import {
	AdminManagerTableSkeleton
} from "@/app/(admin)/_components/organisms/adminManagerTable/AdminManagerTableSkeleton";

interface TableProps<T> {
	data: T[];
	columns: ColumnDef<T, unknown>[];
	pageSize?: number;
	searchField?: keyof T;
}

// Hàm kiểm tra và format date
const formatDateTimeIfNeeded = (value: unknown): unknown => {
  if (!value) return '—';
  
  // Kiểm tra nếu là date string
  const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
  if (typeof value === 'string' && dateRegex.test(value)) {
    try {
      const date = new Date(value);
      return format(date, 'dd/MM/yyyy HH:mm');
    } catch {
      return value;
    }
  }
  return value;
};

export function AdminManagerTable<T extends Record<string, unknown>>(props: TableProps<T>) {
	const { data, columns, pageSize = 10, searchField } = props;
	const [globalFilter, setGlobalFilter] = useState("");
	
	const replaceNullWithNA = (value: unknown): unknown => {
		return value === null || value === undefined ? "N/A" : value;
	};

	// Tối ưu hóa và xử lý dữ liệu với useMemo
	const tableData = useMemo(() => {
	  if (!data || data?.length === 0) return [];
	  return data.map((item) => {
	    const newItem: Partial<T> = {};
	    for (const key in item) {
	      if (Object.prototype.hasOwnProperty.call(item, key)) {
	        const value = item[key as keyof T];
	        newItem[key as keyof T] = formatDateTimeIfNeeded(
	          replaceNullWithNA(value)
	        ) as T[keyof T];
	      }
	    }
	    return newItem as T;
	  });
	}, [data]);
	
	// Cấu hình table với các model mới
	const table = useReactTable({
		data: tableData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			pagination: { pageSize, pageIndex: 0 },
			globalFilter,
		},
		onGlobalFilterChange: setGlobalFilter,
		initialState: {
			pagination: { pageIndex: 0 },
		},
	});
	
	if (data.length === 0) {
		return <AdminManagerTableSkeleton columns={columns.length} rows={pageSize} />;
	}
	
	return (
	  <div className="p-6 space-y-6 bg-white rounded-md">
	    {searchField && (
	      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
	        <Input
	          placeholder={`Tìm theo tên`}
	          value={globalFilter}
	          onChange={(e) => setGlobalFilter(e.target.value)}
	          className="max-w-xs w-full sm:max-w-md border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md"
	        />
	        
	        {/* Pagination */}
	        <div className="flex items-center gap-2">
	          <Button
	            disabled={!table.getCanPreviousPage()}
	            onClick={() => table.previousPage()}
	            className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-400 rounded-md px-3 py-1.5 text-sm"
	          >
	            Prev
	          </Button>
	          <span className="text-gray-600 text-sm font-medium px-2">
	            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
	          </span>
	          <Button
	            disabled={!table.getCanNextPage()}
	            onClick={() => table.nextPage()}
	            className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-400 rounded-md px-3 py-1.5 text-sm"
	          >
	            Next
	          </Button>
	        </div>
	      </div>
	    )}
	    
	    {data.length === 0 ? (
	      <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-md border border-gray-100">
	        No data available
	      </div>
	    ) : (
	      <div className="overflow-x-auto rounded-md border border-gray-200">
	        <table className="w-full table-auto [&_td]:border [&_th]:border border-collapse text-center">
		        <thead className="bg-gray-100 text-gray-800 select-none">
		        {table.getHeaderGroups().map((headerGroup) => (
			        <tr key={headerGroup.id}>
				        {headerGroup.headers.map((header) => (
					        <th
						        key={header.id}
						        className="
						            border-b border-gray-200 px-4 py-2
						            text-center text-sm font-semibold
						            whitespace-nowrap
						            resize-x overflow-hidden
						          "
						        style={{ minWidth: "100px" }}
					        >
						        {flexRender(header.column.columnDef.header, header.getContext())}
					        </th>
				        ))}
			        </tr>
		        ))}
		        </thead>
		        
		        <tbody className="bg-white">
	            {table.getRowModel().rows.map((row) => (
	              <tr
	                key={row.id}
	                className="hover:bg-gray-50 transition-colors duration-200"
	              >
	                {row.getVisibleCells().map((cell) => (
	                  <td
	                    key={cell.id}
	                    className="border-b border-gray-200 p-3 text-sm text-gray-700"
	                  >
	                    {flexRender(cell.column.columnDef.cell, cell.getContext()) || (
	                      <span className="text-gray-500">—</span>
	                    )}
	                  </td>
	                ))}
	              </tr>
	            ))}
	          </tbody>
	        </table>
	      </div>
	    )}
	  </div>
	);
}