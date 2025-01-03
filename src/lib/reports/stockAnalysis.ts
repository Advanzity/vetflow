import { InventoryItem, StockLevelAnalysis } from './types';

export function analyzeStockLevels(items: InventoryItem[]): StockLevelAnalysis {
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.setDate(today.getDate() + 30));

    return {
        items,
        belowReorderPoint: items.filter(item => 
            item.currentStock <= item.reorderPoint
        ),
        controlled: items.filter(item => 
            item.isControlled
        ),
        expiringSoon: items.filter(item => 
            item.expirationDate && 
            item.expirationDate <= thirtyDaysFromNow
        )
    };
}

export function formatStockReport(analysis: StockLevelAnalysis): string {
    let report = '# Stock Level Analysis\n\n';

    // Group items by type, category, subcategory
    const grouped = analysis.items.reduce((acc, item) => {
        const key = `${item.type}-${item.category}-${item.subcategory}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {} as Record<string, InventoryItem[]>);

    // Format grouped items
    Object.entries(grouped).forEach(([key, items]) => {
        report += `## ${key}\n\n`;
        report += '| Item | Stock | Reorder Point | Status |\n';
        report += '|------|--------|---------------|--------|\n';
        
        items.forEach(item => {
            const status = [];
            if (item.currentStock <= item.reorderPoint) status.push('⚠️ Low');
            if (item.isControlled) status.push('🔒 Controlled');
            if (item.expirationDate && item.expirationDate <= new Date()) {
                status.push('⌛ Expiring');
            }

            report += `| ${item.name} | ${item.currentStock} | ${item.reorderPoint} | ${status.join(', ') || '✅'} |\n`;
        });
        report += '\n';
    });

    return report;
}