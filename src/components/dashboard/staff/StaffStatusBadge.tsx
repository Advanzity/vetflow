import { Tag } from '@/once-ui/components';

interface StaffStatusBadgeProps {
    status: 'available' | 'busy' | 'off';
}

export const StaffStatusBadge = ({ status }: StaffStatusBadgeProps) => {
    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'available':
                return {
                    variant: 'success' as const,
                    label: 'Available'
                };
            case 'busy':
                return {
                    variant: 'warning' as const,
                    label: 'Busy'
                };
            case 'off':
                return {
                    variant: 'neutral' as const,
                    label: 'Off'
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