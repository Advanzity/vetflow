import { Select } from '@/once-ui/components';

interface TimeRangeSelectProps {
    value: string;
    onChange?: (value: string) => void;
}

const timeRangeOptions = [
    { label: 'Last 24h', value: '24h' },
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 90 days', value: '90d' }
];

export const TimeRangeSelect: React.FC<TimeRangeSelectProps> = ({
    value,
    onChange
}) => {
    return (
        <Select
            id="timeRange"
            label="Time Range"
            labelAsPlaceholder
            value={value}
            options={timeRangeOptions}
            onSelect={(option) => onChange?.(option.value)}
        />
    );
};