import {Stack, useRouter, usePathname} from "expo-router";
import "./global.css";
import {MD3DarkTheme, MD3LightTheme, PaperProvider, useTheme} from "react-native-paper";
import {useColorScheme} from "react-native";
import {theme} from "@/lib/constants/theme";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "@/components/Loading/Loading";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {SafeAreaProvider, useSafeAreaInsets} from "react-native-safe-area-context";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [checkingAuth, setCheckingAuth] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const paperTheme =
        colorScheme === "dark"
            ? {...MD3DarkTheme, colors: theme.dark}
            : {...MD3LightTheme, colors: theme.light};

    useEffect(() => {
        const checkAuth = async () => {
            const userData = await AsyncStorage.getItem("currentUser");

            if (!userData && pathname !== "/auth/signin" && pathname !== "/auth/signup") {
                router.replace("/auth/signin");
            }
            setCheckingAuth(false);
        };
        checkAuth();
    }, [pathname]);

    if (checkingAuth) {
        return <Loading/>;
    }

    return (
        <SafeAreaProvider style={{}}>
            <GestureHandlerRootView style={{flex: 1}}>
                <BottomSheetModalProvider>
                    <PaperProvider theme={paperTheme}>
                        <Stack
                            screenOptions={{
                                headerShown: false,
                                contentStyle: {
                                    backgroundColor: paperTheme.colors.background,
                                }
                            }}
                        >
                            <Stack.Screen
                                name="auth/signin"
                                options={{presentation: "modal"}}/>
                            <Stack.Screen
                                name="auth/signup"
                                options={{presentation: "modal"}}/>
                            <Stack.Screen name="(tabs)"/>
                            <Stack.Screen name="stickers/[id]/index"/>
                            <Stack.Screen
                                name="stickers/[id]/order"
                                options={{presentation: "modal"}}
                            />
                        </Stack>
                    </PaperProvider>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    );
}
