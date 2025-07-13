import {Ionicons} from "@expo/vector-icons";

type IoniconsName = keyof typeof Ionicons.glyphMap;

export interface TabIconProps {
    icon: IoniconsName;
    focusedIcon: IoniconsName;
    size: number;
    focused: boolean;
    color: string;
    label: string;
}