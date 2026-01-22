import { useQuery } from '@tanstack/react-query';
import api from '@/api/axios-config';
import { Product } from '@/types';

export const useProducts = (params?: any) => {
    return useQuery({
        queryKey: ['products', params],
        queryFn: async () => {
            const response = await api.get('/products', { params });
            return response.data.data as Product[];
        },
    });
};

export const useProduct = (id: string) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const response = await api.get(`/products/${id}`);
            return response.data.data as Product;
        },
        enabled: !!id,
    });
};
