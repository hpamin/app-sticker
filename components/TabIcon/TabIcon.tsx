import {StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {TabIconProps} from "@/components/TabIcon/type";


const TabIcon = (
    {
        icon,
        focusedIcon,
        size,
        focused,
        color,
        label,
    }: TabIconProps
) => {

    return (
        <View
            style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Ionicons
                name={focused ? icon : focusedIcon}
                color={focused ? "#4355B9FF" : color}
                size={20}
            />
            <Text
                style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: focused ? "#4355B9FF" : color
                }}
                numberOfLines={1}
                adjustsFontSizeToFit
            >
                {label}
            </Text>
        </View>
    );
};
const styles = StyleSheet.create({
    label: {

    }
})


export default TabIcon;
