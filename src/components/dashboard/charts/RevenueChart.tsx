'use client';

import { Flex, Text, Select, Icon, Card } from '@/once-ui/components';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { getRevenueData } from '@/lib/mock/dashboard';
import { useState } from 'react';

const timeRangeOptions = [
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 90 days', value: '90d' }
];

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <Card style={{ margin: 0 }}>
                <Flex direction="column" gap="8" padding="16">
                    <Text variant="body-strong-s">
                        {new Date(label).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric'
                        })}
                    </Text>
                    <Flex gap="8" alignItems="center">
                        <Icon 
                            name="dollarSign"
                            size="s"
                            onBackground="brand-medium" />
                        <Text variant="heading-strong-m">
                            {formatCurrency(payload[0].value)}
                        </Text>
                    </Flex>
                </Flex>
            </Card>
        );
    }
    return null;
};

export const RevenueChart = () => {
    const [timeRange, setTimeRange] = useState('30d');
    const data = getRevenueData();

    // Calculate total revenue
    const totalRevenue = data.reduce((sum, item) => sum + item.amount, 0);
    
    // Calculate revenue change percentage
    const previousPeriodRevenue = data.slice(0, Math.floor(data.length / 2))
        .reduce((sum, item) => sum + item.amount, 0);
    const currentPeriodRevenue = data.slice(Math.floor(data.length / 2))
        .reduce((sum, item) => sum + item.amount, 0);
    const revenueChange = ((currentPeriodRevenue - previousPeriodRevenue) / previousPeriodRevenue) * 100;

    return (
        <Card>
            <Flex direction="column" gap="24" padding="24">
                {/* Header */}
                <Flex 
                    fillWidth 
                    justifyContent="space-between" 
                    alignItems="flex-start">
                    <Flex direction="column" gap="4">
                        <Text variant="heading-strong-l">
                            Revenue Overview
                        </Text>
                        <Flex gap="8" alignItems="center">
                            <Text variant="heading-strong-xl">
                                {formatCurrency(totalRevenue)}
                            </Text>
                            <Flex 
                                gap="4"
                                padding="4" paddingX="8"
                                radius="m"
                                background={revenueChange >= 0 ? 'success-weak' : 'danger-weak'}>
                                <Icon
                                    name={revenueChange >= 0 ? 'trendingUp' : 'trendingDown'}
                                    size="s"
                                    onBackground={revenueChange >= 0 ? 'success-medium' : 'danger-medium'} />
                                <Text
                                    variant="body-strong-s"
                                    onBackground={revenueChange >= 0 ? 'success-medium' : 'danger-medium'}>
                                    {Math.abs(revenueChange).toFixed(1)}%
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Select
                        id="timeRange"
                        label="Time Range"
                        labelAsPlaceholder
                        value={timeRange}
                        options={timeRangeOptions}
                        onSelect={(option) => setTimeRange(option.value)}
                        style={{ width: '150px' }}
                    />
                </Flex>
                
                {/* Chart */}
                <div style={{ height: '300px', width: '100%' }}>
                    <ResponsiveContainer>
                        <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 10 }}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop 
                                        offset="5%" 
                                        stopColor="var(--brand-on-background-medium)" 
                                        stopOpacity={0.1}
                                    />
                                    <stop 
                                        offset="95%" 
                                        stopColor="var(--brand-on-background-medium)" 
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid 
                                strokeDasharray="3 3" 
                                vertical={false}
                                stroke="var(--neutral-border-medium)" />
                            <XAxis 
                                dataKey="date"
                                tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, {
                                    month: 'short',
                                    day: 'numeric'
                                })}
                                stroke="var(--neutral-on-background-weak)"
                                tick={{ fill: 'var(--neutral-on-background-weak)' }}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                tickFormatter={(value) => formatCurrency(value)}
                                stroke="var(--neutral-on-background-weak)"
                                tick={{ fill: 'var(--neutral-on-background-weak)' }}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="amount"
                                stroke="var(--brand-on-background-medium)"
                                strokeWidth={2}
                                fill="url(#colorRevenue)"
                                dot={false}
                                activeDot={{
                                    r: 6,
                                    stroke: 'var(--brand-on-background-medium)',
                                    strokeWidth: 2,
                                    fill: 'var(--surface-background)'
                                }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Flex>
        </Card>
    );
};