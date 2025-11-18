import {
    AddToCardType,
    CreateCategoryType,
    CreateProductType,
    EditCategoryType,
    EditProductRequest, LoginType,
    ProductFilters, RegisterType
} from "@/interface";
import axiosClient from "@/lib/api/configAxiosClient";

export const StoreApi = {
    register: async (data: RegisterType): Promise<void> => {
        const url = "/api/users/register";
        return await axiosClient.post(url, data);
    },

    login: async (data: LoginType): Promise<any> => {
        const url = "/api/users/login";
        return await axiosClient.post(url, data);
    },

    me: async (): Promise<any> => {
        const url = "/api/users/me";
        return await axiosClient.get(url);
    },

    getAllCategoryProduct: async (): Promise<any> => {
        const url = '/api/categoryProduct/';
        return await axiosClient.get(url)
    },

    getProductById: async (id: string): Promise<any> => {
        const url = `/api/products/${id}`;
        return await axiosClient.get(url)
    },

    deleteCategory: async (id: string): Promise<void> => {
        const url = `/api/categoryProduct/${id}`;
        return await axiosClient.delete(url);
    },

    editCategory: async (data: EditCategoryType): Promise<void> => {
        const url = `api/categoryProduct/${data.id}`;
        return await axiosClient.put(url, data);
    },

    createCategory: async (data: CreateCategoryType): Promise<void> => {
        const url = `/api/categoryProduct/`;
        return await axiosClient.post(url, data);
    },

    getAllProducts: async (filters: ProductFilters = {}): Promise<any> => {
        const url = '/api/products/';
        const params: any = {};

        Object.keys(filters).forEach(key => {
            const value = filters[key as keyof ProductFilters];
            if (typeof value === 'boolean') {
                params[key] = value;
            } else if (value !== undefined && value !== null && value !== '') {
                params[key] = value;
            }
        });
        try {
            const response = await axiosClient.get(url, {params});

            return response;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    deleteProduct: async (id: string): Promise<void> => {
        const url = `/api/products/${id}`;
        return await axiosClient.delete(url);
    },

    editProduct: async (productId: string, data: EditProductRequest): Promise<void> => {
        const url = `/api/products/${productId}`;
        return await axiosClient.put(url, data);
    },

    createProduct: async (data: CreateProductType): Promise<void> => {
        const url = '/api/products/';
        return await axiosClient.post(url, data);
    },

    getAllCart: async (): Promise<any> => {
        const url = '/api/cart/';
        return await axiosClient.get(url)
    },

    removeItemCart: async (productId: string): Promise<any> => {
        const url = `/api/cart/remove/${productId}`;
        return await axiosClient.delete(url)
    },

    addToCart: async (data: AddToCardType): Promise<any> => {
        const url = '/api/cart/add';
        return await axiosClient.post(url, data)
    }
}