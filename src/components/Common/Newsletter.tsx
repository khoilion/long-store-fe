"use client";

import React, {useState} from "react";
import Image from "next/image";
import toast from "react-hot-toast";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubscribe = (event) => {
        event.preventDefault();
        if (!validateEmail(email)) {
            setIsValidEmail(false);
            toast.error("Please enter a valid email address.");
            return;
        }

        try {
            toast.success("Đã đăng ký nhận bản tin !");
            setEmail("");
            setIsValidEmail(true);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <section className="overflow-hidden">
            <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
                <div className="relative z-1 overflow-hidden rounded-xl">
                    <Image
                        src="/images/shapes/newsletter-bg.jpg"
                        alt="background illustration"
                        className="absolute -z-1 w-full h-full left-0 top-0 rounded-xl"
                        width={1170}
                        height={200}
                    />
                    <div
                        className="absolute -z-1 max-w-[523px] max-h-[243px] w-full h-full right-0 top-0 bg-gradient-1"/>
                    <div
                        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 px-4 sm:px-7.5 xl:pl-12.5 xl:pr-14 py-11">
                        <div className="max-w-[491px] w-full">
                            <h2 className="max-w-[399px] text-white font-bold text-lg sm:text-xl xl:text-heading-4 mb-3">
                                Đừng bỏ lỡ xu hướng và ưu đãi mới nhất
                            </h2>
                            <p className="text-white">
                                Đăng ký để nhận tin tức về các ưu đãi và mã giảm giá mới nhất
                            </p>
                        </div>

                        <div className="max-w-[477px] w-full">
                            <form onSubmit={handleSubscribe}>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Nhập email của bạn"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setIsValidEmail(true);
                                        }}
                                        className={`w-full bg-gray-1 border ${!isValidEmail ? 'border-red-500' : 'border-gray-3'} outline-none rounded-md placeholder:text-dark-4 py-3 px-5`}
                                    />
                                    <button
                                        type="submit"
                                        disabled={!email}
                                        className={`inline-flex justify-center py-3 px-7 text-white bg-blue font-medium rounded-md ease-out duration-200 ${!email ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-dark"}`}
                                    >
                                        Subscribe
                                    </button>
                                </div>
                                {!isValidEmail && (
                                    <p className="text-red-500 mt-2">Vui lòng nhập định dạng email hợp lệ !</p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;