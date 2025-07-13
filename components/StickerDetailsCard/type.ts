export interface StickerDetailsCardProps {
    id: string;
    category: string;
    availability: 'inStock' | 'outOfStock';
    onInfoPress?: () => void;
};

export interface DetailItemProps {
    label: string;
    value: string;
};