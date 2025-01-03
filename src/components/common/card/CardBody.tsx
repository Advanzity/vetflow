'use client';

import { Flex, Text } from '@/once-ui/components';
import { CardSkeleton } from './CardSkeleton';
import styles from './Card.module.scss';

interface CardBodyProps {
    loading?: boolean;
    error?: string;
    children: React.ReactNode;
}

export const CardBody: React.FC<CardBodyProps> = ({
    loading,
    error,
    children
}) => {
    if (loading) {
        return <CardSkeleton />;
    }

    if (error) {
        return (
            <Flex
                fillWidth
                padding="16"
                justifyContent="center"
                alignItems="center">
                <Text
                    variant="body-default-s"
                    onBackground="danger-medium">
                    {error}
                </Text>
            </Flex>
        );
    }

    return (
        <div className={styles.body}>
            {children}
        </div>
    );
};