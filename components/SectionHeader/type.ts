import {View} from "react-native";

export interface SectionHeaderProps {
    title: string;
    actionLabel?: string;
    onPressAction?: () => void;
    style?: View["props"]["style"];
}
