import {StyleProp, ViewStyle} from "react-native";
import React from "react";

export interface TabSafeAreaWrapperProps {
    scroll?: boolean;
    style?: StyleProp<ViewStyle>;
    children: React.ReactNode;
    keyboardAvoiding?: boolean;
}