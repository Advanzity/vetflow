"use client";
import { useState } from 'react';
import { Card, Select, Switch, Flex, Text } from '@/once-ui/components';

interface Column {
    id: string;
    name: string;
    enabled: boolean;
}

interface OutputFormat {
    id: string;
    name: string;
    icon: string;
}

const outputFormats: OutputFormat[] = [
    { id: 'pdf', name: 'PDF Document', icon: 'fileText' },
    { id: 'excel', name: 'Excel Spreadsheet', icon: 'table' },
    { id: 'csv', name: 'CSV File', icon: 'database' },
    { id: 'html', name: 'HTML Report', icon: 'code' }
];

const defaultColumns: Column[] = [
    { id: 'date', name: 'Date', enabled: true },
    { id: 'patientName', name: 'Patient Name', enabled: true },
    { id: 'ownerName', name: 'Owner Name', enabled: true },
    { id: 'service', name: 'Service', enabled: true },
    { id: 'amount', name: 'Amount', enabled: true },
    { id: 'status', name: 'Status', enabled: true }
];

export const OutputConfig = () => {
    const [format, setFormat] = useState('pdf');
    const [columns, setColumns] = useState<Column[]>(defaultColumns);
    const [groupBy, setGroupBy] = useState('none');
    const [sortBy, setSortBy] = useState('date');

    const toggleColumn = (columnId: string) => {
        setColumns(prev => prev.map(col => 
            col.id === columnId ? { ...col, enabled: !col.enabled } : col
        ));
    };

    return (
        <Card>
            <Flex direction="column" gap="24" padding="24">
                <Text variant="heading-strong-m">Output Configuration</Text>

                <Select
                    id="format"
                    label="Output Format"
                    value={format}
                    options={outputFormats.map(f => ({
                        label: f.name,
                        value: f.id,
                        hasPrefix: <Text variant="body-default-s">{f.icon}</Text>
                    }))}
                    onSelect={(option) => setFormat(option.value)}
                />

                <Flex direction="column" gap="8">
                    <Text variant="heading-strong-s">Columns</Text>
                    {columns.map(column => (
                        <Switch
                            key={column.id}
                            label={column.name}
                            isChecked={column.enabled}
                            onToggle={() => toggleColumn(column.id)}
                        />
                    ))}
                </Flex>

                <Select
                    id="groupBy"
                    label="Group By"
                    value={groupBy}
                    options={[
                        { label: 'None', value: 'none' },
                        { label: 'Date', value: 'date' },
                        { label: 'Service Type', value: 'service' },
                        { label: 'Status', value: 'status' }
                    ]}
                    onSelect={(option) => setGroupBy(option.value)}
                />

                <Select
                    id="sortBy"
                    label="Sort By"
                    value={sortBy}
                    options={[
                        { label: 'Date', value: 'date' },
                        { label: 'Patient Name', value: 'patientName' },
                        { label: 'Amount', value: 'amount' }
                    ]}
                    onSelect={(option) => setSortBy(option.value)}
                />
            </Flex>
        </Card>
    );
};