import { ResponsiveContainer, LineChart, Line, AreaChart, Area, 
         BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface ChartRendererProps {
    data: Array<{ name: string; value: number }>;
    type: 'line' | 'area' | 'bar';
    isPositive: boolean;
}

export const ChartRenderer: React.FC<ChartRendererProps> = ({
    data,
    type,
    isPositive
}) => {
    const color = isPositive ? 'var(--success-on-background-medium)' : 'var(--danger-on-background-medium)';
    const fillOpacity = isPositive ? 0.15 : 0.12;

    const commonProps = {
        data,
        margin: { top: 10, right: 10, bottom: 0, left: 10 },
        style: { cursor: 'pointer' }
    };

    const tooltipStyle = {
        contentStyle: {
            background: 'var(--surface-background)',
            border: '1px solid var(--neutral-border-medium)',
            borderRadius: '8px',
            padding: '8px 12px',
            boxShadow: 'var(--shadow-m)'
        },
        itemStyle: {
            color: 'var(--neutral-on-background-strong)'
        }
    };

    const animationProps = {
        animationDuration: 750,
        animationEasing: "ease-out-cubic"
    };

    const renderChart = () => {
        switch (type) {
            case 'area':
                return (
                    <AreaChart {...commonProps} {...animationProps}>
                        <defs>
                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={fillOpacity}/>
                                <stop offset="95%" stopColor={color} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid 
                            strokeDasharray="3 3" 
                            opacity={0.1}
                            horizontal={true}
                            vertical={false} 
                        />
                        <XAxis 
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--neutral-on-background-weak)', fontSize: 12 }}
                        />
                        <YAxis hide />
                        <Tooltip
                            {...tooltipStyle}
                            cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            fill="url(#colorGradient)"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ 
                                r: 4, 
                                stroke: color,
                                strokeWidth: 2,
                                fill: 'var(--surface-background)'
                            }}
                        />
                    </AreaChart>
                );
            case 'bar':
                return (
                    <BarChart {...commonProps} {...animationProps}>
                        <CartesianGrid 
                            strokeDasharray="3 3" 
                            opacity={0.1}
                            horizontal={true}
                            vertical={false}
                        />
                        <XAxis 
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--neutral-on-background-weak)', fontSize: 12 }}
                        />
                        <YAxis hide />
                        <Tooltip
                            {...tooltipStyle}
                            cursor={{ fill: color, fillOpacity: 0.1 }}
                        />
                        <Bar
                            dataKey="value"
                            fill={color}
                            radius={[6, 6, 0, 0]}
                            maxBarSize={40}
                        />
                    </BarChart>
                );
            default:
                return (
                    <LineChart {...commonProps} {...animationProps}>
                        <CartesianGrid 
                            strokeDasharray="3 3" 
                            opacity={0.1}
                            horizontal={true}
                            vertical={false}
                        />
                        <XAxis 
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--neutral-on-background-weak)', fontSize: 12 }}
                        />
                        <YAxis hide />
                        <Tooltip
                            {...tooltipStyle}
                            cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ 
                                r: 4, 
                                stroke: color,
                                strokeWidth: 2,
                                fill: 'var(--surface-background)'
                            }}
                        />
                    </LineChart>
                );
        }
    };

    return (
        <ResponsiveContainer width="100%" height={160}>
            {renderChart()}
        </ResponsiveContainer>
    );
};