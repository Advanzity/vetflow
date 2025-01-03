import { Card, Flex, Text, Spinner, IconButton } from '@/once-ui/components';
import { InventoryItem } from '@/lib/types/inventory';
import { Tag } from '@/once-ui/components';
import styles from './InventoryList.module.scss';

export interface InventoryListProps {
    items: InventoryItem[];
    isLoading: boolean;
    error?: string;
    onEdit?: (item: InventoryItem) => void;
    onViewHistory?: (item: InventoryItem) => void;
    onRecordMovement?: (item: InventoryItem) => void;
}

export const InventoryList: React.FC<InventoryListProps> = ({
    items,
    isLoading,
    error,
    onEdit,
    onViewHistory,
    onRecordMovement
}) => {
    if (isLoading) {
        return (
            <Flex justifyContent="center" padding="32">
                <Spinner size="l" />
            </Flex>
        );
    }

    if (error) {
        return (
            <Card>
                <Text 
                    variant="body-default-m" 
                    onBackground="danger-medium"
                    align="center">
                    {error}
                </Text>
            </Card>
        );
    }

    return (
        <div className={styles.grid}>
            {items.map((item) => (
                <Card 
                    key={item.id} 
                    style={{ height: '100%' }}
                    actions={onEdit && (
                        <IconButton
                            icon="edit"
                            variant="ghost"
                            tooltip="Edit"
                            onClick={() => onEdit(item)}
                        />
                    )}>
                    <Flex direction="column" gap="8" padding="16">
                        <Text variant="heading-strong-s">
                            {item.name}
                            {item.isControlled && (
                                <Tag
                                    variant="warning"
                                    size="s"
                                    label="Controlled"
                                    style={{ marginLeft: '8px' }}
                                />
                            )}
                        </Text>
                        <Flex justifyContent="space-between">
                            <Text 
                                variant="body-default-s" 
                                onBackground="neutral-medium">
                                Batch: {item.batchNumber || 'N/A'}
                            </Text>
                            <Text 
                                variant="body-strong-s" 
                                onBackground={item.quantity < item.reorderPoint ? 'danger-medium' : 'success-medium'}>
                                {item.quantity} in stock
                            </Text>
                        </Flex>
                        <Flex justifyContent="space-between" alignItems="center">
                            <Text
                                variant="body-default-xs"
                                onBackground="neutral-medium">
                                Expires: {item.expirationDate?.toLocaleDateString() || 'N/A'}
                            </Text>
                            <Flex gap="8">
                                {onViewHistory && (
                                    <IconButton
                                        icon="history"
                                        variant="ghost"
                                        tooltip="View History"
                                        onClick={() => onViewHistory(item)}
                                    />
                                )}
                                {onRecordMovement && (
                                    <IconButton
                                        icon="moveVertical"
                                        variant="ghost"
                                        tooltip="Record Movement"
                                        onClick={() => onRecordMovement(item)}
                                    />
                                )}
                                {onEdit && (
                                    <IconButton
                                        icon="edit"
                                        variant="ghost"
                                        tooltip="Edit"
                                        onClick={() => onEdit(item)}
                                    />
                                )}
                            </Flex>
                        </Flex>
                    </Flex>
                </Card>
            ))}
        </div>
    );
}