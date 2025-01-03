'use client';

import { Flex } from '@/once-ui/components';
import { CardHeader } from './CardHeader';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';
import styles from './Card.module.scss';
import classNames from 'classnames';

interface CardProps {
    title?: string;
    subtitle?: string;
    actions?: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
    loading?: boolean;
    error?: string;
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> & {
    Header: typeof CardHeader;
    Body: typeof CardBody;
    Footer: typeof CardFooter;
} = ({
    title,
    subtitle,
    actions,
    footer,
    size = 'medium',
    loading,
    error,
    children,
    className
}) => {
    return (
        <Flex
            direction="column"
            className={classNames(styles.card, styles[size], className)}
            background="surface"
            border="neutral-medium"
            borderStyle="solid-1"
            radius="l">
            {(title || subtitle || actions) && (
                <CardHeader
                    title={title}
                    subtitle={subtitle}
                    actions={actions}
                />
            )}
            <CardBody loading={loading} error={error}>
                {children}
            </CardBody>
            {footer && <CardFooter>{footer}</CardFooter>}
        </Flex>
    );
};

// Attach subcomponents
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export { Card };
export type { CardProps };