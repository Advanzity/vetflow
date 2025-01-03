import { Icon } from '@/once-ui/components';
import styles from './ChartCard.module.scss';
import classNames from 'classnames';

interface TrendIndicatorProps {
    percentage: number;
}

export const TrendIndicator: React.FC<TrendIndicatorProps> = ({ percentage }) => {
    const isPositive = percentage >= 0;
    
    return (
        <span className={classNames(
            styles.trend,
            isPositive ? styles.positive : styles.negative
        )}>
            <Icon
                name={isPositive ? 'trendingUp' : 'trendingDown'}
                size="s"
            />
            {Math.abs(percentage)}%
        </span>
    );
};