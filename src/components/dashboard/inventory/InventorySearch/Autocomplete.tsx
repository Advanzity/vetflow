import { useState, useRef, useEffect } from 'react';
import { Flex, Text, Spinner } from '@/once-ui/components';
import { useKeyboardNavigation } from '@/lib/hooks/useKeyboardNavigation';
import styles from './Autocomplete.module.scss';

interface AutocompleteProps {
    categories: Array<{
        id: string;
        name: string;
        code: string;
    }>;
    selectedCategory: string | null;
    onSelect: (category: string) => void;
    isLoading: boolean;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
    categories,
    selectedCategory,
    onSelect,
    isLoading
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { selectedIndex, setSelectedIndex, handleKeyDown } = useKeyboardNavigation({
        itemCount: categories.length,
        onSelect: (index) => {
            onSelect(categories[index].id);
            setIsOpen(false);
        }
    });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <Flex direction="column" className={styles.container}>
            <button
                className={styles.trigger}
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                aria-expanded={isOpen}
                aria-haspopup="listbox">
                <Text>
                    {selectedCategory 
                        ? categories.find(c => c.id === selectedCategory)?.name 
                        : 'Select category'}
                </Text>
            </button>

            {isOpen && (
                <div 
                    ref={dropdownRef}
                    className={styles.dropdown}
                    role="listbox"
                    aria-label="Categories">
                    {isLoading ? (
                        <Flex justifyContent="center" padding="16">
                            <Spinner size="m" />
                        </Flex>
                    ) : (
                        categories.map((category, index) => (
                            <div
                                key={category.id}
                                role="option"
                                aria-selected={selectedCategory === category.id}
                                className={`${styles.option} ${selectedIndex === index ? styles.highlighted : ''}`}
                                onClick={() => {
                                    onSelect(category.id);
                                    setIsOpen(false);
                                }}>
                                <Text variant="body-default-s">{category.name}</Text>
                                <Text 
                                    variant="body-default-xs" 
                                    onBackground="neutral-medium">
                                    {category.code}
                                </Text>
                            </div>
                        ))
                    )}
                </div>
            )}
        </Flex>
    );
}