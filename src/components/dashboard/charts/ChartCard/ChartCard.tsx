import { Flex, Text, Card } from '@/once-ui/components';
import { TimeRangeSelect } from './TimeRangeSelect';
import { ChartRenderer } from './ChartRenderer';
import { TrendIndicator } from './TrendIndicator';
import styles from './ChartCard.module.scss';

interface ChartCardProps {
    title: string;
    value: string;
    trendPercentage: number;
    data: Array<{ name: string; value: number }>;
    chartType?: 'line' | 'area' | 'bar';
    timeRange?: '24h' | '7d' | '30d' | '90d';
    onTimeRangeChange?: (range: string) => void;
}

export const ChartCard: React.FC<ChartCardProps> = ({
    title,
    value,
    trendPercentage,
    data,
    chartType = 'line',
    timeRange = '7d',
    onTimeRangeChange
}) => {
    return (
        <Card>
            <Flex direction="column" gap="24">
                <Flex 
                    fillWidth 
                    justifyContent="space-between" 
                    alignItems="flex-start">
                    <div className={styles.header}>
                        <Text
                            variant="body-default-s"
                            onBackground="neutral-medium">
                            {title}
                        </Text>
                        <Flex gap="12" alignItems="baseline">
                            <span className={styles.value}>
                                {value}
                            </span>
                            <TrendIndicator percentage={trendPercentage} />
                        </Flex>
                    </div>
                    <div className={styles.timeRange}>
                        <TimeRangeSelect
                            value={timeRange}
                            onChange={onTimeRangeChange}
                        />
                    </div>
                </Flex>
                
                <div className={styles.chartContainer}>
                    <ChartRenderer
                        data={data}
                        type={chartType}
                        isPositive={trendPercentage >= 0}
                    />
                </div>
            </Flex>
        </Card>
    );
};