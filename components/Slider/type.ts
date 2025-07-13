import {SharedValue} from "react-native-reanimated";
import {SliderImage} from "@/lib/fetch/useList/type";


export interface SliderProps {
    data: SliderImage[];
}

export interface SliderItemProps {
    index: number;
    data: SliderImage;
    scrollX: SharedValue<number>
}

export interface PaginationProps {
    data: SliderImage[];
    paginationIndex: number;
    scrollX: SharedValue<number>;
}