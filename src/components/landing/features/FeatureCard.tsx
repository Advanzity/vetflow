import { Flex, Icon, Heading, Text } from '@/once-ui/components';
import styles from './FeatureCard.module.scss';

export interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
    icon,
    title,
    description
}) => {
    return (
        <div 
            className={styles.card}
            role="article"
            aria-labelledby={`feature-${title}`}>
            <div className={styles.iconWrapper}>
                <Icon
                    name={icon}
                    size="m"
                    onBackground="brand-medium" />
            </div>
            <Flex direction="column" gap="8">
                <Heading
                    id={`feature-${title}`}
                    variant="heading-strong-s">
                    {title}
                </Heading>
                <Text
                    variant="body-default-s"
                    onBackground="neutral-medium">
                    {description}
                </Text>
            </Flex>
        </div>
    );
};