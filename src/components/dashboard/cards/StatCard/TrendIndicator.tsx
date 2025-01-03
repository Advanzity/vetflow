import { Flex, Icon } from '@/once-ui/components';
import styles from './TrendIndicator.module.scss';
import classNames from 'classnames';

interface TrendIndicatorProps {
    value: number;
}

export const TrendIndicator: React.FC<TrendIndicatorProps> = ({ value }) => {
    const isPositive = value >= 0;
    
    return (
        <Flex
            alignItems="center"
            gap="4"
            className={classNames(
            styles.trend,
            isPositive ? styles.positive : styles.negative
        )}>
            <Icon
                name={isPositive ? 'trendingUp' : 'trendingDown'}
                size="s"
                onBackground={isPositive ? 'success-medium' : 'danger-medium'}
            />
            <span>{Math.abs(value)}%</span>
        </Flex>
    );
};