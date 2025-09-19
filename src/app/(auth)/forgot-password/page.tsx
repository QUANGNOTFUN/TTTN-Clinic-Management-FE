"use client";

import { useForm } from "react-hook-form";
import React, { useState } from "react";
import {toast} from "react-toastify";

// Định nghĩa form data
type EmailFormValues = { email: string };
type ResetFormValues = { otp: string; newPassword: string };

export default function ForgetPasswordPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EmailFormValues & ResetFormValues>();
    
    const [step, setStep] = useState<"EMAIL" | "RESET">("EMAIL");
    
    // Giả lập chuyển step khi submit
    const onSubmit = () => {
        if (step === "EMAIL") {
            setStep("RESET");
        } else {
            toast.info("Chức năng đang được phát triển, vui lòng quay lại sau!");
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    {step === "EMAIL" ? "Quên Mật Khẩu" : "Đặt Lại Mật Khẩu"}
                </h2>
                <p className="text-sm text-center text-gray-500">
                    {step === "EMAIL"
                        ? "Nhập email để nhận mã OTP"
                        : "Nhập mã OTP và mật khẩu mới"}
                </p>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {step === "EMAIL" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email là bắt buộc",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Email không hợp lệ",
                                    },
                                })}
                                className={`mt-1 w-full px-3 py-2 border ${
                                    errors.email ? "border-red-500" : "border-gray-300"
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Nhập email của bạn"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                    )}
                    
                    {step === "RESET" && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Mã OTP
                                </label>
                                <input
                                    type="text"
                                    {...register("otp", { required: "Mã OTP là bắt buộc" })}
                                    className={`mt-1 w-full px-3 py-2 border ${
                                        errors.otp ? "border-red-500" : "border-gray-300"
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Nhập mã OTP"
                                />
                                {errors.otp && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.otp.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Mật Khẩu Mới
                                </label>
                                <input
                                    type="password"
                                    {...register("newPassword", {
                                        required: "Mật khẩu là bắt buộc",
                                        minLength: {
                                            value: 6,
                                            message: "Mật khẩu phải có ít nhất 6 ký tự",
                                        },
                                    })}
                                    className={`mt-1 w-full px-3 py-2 border ${
                                        errors.newPassword ? "border-red-500" : "border-gray-300"
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Nhập mật khẩu mới"
                                />
                                {errors.newPassword && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.newPassword.message}
                                    </p>
                                )}
                            </div>
                        </>
                    )}
                    
                    <button
                        type="submit"
                        className="w-full py-2 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition"
                    >
                        {step === "EMAIL" ? "Gửi Mã OTP" : "Đặt Lại Mật Khẩu"}
                    </button>
                    
                    <p className="text-center text-sm">
                        Đã có tài khoản?{" "}
                        <a href="/login" className="text-blue-600 hover:underline">
                            Đăng nhập
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
