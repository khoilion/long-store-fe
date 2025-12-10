"use client";

import React, {useEffect, useState} from "react";

import {useModalContext} from "@/app/context/QuickViewModalContext";
import {useAppSelector} from "@/redux/store";
import Image from "next/image";

const QuickViewModal = () => {
    const {isModalOpen, closeModal} = useModalContext();
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState<any>(null);

    // get the product data
    const product = useAppSelector((state) => state.quickViewReducer.value);

    const [activePreview, setActivePreview] = useState(0);

    // Chọn variant đầu tiên khi mở modal
    useEffect(() => {
        if (product.variants && product.variants.length > 0) {
            setSelectedVariant(product.variants[0]);
        }
    }, [product]);

    // add to cart
    const handleAddToCart = () => {
        console.log("addToCart", {
            product,
            selectedVariant,
            quantity
        });
        closeModal();
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (!event.target.closest(".modal-content")) {
                closeModal();
            }
        }

        if (isModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            setQuantity(1);
        };
    }, [isModalOpen, closeModal]);

    // Kiểm tra có nhiều variants với giá khác nhau không
    const hasDifferentPrices = product.maxPrice && product.price !== product.maxPrice;

    // Tính giá hiển thị dựa trên variant được chọn
    const displayPrice = selectedVariant
        ? parseFloat(selectedVariant.price)
        : product.price;

    const displayDiscountedPrice = product.discount > 0
        ? displayPrice * (1 - product.discount / 100)
        : displayPrice;

    return (
        <div
            className={`${
                isModalOpen ? "z-99999" : "hidden"
            } fixed top-0 left-0 overflow-y-auto no-scrollbar w-full h-screen sm:py-20 xl:py-25 2xl:py-[230px] bg-dark/70 sm:px-8 px-4 py-5`}
        >
            <div className="flex items-center justify-center ">
                <div className="w-full max-w-[1100px] rounded-xl shadow-3 bg-white p-7.5 relative modal-content">
                    <button
                        onClick={() => closeModal()}
                        aria-label="button for close modal"
                        className="absolute top-0 right-0 sm:top-6 sm:right-6 flex items-center justify-center w-10 h-10 rounded-full ease-in duration-150 bg-meta text-body hover:text-dark"
                    >
                        <svg
                            className="fill-current"
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M14.3108 13L19.2291 8.08167C19.5866 7.72417 19.5866 7.12833 19.2291 6.77083C19.0543 6.59895 18.8189 6.50262 18.5737 6.50262C18.3285 6.50262 18.0932 6.59895 17.9183 6.77083L13 11.6892L8.08164 6.77083C7.90679 6.59895 7.67142 6.50262 7.42623 6.50262C7.18104 6.50262 6.94566 6.59895 6.77081 6.77083C6.41331 7.12833 6.41331 7.72417 6.77081 8.08167L11.6891 13L6.77081 17.9183C6.41331 18.2758 6.41331 18.8717 6.77081 19.2292C7.12831 19.5867 7.72414 19.5867 8.08164 19.2292L13 14.3108L17.9183 19.2292C18.2758 19.5867 18.8716 19.5867 19.2291 19.2292C19.5866 18.8717 19.5866 18.2758 19.2291 17.9183L14.3108 13Z"
                                fill=""
                            />
                        </svg>
                    </button>

                    <div className="flex flex-wrap items-center gap-12.5">
                        <div className="max-w-[526px] w-full">
                            <div className="flex gap-5">
                                <div className="flex flex-col gap-5">
                                    {product.imgs.thumbnails?.map((img, key) => (
                                        <button
                                            onClick={() => setActivePreview(key)}
                                            key={key}
                                            className={`flex items-center justify-center w-20 h-20 overflow-hidden rounded-lg border ease-out duration-200 hover:border-2 hover:border-blue ${
                                                activePreview === key && "border-2 border-blue"
                                            }`}
                                        >
                                            <Image
                                                src={img || ""}
                                                alt="thumbnail"
                                                width={61}
                                                height={61}
                                                className="aspect-square"
                                            />
                                        </button>
                                    ))}
                                </div>

                                <div
                                    className="relative z-1 overflow-hidden flex items-center justify-center w-full sm:min-h-[508px]  rounded-lg border border-gray-3">
                                    <Image
                                        src={product?.imgs?.previews?.[activePreview] || '/default-image.jpg'}
                                        alt="products-details"
                                        width={400}
                                        height={400}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="max-w-[445px] w-full">
                            {/* Badge giảm giá */}
                            {product.discount > 0 && (
                                <span
                                    className="inline-block text-custom-xs font-medium text-white py-1 px-3 bg-green mb-6.5">
                                    GIẢM ĐẾN {product.discount}%
                                </span>
                            )}

                            <h3 className="font-semibold text-xl xl:text-heading-5 text-dark mb-4">
                                {product.title}
                            </h3>

                            {/* Trạng thái sản phẩm */}
                            <div className="flex flex-wrap items-center gap-5 mb-6">
                                <div className="flex items-center gap-2">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_375_9221)">
                                            <path
                                                d="M10 0.5625C4.78125 0.5625 0.5625 4.78125 0.5625 10C0.5625 15.2188 4.78125 19.4688 10 19.4688C15.2188 19.4688 19.4688 15.2188 19.4688 10C19.4688 4.78125 15.2188 0.5625 10 0.5625ZM10 18.0625C5.5625 18.0625 1.96875 14.4375 1.96875 10C1.96875 5.5625 5.5625 1.96875 10 1.96875C14.4375 1.96875 18.0625 5.59375 18.0625 10.0312C18.0625 14.4375 14.4375 18.0625 10 18.0625Z"
                                                fill="#22AD5C"
                                            />
                                            <path
                                                d="M12.6875 7.09374L8.9688 10.7187L7.2813 9.06249C7.00005 8.78124 6.56255 8.81249 6.2813 9.06249C6.00005 9.34374 6.0313 9.78124 6.2813 10.0625L8.2813 12C8.4688 12.1875 8.7188 12.2812 8.9688 12.2812C9.2188 12.2812 9.4688 12.1875 9.6563 12L13.6875 8.12499C13.9688 7.84374 13.9688 7.40624 13.6875 7.12499C13.4063 6.84374 12.9688 6.84374 12.6875 7.09374Z"
                                                fill="#22AD5C"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_375_9221">
                                                <rect width="20" height="20" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    <span className="font-medium text-dark">
                                        {product.status === 'IN_STOCK' ? 'Còn hàng' : 'Hết hàng'}
                                    </span>
                                </div>
                            </div>

                            {/* Mô tả sản phẩm */}
                            <p className="text-body-color mb-6">
                                {product.description || 'Chưa có mô tả sản phẩm'}
                            </p>

                            {/* Chọn dung lượng */}
                            {product.variants && product.variants.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="font-semibold text-lg text-dark mb-3">
                                        Dung lượng
                                    </h4>
                                    <div className="flex flex-wrap gap-3">
                                        {product.variants.map((variant: any, index: number) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedVariant(variant)}
                                                className={`px-4 py-2 rounded-md border-2 font-medium transition-all ${
                                                    selectedVariant?.storage === variant.storage
                                                        ? 'border-blue bg-blue text-white'
                                                        : 'border-gray-3 bg-white text-dark hover:border-blue'
                                                } ${variant.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                disabled={variant.quantity === 0}
                                            >
                                                {variant.storage}
                                                {variant.quantity === 0 && ' (Hết hàng)'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-wrap justify-between gap-5 mb-7.5">
                                {/* Giá */}
                                <div>
                                    <h4 className="font-semibold text-lg text-dark mb-3.5">
                                        Giá
                                    </h4>

                                    <span className="flex items-center gap-2">
                                        {product.discount > 0 ? (
                                            <>
                                                <span className="font-semibold text-red-600 text-xl xl:text-heading-4">
                                                    {displayDiscountedPrice.toLocaleString('vi-VN')}₫
                                                </span>
                                                <span
                                                    className="font-medium text-dark-4 text-lg xl:text-2xl line-through">
                                                    {displayPrice.toLocaleString('vi-VN')}₫
                                                </span>
                                            </>
                                        ) : (
                                            <span className="font-semibold text-dark text-xl xl:text-heading-4">
                                                {hasDifferentPrices && <span className="text-sm mr-1">Từ</span>}
                                                {displayPrice.toLocaleString('vi-VN')}₫
                                            </span>
                                        )}
                                    </span>
                                </div>

                                {/* Số lượng */}
                                <div>
                                    <h4 className="font-semibold text-lg text-dark mb-3.5">
                                        Số lượng
                                    </h4>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                            aria-label="button for remove product"
                                            className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2 text-dark ease-out duration-200 hover:text-blue"
                                            disabled={quantity <= 1}
                                        >
                                            <svg
                                                className="fill-current"
                                                width="16"
                                                height="2"
                                                viewBox="0 0 16 2"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M-8.548e-08 0.977778C-3.82707e-08 0.437766 0.437766 3.82707e-08 0.977778 8.548e-08L15.0222 1.31328e-06C15.5622 1.36049e-06 16 0.437767 16 0.977779C16 1.51779 15.5622 1.95556 15.0222 1.95556L0.977778 1.95556C0.437766 1.95556 -1.32689e-07 1.51779 -8.548e-08 0.977778Z"
                                                    fill=""
                                                />
                                            </svg>
                                        </button>

                                        <span
                                            className="flex items-center justify-center w-20 h-10 rounded-[5px] border border-gray-4 bg-white font-medium text-dark">
                                            {quantity}
                                        </span>

                                        <button
                                            onClick={() => {
                                                const maxQty = selectedVariant?.quantity || 0;
                                                if (quantity < maxQty) {
                                                    setQuantity(quantity + 1);
                                                }
                                            }}
                                            aria-label="button for add product"
                                            className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2 text-dark ease-out duration-200 hover:text-blue"
                                            disabled={quantity >= (selectedVariant?.quantity || 0)}
                                        >
                                            <svg
                                                className="fill-current"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M8.08889 0C8.6289 2.36047e-08 9.06667 0.437766 9.06667 0.977778L9.06667 15.0222C9.06667 15.5622 8.6289 16 8.08889 16C7.54888 16 7.11111 15.5622 7.11111 15.0222L7.11111 0.977778C7.11111 0.437766 7.54888 -2.36047e-08 8.08889 0Z"
                                                    fill=""
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M0 7.91111C4.72093e-08 7.3711 0.437766 6.93333 0.977778 6.93333L15.0222 6.93333C15.5622 6.93333 16 7.3711 16 7.91111C16 8.45112 15.5622 8.88889 15.0222 8.88889L0.977778 8.88889C0.437766 8.88889 -4.72093e-08 8.45112 0 7.91111Z"
                                                    fill=""
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Hiển thị số lượng còn lại */}
                                    {selectedVariant && (
                                        <p className="text-sm text-body-color mt-2">
                                            Còn lại: {selectedVariant.quantity} sản phẩm
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-wrap items-center gap-4">
                                <button
                                    disabled={!selectedVariant || selectedVariant.quantity === 0 || quantity === 0}
                                    onClick={() => handleAddToCart()}
                                    className={`inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    Thêm vào giỏ hàng
                                </button>

                                <button
                                    className={`inline-flex items-center gap-2 font-medium text-white bg-dark py-3 px-6 rounded-md ease-out duration-200 hover:bg-opacity-95`}
                                >
                                    <svg
                                        className="fill-current"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M4.68698 3.68688C3.30449 4.31882 2.29169 5.82191 2.29169 7.6143C2.29169 9.44546 3.04103 10.8569 4.11526 12.0665C5.00062 13.0635 6.07238 13.8897 7.11763 14.6956C7.36588 14.8869 7.61265 15.0772 7.85506 15.2683C8.29342 15.6139 8.68445 15.9172 9.06136 16.1374C9.43847 16.3578 9.74202 16.4584 10 16.4584C10.258 16.4584 10.5616 16.3578 10.9387 16.1374C11.3156 15.9172 11.7066 15.6139 12.145 15.2683C12.3874 15.0772 12.6342 14.8869 12.8824 14.6956C13.9277 13.8897 14.9994 13.0635 15.8848 12.0665C16.959 10.8569 17.7084 9.44546 17.7084 7.6143C17.7084 5.82191 16.6955 4.31882 15.3131 3.68688C13.97 3.07295 12.1653 3.23553 10.4503 5.01733C10.3325 5.13974 10.1699 5.20891 10 5.20891C9.83012 5.20891 9.66754 5.13974 9.54972 5.01733C7.83474 3.23553 6.03008 3.07295 4.68698 3.68688ZM10 3.71573C8.07331 1.99192 5.91582 1.75077 4.16732 2.55002C2.32061 3.39415 1.04169 5.35424 1.04169 7.6143C1.04169 9.83557 1.9671 11.5301 3.18062 12.8966C4.15241 13.9908 5.34187 14.9067 6.39237 15.7155C6.63051 15.8989 6.8615 16.0767 7.0812 16.2499C7.50807 16.5864 7.96631 16.9453 8.43071 17.2166C8.8949 17.4879 9.42469 17.7084 10 17.7084C10.5754 17.7084 11.1051 17.4879 11.5693 17.2166C12.0337 16.9453 12.492 16.5864 12.9188 16.2499C13.1385 16.0767 13.3695 15.8989 13.6077 15.7155C14.6582 14.9067 15.8476 13.9908 16.8194 12.8966C18.0329 11.5301 18.9584 9.83557 18.9584 7.6143C18.9584 5.35424 17.6794 3.39415 15.8327 2.55002C14.0842 1.75077 11.9267 1.99192 10 3.71573Z"
                                            fill=""
                                        />
                                    </svg>
                                    Yêu thích
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal