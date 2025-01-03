import { Dialog, Input, Select, Button, Flex, Text } from '@/once-ui/components';
import { InventoryItem, InventoryMovement } from '@/lib/types/inventory';
import { useState } from 'react';

interface InventoryMovementDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (movement: Omit<InventoryMovement, 'id' | 'createdAt'>) => void;
    item: InventoryItem;
}

export const InventoryMovementDialog: React.FC<InventoryMovementDialogProps> = ({
    isOpen,
    onClose,
    onSave,
    item
}) => {
    const [formData, setFormData] = useState<Partial<InventoryMovement>>({
        itemId: item.id,
        type: 'receipt',
        quantity: 0,
        performedBy: ''
    });

    const handleSubmit = () => {
        if (formData.itemId && formData.type && formData.quantity && formData.performedBy) {
            onSave(formData as Omit<InventoryMovement, 'id' | 'createdAt'>);
            onClose();
        }
    };

    const requiresWitness = item.isControlled && 
        (formData.type === 'issue' || formData.type === 'disposal');

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title="Record Inventory Movement"
            description={
                <Flex gap="8" alignItems="center">
                    <Text variant="body-default-m">{item.name}</Text>
                    {item.isControlled && (
                        <Text
                            variant="body-strong-s"
                            onBackground="warning-medium">
                            Controlled Substance - Witness Required
                        </Text>
                    )}
                </Flex>
            }
            primaryButtonProps={{
                label: 'Save',
                onClick: handleSubmit,
                disabled: !formData.quantity || !formData.performedBy || 
                         (requiresWitness && !formData.witnessedBy)
            }}
            secondaryButtonProps={{
                label: 'Cancel',
                onClick: onClose
            }}>
            <Flex direction="column" gap="16">
                <Select
                    id="type"
                    label="Movement Type"
                    value={formData.type || ''}
                    options={[
                        { label: 'Receipt', value: 'receipt' },
                        { label: 'Issue', value: 'issue' },
                        { label: 'Return', value: 'return' },
                        { label: 'Disposal', value: 'disposal' },
                        { label: 'Adjustment', value: 'adjustment' }
                    ]}
                    onSelect={(option) => setFormData(prev => ({ 
                        ...prev, 
                        type: option.value as InventoryMovement['type']
                    }))}
                />

                <Input
                    id="quantity"
                    label="Quantity"
                    type="number"
                    value={formData.quantity?.toString()}
                    onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        quantity: parseInt(e.target.value) || 0 
                    }))}
                />

                <Input
                    id="performedBy"
                    label="Performed By"
                    value={formData.performedBy}
                    onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        performedBy: e.target.value 
                    }))}
                />

                {requiresWitness && (
                    <Input
                        id="witnessedBy"
                        label="Witnessed By"
                        value={formData.witnessedBy}
                        onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            witnessedBy: e.target.value 
                        }))}
                    />
                )}

                <Input
                    id="notes"
                    label="Notes"
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        notes: e.target.value 
                    }))}
                />
            </Flex>
        </Dialog>
    );
};