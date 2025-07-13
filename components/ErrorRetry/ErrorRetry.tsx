import React from 'react';
import {View, ViewStyle} from 'react-native';
import {Button, Text, useTheme} from 'react-native-paper';
import {ErrorRetryProps} from "@/components/ErrorRetry/type";
import {styles} from "@/components/ErrorRetry/style";


const ErrorRetry = (
    {
        onRetry = () => {},
        message = "Failed to load data!",
        buttonText,
        containerStyle,
    }: ErrorRetryProps
) => {
    const theme = useTheme();

    return (
        <View
            style={[
                styles.container,
                containerStyle
            ]}>
            <Text
                variant="bodyLarge"
                style={[
                    styles.errorMessage,
                    {color: theme.colors.error}
                ]}
            >
                {message}
            </Text>
            <Button
                mode="contained"
                onPress={onRetry}
                icon="reload"
            >
                {buttonText || "Retry"}
            </Button>
        </View>
    );
};

export default ErrorRetry;
