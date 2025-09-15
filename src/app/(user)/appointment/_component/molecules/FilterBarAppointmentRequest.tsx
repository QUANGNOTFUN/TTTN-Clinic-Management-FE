import { useState } from "react"
import { Badge } from "@/components/ui/badge"

const STATUSES = ["ALL", "PENDING", "CONFIRMED", "CANCELLED"]

type FilterBarAppointmentRequestProps = {
	value?: string
	onChange?: (status: string) => void
}

export function FilterBarAppointmentRequest(
	props: FilterBarAppointmentRequestProps
) {
	const { value, onChange } = props;
	const [selected, setSelected] = useState(value ?? "ALL")
	
	const handleSelect = (status: string) => {
		setSelected(status)
		onChange?.(status === "ALL" ? "" : status) // ALL = không lọc
	}
	
	return (
		<div className="flex gap-2 flex-wrap">
			{STATUSES.map((status) => (
				<Badge
					key={status}
					variant={selected === status ? "default" : "outline"}
					className="cursor-pointer select-none"
					onClick={() => handleSelect(status)}
				>
					{status}
				</Badge>
			))}
		</div>
	)
}
