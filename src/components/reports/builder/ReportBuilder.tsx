"use client";
import React, { useState } from 'react';
import { ReportPreview } from '@/components/reports/builder/ReportPreview';
import { Card, Button, Input, Flex, Text, Select } from '@/once-ui/components';

// Re-using existing interfaces
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

interface Column {
    id: string;
    name: string;
    enabled: boolean;
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

const defaultColumns: Column[] = [
    { id: 'date', name: 'Date', enabled: true },
    { id: 'patientName', name: 'Patient Name', enabled: true },
    { id: 'ownerName', name: 'Owner Name', enabled: true },
    { id: 'service', name: 'Service', enabled: true },
    { id: 'amount', name: 'Amount', enabled: true },
    { id: 'status', name: 'Status', enabled: true }
];


const ReportBuilder = () => {
    // Template Management State
    const [templates, setTemplates] = useState(queryTemplates);
    const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
    const [newTemplate, setNewTemplate] = useState<QueryTemplate>({
        id: '',
        name: '',
        description: '',
        fields: []
    });

    // Active Report State
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [queryParams, setQueryParams] = useState<Record<string, string>>({});
    const [columns, setColumns] = useState<Column[]>(defaultColumns);
    const [previewData, setPreviewData] = useState<PreviewData | undefined>();
    const [loading, setLoading] = useState(false);

    // Output Configuration State
    const [format, setFormat] = useState('pdf');
    const [groupBy, setGroupBy] = useState('none');
    const [sortBy, setSortBy] = useState('date');

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

    const handleAddField = () => {
        setNewTemplate(prev => ({
            ...prev,
            fields: [
                ...prev.fields,
                {
                    name: '',
                    label: '',
                    type: 'text',
                    required: false
                }
            ]
        }));
    };

    const handleSaveTemplate = () => {
        if (newTemplate.name && newTemplate.fields.length > 0) {
            setTemplates(prev => [...prev, {
                ...newTemplate,
                id: newTemplate.name.toLowerCase().replace(/\s+/g, '-')
            }]);
            setIsCreatingTemplate(false);
            setNewTemplate({
                id: '',
                name: '',
                description: '',
                fields: []
            });
        }
    };

    const handleGeneratePreview = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setPreviewData({
                columns: columns.filter(col => col.enabled).map(col => col.name),
                data: [
                    {
                        date: '2024-12-26',
                        patientName: 'Sample Patient',
                        ownerName: 'Sample Owner',
                        service: 'Checkup',
                        amount: '$150',
                        status: 'Completed'
                    }
                ]
            });
            setLoading(false);
        }, 1000);
    };

    const template = templates.find(t => t.id === selectedTemplate);

    return (
        <Flex direction="column" gap="24">
            {/* Template Creation UI */}
            {isCreatingTemplate ? (
                <Card>
                    <Flex direction="column" gap="24" padding="24">
                        <Text variant="heading-strong-m">Create New Report Template</Text>
                        
                        <Input
                            id="templateName"
                            label="Template Name"
                            value={newTemplate.name}
                            onChange={(e) => setNewTemplate(prev => ({
                                ...prev,
                                name: e.target.value
                            }))}
                        />
                        
                        <Input
                            id="templateDescription"
                            label="Description"
                            value={newTemplate.description}
                            onChange={(e) => setNewTemplate(prev => ({
                                ...prev,
                                description: e.target.value
                            }))}
                        />

                        <Text variant="heading-strong-s">Fields</Text>
                        {newTemplate.fields.map((field, index) => (
                            <Flex key={index} gap="16">
                                <Input
                                    label="Field Name"
                                    value={field.label}
                                    onChange={(e) => {
                                        const updatedFields = [...newTemplate.fields];
                                        updatedFields[index] = {
                                            ...field,
                                            name: e.target.value.toLowerCase().replace(/\s+/g, '_'),
                                            label: e.target.value
                                        };
                                        setNewTemplate(prev => ({
                                            ...prev,
                                            fields: updatedFields
                                        }));
                                    }}
                                />
                                <Select
                                    label="Type"
                                    value={field.type}
                                    options={[
                                        { label: 'Text', value: 'text' },
                                        { label: 'Date', value: 'date' },
                                        { label: 'Number', value: 'number' },
                                        { label: 'Select', value: 'select' }
                                    ]}
                                    onSelect={(option) => {
                                        const updatedFields = [...newTemplate.fields];
                                        updatedFields[index] = {
                                            ...field,
                                            type: option.value as QueryField['type']
                                        };
                                        setNewTemplate(prev => ({
                                            ...prev,
                                            fields: updatedFields
                                        }));
                                    }}
                                />
                            </Flex>
                        ))}

                        <Flex gap="16">
                            <Button
                                variant="secondary"
                                label="Add Field"
                                onClick={handleAddField}
                            />
                            <Button
                                variant="primary"
                                label="Save Template"
                                onClick={handleSaveTemplate}
                            />
                            <Button
                                variant="secondary"
                                label="Cancel"
                                onClick={() => setIsCreatingTemplate(false)}
                            />
                        </Flex>
                    </Flex>
                </Card>
            ) : (
                <>
                    {/* Query Builder */}
                    <Card>
                        <Flex direction="column" gap="24" padding="24">
                            <Flex justifyContent="space-between" alignItems="center">
                                <Text variant="heading-strong-m">Query Builder</Text>
                                <Button
                                    variant="secondary"
                                    label="Create New Template"
                                    onClick={() => setIsCreatingTemplate(true)}
                                />
                            </Flex>
                            
                            <Select
                                id="template"
                                label="Report Template"
                                value={selectedTemplate}
                                options={templates.map(t => ({
                                    label: t.name,
                                    value: t.id,
                                    description: t.description
                                }))}
                                onSelect={handleTemplateChange}
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
                                </Flex>
                            )}
                        </Flex>
                    </Card>

                    {/* Output Configuration */}
                    <Card>
                        <Flex direction="column" gap="24" padding="24">
                            <Text variant="heading-strong-m">Output Configuration</Text>

                            <Select
                                id="format"
                                label="Output Format"
                                value={format}
                                options={[
                                    { label: 'PDF Document', value: 'pdf' },
                                    { label: 'Excel Spreadsheet', value: 'excel' },
                                    { label: 'CSV File', value: 'csv' }
                                ]}
                                onSelect={(option) => setFormat(option.value)}
                            />

                            <Select
                                id="groupBy"
                                label="Group By"
                                value={groupBy}
                                options={[
                                    { label: 'None', value: 'none' },
                                    { label: 'Date', value: 'date' },
                                    { label: 'Status', value: 'status' }
                                ]}
                                onSelect={(option) => setGroupBy(option.value)}
                            />

                            <Button
                                variant="primary"
                                label="Generate Preview"
                                onClick={handleGeneratePreview}
                            />
                        </Flex>
                    </Card>

                    {/* Preview */}
                    <ReportPreview data={previewData} loading={loading} />
                </>
            )}
        </Flex>
    );
};

export default ReportBuilder;