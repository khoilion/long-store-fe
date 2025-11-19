"use client";

import React, {useState} from "react";
import Breadcrumb from "../Common/Breadcrumb";
import {SiNamecheap} from "react-icons/si";
import {FaPhoneAlt} from "react-icons/fa";
import {FaLocationDot} from "react-icons/fa6";
import {MdEmail} from "react-icons/md";
import {toast} from "react-hot-toast";

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);

    const storeInfo = [
        {icon: <SiNamecheap size={20}/>, text: "Tên cửa hàng: Long Store"},
        {icon: <FaPhoneAlt size={20}/>, text: "Điện thoại: 1234 567890"},
        {icon: <MdEmail size={20}/>, text: "Email: zluffyz2002@gmail.com"},
        {icon: <FaLocationDot size={20}/>, text: "332 Đ. Nguyễn Trãi, Thanh Xuân, Hà Nội"},
        {icon: <FaLocationDot size={20}/>, text: "161 Đ. Nguyễn Trãi, Thanh Xuân, Hà Nội"},
        {icon: <FaLocationDot size={20}/>, text: "137 P. Minh Khai, Hai Bà Trưng, Hà Nội"},
    ];

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {firstName, lastName, phone, message} = formData;

        if (!firstName || !lastName || !phone || !message) {
            toast.error("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            toast.success("Tin nhắn đã được gửi đến admin thành công!");
            setLoading(false);

            setFormData({
                firstName: '',
                lastName: '',
                phone: '',
                message: '',
            });
        }, 3000);
    };

    const isFormIncomplete = !formData.firstName || !formData.lastName || !formData.phone || !formData.message;

    const mapData = [
        {
            src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4418.486168142864!2d105.80671607584067!3d20.996047988900095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad60b24173a3%3A0xc7a003a668a52c83!2zVMOhbyB6aW4gaMOgIG7hu5lpIC0gMzMyIG5ndXnhu4VuIHRyw6Np!5e1!3m2!1svi!2s!4v1763524990472!5m2!1svi!2s",
            id: 1,
        },
        {
            src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4418.407996873043!2d105.81165067591635!3d20.99868468880951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad3d84a770f9%3A0xb27eaa593aa422de!2sLong%20Store%20-%20161%20Nguy%E1%BB%85n%20Tr%C3%A3i!5e1!3m2!1svi!2s!4v1763525024257!5m2!1svi!2s",
            id: 2,
        },
        {
            src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4418.495731094518!2d105.85224567591635!3d20.995720488911214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad000cc034bb%3A0x79fad99bfef8d94f!2sLong%20Store%20137%20minh%20khai!5e1!3m2!1svi!2s!4v1763524885166!5m2!1svi!2s",
            id: 3,
        },
    ];

    return (
        <>
            <Breadcrumb title={"Liên hệ"} pages={["Liên hệ"]}/>

            <section className="overflow-hidden py-20 bg-gray-2">
                <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                    <div className="flex flex-col xl:flex-row gap-7.5">
                        <div className="xl:max-w-[370px] w-full bg-white rounded-xl shadow-1">
                            <div className="py-5 px-4 sm:px-7.5 border-b border-gray-3">
                                <p className="font-medium text-xl text-dark">
                                    Liên hệ & địa chỉ
                                </p>
                            </div>

                            <div className="p-4 sm:p-7.5">
                                <div className="flex flex-col gap-4">
                                    {storeInfo.map((info, index) => (
                                        <p key={index} className="flex items-center gap-4">
                                            {info.icon}
                                            {info.text}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="xl:max-w-[770px] w-full bg-white rounded-xl shadow-1 p-4 sm:p-7.5 xl:p-10">
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                                    <div className="w-full">
                                        <label htmlFor="firstName" className="block mb-2.5">
                                            Tên <span className="text-red">*</span>
                                        </label>

                                        <input
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            placeholder="Khôi"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                                        />
                                    </div>

                                    <div className="w-full">
                                        <label htmlFor="lastName" className="block mb-2.5">
                                            Họ <span className="text-red">*</span>
                                        </label>

                                        <input
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            placeholder="Vũ"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                                    <div className="w-full">
                                        <label htmlFor="phone" className="block mb-2.5">
                                            Điện thoại
                                        </label>

                                        <input
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            placeholder="Nhập số điện thoại của bạn"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                                        />
                                    </div>
                                </div>

                                <div className="mb-7.5">
                                    <label htmlFor="message" className="block mb-2.5">
                                        Nội dung
                                    </label>

                                    <textarea
                                        name="message"
                                        id="message"
                                        rows={5}
                                        placeholder="Nhập nội dung của bạn"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className={`inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark ${isFormIncomplete || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={isFormIncomplete || loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin h-5 w-5 mr-3 ...">
                                                <circle
                                                    className="border-t-2 border-b-2 border-white border-opacity-50"/>
                                            </svg>
                                            Đang gửi...
                                        </span>
                                    ) : (
                                        "Gửi tin nhắn"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="w-full bg-white rounded-xl shadow-1 mt-6 p-4 flex flex-wrap gap-4">
                        {mapData.map((map) => (
                            <div key={map.id} className="flex-1 min-w-[300px]">
                                <iframe
                                    src={map.src}
                                    width="100%"
                                    height="350"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </>
    );
};

export default Contact;