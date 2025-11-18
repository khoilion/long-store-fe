export interface ProductElm {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    discount: number;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface RegisterType {
    username: string;
    password: string;
}

export interface LoginType {
    username: string;
    password: string;
}

export interface EditCategoryType {
    id: string;
    name: string;
    description: string;
}

export interface CreateCategoryType {
    name: string;
    description: string;
}

export interface ProductType {
    id: string;
    name: string;
    description?: string;
    status: string;
    price: number;
    discount: number;
    quantity: number;
    images: string[];
    category: {
        name: string;
        id: string;
    };
    categoryProductId?: string;
}

export interface EditProductRequest {
    name: string;
    status: string;
    description: string;
    price: number;
    discount: number;
    quantity: string;
    categoryProductId: string;
    images: string;
}

export interface CreateProductType {
    "name": string,
    "status": string,
    "description": string,
    "price": number,
    "discount": number,
    "quantity": string,
    "categoryProductId": string,
    "images": string
}

export interface AddToCardType {
    "productId": string,
    "quantity": string,
}

export interface ProductFilters {
    categoryId?: string;
    status?: string;
    name?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
}

export interface ProductDetailsProps {
    productId: string
}

export interface RegisterType {
    username: string;
    password: string;
}

export interface LoginType {
    username: string;
    password: string;
}