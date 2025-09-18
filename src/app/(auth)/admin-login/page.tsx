"use client";

import React, {useEffect, useState} from 'react';
import {Eye, EyeOff, Lock, Mail, User} from 'lucide-react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {useLogin} from "@/lib/hooks/auth/useLogin";
import {CustomSession, LoginPayload, Role} from "@/types/login";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {useSession} from 'next-auth/react';

// Define Zod schema
const loginSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Email là bắt buộc" })
		.refine(
			(value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
			{ message: "Email không hợp lệ" }
		),
	password: z
		.string()
		.min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
});

export default function AdminLoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const { mutateAsync: login } = useLogin();
	const session = useSession() as { data: CustomSession };
	const router = useRouter();
	
	// Initialize useForm with Zod resolver
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	
	const onSubmit = async (data: LoginPayload) => {
		try {
			setIsPending(true);
			await login(data)
		} catch (error) {
			setError(error);
		}
		setIsPending(false);
	};
	
	useEffect(() => {
		if (session.data?.user) {
			const user = session.data.user;
			if (user?.role === Role.MANAGER) {
				toast.success('Đăng nhập thành công!');
				setTimeout(() => {
					router.push('/admin-dashboard');
				}, 1000);
			} else if (user?.role === Role.DOCTOR) {
				toast.success('Đăng nhập thành công!');
				setTimeout(() => {
					router.push('/doctor-dashboard');
				}, 1000);
			} else {
				toast.error("Không có quyền truy cập trang này!");
				setTimeout(() => {
					router.push('/');
				}, 1000);
			}
		}
	}, [router, session.data?.user]);
	
	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100">
			{/* Subtle background decoration */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute top-0 left-0 w-full h-full">
					<div className="absolute top-20 left-20 w-32 h-32 bg-blue-100 rounded-full opacity-50"></div>
					<div className="absolute bottom-20 right-20 w-24 h-24 bg-slate-200 rounded-full opacity-40"></div>
					<div className="absolute top-1/2 right-10 w-16 h-16 bg-blue-50 rounded-full opacity-60"></div>
				</div>
			</div>
			
			{/* Main Card */}
			<div className="relative w-full max-w-md">
				<div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 transform transition-all duration-300 hover:shadow-2xl">
					{/* Header */}
					<div className="text-center mb-8">
						<div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 border-2 border-slate-200">
							<User className="w-8 h-8 text-slate-600" />
						</div>
						<h2 className="text-2xl font-bold text-slate-800 mb-2">
							Đăng nhập Admin
						</h2>
						<p className="text-slate-600">
							Vui lòng đăng nhập để truy cập hệ thống
						</p>
					</div>
					
					{/* Form */}
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						{/* Email Field */}
						<div className="space-y-2">
							<label className="text-slate-700 text-sm font-medium block">
								Email
							</label>
							<div className="relative">
								<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
								<input
									type="email"
									placeholder="admin@example.com"
									{...register('email')}
									className={`w-full pl-10 pr-4 py-3 border rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
										errors.email ? "border-red-300 bg-red-50" : "border-slate-300 bg-white hover:border-slate-400"
									}`}
								/>
							</div>
							{errors.email && (
								<p className="text-red-500 text-sm">
									{errors.email.message}
								</p>
							)}
						</div>
						
						{/* Password Field */}
						<div className="space-y-2">
							<label className="text-slate-700 text-sm font-medium block">
								Mật khẩu
							</label>
							<div className="relative">
								<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
								<input
									type={showPassword ? "text" : "password"}
									placeholder="••••••••"
									{...register('password')}
									className={`w-full pl-10 pr-12 py-3 border rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
										errors.password ? "border-red-300 bg-red-50" : "border-slate-300 bg-white hover:border-slate-400"
									}`}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
								>
									{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
								</button>
							</div>
							{errors.password && (
								<p className="text-red-500 text-sm">
									{errors.password.message}
								</p>
							)}
						</div>
						
						{/* Error Message */}
						{error && (
							<div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
								{error.message}
							</div>
						)}
						
						{/* Submit Button */}
						<button
							type="submit"
							disabled={isPending}
							className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-lg shadow-md transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:bg-slate-800 flex items-center justify-center gap-2"
						>
							{isPending && (
								<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
							)}
							{isPending ? "Đang đăng nhập..." : "Đăng nhập"}
						</button>
					</form>
					
					{/* Footer */}
					<div className="mt-6 text-center">
						<p className="text-slate-500 text-sm">
							Quên mật khẩu?{" "}
							<a
								href="#"
								className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 hover:underline"
							>
								Liên hệ admin
							</a>
						</p>
					</div>
				</div>
				
				{/* Subtle bottom shadow */}
				<div className="absolute -bottom-4 left-4 right-4 h-4 bg-slate-200 rounded-lg blur-sm opacity-30"></div>
			</div>
		</div>
	);
}