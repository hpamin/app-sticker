import {StickerFetchProps} from "@/lib/fetch/useList/type";


export interface StickerBoxProps  {
    data: StickerFetchProps;
    onPress?: () => void;
}