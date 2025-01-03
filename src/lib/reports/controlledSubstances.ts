import { 
    ControlledSubstanceLog,
    InventoryItem,
    ServiceRecord
} from './types';

interface ControlledSubstanceReport {
    status: 'compliant' | 'discrepancy' | 'error';
    items: {
        itemId: string;
        currentCount: number;
        expectedCount: number;
        discrepancy: number;
        lastReconciled: Date;
        logs: ControlledSubstanceLog[];
    }[];
    discrepancies: {
        itemId: string;
        date: Date;
        expected: number;
        actual: number;
        difference: number;
        notes?: string;
    }[];
}

export function analyzeControlledSubstances(
    items: InventoryItem[],
    logs: ControlledSubstanceLog[],
    services: ServiceRecord[]
): ControlledSubstanceReport {
    const controlledItems = items.filter(item => item.isControlled);
    const itemReports = controlledItems.map(item => {
        const itemLogs = logs.filter(log => log.itemId === item.id);
        
        // Calculate expected count
        const received = sumLogQuantities(itemLogs, 'received');
        const administered = sumLogQuantities(itemLogs, 'administered');
        const disposed = sumLogQuantities(itemLogs, 'disposed');
        const expectedCount = received - administered - disposed;
        
        // Get actual count from current stock
        const currentCount = item.currentStock;
        
        // Calculate discrepancy
        const discrepancy = currentCount - expectedCount;
        
        // Get last reconciliation date
        const lastReconciled = new Date(Math.max(
            ...itemLogs.map(log => log.date.getTime())
        ));

        return {
            itemId: item.id,
            currentCount,
            expectedCount,
            discrepancy,
            lastReconciled,
            logs: itemLogs
        };
    });

    // Identify discrepancies
    const discrepancies = itemReports
        .filter(report => report.discrepancy !== 0)
        .map(report => ({
            itemId: report.itemId,
            date: new Date(),
            expected: report.expectedCount,
            actual: report.currentCount,
            difference: report.discrepancy,
            notes: generateDiscrepancyNotes(report)
        }));

    return {
        status: discrepancies.length > 0 ? 'discrepancy' : 'compliant',
        items: itemReports,
        discrepancies
    };
}

function sumLogQuantities(
    logs: ControlledSubstanceLog[], 
    type: 'received' | 'administered' | 'disposed'
): number {
    return logs
        .filter(log => log.type === type)
        .reduce((sum, log) => sum + log.quantity, 0);
}

function generateDiscrepancyNotes(report: {
    itemId: string;
    currentCount: number;
    expectedCount: number;
    discrepancy: number;
    logs: ControlledSubstanceLog[];
}): string {
    const notes: string[] = [];

    if (Math.abs(report.discrepancy) > 0) {
        notes.push(`Quantity discrepancy of ${Math.abs(report.discrepancy)} units`);
        
        // Check for potential issues
        const recentLogs = report.logs
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .slice(0, 5);
            
        const hasUnwitnessedLogs = recentLogs.some(log => 
            !log.witnessedBy && log.type !== 'received'
        );
        
        if (hasUnwitnessedLogs) {
            notes.push('Some recent transactions lack witness signatures');
        }
    }

    return notes.join('. ');
}