import React from 'react';
import { Flex } from '@/once-ui/components';
import { GridLines } from './GridLines';
import styles from './GridBackground.module.scss';

interface GridBackgroundProps {
    speed?: 'slow' | 'normal' | 'fast';
    density?: 'low' | 'medium' | 'high';
    perspective?: number;
    opacity?: number;
    color?: string;
}

const GridBackground: React.FC<GridBackgroundProps> = ({
    speed = 'normal',
    density = 'medium',
    perspective = 1000,
    opacity = 0.15,
    color
}) => {
    return (
        <Flex 
            className={styles.container}
            position="fixed"
            style={{ 
                opacity,
                perspective: `${perspective * 2}px`
            }}>
            <div className={styles.wrapper}>
                <GridLines 
                    speed={speed}
                    density={density}
                    color={color}
                />
            </div>
            <div className={styles.overlay} />
        </Flex>
    );
};

export { GridBackground };
export type { GridBackgroundProps };