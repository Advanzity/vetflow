import { useState, useEffect } from 'react';
import { fetchInventoryCategories } from '@/lib/api/inventory';

export function useInventoryCategories() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const loadCategories = async () => {
            setIsLoading(true);
            setError(undefined);
            try {
                const data = await fetchInventoryCategories();
                setCategories(data);
            } catch (err) {
                setError('Failed to load categories');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadCategories();
    }, []);

    return { categories, isLoading, error };
}