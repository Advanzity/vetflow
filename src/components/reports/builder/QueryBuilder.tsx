"use client";

import { useState } from 'react';
import { Card, Select, Input, Button, Flex, Text } from '@/once-ui/components';

interface QueryTemplate {
    id: string;
    name: string;
    description: string;
    fields: QueryField[];
}

interface QueryField {
    name: string;
    label: string;
    type: 'text' | 'date' | 'select' | 'number';
    options?: { label: string; value: string }[];
    required?: boolean;
}

const queryTemplates: QueryTemplate[] = [
    {
        id: 'appointments',
        name: 'Appointments Report',
        description: 'Generate report of appointments within a date range',
        fields: [
            {
                name: 'dateFrom',
                label: 'Date From',
                type: 'date',
                required: true
            },
            {
                name: 'dateTo',
                label: 'Date To',
                type: 'date',
                required: true
            },
            {
                name: 'status',
                label: 'Status',
                type: 'select',
                options: [
                    { label: 'All', value: 'all' },
                    { label: 'Scheduled', value: 'scheduled' },
                    { label: 'Completed', value: 'completed' },
                    { label: 'Cancelled', value: 'cancelled' }
                ]
            }
        ]
    },
    {
        id: 'inventory',
        name: 'Inventory Report',
        description: 'Generate report of current inventory status',
        fields: [
            {
                name: 'category',
                label: 'Category',
                type: 'select',
                options: [
                    { label: 'All', value: 'all' },
                    { label: 'Medications', value: 'medications' },
                    { label: 'Supplies', value: 'supplies' },
                    { label: 'Equipment', value: 'equipment' }
                ]
            },
            {
                name: 'stockLevel',
                label: 'Stock Level',
                type: 'select',
                options: [
                    { label: 'All', value: 'all' },
                    { label: 'Low Stock', value: 'low' },
                    { label: 'Out of Stock', value: 'out' },
                    { label: 'Well Stocked', value: 'good' }
                ]
            }
        ]
    }
];

export const QueryBuilder = () => {
    const [selectedTemplate, setSelectedTemplate] = useState<string>('');
    const [queryParams, setQueryParams] = useState<Record<string, string>>({});

    const handleTemplateChange = (option: { value: string }) => {
        setSelectedTemplate(option.value);
        setQueryParams({});
    };

    const handleFieldChange = (name: string, value: string) => {
        setQueryParams(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const template = queryTemplates.find(t => t.id === selectedTemplate);

    return (
        <Card>
            <Flex direction="column" gap="24" padding="24">
                <Text variant="heading-strong-m">Query Builder</Text>
                
                <Select
                    id="template"
                    label="Report Template"
                    value={selectedTemplate}
                    options={queryTemplates.map(t => ({
                        label: t.name,
                        value: t.id,
                        description: t.description
                    }))}
                    onSelect={(option) => handleTemplateChange(option)}
                />

                {template && (
                    <Flex direction="column" gap="16">
                        {template.fields.map(field => {
                            if (field.type === 'select' && field.options) {
                                return (
                                    <Select
                                        key={field.name}
                                        id={field.name}
                                        label={field.label}
                                        value={queryParams[field.name] || ''}
                                        options={field.options}
                                        onSelect={(option) => handleFieldChange(field.name, option.value)}
                                    />
                                );
                            }
                            return (
                                <Input
                                    key={field.name}
                                    id={field.name}
                                    label={field.label}
                                    type={field.type}
                                    value={queryParams[field.name] || ''}
                                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                                />
                            );
                        })}
                        
                        <Flex gap="8">
                            <Button
                                variant="primary"
                                label="Generate Report"
                            />
                            <Button
                                variant="secondary"
                                label="Save Template"
                            />
                        </Flex>
                    </Flex>
                )}
            </Flex>
        </Card>
    );
};