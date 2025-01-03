import { 
    InventoryItem, 
    InventoryLocation,
    InventoryMovement,
    InventoryAlert 
} from '../types/inventory';

// Mock data
const mockLocations: InventoryLocation[] = [
    {
        id: 'loc1',
        name: 'Main Storage',
        type: 'storage',
        isControlledSubstanceLocation: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 'loc2',
        name: 'Exam Room 1',
        type: 'clinic',
        isControlledSubstanceLocation: false,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const mockItems: InventoryItem[] = [
    {
        id: 'item1',
        name: 'Amoxicillin 500mg',
        type: 'medication',
        category: 'antibiotics',
        subcategory: 'oral',
        quantity: 150,
        reorderPoint: 50,
        batchNumber: 'AMX-2024-001',
        expirationDate: new Date('2024-12-31'),
        isControlled: false,
        unitCost: 0.5,
        unitPrice: 2.0,
        lastPurchaseDate: new Date('2024-01-15'),
        location: 'loc1',
        notes: 'Store at room temperature',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 'item2',
        name: 'Ketamine 100mg/ml',
        type: 'medication',
        category: 'anesthetics',
        subcategory: 'injectable',
        quantity: 50,
        reorderPoint: 20,
        batchNumber: 'KET-2024-001',
        expirationDate: new Date('2024-06-30'),
        isControlled: true,
        unitCost: 5.0,
        unitPrice: 15.0,
        lastPurchaseDate: new Date('2024-01-10'),
        location: 'loc1',
        notes: 'Controlled substance - requires witness for dispensing',
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const mockMovements: InventoryMovement[] = [
    {
        id: 'mov1',
        itemId: 'item1',
        type: 'receipt',
        quantity: 200,
        toLocation: 'loc1',
        performedBy: 'John Doe',
        notes: 'Regular stock replenishment',
        createdAt: new Date('2024-01-15')
    },
    {
        id: 'mov2',
        itemId: 'item2',
        type: 'issue',
        quantity: 10,
        fromLocation: 'loc1',
        toLocation: 'loc2',
        performedBy: 'Jane Smith',
        witnessedBy: 'Mike Johnson',
        notes: 'For scheduled surgery',
        createdAt: new Date('2024-01-16')
    }
];

const mockAlerts: InventoryAlert[] = [
    {
        id: 'alert1',
        itemId: 'item1',
        type: 'low_stock',
        message: 'Stock level below reorder point',
        status: 'active',
        createdAt: new Date()
    },
    {
        id: 'alert2',
        itemId: 'item2',
        type: 'expiring_soon',
        message: 'Batch KET-2024-001 expires in 30 days',
        status: 'acknowledged',
        createdAt: new Date(),
        acknowledgedBy: 'John Doe',
        acknowledgedAt: new Date()
    }
];

// Mock API functions
export async function fetchInventoryItems(params: {
    search?: string;
    type?: string;
    category?: string;
    location?: string;
    isControlled?: boolean;
}): Promise<InventoryItem[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return mockItems.filter(item => {
        if (params.search && !item.name.toLowerCase().includes(params.search.toLowerCase())) {
            return false;
        }
        if (params.type && item.type !== params.type) {
            return false;
        }
        if (params.category && item.category !== params.category) {
            return false;
        }
        if (params.location && item.location !== params.location) {
            return false;
        }
        if (params.isControlled !== undefined && item.isControlled !== params.isControlled) {
            return false;
        }
        return true;
    });
}

export async function fetchInventoryMovements(params: {
    itemId?: string;
    type?: string;
    startDate?: Date;
    endDate?: Date;
}): Promise<InventoryMovement[]> {
    await new Promise(resolve => setTimeout(resolve, 500));

    return mockMovements.filter(movement => {
        if (params.itemId && movement.itemId !== params.itemId) {
            return false;
        }
        if (params.type && movement.type !== params.type) {
            return false;
        }
        if (params.startDate && movement.createdAt < params.startDate) {
            return false;
        }
        if (params.endDate && movement.createdAt > params.endDate) {
            return false;
        }
        return true;
    });
}

export async function fetchInventoryAlerts(params: {
    itemId?: string;
    type?: string;
    status?: string;
}): Promise<InventoryAlert[]> {
    await new Promise(resolve => setTimeout(resolve, 500));

    return mockAlerts.filter(alert => {
        if (params.itemId && alert.itemId !== params.itemId) {
            return false;
        }
        if (params.type && alert.type !== params.type) {
            return false;
        }
        if (params.status && alert.status !== params.status) {
            return false;
        }
        return true;
    });
}

export async function fetchLocations(): Promise<InventoryLocation[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockLocations;
}

export async function saveInventoryItem(item: Partial<InventoryItem>): Promise<InventoryItem> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (item.id) {
        // Update existing item
        const index = mockItems.findIndex(i => i.id === item.id);
        if (index !== -1) {
            mockItems[index] = { 
                ...mockItems[index], 
                ...item, 
                updatedAt: new Date() 
            };
            return mockItems[index];
        }
    }
    
    // Create new item
    const newItem: InventoryItem = {
        id: `item${mockItems.length + 1}`,
        ...item,
        createdAt: new Date(),
        updatedAt: new Date()
    } as InventoryItem;
    
    mockItems.push(newItem);
    return newItem;
}

export async function recordInventoryMovement(movement: Omit<InventoryMovement, 'id' | 'createdAt'>): Promise<InventoryMovement> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newMovement: InventoryMovement = {
        id: `mov${mockMovements.length + 1}`,
        ...movement,
        createdAt: new Date()
    };
    
    mockMovements.push(newMovement);
    
    // Update item quantity
    const item = mockItems.find(i => i.id === movement.itemId);
    if (item) {
        switch (movement.type) {
            case 'receipt':
                item.quantity += movement.quantity;
                break;
            case 'issue':
            case 'disposal':
                item.quantity -= movement.quantity;
                break;
            case 'return':
                item.quantity += movement.quantity;
                break;
            case 'adjustment':
                item.quantity = movement.quantity; // Set absolute value
                break;
        }
        item.updatedAt = new Date();
    }
    
    return newMovement;
}

export async function createInventoryAlert(alert: Omit<InventoryAlert, 'id' | 'createdAt'>): Promise<InventoryAlert> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newAlert: InventoryAlert = {
        id: `alert${mockAlerts.length + 1}`,
        ...alert,
        createdAt: new Date()
    };
    
    mockAlerts.push(newAlert);
    return newAlert;
}

export async function acknowledgeAlert(alertId: string, userId: string): Promise<InventoryAlert> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const alert = mockAlerts.find(a => a.id === alertId);
    if (!alert) {
        throw new Error('Alert not found');
    }
    
    alert.status = 'acknowledged';
    alert.acknowledgedBy = userId;
    alert.acknowledgedAt = new Date();
    
    return alert;
}