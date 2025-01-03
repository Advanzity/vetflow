import { ServiceRecord, UsageTrend } from './types';

export function analyzeUsageTrends(
    services: ServiceRecord[], 
    months: number = 6
): UsageTrend[] {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setMonth(endDate.getMonth() - months);

    // Filter services within date range
    const relevantServices = services.filter(service => 
        service.date >= startDate && service.date <= endDate
    );

    // Group by item
    const itemUsage = new Map<string, Map<string, {
        quantity: number;
        services: Map<string, number>;
    }>>();

    relevantServices.forEach(service => {
        service.itemsUsed.forEach(({ itemId, quantity }) => {
            if (!itemUsage.has(itemId)) {
                itemUsage.set(itemId, new Map());
            }
            
            const monthKey = service.date.toISOString().slice(0, 7);
            const itemMonths = itemUsage.get(itemId)!;
            
            if (!itemMonths.has(monthKey)) {
                itemMonths.set(monthKey, {
                    quantity: 0,
                    services: new Map()
                });
            }

            const monthData = itemMonths.get(monthKey)!;
            monthData.quantity += quantity;
            
            const currentCount = monthData.services.get(service.code) || 0;
            monthData.services.set(service.code, currentCount + 1);
        });
    });

    // Format results
    return Array.from(itemUsage.entries()).map(([itemId, months]) => ({
        itemId,
        monthlyUsage: Array.from(months.entries()).map(([month, data]) => ({
            month,
            quantity: data.quantity,
            serviceTypes: Array.from(data.services.entries()).map(([code, count]) => ({
                code,
                count
            }))
        }))
    }));
}