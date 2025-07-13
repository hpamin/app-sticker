import React from "react";
import { BlurView } from "expo-blur";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BottomTabBarProps, BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

type ExtendedOptions = BottomTabNavigationOptions & {
    tabBarFocusedIconName?: string;
    tabBarIconName?: string;
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    return (
        <View
            style={{
                position: "absolute",
                bottom: 20,
                left: 20,
                right: 20,
                borderRadius: 40,
                overflow: "hidden",
            }}
        >
            <BlurView intensity={40} tint="light" style={{ paddingVertical: 10 }}>
                <LinearGradient
                    colors={["rgba(255,255,255,0.2)", "rgba(255,255,255,0.2)"]}
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                    }}
                >
                    {state.routes.map((route: typeof state.routes[number], index: number) => {
                        const { options } = descriptors[route.key] as { options: ExtendedOptions };
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.name;

                        const isFocused = state.index === index;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: "tabPress",
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        const iconName = options.tabBarIconName ?? "alert-circle-outline";
                        const focusedIconName = options.tabBarFocusedIconName ?? iconName;

                        return (
                            <TouchableOpacity
                                key={route.key}
                                onPress={onPress}
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    paddingHorizontal: 12,
                                    paddingVertical: 6,
                                    borderRadius: 30,
                                    backgroundColor: isFocused ? "#3F51B5" : "transparent",
                                    flexDirection: "row",
                                }}
                            >
                                <View>
                                    <Ionicons
                                        name={isFocused ? focusedIconName : iconName}
                                        size={20}
                                        color={isFocused ? "#fff" : "#000"}
                                    />
                                    {route.name === "Orders" && (
                                        <View
                                            style={{
                                                position: "absolute",
                                                top: -4,
                                                right: -4,
                                                backgroundColor: "red",
                                                width: 16,
                                                height: 16,
                                                borderRadius: 8,
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Text style={{ color: "#fff", fontSize: 10 }}>2</Text>
                                        </View>
                                    )}
                                </View>
                                {isFocused && (
                                    <Text
                                        style={{
                                            color: "#fff",
                                            marginLeft: 6,
                                            fontSize: 12,
                                            fontWeight: "500",
                                        }}
                                    >
                                        {label?.toString() ?? ""}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </LinearGradient>
            </BlurView>
        </View>
    );
};

export default CustomTabBar;
