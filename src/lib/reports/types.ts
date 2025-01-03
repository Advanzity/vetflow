export interface InventoryItem {
    id: string;
    name: string;
    type: string;
    category: string;
    subcategory: string;
    currentStock: number;
    reorderPoint: number;
    batchNumber?: string;
    expirationDate?: Date;
    isControlled: boolean;
    unitCost: number;
    unitPrice: number;
}

export interface ServiceRecord {
    id: string;
    code: string;
    type: string;
    date: Date;
    itemsUsed: {
        itemId: string;
        quantity: number;
    }[];
    revenue: number;
    cost: number;
}

export interface WastageRecord {
    id: string;
    itemId: string;
    quantity: number;
    reason: 'expired' | 'damaged' | 'other';
    date: Date;
    cost: number;
    notes?: string;
}

export interface ControlledSubstanceLog {
    id: string;
    itemId: string;
    date: Date;
    type: 'received' | 'administered' | 'disposed';
    quantity: number;
    serviceId?: string;
    performedBy: string;
    witnessedBy?: string;
}

export interface StockLevelAnalysis {
    items: InventoryItem[];
    belowReorderPoint: InventoryItem[];
    controlled: InventoryItem[];
    expiringSoon: InventoryItem[];
}

export interface UsageTrend {
    itemId: string;
    monthlyUsage: {
        month: string;
        quantity: number;
        serviceTypes: {
            code: string;
            count: number;
        }[];
    }[];
}

export interface WastageAnalysis {
    totalCost: number;
    byReason: {
        reason: string;
        count: number;
        cost: number;
    }[];
    items: WastageRecord[];
}

export interface Forecast {
    itemId: string;
    projectedUsage: number;
    suggestedOrder: number;
    recommendedDate: Date;
    confidence: number;
}

export interface ProfitabilityMetrics {
    byItem: {
        itemId: string;
        revenue: number;
        cost: number;
        margin: number;
    }[];
    byService: {
        code: string;
        revenue: number;
        cost: number;
        margin: number;
    }[];
}