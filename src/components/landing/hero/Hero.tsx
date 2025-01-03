'use client';

import { Button, Flex, Heading, RevealFx, Text } from '@/once-ui/components';
import { RoadBackground } from '@/components/backgrounds/RoadBackground';
import styles from './Hero.module.scss';

interface CTAButton {
    label: string;
    href: string;
}

interface HeroProps {
    title: string;
    subtitle: string;
    primaryCTA: CTAButton;
    secondaryCTA?: CTAButton;
}

const Hero: React.FC<HeroProps> = ({
    title,
    subtitle,
    primaryCTA,
    secondaryCTA
}) => {
    return (
        <section className={styles.hero}>
            <Flex
                direction="column"
                gap="32"
                alignItems="center"
                className={styles.content}>
                <RevealFx>
                    <Heading
                        variant="display-strong-xl"
                        align="center"
                        maxWidth={48}>
                        {title}
                    </Heading>
                </RevealFx>

                <RevealFx delay={0.2}>
                    <Text
                        variant="heading-default-l"
                        onBackground="neutral-medium"
                        align="center"
                        maxWidth={40}>
                        {subtitle}
                    </Text>
                </RevealFx>

                <RevealFx delay={0.4}>
                    <Flex
                        gap="16"
                        direction="row"
                        tabletDirection="column"
                        fillWidth
                        className={styles.ctaContainer}>
                        <Button
                            size="l"
                            variant="primary"
                            fillWidth
                            label={primaryCTA.label}
                            href={primaryCTA.href}
                        />
                        {secondaryCTA && (
                            <Button
                                size="l"
                                variant="secondary"
                                fillWidth
                                label={secondaryCTA.label}
                                href={secondaryCTA.href}
                            />
                        )}
                    </Flex>
                </RevealFx>
            </Flex>
        </section>
    );
};

export { Hero };
export type { HeroProps, CTAButton };