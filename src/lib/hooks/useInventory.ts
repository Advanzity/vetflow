import { useState, useEffect } from 'react';
import { InventoryItem } from '@/lib/types/inventory';
import { fetchInventoryItems, saveInventoryItem } from '@/lib/api/inventory';

export function useInventory() {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const loadItems = async () => {
            setIsLoading(true);
            setError(undefined);
            try {
                const data = await fetchInventoryItems({
                    search: searchTerm,
                    categoryId: selectedCategory
                });
                setItems(data);
            } catch (err) {
                setError('Failed to load inventory items');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadItems();
    }, [searchTerm, selectedCategory]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    const handleClear = () => {
        setSearchTerm('');
        setSelectedCategory(null);
    };

    return {
        items,
        searchTerm,
        selectedCategory,
        isLoading,
        error,
        handleSearch,
        handleCategorySelect,
        handleClear,
        handleSaveItem: async (item: Partial<InventoryItem>) => {
            setIsLoading(true);
            setError(undefined);
            try {
                await saveInventoryItem(item);
                const data = await fetchInventoryItems({
                    search: searchTerm,
                    categoryId: selectedCategory
                });
                setItems(data);
            } catch (err) {
                setError('Failed to save item');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
    };
}