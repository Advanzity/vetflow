import { Flex, Text } from '@/once-ui/components';
import { InventoryMovement } from '@/lib/types/inventory';

interface MovementSummaryProps {
    movements: InventoryMovement[];
}

export const MovementSummary: React.FC<MovementSummaryProps> = ({ movements }) => {
    const summary = movements.reduce((acc, movement) => {
        const quantity = movement.quantity;
        switch (movement.type) {
            case 'receipt':
                acc.received += quantity;
                break;
            case 'issue':
                acc.issued += quantity;
                break;
            case 'return':
                acc.returned += quantity;
                break;
            case 'disposal':
                acc.disposed += quantity;
                break;
        }
        return acc;
    }, {
        received: 0,
        issued: 0,
        returned: 0,
        disposed: 0
    });

    return (
        <Flex gap="16" wrap>
            <Flex
                direction="column"
                gap="4"
                padding="16"
                background="success-weak"
                radius="m"
                border="success-medium"
                borderStyle="solid-1">
                <Text variant="label-default-s" onBackground="success-medium">
                    Received
                </Text>
                <Text variant="heading-strong-l" onBackground="success-strong">
                    {summary.received}
                </Text>
            </Flex>

            <Flex
                direction="column"
                gap="4"
                padding="16"
                background="warning-weak"
                radius="m"
                border="warning-medium"
                borderStyle="solid-1">
                <Text variant="label-default-s" onBackground="warning-medium">
                    Issued
                </Text>
                <Text variant="heading-strong-l" onBackground="warning-strong">
                    {summary.issued}
                </Text>
            </Flex>

            <Flex
                direction="column"
                gap="4"
                padding="16"
                background="info-weak"
                radius="m"
                border="info-medium"
                borderStyle="solid-1">
                <Text variant="label-default-s" onBackground="info-medium">
                    Returned
                </Text>
                <Text variant="heading-strong-l" onBackground="info-strong">
                    {summary.returned}
                </Text>
            </Flex>

            <Flex
                direction="column"
                gap="4"
                padding="16"
                background="danger-weak"
                radius="m"
                border="danger-medium"
                borderStyle="solid-1">
                <Text variant="label-default-s" onBackground="danger-medium">
                    Disposed
                </Text>
                <Text variant="heading-strong-l" onBackground="danger-strong">
                    {summary.disposed}
                </Text>
            </Flex>
        </Flex>
    );
};