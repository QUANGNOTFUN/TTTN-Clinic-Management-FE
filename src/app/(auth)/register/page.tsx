"use client";

import {useForm} from "react-hook-form";
import {getErrorMessage} from "@/app/utils/common";
import React, {useEffect} from "react";
import Image from "next/image";
import {Button} from "@mui/material";
import {useRegister} from "@/libs/hooks/auth/useRegister";
import {RegisterForm, RegisterPayload} from "@/types/register";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {VscLoading} from "react-icons/vsc";

const Register = () => {
    const router = useRouter();
    const { register: registerUser, loading, error, success } = useRegister();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>({
      defaultValues: {
        role: "PATIENT"
      }
    });
    
    const onSubmit = async (data: RegisterForm) => {
        if (data.password !== data.confirmPassword) {
            toast.error("Mật khẩu nhập lại không khớp", { toastId: "password-mismatch", });
            return;
        }
        
        try {
            const payload: RegisterPayload = {
                email: data.email,
                password: data.password,
                role: data.role,
            }
            await registerUser(payload);
        } catch (err) {
            toast.error(error, { toastId: "register-error" });
            console.log(err);
        }
    };
    
    useEffect(() => {
        if (success) {
            toast.success("Đăng kí thành công", { toastId: "register-success" });
            router.push("/login");
        }
    }, [router, success]);
    
    if (loading) {
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
                          
                          <div className={"mb-2 md:mb-4"}>
                              <label
                                htmlFor={"confirmPassword"}
                                className={"block indent-4 text-sm sm:text-lg md:text-xl font-bold text-zinc-600 "}
                              >
                                  Nhập lại mật khẩu:
                              </label>
                              <input
                                id="confirmPassword"
                                type="password"
                                {...register("confirmPassword", {
                                    required: "Ô nhập mật khẩu là bắt buộc",
                                    minLength: {
                                        value: 6,
                                        message: "Mật khẩu phải có ít nhất 6 ký tự",
                                    },
                                })}
                                className={`mt-2 block w-full px-4 py-3 border text-xs sm:text-sm md:text-base ${
                                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition duration-200`}
                                placeholder="Nhập mật khẩu"
                              />
                              {errors.confirmPassword && (
                                <p className="mt-1 indent-4 text-xs sm:text-sm md:text-base text-red-500">{getErrorMessage(errors.confirmPassword)}</p>
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
                              Đăng ký tài khoản
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
                          <Button
                            href={"/login"}
                            className={"hover:text-blue-800 text-xs sm:text-sm md:text-base text-zinc-500 text-center"}
                          >
                              Đăng nhập
                          </Button>
                          <Button
                            href={"/forgot-password"}
                            className={"hover:text-blue-800 text-xs sm:text-sm md:text-base text-zinc-500 text-center"}
                          >
                              Quên mật khẩu?
                          </Button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
};
export default Register;

