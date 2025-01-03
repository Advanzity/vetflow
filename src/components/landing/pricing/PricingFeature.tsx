'use client';

import { Flex, Icon, Text } from '@/once-ui/components';

interface PricingFeatureProps {
    feature: string;
    included?: boolean;
}

export const PricingFeature = ({
    feature,
    included = true
}: PricingFeatureProps) => {
    return (
        <Flex gap="8" alignItems="center">
            <Icon
                name={included ? "check" : "minus"}
                size="s"
                onBackground={included ? "success-medium" : "neutral-medium"}
            />
            <Text
                variant="body-default-s"
                onBackground={included ? "neutral-strong" : "neutral-medium"}>
                {feature}
            </Text>
        </Flex>
    );
};