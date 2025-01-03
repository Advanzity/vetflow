import { Flex, Input, IconButton } from '@/once-ui/components';
import { Autocomplete } from './Autocomplete';
import { useInventoryCategories } from '@/lib/hooks/useInventoryCategories';
import styles from './InventorySearch.module.scss';

interface InventorySearchProps {
    searchTerm: string;
    selectedCategory: string | null;
    onSearch: (term: string) => void;
    onCategorySelect: (category: string) => void;
    onClear: () => void;
}

export const InventorySearch: React.FC<InventorySearchProps> = ({
    searchTerm,
    selectedCategory,
    onSearch,
    onCategorySelect,
    onClear
}) => {
    const { categories, isLoading } = useInventoryCategories();

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
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={onCategorySelect}
                isLoading={isLoading}
            />
        </Flex>
    );
}