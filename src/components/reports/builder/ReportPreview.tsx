"use client";

import { Card, Flex, Text } from '@/once-ui/components';

interface PreviewData {
    columns: string[];
    data: any[];
}

interface ReportPreviewProps {
    data?: PreviewData;
    loading?: boolean;
}

export const ReportPreview: React.FC<ReportPreviewProps> = ({
    data,
    loading = false
}) => {
    if (loading) {
        return (
            <Card>
                <Flex direction="column" gap="16" padding="24">
                    <Text variant="heading-strong-m">Preview</Text>
                    <Flex justifyContent="center" padding="32">
                        <Text variant="body-default-m">Loading preview...</Text>
                    </Flex>
                </Flex>
            </Card>
        );
    }

    if (!data) {
        return (
            <Card>
                <Flex direction="column" gap="16" padding="24">
                    <Text variant="heading-strong-m">Preview</Text>
                    <Flex justifyContent="center" padding="32">
                        <Text variant="body-default-m">Configure your report to see a preview</Text>
                    </Flex>
                </Flex>
            </Card>
        );
    }

    return (
        <Card>
            <Flex direction="column" gap="16" padding="24">
                <Text variant="heading-strong-m">Preview</Text>
                
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                {data.columns.map((column, index) => (
                                    <th
                                        key={index}
                                        style={{
                                            padding: '12px',
                                            textAlign: 'left',
                                            borderBottom: '1px solid var(--neutral-border-medium)'
                                        }}>
                                        {column}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {Object.values(row).map((cell: any, cellIndex) => (
                                        <td
                                            key={cellIndex}
                                            style={{
                                                padding: '12px',
                                                borderBottom: '1px solid var(--neutral-border-weak)'
                                            }}>
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Flex>
        </Card>
    );
};