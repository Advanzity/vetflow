export interface InventoryItem {
    id: string;
    name: string;
    type: string;
    category: string;
    subcategory: string;
    quantity: number;
    reorderPoint: number;
    batchNumber?: string;
    expirationDate?: Date;
    isControlled: boolean;
    unitCost: number;
    unitPrice: number;
    lastPurchaseDate?: Date;
    location?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface InventoryLocation {
    id: string;
    name: string;
    type: 'storage' | 'clinic' | 'pharmacy';
    isControlledSubstanceLocation: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface InventoryMovement {
    id: string;
    itemId: string;
    type: 'receipt' | 'issue' | 'return' | 'disposal' | 'adjustment';
    quantity: number;
    fromLocation?: string;
    toLocation?: string;
    performedBy: string;
    witnessedBy?: string;
    notes?: string;
    createdAt: Date;
}

export interface InventoryAlert {
    id: string;
    itemId: string;
    type: 'low_stock' | 'expiring_soon' | 'expired' | 'price_change';
    message: string;
    status: 'active' | 'acknowledged' | 'resolved';
    createdAt: Date;
    acknowledgedBy?: string;
    acknowledgedAt?: Date;
}