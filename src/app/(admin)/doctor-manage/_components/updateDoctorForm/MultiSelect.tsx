import React, { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

interface MultiSelectProps {
	options: { value: string; label: string }[];
	value: string[];
	onChange: (value: string[]) => void;
	placeholder?: string;
	disabled?: boolean;
}

export function MultiSelect(props: MultiSelectProps) {
	const { options, value, onChange, placeholder = 'Chọn dịch vụ', disabled } = props;
	const [open, setOpen] = useState(false);
	
	const handleSelect = (selectedValue: string) => {
		const newValue = value.includes(selectedValue)
			? value.filter((v) => v !== selectedValue)
			: [...value, selectedValue];
		onChange(newValue);
	};
	
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between border-gray-200 focus:border-teal-300 focus:ring-teal-300"
					disabled={disabled}
				>
					{value.length > 0
						? options
							.filter((option) => value.includes(option.value))
							.map((option) => option.label)
							.join(', ')
						: placeholder}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command>
					<CommandInput placeholder="Tìm kiếm dịch vụ..." />
					<CommandEmpty>Không tìm thấy dịch vụ.</CommandEmpty>
					<CommandGroup>
						{options.map((option) => (
							<CommandItem
								key={option.value}
								value={option.value}
								onSelect={() => handleSelect(option.value)}
							>
								<Check
									className={cn(
										'mr-2 h-4 w-4',
										value.includes(option.value) ? 'opacity-100' : 'opacity-0'
									)}
								/>
								{option.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}