import React from "react";
import {Tabs} from "expo-router";
import {BlurView} from "expo-blur";
import {Platform, View} from "react-native";
import TabIcon from "@/components/TabIcon/TabIcon";
import {useTheme} from "react-native-paper";

const TabsLayout = () => {
    const theme = useTheme();

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    overflow: "hidden",
                    elevation: 0,
                    backgroundColor: theme.colors.inverseOnSurface,
                    justifyContent: "center",
                    borderTopWidth: 0,
                    padding: 0,
                },
                tabBarItemStyle: {
                    paddingTop: 5,
                }

            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({color, size, focused}) => (
                        <TabIcon
                            focused={focused}
                            color={color}
                            size={size}
                            icon="home"
                            focusedIcon="home-outline"
                            label="Home"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="orders"
                options={{
                    title: "Orders",
                    tabBarIcon: ({color, size, focused}) => (
                        <TabIcon
                            focused={focused}
                            color={color}
                            size={size}
                            icon="grid"
                            focusedIcon="grid-outline"
                            label="Orders"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    tabBarIcon: ({color, size, focused}) => (
                        <TabIcon
                            focused={focused}
                            color={color}
                            size={size}
                            icon="search"
                            focusedIcon="search-outline"
                            label="Search"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({color, size, focused}) => (
                        <TabIcon
                            focused={focused}
                            color={color}
                            size={size}
                            icon="person"
                            focusedIcon="person-outline"
                            label="Profile"
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
