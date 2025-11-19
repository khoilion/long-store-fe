import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
import React from "react";

const Signup = () => {
    return (
        <>
            <Breadcrumb title={"Đăng ký"} pages={["Đăng ký"]}/>
            <section className="overflow-hidden py-20 bg-gray-2">
                <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                    <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
                        <div className="text-center mb-11">
                            <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                                Tạo tài khoản
                            </h2>
                            <p>Nhập thông tin chi tiết của bạn bên dưới</p>
                        </div>


                        <span className="relative z-1 block font-medium text-center mt-4.5">
              <span className="block absolute -z-1 left-0 top-1/2 h-px w-full bg-gray-3"></span>
              <span className="inline-block px-3 bg-white"></span>
            </span>

                        <div className="mt-5.5">
                            <form>
                                <div className="mb-5">
                                    <label htmlFor="name" className="block mb-2.5">
                                        Họ và tên đầy đủ <span className="text-red">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Nhập tên đầy đủ của bạn"
                                        className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                                    />
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="email" className="block mb-2.5">
                                        Email Address <span className="text-red">*</span>
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Nhập địa chỉ email của bạn"
                                        className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                                    />
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="password" className="block mb-2.5">
                                        Mật khẩu <span className="text-red">*</span>
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Nhập mật khẩu của bạn"
                                        autoComplete="on"
                                        className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                                    />
                                </div>

                                <div className="mb-5.5">
                                    <label htmlFor="re-type-password" className="block mb-2.5">
                                        Nhập lại mật khẩu<span className="text-red">*</span>
                                    </label>

                                    <input
                                        type="password"
                                        name="re-type-password"
                                        id="re-type-password"
                                        placeholder="Nhập lại mật khẩu của bạn"
                                        autoComplete="on"
                                        className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
                                >
                                    Tạo tài khoản
                                </button>

                                <p className="text-center mt-6">
                                    Bạn đã có tài khoản?
                                    <Link
                                        href="/signin"
                                        className="text-dark ease-out duration-200 hover:text-blue pl-2"
                                    >
                                        Đăng nhập ngay
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Signup;
