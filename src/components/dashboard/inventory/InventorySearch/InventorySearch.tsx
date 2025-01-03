import { Flex, Input, IconButton } from '@/once-ui/components';
import { Autocomplete } from './Autocomplete';
import styles from './InventorySearch.module.scss';

export interface InventorySearchProps {
    searchTerm: string;
    selectedType: string | null;
    onSearch: (term: string) => void;
    onTypeSelect: (type: string) => void;
    onClear: () => void;
}

export const InventorySearch: React.FC<InventorySearchProps> = ({
    searchTerm,
    selectedType,
    onSearch,
    onTypeSelect,
    onClear
}) => {
    const types = [
        { id: 'medication', name: 'Medications', code: 'MED' },
        { id: 'supply', name: 'Supplies', code: 'SUP' },
        { id: 'equipment', name: 'Equipment', code: 'EQU' }
    ];

    return (
        <Flex direction="column" gap="16" className={styles.search}>
            <Flex gap="8">
                <Input
                    id="inventory-search"
                    label="Search inventory"
                    value={searchTerm}
                    onChange={(e) => onSearch(e.target.value)}
                    prefixIcon="search"
                    labelAsPlaceholder
                    aria-label="Search inventory items"
                />
                <IconButton
                    icon="x"
                    variant="secondary"
                    onClick={onClear}
                    tooltip="Clear search"
                    aria-label="Clear search"
                />
            </Flex>
            <Autocomplete
                categories={types}
                selectedCategory={selectedType}
                onSelect={onTypeSelect}
                isLoading={false}
            />
        </Flex>
    );
}