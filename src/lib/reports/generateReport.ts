import { analyzeStockLevels, formatStockReport } from './stockAnalysis';
import { analyzeUsageTrends } from './usageTrends';
import { analyzeWastage, generateWastageRecommendations } from './wastageAnalysis';
import { generateForecasts } from './forecasting';
import { analyzeProfitability } from './profitability';
import { analyzeControlledSubstances } from './controlledSubstances';

import type {
    InventoryItem,
    ServiceRecord,
    WastageRecord,
    ControlledSubstanceLog
} from './types';

export async function generateComprehensiveReport(
    items: InventoryItem[],
    services: ServiceRecord[],
    wastage: WastageRecord[],
    controlledLogs: ControlledSubstanceLog[],
    scheduledServices: ServiceRecord[]
) {
    // Generate all report sections
    const stockAnalysis = analyzeStockLevels(items);
    const usageTrends = analyzeUsageTrends(services);
    const wastageAnalysis = analyzeWastage(wastage);
    const forecasts = generateForecasts(items, services, scheduledServices);
    const profitability = analyzeProfitability(services, items);
    const controlledSubstances = analyzeControlledSubstances(
        items,
        controlledLogs,
        services
    );

    // Format the comprehensive report
    let report = '# Comprehensive Inventory and Service Management Report\n\n';

    // Stock Level Analysis
    report += formatStockReport(stockAnalysis);
    report += '\n\n';

    // Usage Trends
    report += '## Usage Trends Analysis\n\n';
    report += formatUsageTrends(usageTrends);
    report += '\n\n';

    // Wastage Analysis
    report += '## Wastage Analysis\n\n';
    report += formatWastageAnalysis(wastageAnalysis);
    const recommendations = generateWastageRecommendations(wastageAnalysis);
    report += '\n### Recommendations\n';
    recommendations.forEach(rec => {
        report += `- ${rec}\n`;
    });
    report += '\n\n';

    // Forecasting
    report += '## 3-Month Forecast\n\n';
    report += formatForecasts(forecasts);
    report += '\n\n';

    // Profitability
    report += '## Profitability Analysis\n\n';
    report += formatProfitability(profitability);
    report += '\n\n';

    // Controlled Substances
    report += '## Controlled Substances Report\n\n';
    report += formatControlledSubstances(controlledSubstances);

    return report;
}

function formatUsageTrends(trends: ReturnType<typeof analyzeUsageTrends>): string {
    let output = '### Monthly Usage Patterns\n\n';
    output += '| Item | Average Monthly Usage | Top Service Types |\n';
    output += '|------|----------------------|-------------------|\n';

    trends.forEach(trend => {
        const avgUsage = trend.monthlyUsage.reduce(
            (sum, m) => sum + m.quantity, 0
        ) / trend.monthlyUsage.length;

        const topServices = trend.monthlyUsage
            .flatMap(m => m.serviceTypes)
            .reduce((acc, srv) => {
                acc[srv.code] = (acc[srv.code] || 0) + srv.count;
                return acc;
            }, {} as Record<string, number>);

        const topServicesList = Object.entries(topServices)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([code, count]) => `${code} (${count})`)
            .join(', ');

        output += `| ${trend.itemId} | ${avgUsage.toFixed(2)} | ${topServicesList} |\n`;
    });

    return output;
}

function formatWastageAnalysis(analysis: ReturnType<typeof analyzeWastage>): string {
    let output = `Total Cost of Wastage: $${analysis.totalCost.toFixed(2)}\n\n`;
    output += '### Breakdown by Reason\n\n';
    output += '| Reason | Count | Cost |\n';
    output += '|--------|-------|------|\n';

    analysis.byReason.forEach(reason => {
        output += `| ${reason.reason} | ${reason.count} | $${reason.cost.toFixed(2)} |\n`;
    });

    return output;
}

function formatForecasts(forecasts: ReturnType<typeof generateForecasts>): string {
    let output = '| Item | Projected Usage | Suggested Order | Order By | Confidence |\n';
    output += '|------|-----------------|----------------|----------|------------|\n';

    forecasts.forEach(forecast => {
        output += `| ${forecast.itemId} | ${forecast.projectedUsage} | `;
        output += `${forecast.suggestedOrder} | `;
        output += `${forecast.recommendedDate.toLocaleDateString()} | `;
        output += `${forecast.confidence}% |\n`;
    });

    return output;
}

function formatProfitability(metrics: ReturnType<typeof analyzeProfitability>): string {
    let output = '### Top 10 Most Profitable Items\n\n';
    output += '| Item | Revenue | Cost | Margin |\n';
    output += '|------|---------|------|--------|\n';

    metrics.byItem
        .slice(0, 10)
        .forEach(item => {
            output += `| ${item.itemId} | $${item.revenue.toFixed(2)} | `;
            output += `$${item.cost.toFixed(2)} | ${item.margin.toFixed(1)}% |\n`;
        });

    output += '\n### Service Profitability\n\n';
    output += '| Service | Revenue | Cost | Margin |\n';
    output += '|---------|---------|------|--------|\n';

    metrics.byService
        .slice(0, 10)
        .forEach(service => {
            output += `| ${service.code} | $${service.revenue.toFixed(2)} | `;
            output += `$${service.cost.toFixed(2)} | ${service.margin.toFixed(1)}% |\n`;
        });

    return output;
}

function formatControlledSubstances(
    report: ReturnType<typeof analyzeControlledSubstances>
): string {
    let output = `Status: ${report.status.toUpperCase()}\n\n`;

    if (report.discrepancies.length > 0) {
        output += '### Discrepancies Found\n\n';
        output += '| Item | Expected | Actual | Difference | Notes |\n';
        output += '|------|----------|---------|------------|--------|\n';

        report.discrepancies.forEach(d => {
            output += `| ${d.itemId} | ${d.expected} | ${d.actual} | `;
            output += `${d.difference} | ${d.notes || '-'} |\n`;
        });
    }

    output += '\n### Current Inventory Status\n\n';
    output += '| Item | Current Count | Last Reconciled |\n';
    output += '|------|---------------|----------------|\n';

    report.items.forEach(item => {
        output += `| ${item.itemId} | ${item.currentCount} | `;
        output += `${item.lastReconciled.toLocaleDateString()} |\n`;
    });

    return output;
}