import { useState, KeyboardEvent } from 'react';

interface UseKeyboardNavigationProps {
    itemCount: number;
    onSelect: (index: number) => void;
}

export function useKeyboardNavigation({ itemCount, onSelect }: UseKeyboardNavigationProps) {
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                setSelectedIndex(prev => 
                    prev < itemCount - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                event.preventDefault();
                setSelectedIndex(prev => 
                    prev > 0 ? prev - 1 : itemCount - 1
                );
                break;
            case 'Enter':
                event.preventDefault();
                if (selectedIndex >= 0) {
                    onSelect(selectedIndex);
                }
                break;
            case 'Escape':
                event.preventDefault();
                setSelectedIndex(-1);
                break;
        }
    };

    return {
        selectedIndex,
        setSelectedIndex,
        handleKeyDown
    };
}