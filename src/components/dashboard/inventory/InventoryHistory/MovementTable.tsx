import { Flex, Text, Tag, Spinner } from '@/once-ui/components';
import { InventoryMovement } from '@/lib/types/inventory';

interface MovementTableProps {
    movements: InventoryMovement[];
    loading: boolean;
    isControlled: boolean;
}

export const MovementTable: React.FC<MovementTableProps> = ({
    movements,
    loading,
    isControlled
}) => {
    if (loading) {
        return (
            <Flex justifyContent="center" padding="32">
                <Spinner size="l" />
            </Flex>
        );
    }

    return (
        <Flex direction="column" gap="8">
            <Flex
                fillWidth
                padding="12"
                background="neutral-weak"
                radius="m">
                <Flex style={{ width: '15%' }}>
                    <Text variant="label-strong-s">Date</Text>
                </Flex>
                <Flex style={{ width: '15%' }}>
                    <Text variant="label-strong-s">Type</Text>
                </Flex>
                <Flex style={{ width: '10%' }}>
                    <Text variant="label-strong-s">Quantity</Text>
                </Flex>
                <Flex style={{ width: '20%' }}>
                    <Text variant="label-strong-s">Location</Text>
                </Flex>
                <Flex style={{ width: '20%' }}>
                    <Text variant="label-strong-s">Performed By</Text>
                </Flex>
                {isControlled && (
                    <Flex style={{ width: '20%' }}>
                        <Text variant="label-strong-s">Witnessed By</Text>
                    </Flex>
                )}
            </Flex>

            {movements.map((movement) => (
                <Flex
                    key={movement.id}
                    fillWidth
                    padding="12"
                    background="surface"
                    radius="m"
                    border="neutral-medium"
                    borderStyle="solid-1">
                    <Flex style={{ width: '15%' }}>
                        <Text variant="body-default-s">
                            {movement.createdAt.toLocaleDateString()}
                        </Text>
                    </Flex>
                    <Flex style={{ width: '15%' }}>
                        <Tag
                            variant={
                                movement.type === 'receipt' ? 'success' :
                                movement.type === 'issue' ? 'warning' :
                                movement.type === 'disposal' ? 'danger' :
                                'neutral'
                            }
                            size="s"
                            label={movement.type}
                        />
                    </Flex>
                    <Flex style={{ width: '10%' }}>
                        <Text variant="body-default-s">
                            {movement.type === 'receipt' || movement.type === 'return' ? '+' : '-'}
                            {movement.quantity}
                        </Text>
                    </Flex>
                    <Flex style={{ width: '20%' }}>
                        <Text variant="body-default-s">
                            {movement.fromLocation && movement.toLocation ? 
                                `${movement.fromLocation} → ${movement.toLocation}` :
                                movement.toLocation || movement.fromLocation || '-'
                            }
                        </Text>
                    </Flex>
                    <Flex style={{ width: '20%' }}>
                        <Text variant="body-default-s">{movement.performedBy}</Text>
                    </Flex>
                    {isControlled && (
                        <Flex style={{ width: '20%' }}>
                            <Text variant="body-default-s">
                                {movement.witnessedBy || '-'}
                            </Text>
                        </Flex>
                    )}
                </Flex>
            ))}
        </Flex>
    );
};