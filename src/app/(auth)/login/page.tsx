"use client";

import { useForm } from "react-hook-form";
import { getErrorMessage } from "@/app/utils/common";
import {getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useLoading } from "@/app/context/loadingContext";
import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import {toast} from "react-toastify";

const Login = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { setLoading } = useLoading();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        setLoading(true);
        const res = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
        });

        if (res?.error) {
            setLoading(false);
            enqueueSnackbar("Sai email hoặc mật khẩu", { variant: "error" });
        } else {
            const session = await getSession();
            const role = session?.user?.role;
            toast.success("Đăng nhập thành công!", { toastId: "login-success"});
            if (role === "ADMIN") {
                window.location.href =("/admin-dashboard");
            } else if (role === "DOCTOR") {
                window.location.href =("/doctor-dashboard");
            } else {
                window.location.href = "/";
            }
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded shadow">
                <div className="flex flex-col items-center">
                    <div className="bg-blue-500 text-white rounded-full p-3">
                        <LockClosedIcon className="h-6 w-6" />
                    </div>
                    <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
                        Hãy đăng nhập vào tài khoản của bạn để tiếp tục
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Địa chỉ email
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register("email", {
                                    required: "Ô nhập email là bắt buộc",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Vui lòng nhập đúng định dạng email"
                                    }
                                })}
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.email ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{getErrorMessage(errors.email)}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                {...register("password", {
                                    required: "Ô nhập mật khẩu là bắt buộc",
                                    minLength: {
                                        value: 6,
                                        message: "Mật khẩu phải có ít nhất 6 ký tự"
                                    }
                                })}
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.password ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{getErrorMessage(errors.password)}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                        >
                            Đăng nhập
                        </button>
                    </div>

                    <div className="text-sm text-center">
                        <Link href="/forgot-password" className="text-blue-600 hover:underline">
                            Quên mật khẩu?
                        </Link>
                    </div>
                    <div className="text-sm text-center">
                    <Link href="/register" className="text-blue-600 hover:underline">
                            Không có tài khoản? Đăng ký ngay!!
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;