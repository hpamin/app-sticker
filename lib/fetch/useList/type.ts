export interface SliderImage {
    id: number
    image: string
}
export interface CategoriesData {
    id: string,
    name: string,
    image: string,
}
export interface StickerFetchProps {
    id: string
    name: string
    image: string
    price: number
    description: string
    isBestSeller: boolean
    slider: SliderImage[]
    rate: number
    category: string
}

export interface StickerListData {
    data: StickerFetchProps[] | null | undefined
    loading: boolean
    error: boolean
    errorMessage?: string | null | undefined
    reFetch: () => void
    onPress?: () => void
}

export interface useFetchResourceProps {
    resource: string,
    local?: boolean
}

export type OrderSticker = StickerFetchProps & {
    order: {
        name: string;
        phone: string;
        email: string;
        size: string;
        count: string;
        material: string;
        express: boolean;
        price: number;
        date: string;
        id: string;
        userId: string;
    };
};