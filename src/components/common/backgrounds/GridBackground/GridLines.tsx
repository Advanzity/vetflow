import React from 'react';
import styles from './GridLines.module.scss';
import classNames from 'classnames';

interface GridLinesProps {
    speed: 'slow' | 'normal' | 'fast';
    density: 'low' | 'medium' | 'high';
    color?: string;
}

const GridLines: React.FC<GridLinesProps> = ({
    speed,
    density,
    color
}) => {
    const lineCount = {
        low: 10,
        medium: 20,
        high: 30
    }[density];

    // Create double the lines for infinite effect
    const totalLines = lineCount * 2;
    
    return (
        <>
            <div className={styles.horizontalLines}>
                {[...Array(totalLines)].map((_, index) => (
                    <div
                        key={`h-${index}`}
                        className={classNames(
                            styles.line,
                            styles.horizontal,
                            styles[speed]
                        )}
                        style={{
                            background: color,
                            top: `${((index % lineCount) / lineCount) * 100}%`,
                            animation: `${styles.moveForward} ${speed === 'slow' ? 8 : speed === 'fast' ? 3 : 5}s linear infinite`,
                            animationDelay: `-${(index / totalLines) * (speed === 'slow' ? 8 : speed === 'fast' ? 3 : 5)}s`
                        }}
                    />
                ))}
            </div>
            <div className={styles.verticalLines}>
                {[...Array(totalLines)].map((_, index) => (
                    <div
                        key={`v-${index}`}
                        className={classNames(
                            styles.line,
                            styles.vertical,
                            styles[speed]
                        )}
                        style={{
                            background: color,
                            left: `${((index % lineCount) / lineCount) * 100}%`,
                            animation: `${styles.moveForward} ${speed === 'slow' ? 8 : speed === 'fast' ? 3 : 5}s linear infinite`,
                            animationDelay: `-${(index / totalLines) * (speed === 'slow' ? 8 : speed === 'fast' ? 3 : 5)}s`
                        }}
                    />
                ))}
            </div>
        </>
    );
};

export { GridLines };