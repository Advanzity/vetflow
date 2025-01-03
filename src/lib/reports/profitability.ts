import { 
    ServiceRecord, 
    InventoryItem, 
    ProfitabilityMetrics 
} from './types';

export function analyzeProfitability(
    services: ServiceRecord[],
    items: InventoryItem[]
): ProfitabilityMetrics {
    // Analyze by item
    const byItem = items.map(item => {
        const itemServices = services.filter(service =>
            service.itemsUsed.some(used => used.itemId === item.id)
        );

        const revenue = itemServices.reduce((total, service) => {
            const itemUsage = service.itemsUsed.find(u => u.itemId === item.id);
            return total + (itemUsage?.quantity || 0) * item.unitPrice;
        }, 0);

        const cost = itemServices.reduce((total, service) => {
            const itemUsage = service.itemsUsed.find(u => u.itemId === item.id);
            return total + (itemUsage?.quantity || 0) * item.unitCost;
        }, 0);

        return {
            itemId: item.id,
            revenue,
            cost,
            margin: ((revenue - cost) / revenue) * 100
        };
    });

    // Analyze by service
    const byService = services.reduce((acc, service) => {
        const existing = acc.find(s => s.code === service.code);
        if (existing) {
            existing.revenue += service.revenue;
            existing.cost += service.cost;
            existing.margin = ((existing.revenue - existing.cost) / existing.revenue) * 100;
        } else {
            acc.push({
                code: service.code,
                revenue: service.revenue,
                cost: service.cost,
                margin: ((service.revenue - service.cost) / service.revenue) * 100
            });
        }
        return acc;
    }, [] as { code: string; revenue: number; cost: number; margin: number; }[]);

    return {
        byItem: byItem.sort((a, b) => b.margin - a.margin),
        byService: byService.sort((a, b) => b.margin - a.margin)
    };
}