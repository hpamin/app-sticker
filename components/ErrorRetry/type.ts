import {ViewStyle} from "react-native";

export type ErrorRetryProps = {
    onRetry: () => void;
    message?: string;
    buttonText?: string;
    containerStyle?: ViewStyle;
};