'use client';

import { Flex } from '@/once-ui/components';
import styles from './Card.module.scss';

interface CardFooterProps {
    children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children }) => {
    return (
        <Flex
            fillWidth
            padding="16"
            gap="8"
            className={styles.footer}>
            {children}
        </Flex>
    );
};