import { Flex } from '@/once-ui/components';

interface InventoryProgressBarProps {
    current: number;
    total: number;
    status: 'ok' | 'low' | 'critical';
}

export const InventoryProgressBar = ({ current, total, status }: InventoryProgressBarProps) => {
    const percentage = Math.min(Math.round((current / total) * 100), 100);
    
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ok':
                return 'var(--success-solid-medium)';
            case 'low':
                return 'var(--warning-solid-medium)';
            case 'critical':
                return 'var(--danger-solid-medium)';
            default:
                return 'var(--neutral-solid-medium)';
        }
    };

    return (
        <Flex
            fillWidth
            height="8"
            background="neutral-weak"
            radius="full">
            <Flex
                height="8"
                radius="full"
                style={{
                    width: `${percentage}%`,
                    backgroundColor: getStatusColor(status),
                    transition: 'width 0.3s ease-in-out'
                }}
            />
        </Flex>
    );
};