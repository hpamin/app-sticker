import React from 'react';
import {Text, useTheme} from 'react-native-paper';
import {SectionTitleProps} from "@/components/SectionTitle/type";


const SectionTitle = (
    {
        title,
        variant = "titleLarge",
        style,
        color,
        align = "left",
    }: SectionTitleProps
) => {
    const theme = useTheme();

    return (
        <Text
            variant={variant}
            style={[
                {
                    color: color ?? theme.colors.onBackground,
                    textAlign: align,
                },
                style,
            ]}
        >
            {title ?? ""}
        </Text>
    );
};

export default SectionTitle;
