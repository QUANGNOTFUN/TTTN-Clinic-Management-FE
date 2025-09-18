"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import React from "react";

const createDoctorSchema = z.object({
	full_name: z
		.string({ message: "Họ và tên phải là chuỗi ký tự." })
		.min(2, { message: "Họ và tên phải có ít nhất 2 ký tự." })
		.max(100, { message: "Họ và tên không được vượt quá 100 ký tự." }),
	email: z
		.string({ message: "Email là bắt buộc." })
		.email({ message: "Email không hợp lệ." }),
	password: z
		.string({ message: "Mật khẩu phải là chuỗi ký tự." })
		.min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự." })
		.max(50, { message: "Mật khẩu không được vượt quá 50 ký tự." })
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			{ message: "Mật khẩu phải chứa ít nhất một chữ cái in hoa, một chữ cái thường, một số và một ký tự đặc biệt.", }
		),
});

export type CreateDoctorDto = z.infer<typeof createDoctorSchema>;

export interface CreateDoctorFormProps {
	onCreateDoctor: (data: CreateDoctorDto) => void;
}

export function CreateDoctorForm(
	props: CreateDoctorFormProps
) {
	const { onCreateDoctor } = props;
	const form = useForm<CreateDoctorDto>({
		resolver: zodResolver(createDoctorSchema),
		defaultValues: {
			full_name: "",
			email: "",
			password: "",
		},
	});
	
	const onSubmit = async (data: CreateDoctorDto) => {
		onCreateDoctor(data);
		form.reset();
	};
	
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-gradient-to-r from-teal-200 to-teal-300 text-gray-800 hover:from-teal-300 hover:to-teal-400 cursor-pointer transition-all duration-200">
					Thêm Bác Sĩ
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] bg-white rounded-xl shadow-lg backdrop-blur-md">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold text-gray-700 text-center">
						Tạo tài khoản bác sĩ
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="full_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">
										Họ và tên bác sĩ *
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Nhập tên đầy đủ"
											{...field}
											className="border-gray-200 focus:border-teal-300 focus:ring-teal-300 rounded-lg"
										/>
									</FormControl>
									<FormMessage className="text-red-500 text-sm" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">
										Email *
									</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="Nhập email"
											{...field}
											className="border-gray-200 focus:border-teal-300 focus:ring-teal-300 rounded-lg"
										/>
									</FormControl>
									<FormMessage className="text-red-500 text-sm" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">
										Mật khẩu *
									</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Nhập mật khẩu"
											{...field}
											className="border-gray-200 focus:border-teal-300 focus:ring-teal-300 rounded-lg"
										/>
									</FormControl>
									<FormMessage className="text-red-500 text-sm" />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="cursor-pointer w-full bg-gradient-to-br from-teal-400 to-teal-500 text-gray-800 hover:from-teal-600 hover:to-teal-700 transition-all duration-200"
						>
							Tạo Bác Sĩ
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}