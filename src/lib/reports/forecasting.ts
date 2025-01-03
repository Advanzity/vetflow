import { ServiceRecord, InventoryItem, Forecast } from './types';

export function generateForecasts(
    items: InventoryItem[],
    services: ServiceRecord[],
    scheduledServices: ServiceRecord[]
): Forecast[] {
    return items.map(item => {
        // Calculate historical usage pattern
        const historicalUsage = calculateHistoricalUsage(item.id, services);
        
        // Project future usage
        const projectedBase = calculateProjectedUsage(historicalUsage);
        
        // Adjust for scheduled services
        const scheduledUsage = calculateScheduledUsage(item.id, scheduledServices);
        
        // Apply seasonal adjustments
        const seasonalFactor = calculateSeasonalFactor(historicalUsage);
        
        const projectedUsage = Math.round(
            (projectedBase + scheduledUsage) * seasonalFactor
        );

        // Calculate optimal order
        const suggestedOrder = calculateOrderQuantity(
            projectedUsage,
            item.currentStock,
            item.reorderPoint
        );

        // Determine best order timing
        const recommendedDate = calculateOrderTiming(
            item.currentStock,
            projectedUsage,
            item.reorderPoint
        );

        // Calculate confidence score
        const confidence = calculateConfidence(
            historicalUsage,
            scheduledServices.length
        );

        return {
            itemId: item.id,
            projectedUsage,
            suggestedOrder,
            recommendedDate,
            confidence
        };
    });
}

function calculateHistoricalUsage(
    itemId: string,
    services: ServiceRecord[]
): number[] {
    // Group usage by month for the past year
    const monthlyUsage = new Array(12).fill(0);
    
    services.forEach(service => {
        const itemUsage = service.itemsUsed.find(i => i.itemId === itemId);
        if (itemUsage) {
            const monthIndex = service.date.getMonth();
            monthlyUsage[monthIndex] += itemUsage.quantity;
        }
    });
    
    return monthlyUsage;
}

function calculateProjectedUsage(historicalUsage: number[]): number {
    // Use weighted moving average
    const weights = [0.4, 0.3, 0.2, 0.1]; // More recent months have higher weight
    const recent = historicalUsage.slice(-4);
    
    return recent.reduce((sum, usage, index) => 
        sum + usage * weights[index], 0
    );
}

function calculateScheduledUsage(
    itemId: string,
    scheduledServices: ServiceRecord[]
): number {
    return scheduledServices.reduce((total, service) => {
        const itemUsage = service.itemsUsed.find(i => i.itemId === itemId);
        return total + (itemUsage?.quantity || 0);
    }, 0);
}

function calculateSeasonalFactor(historicalUsage: number[]): number {
    const currentMonth = new Date().getMonth();
    const lastYear = historicalUsage.slice(currentMonth - 3, currentMonth + 4);
    const average = lastYear.reduce((a, b) => a + b) / lastYear.length;
    
    return Math.max(0.8, Math.min(1.2, average / historicalUsage[currentMonth]));
}

function calculateOrderQuantity(
    projected: number,
    current: number,
    reorderPoint: number
): number {
    const deficit = Math.max(0, projected - current);
    const buffer = Math.ceil(reorderPoint * 0.2); // 20% safety buffer
    
    return deficit + buffer;
}

function calculateOrderTiming(
    currentStock: number,
    projectedUsage: number,
    reorderPoint: number
): Date {
    const daysUntilReorder = Math.floor(
        ((currentStock - reorderPoint) / projectedUsage) * 30
    );
    
    const result = new Date();
    result.setDate(result.getDate() + Math.max(0, daysUntilReorder));
    
    return result;
}

function calculateConfidence(
    historicalUsage: number[],
    scheduledCount: number
): number {
    const variance = calculateVariance(historicalUsage);
    const dataPoints = historicalUsage.filter(x => x > 0).length;
    
    // More data points and scheduled services increase confidence
    // High variance decreases confidence
    return Math.min(100, Math.max(0,
        (dataPoints * 5) + (scheduledCount * 2) - (variance * 10)
    ));
}

function calculateVariance(numbers: number[]): number {
    const mean = numbers.reduce((a, b) => a + b) / numbers.length;
    const squareDiffs = numbers.map(x => Math.pow(x - mean, 2));
    return Math.sqrt(squareDiffs.reduce((a, b) => a + b) / numbers.length);
}