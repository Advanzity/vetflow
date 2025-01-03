import { Button, Flex } from '@/once-ui/components';

export interface HeroAction {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary';
}

interface HeroActionsProps {
    primaryAction?: HeroAction;
    secondaryAction?: HeroAction;
}

export const HeroActions: React.FC<HeroActionsProps> = ({
    primaryAction,
    secondaryAction
}) => {
    return (
        <Flex
            gap="16"
            justifyContent="center"
            tabletDirection="column">
            {primaryAction && (
                <Button
                    size="l"
                    variant="primary"
                    label={primaryAction.label}
                    href={primaryAction.href}
                />
            )}
            {secondaryAction && (
                <Button
                    size="l"
                    variant="secondary"
                    label={secondaryAction.label}
                    href={secondaryAction.href}
                />
            )}
        </Flex>
    );
};