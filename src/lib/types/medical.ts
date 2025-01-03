export interface MedicalProcedure {
    id: string;
    patientId: string;
    procedureType: string;
    performedBy: string;
    performedAt: Date;
    notes?: string;
    totalCost: number;
    totalRevenue: number;
    items: ProcedureItem[];
    createdAt: Date;
    updatedAt: Date;
}

export interface ProcedureItem {
    id: string;
    procedureId: string;
    itemId: string;
    quantity: number;
    unitCost: number;
    unitPrice: number;
    batchNumber?: string;
    expirationDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface InventoryTransaction {
    id: string;
    itemId: string;
    transactionType: 'receipt' | 'issue' | 'return' | 'disposal' | 'adjustment';
    quantity: number;
    batchNumber?: string;
    expirationDate?: Date;
    unitCost?: number;
    performedBy: string;
    witnessedBy?: string;
    referenceId?: string;
    referenceType?: string;
    notes?: string;
    signature?: string;
    createdAt: Date;
}

export interface InventoryValuation {
    id: string;
    itemId: string;
    valuationDate: Date;
    quantity: number;
    unitCost: number;
    totalValue: number;
    valuationMethod: 'FIFO' | 'LIFO' | 'average';
    createdAt: Date;
    updatedAt: Date;
}

export interface PriceHistory {
    id: string;
    itemId: string;
    effectiveDate: Date;
    unitCost: number;
    unitPrice: number;
    reason?: string;
    changedBy: string;
    createdAt: Date;
}

export interface ProcedureUsageReport {
    procedure: MedicalProcedure;
    items: {
        id: string;
        name: string;
        quantity: number;
        cost: number;
        revenue: number;
        margin: number;
    }[];
    totalCost: number;
    totalRevenue: number;
    marginPercent: number;
}

export interface InventoryMovementReport {
    item: {
        id: string;
        name: string;
    };
    transactions: InventoryTransaction[];
    summary: {
        receipts: number;
        issues: number;
        returns: number;
        disposals: number;
        adjustments: number;
        netChange: number;
    };
}

export interface ValuationReport {
    asOfDate: Date;
    totalValue: number;
    byCategory: {
        category: string;
        itemCount: number;
        totalValue: number;
        percentageOfTotal: number;
    }[];
    items: {
        id: string;
        name: string;
        quantity: number;
        unitCost: number;
        totalValue: number;
        lastPurchaseDate?: Date;
        turnoverRate: number;
    }[];
}