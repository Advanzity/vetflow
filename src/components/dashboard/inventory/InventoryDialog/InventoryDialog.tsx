'use client';

import { Dialog, Input, Select, Button, Flex } from '@/once-ui/components';
import { InventoryItem } from '@/lib/types/inventory';
import { useState, useEffect } from 'react';

interface InventoryDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (item: Partial<InventoryItem>) => void;
    item?: InventoryItem;
}

export const InventoryDialog: React.FC<InventoryDialogProps> = ({
    isOpen,
    onClose,
    onSave,
    item
}) => {
    const [formData, setFormData] = useState<Partial<InventoryItem>>({
        name: item?.name || '',
        type: item?.type || '',
        category: item?.category || '',
        subcategory: item?.subcategory || '',
        quantity: item?.quantity || 0,
        reorderPoint: item?.reorderPoint || 0,
        batchNumber: item?.batchNumber || '',
        expirationDate: item?.expirationDate ? new Date(item.expirationDate) : undefined,
        isControlled: item?.isControlled || false,
        unitCost: item?.unitCost || 0,
        unitPrice: item?.unitPrice || 0
    });

    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name,
                type: item.type,
                category: item.category,
                subcategory: item.subcategory,
                quantity: item.quantity,
                reorderPoint: item.reorderPoint,
                batchNumber: item.batchNumber,
                expirationDate: item.expirationDate,
                isControlled: item.isControlled,
                unitCost: item.unitCost,
                unitPrice: item.unitPrice
            });
        }
    }, [item]);

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title={item ? 'Edit Item' : 'Add New Item'}
            primaryButtonProps={{
                label: 'Save',
                onClick: handleSubmit
            }}
            secondaryButtonProps={{
                label: 'Cancel',
                onClick: onClose
            }}>
            <Flex direction="column" gap="16">
                <Input
                    id="name"
                    label="Item Name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
                <Select
                    id="type"
                    label="Type"
                    value={formData.type}
                    options={[
                        { label: 'Medication', value: 'medication' },
                        { label: 'Supply', value: 'supply' },
                        { label: 'Equipment', value: 'equipment' }
                    ]}
                    onSelect={(option) => setFormData(prev => ({ ...prev, type: option.value }))}
                />
                <Select
                    id="category"
                    label="Category"
                    value={formData.category}
                    options={[
                        { label: 'Antibiotics', value: 'antibiotics' },
                        { label: 'Vaccines', value: 'vaccines' },
                        { label: 'Surgical', value: 'surgical' }
                    ]}
                    onSelect={(option) => setFormData(prev => ({ ...prev, category: option.value }))}
                />
                <Input
                    id="quantity"
                    label="Quantity"
                    type="number"
                    value={formData.quantity?.toString()}
                    onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                />
                <Input
                    id="reorderPoint"
                    label="Reorder Point"
                    type="number"
                    value={formData.reorderPoint?.toString()}
                    onChange={(e) => setFormData(prev => ({ ...prev, reorderPoint: parseInt(e.target.value) || 0 }))}
                />
                <Input
                    id="batchNumber"
                    label="Batch Number"
                    value={formData.batchNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, batchNumber: e.target.value }))}
                />
                <Input
                    id="expirationDate"
                    label="Expiration Date"
                    type="date"
                    value={formData.expirationDate?.toISOString().split('T')[0]}
                    onChange={(e) => setFormData(prev => ({ ...prev, expirationDate: new Date(e.target.value) }))}
                />
                <Input
                    id="unitCost"
                    label="Unit Cost"
                    type="number"
                    value={formData.unitCost?.toString()}
                    onChange={(e) => setFormData(prev => ({ ...prev, unitCost: parseFloat(e.target.value) || 0 }))}
                />
                <Input
                    id="unitPrice"
                    label="Unit Price"
                    type="number"
                    value={formData.unitPrice?.toString()}
                    onChange={(e) => setFormData(prev => ({ ...prev, unitPrice: parseFloat(e.target.value) || 0 }))}
                />
                <Select
                    id="category"
                    label="Category"
                    value={formData.categoryId || ''}
                    options={[
                        { label: 'Medications', value: 'med' },
                        { label: 'Vaccines', value: 'vac' },
                        { label: 'Supplies', value: 'sup' },
                        { label: 'Equipment', value: 'equ' }
                    ]}
                    onSelect={(option) => setFormData(prev => ({ ...prev, categoryId: option.value }))}
                />
            </Flex>
        </Dialog>
    );
};