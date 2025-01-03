'use client';

import { Flex, Heading, Text } from '@/once-ui/components';
import styles from './Card.module.scss';

interface CardHeaderProps {
    title?: string;
    subtitle?: string;
    actions?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
    title,
    subtitle,
    actions
}) => {
    return (
        <Flex
            fillWidth
            direction="column"
            gap="4"
            padding="16"
            className={styles.header}>
            <Flex
                fillWidth
                justifyContent="space-between"
                alignItems="flex-start"
                gap="16">
                <Flex direction="column" gap="4">
                    {title && (
                        <Heading variant="heading-strong-s">
                            {title}
                        </Heading>
                    )}
                    {subtitle && (
                        <Text
                            variant="body-default-s"
                            onBackground="neutral-medium">
                            {subtitle}
                        </Text>
                    )}
                </Flex>
                {actions && (
                    <Flex gap="8">
                        {actions}
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};