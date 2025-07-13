import { SearchbarProps } from "react-native-paper";

export type SearchBoxProps = {
    onSearchQueryChange?: (query: string) => void;
    value?: string;
    placeholder?: string;
    onPress?: () => void;
    onFilterPress?: () => void;
    autoFocus?: boolean;
    style?: SearchbarProps["style"];
};
