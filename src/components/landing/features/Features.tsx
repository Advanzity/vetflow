import { Flex, RevealFx, Text, Heading } from '@/once-ui/components';
import { FeatureCard, FeatureCardProps } from './FeatureCard';
import styles from './Features.module.scss';

export interface FeaturesProps {
    heading: string;
    subheading?: string;
    features: FeatureCardProps[];
    animate?: boolean;
}

export const Features: React.FC<FeaturesProps> = ({
    heading,
    subheading,
    features,
    animate = true
}) => {
    return (
        <section 
            className={styles.features}
            aria-labelledby="features-heading">
            <Flex
                direction="column"
                gap="48">
                <Flex
                    direction="column"
                    gap="16"
                    alignItems="center">
                    <RevealFx trigger={animate}>
                        <Heading
                            id="features-heading"
                            variant="heading-strong-l"
                            align="center">
                            {heading}
                        </Heading>
                    </RevealFx>

                    {subheading && (
                        <RevealFx 
                            trigger={animate}
                            delay={0.2}>
                            <Text
                                variant="heading-default-m"
                                onBackground="neutral-medium"
                                align="center"
                                maxWidth={48}>
                                {subheading}
                            </Text>
                        </RevealFx>
                    )}
                </Flex>

                <div className={styles.grid}>
                    {features.map((feature, index) => (
                        <RevealFx
                            key={feature.title}
                            trigger={animate}
                            delay={0.2 + (index * 0.1)}>
                            <FeatureCard {...feature} />
                        </RevealFx>
                    ))}
                </div>
            </Flex>
        </section>
    );
};