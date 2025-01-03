import { InventoryItem, InventoryCategory } from '@/lib/types/inventory';

// Mock data
const mockCategories: InventoryCategory[] = [
    { id: 'med', name: 'Medications', code: 'MED' },
    { id: 'vac', name: 'Vaccines', code: 'VAC' },
    { id: 'sup', name: 'Supplies', code: 'SUP' },
    { id: 'equ', name: 'Equipment', code: 'EQU' }
];

const mockItems: InventoryItem[] = [
    { id: '1', name: 'Amoxicillin 500mg', code: 'MED001', categoryId: 'med', quantity: 150, reorderPoint: 50 },
    { id: '2', name: 'Rabies Vaccine', code: 'VAC001', categoryId: 'vac', quantity: 25, reorderPoint: 30 },
    { id: '3', name: 'Surgical Gloves', code: 'SUP001', categoryId: 'sup', quantity: 500, reorderPoint: 200 },
    { id: '4', name: 'Digital Thermometer', code: 'EQU001', categoryId: 'equ', quantity: 10, reorderPoint: 5 }
];

interface FetchInventoryItemsParams {
    search?: string;
    categoryId?: string | null;
}

export async function fetchInventoryItems({ search = '', categoryId }: FetchInventoryItemsParams): Promise<InventoryItem[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return mockItems.filter(item => {
        const matchesSearch = search
            ? item.name.toLowerCase().includes(search.toLowerCase()) ||
              item.code.toLowerCase().includes(search.toLowerCase())
            : true;
        
        const matchesCategory = categoryId
            ? item.categoryId === categoryId
            : true;

        return matchesSearch && matchesCategory;
    });
}

export async function saveInventoryItem(item: Partial<InventoryItem>): Promise<InventoryItem> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (item.id) {
        // Update existing item
        const index = mockItems.findIndex(i => i.id === item.id);
        if (index !== -1) {
            mockItems[index] = { ...mockItems[index], ...item };
            return mockItems[index];
        }
    } else {
        // Create new item
        const newItem = {
            id: Math.random().toString(36).substring(7),
            ...item
        } as InventoryItem;
        mockItems.push(newItem);
        return newItem;
    }
    
    throw new Error('Failed to save item');
}
export async function fetchInventoryCategories(): Promise<InventoryCategory[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return mockCategories;
}