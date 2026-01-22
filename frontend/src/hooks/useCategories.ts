import { useQuery } from '@tanstack/react-query';
import api from '@/api/axios-config';
import { Category, SubCategory } from '@/types';

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await api.get('/categories');
            return response.data.data as Category[];
        },
    });
};

export const useSubCategories = (categoryId: string) => {
    return useQuery({
        queryKey: ['subcategories', categoryId],
        queryFn: async () => {
            const response = await api.get(`/categories/${categoryId}/subcategories`);
            return response.data.data as SubCategory[];
        },
        enabled: !!categoryId,
    });
};
