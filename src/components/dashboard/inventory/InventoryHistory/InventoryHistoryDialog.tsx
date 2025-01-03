import { Dialog, Flex, Text, Tag } from '@/once-ui/components';
import { InventoryItem, InventoryMovement } from '@/lib/types/inventory';
import { MovementTable } from './MovementTable';
import { MovementSummary } from './MovementSummary';
import { useState, useEffect } from 'react';
import { fetchInventoryMovements } from '@/lib/mock/inventory';

interface InventoryHistoryDialogProps {
    isOpen: boolean;
    onClose: () => void;
    item: InventoryItem;
}

export const InventoryHistoryDialog: React.FC<InventoryHistoryDialogProps> = ({
    isOpen,
    onClose,
    item
}) => {
    const [movements, setMovements] = useState<InventoryMovement[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && item) {
            loadMovements();
        }
    }, [isOpen, item]);

    const loadMovements = async () => {
        setLoading(true);
        try {
            const data = await fetchInventoryMovements({ itemId: item.id });
            setMovements(data);
        } catch (error) {
            console.error('Error loading movements:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title="Inventory History"
            description={
                <Flex gap="8" alignItems="center">
                    <Text variant="body-default-m">{item.name}</Text>
                    {item.isControlled && (
                        <Tag
                            variant="warning"
                            size="s"
                            label="Controlled Substance"
                        />
                    )}
                </Flex>
            }>
            <Flex direction="column" gap="24">
                <MovementSummary movements={movements} />
                <MovementTable 
                    movements={movements}
                    loading={loading}
                    isControlled={item.isControlled}
                />
            </Flex>
        </Dialog>
    );
};