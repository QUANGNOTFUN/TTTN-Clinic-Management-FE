
export interface TablePaginationProps {
	state: { page: number, limit: number, total: number };
}

export function TablePagination(
	{ state, }: TablePaginationProps,
) {
	return (
		<div className={"container max-w-screen mx-auto flex justify-center p-2 space-x-4  rounded-b-xl shadow-lg " +
			"outline-1 outline-black/10 dark:outline-1 dark:outline-white " +
			"text-xs sm:text-sm md:text-base dark:text-white " +
			"bg-white dark:bg-gray-800 "}>
			<section className="container flex items-center">
				<span className="">
					{"Giới hạn"}
				</span>
				<input
					type="number"
					min={1}
					max={50}
					value={state.limit}
					onChange={(e) => e.target.valueAsNumber}
					className="w-14 p-2 ml-2 text-center bg-gray-50 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:focus:ring-violet-400"
				/>
			</section>
			
			<div className="flex justify-between items-center gap-2 ">
				<button
					className="px-4 py-2 bg-gray-200 cursor-pointer  bg-gray-50 shadow-sm rounded-md disabled:opacity-50 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
				>
					{ " < "}
				</button>
				<span className="px-4 py-2 border bg-gray-50 shadow-sm rounded-md text-sm md:text-base">
					{ state.page }
				</span>
				<button
					className="px-4 py-2 cursor-pointer bg-gray-200  bg-gray-50 shadow-sm rounded-md disabled:opacity-50 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
				>
					{ " > "}
				</button>
			</div>
		</div>
	);
}