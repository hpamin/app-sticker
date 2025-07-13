import {StyleProp, TextStyle} from "react-native";

export type SectionTitleProps = {
    title: string;
    variant?: "headlineLarge" | "headlineMedium" | "titleLarge" | "titleMedium" | "titleSmall";
    style?: StyleProp<TextStyle>;
    color?: string;
    align?: "left" | "center" | "right";
}