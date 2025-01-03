'use client';

import { Flex, Grid, Heading, RevealFx, Text } from '@/once-ui/components';
import { PricingTier } from './PricingTier';
import styles from './PricingSection.module.scss';

interface PricingFeature {
    feature: string;
    included: boolean;
}

interface PricingTierProps {
    name: string;
    price: number;
    interval: 'month' | 'year';
    description: string;
    features: PricingFeature[];
    isPopular?: boolean;
    ctaLabel?: string;
}

interface PricingSectionProps {
    title: string;
    subtitle?: string;
    tiers: PricingTierProps[];
}

export const PricingSection = ({ title, subtitle, tiers }: PricingSectionProps) => {
    return (
        <section className={styles.pricingSection}>
            <Flex
                direction="column"
                gap="48"
                alignItems="center">
                <Flex
                    direction="column"
                    gap="16"
                    alignItems="center">
                    <RevealFx>
                        <Heading
                            variant="heading-strong-xl"
                            align="center">
                            {title}
                        </Heading>
                    </RevealFx>

                    {subtitle && (
                        <RevealFx delay={0.2}>
                            <Text
                                variant="heading-default-l"
                                onBackground="neutral-medium"
                                align="center"
                                maxWidth={48}>
                                {subtitle}
                            </Text>
                        </RevealFx>
                    )}
                </Flex>

                <Grid
                    className={styles.tiersGrid}
                    gap="24">
                    {tiers.map((tier, index) => (
                        <RevealFx
                            key={tier.name}
                            delay={0.2 + (index * 0.1)}>
                            <PricingTier {...tier} />
                        </RevealFx>
                    ))}
                </Grid>
            </Flex>
        </section>
    );
};