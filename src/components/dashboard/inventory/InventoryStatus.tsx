import { Flex, Text, Tag, Card } from '@/once-ui/components';
import { getInventoryStatus } from '@/lib/mock/dashboard';
import { InventoryStatusBadge } from './InventoryStatusBadge';
import { InventoryProgressBar } from './InventoryProgressBar';

const InventoryItem = ({ name, quantity, reorderPoint, status }: {
    name: string;
    quantity: number;
    reorderPoint: number;
    status: 'ok' | 'low' | 'critical';
}) => (
    <Flex
        fillWidth
        direction="column"
        gap="12"
        padding="16"
        background="surface"
        radius="m"
        border="neutral-medium"
        borderStyle="solid-1">
        <Flex
            fillWidth
            justifyContent="space-between"
            alignItems="center">
            <Text variant="body-strong-s">
                {name}
            </Text>
            <InventoryStatusBadge status={status} />
        </Flex>
        <InventoryProgressBar
            current={quantity}
            total={reorderPoint * 2}
            status={status}
        />
        <Text
            variant="body-default-xs"
            onBackground="neutral-medium">
            {quantity} units left • Reorder at {reorderPoint}
        </Text>
    </Flex>
);

export const InventoryStatus = () => {
    const inventory = getInventoryStatus();
    const lowStock = inventory.filter(item => item.status !== 'ok').length;

    return (
        <Card>
            <Flex direction="column" gap="16" padding="24">
                <Flex
                    fillWidth
                    justifyContent="space-between"
                    alignItems="center">
                    <Text variant="heading-strong-m">
                        Inventory Status
                    </Text>
                    {lowStock > 0 && (
                        <Tag
                            variant="warning"
                            label={`${lowStock} Low Stock`}
                        />
                    )}
                </Flex>

                <Flex direction="column" gap="8">
                    {inventory.map((item) => (
                        <InventoryItem
                            key={item.id}
                            {...item}
                        />
                    ))}
                </Flex>
            </Flex>
        </Card>
    );
};