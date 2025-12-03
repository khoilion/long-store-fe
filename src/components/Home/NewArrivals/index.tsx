"use client"

import React, {useEffect, useState} from "react";
import Link from "next/link";
import ProductItem from "@/components/Common/ProductItem";
import {StoreApi} from "@/lib/api/serviceStoreApi";
import {Product} from "@/types/product";

const NewArrival = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const handleGetAllProducts = async () => {
        try {
            setLoading(true);
            const res = await StoreApi.getAllProducts({
                page: 1,
                limit: 8
            });
            console.log(res, "okla");
            if (res?.data) {
                const mappedProducts: Product[] = res.data.map((item: any) => ({
                    id: item.id,
                    title: item.name || '',
                    price: parseFloat(item.price) || 0,
                    discountedPrice: parseFloat(item.price) || 0,
                    imgs: {
                        thumbnails: item.images && item.images.length > 0
                            ? [item.images[0], item.images[1] || item.images[0]]
                            : ['/images/products/product-1-sm-1.png', '/images/products/product-1-sm-2.png'],
                        previews: item.images && item.images.length > 0
                            ? [item.images[0], item.images[1] || item.images[0]]
                            : ['/images/products/product-1-bg-1.png', '/images/products/product-1-bg-2.png'],
                    },
                    category: item.category,
                    description: item.description,
                    specifications: item.specifications,
                    status: item.status,
                }));

                setProducts(mappedProducts);
            }
        } catch (error: any) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleGetAllProducts();
    }, [])

    return (
        <section className="overflow-hidden pb-17.5 pt-12.5 lg:pb-22.5 xl:pb-27.5">
            <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
                <div className="mb-12.5 flex flex-wrap items-center justify-between gap-8">
                    <div>
                        <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
                          <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                                d="M3.11826 15.4622C4.11794 16.6668 5.97853 16.6668 9.69971 16.6668H10.3007C14.0219 16.6668 15.8825 16.6668 16.8821 15.4622M3.11826 15.4622C2.11857 14.2577 2.46146 12.429 3.14723 8.77153C3.63491 6.17055 3.87875 4.87006 4.8045 4.10175M3.11826 15.4622C3.11826 15.4622 3.11826 15.4622 3.11826 15.4622ZM16.8821 15.4622C17.8818 14.2577 17.5389 12.429 16.8532 8.77153C16.3655 6.17055 16.1216 4.87006 15.1959 4.10175M16.8821 15.4622C16.8821 15.4622 16.8821 15.4622 16.8821 15.4622ZM15.1959 4.10175C14.2701 3.33345 12.947 3.33345 10.3007 3.33345H9.69971C7.0534 3.33345 5.73025 3.33345 4.8045 4.10175M15.1959 4.10175C15.1959 4.10175 15.1959 4.10175 15.1959 4.10175ZM4.8045 4.10175C4.8045 4.10175 4.8045 4.10175 4.8045 4.10175Z"
                                stroke="#3C50E0"
                                strokeWidth="1.5"
                            />
                            <path
                                d="M7.64258 6.66678C7.98578 7.63778 8.91181 8.33345 10.0003 8.33345C11.0888 8.33345 12.0149 7.63778 12.3581 6.66678"
                                stroke="#3C50E0"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                          </svg>
                          Tuần này
                        </span>
                        <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
                            Hàng mới về
                        </h2>
                    </div>
                    <div>
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2.5 font-medium ease-out duration-200 hover:text-blue"
                        >
                            Xem tất cả !
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7.5">
                    {loading ? (
                        // Loading skeleton
                        Array.from({length: 8}).map((_, index) => (
                            <div key={index} className="animate-pulse">
                                <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                                <div className="bg-gray-200 h-4 rounded w-2/3"></div>
                            </div>
                        ))
                    ) : (
                        products.map((item) => (
                            <ProductItem key={item.id} item={item}/>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default NewArrival;