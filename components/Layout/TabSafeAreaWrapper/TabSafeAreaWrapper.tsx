import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Platform,
    StyleProp,
    ViewStyle, Keyboard, TouchableWithoutFeedback,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'react-native-paper';
import {TabSafeAreaWrapperProps} from "@/components/Layout/TabSafeAreaWrapper/type";


const TabSafeAreaWrapper: React.FC<TabSafeAreaWrapperProps> = (
    {
        scroll = true,
        style,
        children,
        keyboardAvoiding = false,
    }
) => {
    const theme = useTheme();

    const content = scroll ? (
        <ScrollView
            contentContainerStyle={[styles.scrollContentContainer, style]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            {children}
        </ScrollView>
    ) : (
        <View style={[styles.nonScrollContainer, style]}>
            {children}
        </View>
    );

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
        >

            <SafeAreaView
                style={[
                    styles.safeArea,
                    {backgroundColor: theme.colors.background}
                ]}>
                {keyboardAvoiding ? (
                    <KeyboardAvoidingView
                        style={{flex: 1}}
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    >
                        {content}
                    </KeyboardAvoidingView>
                ) : (
                    content
                )}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollContentContainer: {
        // paddingBottom: 16,
    },
    nonScrollContainer: {
        flex: 1,
    },
});

export default TabSafeAreaWrapper;
