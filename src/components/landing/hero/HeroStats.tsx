import { Heading, Text } from '@/once-ui/components';
import styles from './HeroStats.module.scss';

export interface HeroStat {
    value: string;
    label: string;
    description: string;
}

interface HeroStatsProps {
    stats: HeroStat[];
}

export const HeroStats: React.FC<HeroStatsProps> = ({
    stats
}) => {
    return (
        <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
                <div 
                    key={index} 
                    className={styles.statItem}
                    role="article"
                    aria-label={`${stat.label} statistic`}>
                    <Heading variant="display-strong-m">
                        {stat.value}
                    </Heading>
                    <Text
                        variant="heading-strong-xs"
                        onBackground="brand-medium">
                        {stat.label}
                    </Text>
                    <Text
                        variant="body-default-s"
                        onBackground="neutral-medium"
                        align="center">
                        {stat.description}
                    </Text>
                </div>
            ))}
        </div>
    );
};