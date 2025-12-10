"use client";
import React, {useEffect, useState} from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Image from "next/image";
import RecentlyViewdItems from "./RecentlyViewd";
import {useAppSelector} from "@/redux/store";

const ShopDetails = () => {
    const [previewImg, setPreviewImg] = useState(0);
    const [storage, setStorage] = useState("gb128");
    const [activeTab, setActiveTab] = useState("tabTwo");

    const storages = [
        {
            id: "gb128",
            title: "128 GB",
        },
        {
            id: "gb256",
            title: "256 GB",
        },
        {
            id: "gb512",
            title: "521 GB",
        },
    ];

    const tabs = [
        {
            id: "tabTwo",
            title: "Thông tin bổ sung",
        }
    ];

    const alreadyExist = localStorage.getItem("productDetails");
    const productFromStorage = useAppSelector(
        (state) => state.productDetailsReducer.value
    );

    const product = alreadyExist ? JSON.parse(alreadyExist) : productFromStorage;

    useEffect(() => {
        localStorage.setItem("productDetails", JSON.stringify(product));
    }, [product]);

    console.log(product);

    return (
        <>
            <Breadcrumb title={"Chi tiết sản phẩm"} pages={["Chi tiết"]}/>

            {product.title === "" ? (
                "Please add product"
            ) : (
                <>
                    <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28">
                        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-17.5">
                                <div className="lg:max-w-[570px] w-full">
                                    <div
                                        className="lg:min-h-[512px] rounded-lg shadow-1 bg-gray-2 p-4 sm:p-7.5 relative flex items-center justify-center">
                                        <div>
                                            <Image
                                                src={product.imgs?.previews[previewImg] || '/default-image.jpg'}
                                                alt="products-details"
                                                width={400}
                                                height={400}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap sm:flex-nowrap gap-4.5 mt-6">
                                        {product.imgs?.thumbnails.map((item, key) => (
                                            <button
                                                onClick={() => setPreviewImg(key)}
                                                key={key}
                                                className={`flex items-center justify-center w-15 sm:w-25 h-15 sm:h-25 overflow-hidden rounded-lg bg-gray-2 shadow-1 ease-out duration-200 border-2 hover:border-blue ${
                                                    key === previewImg
                                                        ? "border-blue"
                                                        : "border-transparent"
                                                }`}
                                            >
                                                <Image
                                                    width={50}
                                                    height={50}
                                                    src={item}
                                                    alt="thumbnail"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* <!-- product content --> */}
                                <div className="max-w-[539px] w-full">
                                    {product.discount > 0 && (
                                        <span
                                            className="inline-block text-custom-xs font-medium text-white py-1 px-3 bg-green mb-6.5">
                                          GIẢM ĐẾN {product.discount} %
                                        </span>
                                    )}
                                    <div className="flex items-center justify-between mb-3">
                                        <h2 className="font-semibold text-xl sm:text-2xl xl:text-custom-3 text-dark">
                                            {product.title}
                                        </h2>
                                    </div>

                                    <h3 className="font-medium text-custom-1 mb-4.5">
                                        <span className="text-sm sm:text-base text-dark">
                                          Price: ${product.price}
                                        </span>
                                        {" "}
                                        <span className="line-through">
                                            ${product.discountedPrice}{" "}
                                        </span>
                                    </h3>
                                    <form onSubmit={(e) => e.preventDefault()}>
                                        <div className="flex flex-col gap-4.5 border-y border-gray-3 mt-7.5 mb-9 py-9">
                                            {/* <!-- details item --> */}
                                            <div className="flex items-center gap-4">
                                                <div className="min-w-[65px]">
                                                    <h4 className="font-medium text-dark">Storage:</h4>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    {storages.map((item, key) => (
                                                        <label
                                                            key={key}
                                                            htmlFor={item.id}
                                                            className="flex cursor-pointer select-none items-center"
                                                        >
                                                            <div className="relative">
                                                                <input
                                                                    type="checkbox"
                                                                    name="storage"
                                                                    id={item.id}
                                                                    className="sr-only"
                                                                    onChange={() => setStorage(item.id)}
                                                                />

                                                                <div
                                                                    className={`mr-2 flex h-4 w-4 items-center justify-center rounded border ${
                                                                        storage === item.id
                                                                            ? "border-blue bg-blue"
                                                                            : "border-gray-4"
                                                                    } `}
                                                                >
                                                                  <span
                                                                      className={
                                                                          storage === item.id
                                                                              ? "opacity-100"
                                                                              : "opacity-0"
                                                                      }
                                                                  >
                                                                    <svg
                                                                        width="24"
                                                                        height="24"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                      <rect
                                                                          x="4"
                                                                          y="4.00006"
                                                                          width="16"
                                                                          height="16"
                                                                          rx="4"
                                                                          fill="#3C50E0"
                                                                      />
                                                                      <path
                                                                          fillRule="evenodd"
                                                                          clipRule="evenodd"
                                                                          d="M16.3103 9.25104C16.471 9.41178 16.5612 9.62978 16.5612 9.85707C16.5612 10.0844 16.471 10.3024 16.3103 10.4631L12.0243 14.7491C11.8635 14.9098 11.6455 15.0001 11.4182 15.0001C11.191 15.0001 10.973 14.9098 10.8122 14.7491L8.24062 12.1775C8.08448 12.0158 7.99808 11.7993 8.00003 11.5745C8.00199 11.3498 8.09214 11.1348 8.25107 10.9759C8.41 10.8169 8.62499 10.7268 8.84975 10.7248C9.0745 10.7229 9.29103 10.8093 9.4527 10.9654L11.4182 12.931L15.0982 9.25104C15.2589 9.09034 15.4769 9.00006 15.7042 9.00006C15.9315 9.00006 16.1495 9.09034 16.3103 9.25104Z"
                                                                          fill="white"
                                                                      />
                                                                    </svg>
                                                                  </span>
                                                                </div>
                                                            </div>
                                                            {item.title}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="overflow-hidden bg-gray-2 py-20">
                        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                            {/* <!--== tab header start ==--> */}
                            <div
                                className="flex flex-wrap items-center bg-white rounded-[10px] shadow-1 gap-5 xl:gap-12.5 py-4.5 px-4 sm:px-6">
                                {tabs.map((item, key) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`font-medium lg:text-lg ease-out duration-200 hover:text-blue relative before:h-0.5 before:bg-blue before:absolute before:left-0 before:bottom-0 before:ease-out before:duration-200 hover:before:w-full ${
                                            activeTab === item.id
                                                ? "text-blue before:w-full"
                                                : "text-dark before:w-0"
                                        }`}
                                    >
                                        {item.title}
                                    </button>
                                ))}
                            </div>
                            <div>
                                <div
                                    className={`rounded-xl bg-white shadow-1 p-4 sm:p-6 mt-10 ${
                                        activeTab === "tabTwo" ? "block" : "hidden"
                                    }`}
                                >
                                    {product.specifications ? (
                                        <div
                                            className="specifications-content"
                                            dangerouslySetInnerHTML={{__html: product.specifications}}
                                        />
                                    ) : (
                                        <p className="text-gray-500">Không có thông tin bổ sung</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    <RecentlyViewdItems/>
                </>
            )}
        </>
    );
};

export default ShopDetails;