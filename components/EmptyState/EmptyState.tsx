import {Button, Text, useTheme} from "react-native-paper";
import {styles} from "@/components/EmptyState/style";
import {Ionicons} from "@expo/vector-icons";
import {View} from "react-native";
import {EmptyStateProps} from "@/components/EmptyState/type";

const EmptyState = (
    {
        icon,
        message,
        action
    }: EmptyStateProps) => {
    const theme = useTheme();
    const color = theme.dark ? theme.colors.onSurfaceDisabled : theme.colors.onSurfaceDisabled;

    return (
        <View style={styles.emptyState}>
            <Ionicons
                name={icon}
                size={80}
                color={color}
            />
            <Text
                variant="titleMedium"
                style={{color, marginTop: 16, textAlign: 'center'}}
            >
                {message}
            </Text>
            {action && (
                <Button
                    mode="outlined"
                    style={{marginTop: 16}}
                    onPress={action}
                >
                    Go back
                </Button>
            )}
        </View>
    );
};
export default EmptyState;