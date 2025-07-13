export interface CategoryData {
    id: string;
    name: string;
    image: string;
    color?: string;
}

export interface CategoryProps {
    data: CategoryData;
    onPress?: () => void;
    isSelected?: boolean;
}