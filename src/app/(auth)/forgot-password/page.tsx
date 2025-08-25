"use client";

import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { enqueueSnackbar } from "notistack";

const SEND_OTP_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input)
  }
`;

export default function ForgetPasswordPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [sendOtp] = useMutation(SEND_OTP_MUTATION);
    const [resetPassword] = useMutation(RESET_PASSWORD_MUTATION);
    const [step, setStep] = useState<"EMAIL" | "RESET">("EMAIL");
    const [countdown, setCountdown] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleSendOtp = async (data: any) => {
        setIsSubmitting(true);
        try {
            const res = await sendOtp({ variables: { email: data.email } });
            if (res.data?.forgotPassword) {
                enqueueSnackbar("Mã OTP đã được gửi về email!", { variant: "success" });
                setEmail(data.email);
                setStep("RESET");
                setCountdown(60);
            } else {
                enqueueSnackbar("Không thể gửi mã OTP. Vui lòng thử lại.", { variant: "error" });
            }
        } catch (error) {
            enqueueSnackbar("Lỗi hệ thống khi gửi OTP.", { variant: "error" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResetPassword = async (data: any) => {
        setIsSubmitting(true);
        try {
            const res = await resetPassword({
                variables: {
                    input: {
                        email: email,
                        otp: data.otp,
                        newPassword: data.newPassword,
                    },
                },
            });
            if (res.data?.resetPassword) {
                enqueueSnackbar("Đặt lại mật khẩu thành công!", { variant: "success" });
                reset();
                window.location.href = "/login";
            } else {
                enqueueSnackbar("Mã OTP không hợp lệ hoặc đã hết hạn.", { variant: "error" });
            }
        } catch (error: any) {
            const errorMessage =
                error.message.includes("Mã xác nhận không đúng")
                    ? "Mã OTP không hợp lệ hoặc đã hết hạn."
                    : "Lỗi hệ thống khi đặt lại mật khẩu.";
            enqueueSnackbar(errorMessage, { variant: "error" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    {step === "EMAIL" ? "Quên Mật Khẩu" : "Đặt Lại Mật Khẩu"}
                </h2>
                <p className="text-sm text-center text-gray-500">
                    {step === "EMAIL" ? "Nhập email để nhận mã OTP" : "Nhập mã OTP và mật khẩu mới"}
                </p>

                <form
                    onSubmit={handleSubmit(step === "EMAIL" ? handleSendOtp : handleResetPassword)}
                    className="space-y-4"
                >
                    {step === "EMAIL" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
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
                                <p className="text-sm text-red-600 mt-1">{String(errors.email.message)}</p>
                            )}
                        </div>
                    )}

                    {step === "RESET" && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mã OTP</label>
                                <input
                                    type="text"
                                    {...register("otp", { required: "Mã OTP là bắt buộc" })}
                                    className={`mt-1 w-full px-3 py-2 border ${
                                        errors.otp ? "border-red-500" : "border-gray-300"
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Nhập mã OTP"
                                />
                                {errors.otp && (
                                    <p className="text-sm text-red-600 mt-1">{String(errors.otp.message)}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mật Khẩu Mới</label>
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
                                    <p className="text-sm text-red-600 mt-1">{String(errors.newPassword.message)}</p>
                                )}
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting || (step === "EMAIL" && countdown > 0)}
                        className={`w-full py-2 px-4 rounded-lg text-white transition ${
                            isSubmitting || (step === "EMAIL" && countdown > 0)
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {isSubmitting
                            ? "Đang xử lý..."
                            : step === "EMAIL"
                                ? countdown > 0
                                    ? `Gửi lại sau ${countdown}s`
                                    : "Gửi Mã OTP"
                                : "Đặt Lại Mật Khẩu"}
                    </button>
                    <p className="text-center text-sm">
                        Đã có tài khoản? <a href="/login" className="text-blue-600 hover:underline">Đăng nhập</a>
                    </p>
                </form>
            </div>
        </div>
    );
}