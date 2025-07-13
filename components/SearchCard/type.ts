import {StickerFetchProps} from "@/lib/fetch/useList/type";
import {ViewStyle} from "react-native";

export interface SearchCardListProps {
    data: StickerFetchProps[] | undefined,
    style?: ViewStyle,
    onPressItem?: (id: string) => void,
}

export interface SearchCardItemProps {
    data: StickerFetchProps,
    onPress?: () => void
}