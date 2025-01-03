import { Tag } from '@/once-ui/components';

interface InventoryStatusBadgeProps {
    status: 'ok' | 'low' | 'critical';
}

export const InventoryStatusBadge = ({ status }: InventoryStatusBadgeProps) => {
    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'ok':
                return {
                    variant: 'success' as const,
                    label: 'In Stock'
                };
            case 'low':
                return {
                    variant: 'warning' as const,
                    label: 'Low Stock'
                };
            case 'critical':
                return {
                    variant: 'danger' as const,
                    label: 'Critical'
                };
            default:
                return {
                    variant: 'neutral' as const,
                    label: 'Unknown'
                };
        }
    };

    const config = getStatusConfig(status);

    return (
        <Tag
            variant={config.variant}
            label={config.label}
            size="s"
        />
    );
};