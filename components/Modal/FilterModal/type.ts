export interface Category {
    id: string;
    name: string;
}

export interface FilterModalProps {
    visible: boolean;
    onDismiss: () => void;
    onApply: () => void;
    categoriesData?: Category[];
    selectedCategories: string[];
    toggleCategory: (name: string) => void;
    isBestSeller: boolean;
    toggleBestSeller: () => void;
}
