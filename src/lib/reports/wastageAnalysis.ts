import { WastageRecord, WastageAnalysis } from './types';

export function analyzeWastage(records: WastageRecord[]): WastageAnalysis {
    // Calculate total cost
    const totalCost = records.reduce((sum, record) => sum + record.cost, 0);

    // Group by reason
    const byReason = records.reduce((acc, record) => {
        const existing = acc.find(r => r.reason === record.reason);
        if (existing) {
            existing.count++;
            existing.cost += record.cost;
        } else {
            acc.push({
                reason: record.reason,
                count: 1,
                cost: record.cost
            });
        }
        return acc;
    }, [] as { reason: string; count: number; cost: number; }[]);

    return {
        totalCost,
        byReason,
        items: records.sort((a, b) => b.cost - a.cost) // Sort by cost descending
    };
}

export function generateWastageRecommendations(analysis: WastageAnalysis): string[] {
    const recommendations: string[] = [];

    // Analyze patterns
    if (analysis.byReason.find(r => r.reason === 'expired')?.cost > analysis.totalCost * 0.3) {
        recommendations.push('High expiration losses - Consider implementing FEFO (First Expired, First Out) inventory management');
    }

    if (analysis.byReason.find(r => r.reason === 'damaged')?.count > analysis.items.length * 0.2) {
        recommendations.push('Significant damage-related losses - Review handling procedures and storage conditions');
    }

    const highValueLosses = analysis.items.filter(item => item.cost > 1000);
    if (highValueLosses.length > 0) {
        recommendations.push('High-value items lost - Implement special handling procedures for expensive inventory');
    }

    return recommendations;
}