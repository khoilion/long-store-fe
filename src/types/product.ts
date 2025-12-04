export interface Product {
    id: string;
    title: string;
    price: number;
    maxPrice?: number;
    discountedPrice: number;
    maxDiscountedPrice?: number;
    discount?: number;
    imgs: {
        thumbnails: string[];
        previews: string[];
    };
    category: any;
    description: string;
    specifications: string;
    status: string;
    variants?: Array<{
        storage: string;
        price: number;
        quantity: number;
    }>;
    quantity?: number;
}