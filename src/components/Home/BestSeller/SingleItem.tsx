"use client";
import React from "react";
import {Product} from "@/types/product";
import {useModalContext} from "@/app/context/QuickViewModalContext";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {updateQuickView} from "@/redux/features/quickView-slice";
import {addItemToCart} from "@/redux/features/cart-slice";
import Image from "next/image";
import Link from "next/link";
import {addItemToWishlist} from "@/redux/features/wishlist-slice";
import {FaEye} from "react-icons/fa";
import {CiHeart, CiShoppingCart} from "react-icons/ci";

const SingleItem = ({item}: { item: Product }) => {
    const {openModal} = useModalContext();
    const dispatch = useDispatch<AppDispatch>();

    const handleQuickViewUpdate = () => {
        dispatch(updateQuickView({...item}));
    };

    const handleAddToCart = () => {
        dispatch(
            addItemToCart({
                ...item,
                quantity: 1,
            })
        );
    };

    const handleItemToWishList = () => {
        dispatch(
            addItemToWishlist({
                ...item,
                status: "available",
                quantity: 1,
            })
        );
    };

    const buttons = [
        {
            onClick: () => {
                handleQuickViewUpdate();
                openModal();
            },
            ariaLabel: "button for quick view",
            id: "bestOne",
            icon: <FaEye/>
        },
        {
            onClick: () => handleAddToCart(),
            ariaLabel: "button for add to cart",
            id: "addCartOne",
            icon: <CiShoppingCart/>
        },
        {
            onClick: () => handleItemToWishList(),
            ariaLabel: "button for add to fav",
            id: "addFavOne",
            icon: <CiHeart/>
        }
    ];

    return (
        <div className="group">
            <div className="relative overflow-hidden rounded-lg bg-[#F6F7FB] min-h-[403px]">
                <div className="text-center px-4 py-7.5">
                    <h3 className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5">
                        <Link href="/shop-details"> {item.title} </Link>
                    </h3>
                    <span className="flex items-center justify-center gap-2 font-medium text-lg">
                        <span className="text-dark">${item.discountedPrice}</span>
                        <span className="text-dark-4 line-through">${item.price}</span>
                    </span>
                </div>
                <div className="flex justify-center items-center">
                    <Image src={item.imgs.previews[0]} alt="" width={280} height={280}/>
                </div>
                <div
                    className="absolute right-0 bottom-0 translate-x-full u-w-full flex flex-col gap-2 p-5.5 ease-linear duration-300 group-hover:translate-x-0">
                    {buttons.map((button, index) => (
                        <button
                            key={index}
                            onClick={button.onClick}
                            aria-label={button.ariaLabel}
                            id={button.id}
                            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-white hover:bg-blue"
                        >
                            {button.icon}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SingleItem;
