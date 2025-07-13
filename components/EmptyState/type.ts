import {Ionicons} from "@expo/vector-icons";

export interface EmptyStateProps {
    icon: keyof typeof Ionicons.glyphMap,
    message: string,
    action?: () => void
}