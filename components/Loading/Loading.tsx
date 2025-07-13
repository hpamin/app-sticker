import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import {LoadingProps} from "@/components/Loading/type";
import {styles} from "@/components/Loading/style";


const Loading = (
    {
        size = 40,
        color
    }: LoadingProps
) => {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <ActivityIndicator
                animating={true}
                size={size}
                color={color || theme.colors.primary}
            />
        </View>
    );
};


export default Loading;
