import { Card, Flex, Text, Spinner } from '@/once-ui/components';
import { InventoryItem } from '@/lib/types/inventory';
import styles from './InventoryList.module.scss';

interface InventoryListProps {
    items: InventoryItem[];
    isLoading: boolean;
    error?: string;
}

export const InventoryList: React.FC<InventoryListProps> = ({
    items,
    isLoading,
    error
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
                <Card key={item.id}>
                    <Flex direction="column" gap="8" padding="16">
                        <Text variant="heading-strong-s">
                            {item.name}
                        </Text>
                        <Flex justifyContent="space-between">
                            <Text 
                                variant="body-default-s" 
                                onBackground="neutral-medium">
                                Code: {item.code}
                            </Text>
                            <Text 
                                variant="body-strong-s" 
                                onBackground={item.quantity < item.reorderPoint ? 'danger-medium' : 'success-medium'}>
                                {item.quantity} in stock
                            </Text>
                        </Flex>
                    </Flex>
                </Card>
            ))}
        </div>
    );
}