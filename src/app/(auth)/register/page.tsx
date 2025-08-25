"use client";

import {useForm} from "react-hook-form";
import {getErrorMessage} from "@/app/utils/common";
import {useRouter} from "next/navigation";
import {useSnackbar} from "notistack";
import {useLoading} from "@/app/context/loadingContext";
import {useMutation} from "@apollo/client";
import React, {useState} from "react";
import REGISTER_MUTATION from "@/libs/graphqls/mutations/registerMutations";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/solid";
import {UserPlus} from "lucide-react";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const { setLoading } = useLoading();
    const [step, setStep] = useState(1);

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            full_name: "",
            phone: "",
            address: "",
            date_of_birth: "",
            role: "USER",
        },
    });

    const [registerUser] = useMutation(REGISTER_MUTATION);

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            const { email, password, full_name, phone, address, date_of_birth, role } = data;
            const userData = {
                email,
                password,
                full_name,
                phone,
                address,
                date_of_birth: date_of_birth || null,
                role,
            };
            await registerUser({ variables: { userData } });
            enqueueSnackbar("Đăng ký thành công!", { variant: "success" });

            router.push("/login");
        } catch (error) {
            enqueueSnackbar(getErrorMessage(error), { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleNext = async () => {
        const result = await trigger(["email", "password"]);
        if (result) setStep(2);
    };

    const handleBack = () => setStep(1);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-6 rounded shadow space-y-4">
                <div className="flex flex-col items-center">
                    <div className="bg-blue-500 text-white rounded-full p-3">
                        <UserPlus className="h-6     w-6" />
                    </div>
                    <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
                        Đăng ký nếu bạn chưa có tài khoản
                    </h2>
                </div>
                {step === 1 && (
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Địa chỉ email</label>
                            <input
                                id="email"
                                type="email"
                                {...register("email", {
                                    required: "Ô nhập email là bắt buộc",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Vui lòng nhập đúng định dạng email",
                                    },
                                })}
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.email ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{getErrorMessage(errors.email)}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", {
                                        required: "Mật khẩu là bắt buộc",
                                        minLength: { value: 6, message: "Ít nhất 6 ký tự" },
                                    })}
                                    className={`mt-1 block w-full px-3 py-2 border ${
                                        errors.password ? "border-red-500" : "border-gray-300"
                                    } rounded-md shadow-sm pr-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                />
                                <div
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-2.5 right-3 cursor-pointer text-gray-500"
                                >
                                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                </div>
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-600">{getErrorMessage(errors.password)}</p>}
                        </div>

                        <button
                            type="button"
                            onClick={handleNext}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500"
                        >
                            Tiếp theo
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Họ và tên</label>
                            <input
                                id="full_name"
                                {...register("full_name", { required: "Họ tên không được để trống" })}
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.full_name ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.full_name && <p className="mt-1 text-sm text-red-600">{getErrorMessage(errors.full_name)}</p>}
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                            <input
                                id="phone"
                                {...register("phone", {
                                    pattern: {
                                        value: /^[0-9]{9,11}$/,
                                        message: "Số điện thoại không hợp lệ",
                                    },
                                })}
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.phone ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.phone && <p className="mt-1 text-sm text-red-600">{getErrorMessage(errors.phone)}</p>}
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                            <input
                                id="address"
                                {...register("address")}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                            <input
                                id="date_of_birth"
                                type="date"
                                {...register("date_of_birth")}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Vai trò</label>
                            <select
                                id="role"
                                {...register("role", { required: "Vai trò là bắt buộc" })}
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.role ? "border-red-500" : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                            >
                                <option value="USER">Người dùng</option>
                                <option value="DOCTOR">Bác sĩ</option>
                                <option value="ADMIN">Quản trị</option>
                            </select>
                            {errors.role && <p className="mt-1 text-sm text-red-600">{getErrorMessage(errors.role)}</p>}
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-400"
                            >
                                Quay lại
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
                            >
                                Đăng ký
                            </button>
                        </div>
                    </div>
                )}

                <p className="text-center text-sm">
                    Đã có tài khoản? <a href="/login" className="text-blue-600 hover:underline">Đăng nhập</a>
                </p>
            </form>
        </div>
    );
};
export default Register;

