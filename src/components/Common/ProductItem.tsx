"use client";

import React from "react";
import Image from "next/image";
import {Product} from "@/types/product";
import {useModalContext} from "@/app/context/QuickViewModalContext";
import {updateQuickView} from "@/redux/features/quickView-slice";
import {updateproductDetails} from "@/redux/features/product-details";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";
import Link from "next/link";
import {FaEye} from "react-icons/fa";
import {CiHeart} from "react-icons/ci";

const ProductItem = ({item}: { item: Product }) => {
    const {openModal} = useModalContext();

    const dispatch = useDispatch<AppDispatch>();

    // update the QuickView state
    const handleQuickViewUpdate = () => {
        dispatch(updateQuickView({...item}));
    };

    // add to cart
    const handleAddToCart = () => {
        console.log("addToCart");
    };

    const handleItemToWishList = () => {
        console.log("itemToWishList");
    };

    const handleProductDetails = () => {
        dispatch(updateproductDetails({...item}));
    };

    const hasDifferentPrices = item.maxPrice && item.price !== item.maxPrice;

    return (
        <div className="group">
            <div
                className="relative overflow-hidden flex items-center justify-center rounded-lg  min-h-[270px] mb-4">
                <Image src={item.imgs.previews[0]} alt="" width={250} height={250}/>

                <div
                    className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
                    <button
                        onClick={() => {
                            openModal();
                            handleQuickViewUpdate();
                        }}
                        id="newOne"
                        aria-label="button for quick view"
                        className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue"
                    >
                        <FaEye/>
                    </button>

                    <button
                        onClick={() => handleAddToCart()}
                        className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-blue text-white ease-out duration-200 hover:bg-blue-dark"
                    >
                        Add to cart
                    </button>

                    <button
                        onClick={() => handleItemToWishList()}
                        aria-label="button for favorite select"
                        id="favOne"
                        className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue"
                    >
                        <CiHeart/>
                    </button>
                </div>
            </div>

            <h3
                className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5"
                onClick={() => handleProductDetails()}
            >
                <Link href="/shop-details"> {item.title} </Link>
            </h3>

            <div className="flex items-center gap-2 font-medium text-lg">
                {item.discount && item.discount > 0 ? (
                    <>
                        <span className="text-red-600">
                            {hasDifferentPrices && <span className="text-sm mr-1">Từ</span>}
                            {item.discountedPrice.toLocaleString('vi-VN')}₫
                        </span>
                        <span className="text-dark-4 line-through text-sm">
                            {item.price.toLocaleString('vi-VN')}₫
                        </span>
                        <span className="bg-red-600 text-red text-xs px-2 py-0.5 rounded">
                            [ -{item.discount}% ]
                        </span>
                    </>
                ) : (
                    <span className="text-dark">
                        {hasDifferentPrices && <span className="text-sm mr-1">Từ</span>}
                        {item.price.toLocaleString('vi-VN')}₫
                    </span>
                )}
            </div>
        </div>
    );
};

export default ProductItem;