import React from "react";
import {View} from "react-native";
import {Button, Text, useTheme} from "react-native-paper";
import {SectionHeaderProps} from "@/components/SectionHeader/type";
import {styles} from "@/components/SectionHeader/styles";


const SectionHeader = (
    {
        title,
        actionLabel = "More",
        onPressAction,
        style,
    } : SectionHeaderProps
) => {
    const theme = useTheme();

    return (
        <View style={[styles.container, style]}>
            <Text
                variant="titleMedium"
                style={styles.title}
            >
                {title ?? ""}
            </Text>

            {/*{onPressAction && (*/}
            {/*    <Button*/}
            {/*        mode="contained"*/}
            {/*        onPress={onPressAction}*/}
            {/*        style={[*/}
            {/*            styles.button,*/}
            {/*            {backgroundColor: theme.colors.secondary},*/}
            {/*        ]}*/}
            {/*        labelStyle={[*/}
            {/*            styles.buttonLabel,*/}
            {/*            {color: theme.colors.onSecondary},*/}
            {/*        ]}*/}
            {/*        compact*/}
            {/*    >*/}
            {/*        {actionLabel}*/}
            {/*    </Button>*/}
            {/*)}*/}
        </View>
    );
};

export default SectionHeader;


