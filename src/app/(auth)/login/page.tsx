'use client';

import {useForm} from "react-hook-form";
import {getErrorMessage} from "@/app/utils/common";
import Image from 'next/image';
import {LoginPayload, Role} from "@/types/login";
import {useLogin} from "@/lib/hooks/auth/useLogin";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import {VscLoading} from "react-icons/vsc";
import Link from "next/link";
import {useProfile} from "@/lib/hooks/auth/useProfile";
import { toast } from "react-toastify";

const Login = () => {
    const router = useRouter();
    const { mutateAsync: login, isPending, isSuccess, isError, error } = useLogin();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { data: user, isSuccess: profileSuccess, isLoading } = useProfile();
    
    const onSubmit = async (data: LoginPayload) => {
        try {
            await login(data);
        } catch (err) {
            console.log(err);
        }
    };
    
    useEffect(() => {
        if (isSuccess) {
            toast.success("Đăng nhập thành công", { toastId: "login-success" });
        }
        if (isError) {
            toast.error(error?.message || "Đăng nhập thất bại", { toastId: "login-error" });
        }
    }, [error?.message, isError, isSuccess]);
    
    useEffect(() => {
        if (profileSuccess && user) {
            switch (user?.role) {
                case Role.PATIENT:
                    router.push("/")
                    break
                case Role.DOCTOR:
                    router.push("/doctor/dashboard")
                    break
                case Role.MANAGER:
                    router.push("/admin-dashboard")
                    break
                default:
                    router.push("/login")
            }
        }
    }, [profileSuccess, router, user, user?.role])
    
    
    if (isPending || isLoading) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-zinc-300 bg-opacity-50">
              <VscLoading className="animate-spin text-black text-[50px]" />
          </div>
        );
    }
    
    return (
        <div className={"min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white " +
        "py-12 px-4 sm:px-6 lg:px-8 "
        }>
            <div className={"max-w-sm md:max-w-4xl sm:mt-2 lg:mt-4 w-full space-y-6" +
              "bg-white p-5 rounded-2xl shadow-2xl border border-gray-100"
            }>
                <div className={"font-serif mb-5 p-4 border-b-2 italic text-center text-nowrap font-semibold tracking-wide leading-tight shadow-text"}>
                  <h1 className={"text-xl sm:text-3xl md:text-5xl text-emerald-400"}>
                      𓍼 Hola Doctor 𓍼
                  </h1>
                </div>
                <div className={"flex flex-col md:flex-row rounded-lg space-x-0 space-y-2 md:space-x-4 md:space-y-0"}>
                    <form
                        className={"flex-7 p-4 space-y-6 rounded-lg shadow-sm"}
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                      <div>
                          <div className={"mb-2 md:mb-4"}>
                              <label
                                htmlFor={"email"}
                                className={"block indent-4 text-sm sm:text-lg md:text-xl font-bold text-zinc-600 "}
                              >
                                  Email:
                              </label>
                              <input
                                id={"email"}
                                type={"email"}
                                {...register("email", {
                                    required: "Ô nhập email là bắt buộc",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Vui lòng nhập đúng định dạng email",
                                    },
                                })}
                                className={`mt-2 block w-full px-4 py-3 border text-xs sm:text-sm md:text-base tab ${
                                  errors.email ? "border-red-500" : "border-gray-300"
                                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition duration-200`}
                                placeholder={"nhapemail@domain.com"}
                              />
                              {errors.email && (
                                <p className={"mt-1 indent-4 text-xs sm:text-sm md:text-base text-red-500"}>{getErrorMessage(errors.email)}</p>
                              )}
                          </div>
                          
                          <div className={"mb-2 md:mb-4"}>
                              <label
                                htmlFor={"password"}
                                className={"block indent-4 text-sm sm:text-lg md:text-xl font-bold text-zinc-600 "}
                              >
                                  Mật khẩu:
                              </label>
                              <input
                                id="password"
                                type="password"
                                {...register("password", {
                                    required: "Ô nhập mật khẩu là bắt buộc",
                                    minLength: {
                                        value: 6,
                                        message: "Mật khẩu phải có ít nhất 6 ký tự",
                                    },
                                })}
                                className={`mt-2 block w-full px-4 py-3 border text-xs sm:text-sm md:text-base ${
                                  errors.password ? "border-red-500" : "border-gray-300"
                                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition duration-200`}
                                placeholder="Nhập mật khẩu"
                              />
                              {errors.password && (
                                <p className="mt-1 indent-4 text-xs sm:text-sm md:text-base text-red-500">{getErrorMessage(errors.password)}</p>
                              )}
                          </div>
                      </div>
                      
                      <div>
                          <button
                            type={"submit"}
                            className={"w-full py-3 px-6 rounded-lg shadow-md shadow-teal-700/60 cursor-pointer transition duration-300 " +
                              "text-sm sm:text-lg md:text-xl text-white font-medium " +
                              "bg-gradient-to-r from-emerald-300/70 to-teal-600 hover:from-teal-600 hover:to-teal-700 "
                            }
                          >
                              Đăng nhập
                          </button>
                      </div>
                    </form>
                    
                    <div className={"flex flex-col flex-3 items-center justify-evenly space-y-2 rounded-lg shadow-sm"}>
                        <div className={"flex flex-col items-center w-full space-y-2 border-b-2 border-gray-200"}>
                            <p className={"text-xs sm:text-sm md:text-base text-zinc-500 text-center"}>
                                Đăng nhập khác
                            </p>
                            <Image
                              src={"https://yt3.ggpht.com/ytc/AMLnZu_31rROBnB8bq9EJfk82OnclHISQ3Hrx6i1oWLai5o=s900-c-k-c0x00ffffff-no-rj"}
                              alt={"Google Icon"}
                              onClick={() => window.location.href = "/register"}
                              className={"rounded-full shadow-lg md:w-10 md:h-10 mb-2 cursor-pointer hover:opacity-75 transition duration-300"}
                              layout={"intrinsic"}
                              height={40}
                              width={40}
                              priority
                            />
                        </div>
                        <div className={"flex flex-col space-y-2 " +
                          "text-xs sm:text-sm md:text-base text-zinc-500 text-center"}
                        >
                            <Link
                              href={"/register"}
                              className={"hover:text-blue-800 text-xs sm:text-sm md:text-base text-zinc-500 text-center"}
                            >
                                Đăng kí ngay
                            </Link>
                            <Link
                              href={"/forgot-password"}
                              className={"hover:text-blue-800 text-xs sm:text-sm md:text-base text-zinc-500 text-center"}
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>
                    </div>
              </div>
            </div>
        </div>
    );
};

export default Login;