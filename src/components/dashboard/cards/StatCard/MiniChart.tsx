import { Area, AreaChart, ResponsiveContainer } from 'recharts';

interface MiniChartProps {
    data: Array<{ value: number }>;
    color: string;
    trend: number;
}

export const MiniChart: React.FC<MiniChartProps> = ({
    data,
    color,
    trend
}) => {
    const colorMap = {
        brand: 'var(--brand-on-background-medium)',
        accent: 'var(--accent-on-background-medium)',
        success: 'var(--success-on-background-medium)',
        warning: 'var(--warning-on-background-medium)'
    };

    const chartColor = colorMap[color as keyof typeof colorMap];

    return (
        <ResponsiveContainer width="100%" height={60}>
            <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <defs>
                    <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                        <stop 
                            offset="5%" 
                            stopColor={chartColor} 
                            stopOpacity={0.2}
                        />
                        <stop 
                            offset="95%" 
                            stopColor={chartColor} 
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke={chartColor}
                    strokeWidth={2}
                    fill={`url(#gradient-${color})`}
                    dot={false}
                    animationDuration={750}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};