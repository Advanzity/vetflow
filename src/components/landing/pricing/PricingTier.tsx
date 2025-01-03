'use client';

import { Button, Flex, Heading, Text } from '@/once-ui/components';
import { PricingFeature } from './PricingFeature';
import styles from './PricingTier.module.scss';

interface PricingFeatureItem {
    feature: string;
    included: boolean;
}

interface PricingTierProps {
    name: string;
    price: number;
    interval: 'month' | 'year';
    description: string;
    features: PricingFeatureItem[];
    isPopular?: boolean;
    ctaLabel?: string;
}

export const PricingTier = ({
    name,
    price,
    interval,
    description,
    features,
    isPopular,
    ctaLabel = 'Get Started'
}: PricingTierProps) => {
    return (
        <Flex
            direction="column"
            gap="24"
            padding="32"
            radius="xl"
            background="surface"
            border={isPopular ? "brand-medium" : "neutral-medium"}
            borderStyle="solid-1"
            shadow={isPopular ? "xl" : "l"}
            className={styles.tier}>
            <Flex direction="column" gap="8">
                <Heading variant="heading-strong-l">
                    {name}
                </Heading>
                <Text
                    variant="body-default-m"
                    onBackground="neutral-medium">
                    {description}
                </Text>
            </Flex>

            <Flex direction="column" gap="4">
                <Flex alignItems="baseline" gap="8">
                    <Text variant="display-strong-m">
                        ${price}
                    </Text>
                    <Text
                        variant="body-default-s"
                        onBackground="neutral-weak">
                        per {interval}
                    </Text>
                </Flex>
            </Flex>

            <Flex
                direction="column"
                gap="12">
                {features.map((feature, index) => (
                    <PricingFeature
                        key={index}
                        feature={feature.feature}
                        included={feature.included}
                    />
                ))}
            </Flex>

            <Button
                variant={isPopular ? "primary" : "secondary"}
                size="l"
                fillWidth
                label={ctaLabel}
            />
        </Flex>
    );
};