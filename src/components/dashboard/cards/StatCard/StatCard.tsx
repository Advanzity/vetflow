import { Flex, Icon, Text, Card } from '@/once-ui/components';
import { TrendIndicator } from './TrendIndicator';
import { MiniChart } from './MiniChart';
import styles from './StatCard.module.scss';
import classNames from 'classnames';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  icon: string;
  color?: 'brand' | 'accent' | 'success' | 'warning';
  data?: Array<{ value: number }>;
  loading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  icon,
  color = 'brand',
  data = [],
  loading,
}) => {
  const trendValue = parseFloat(trend);

  return (
    <Card>
      <Flex direction="column" gap="16" padding="24">
        {/* Header with Icon and Trend */}
        <Flex fillWidth justifyContent="space-between" alignItems="center">
          <div className={classNames(styles.iconWrapper, styles[color])}>
            <Icon name={icon} size="m" onBackground={`${color}-medium`} />
          </div>
          <TrendIndicator value={trendValue} />
        </Flex>

        {/* Value and Title */}
        <Flex direction="column" gap="8">
          <Text variant="heading-strong-xl" onBackground="neutral-strong">
            {value}
          </Text>
          <Text variant="body-default-s" onBackground="neutral-medium">
            {title}
          </Text>
        </Flex>

        {/* Chart */}
        {data.length > 0 && (
          <div className={styles.chartWrapper}>
            <MiniChart data={data} color={color} trend={trendValue} />
          </div>
        )}
      </Flex>
    </Card>
  );
};
