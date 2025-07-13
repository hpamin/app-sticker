import {Avatar, Text, useTheme} from "react-native-paper";
import {useRouter} from "expo-router";
import {useFetchResource} from "@/lib/fetch/useList/useList";
import {Image, SafeAreaView, ScrollView, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import SearchBox from "@/components/SearchBox/SearchBox";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import {StickerFetchProps} from "@/lib/fetch/useList/type";
import StickerCardList from "@/components/StickerCard/StickerCardList";
import StickerBoxList from "@/components/StickerBox/StickerBoxList";
import useUserStorage from "@/lib/hooks/useUserStorage/useUserStorage";
import React, {useEffect, useState} from "react";
import {User} from "@/lib/hooks/useUserStorage/types";
import Loading from "@/components/Loading/Loading";
import TabSafeAreaWrapper from "@/components/Layout/TabSafeAreaWrapper/TabSafeAreaWrapper";
import Slider from "@/components/Slider/Slider";

const Index = () => {
    const theme = useTheme();
    const router = useRouter();
    const {getCurrentUser} = useUserStorage()
    const [user, setUser] = useState<User | null>(null);
    const isDark = theme.dark

    const handleSearchPress = () => {
        router.push({
            pathname: '/search',
            params: {autoFocus: 'true'},
        })
    }
    const {
        error,
        loading,
        data,
        reFetch,
        errorMessage
    } = useFetchResource<StickerFetchProps>("stickers");

    const sliderData = [
        {
            id: 1,
            title: 'Lorem ipsum dolor sit amet',
            image: "https://pacholl.ir/wp-content/smush-webp/2023/07/%D8%A7%D8%B3%D9%84%D8%A7%DB%8C%D8%AF-%D8%B3%D9%81%D8%A7%D8%B1%D8%B4-%D8%B7%D8%B1%D8%AD-%D8%AF%D9%84%D8%AE%D9%88%D8%A7%D9%87-%D8%A7%D8%B3%D8%AA%DB%8C%DA%A9%D8%B1.png.webp",
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            id: 2,
            title: 'Dolor sit amet',
            image: "https://addressdan.ir/public/business-images/171146.jpg",
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            id: 3,
            title: 'Lorem ipsum dolor sit amet',
            image: "https://pacholl.ir/wp-content/smush-webp/2023/11/%D8%AE%D8%B1%DB%8C%D8%AF-%D8%A7%D8%B3%D8%AA%DB%8C%DA%A9%D8%B1-%D9%BE%D8%A7%D8%B1%DA%86%D9%87-%D8%A7%DB%8C-%D9%84%D8%A8%D8%A7%D8%B3.png.webp",
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
    ];
    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        };
        fetchUser();
    }, []);

    if (loading) return <Loading/>;

    return (
        <TabSafeAreaWrapper scroll>
            <View
                style={{
                    backgroundColor: theme.colors.primary,
                    minHeight: 150,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    paddingHorizontal: 16
                }}
            >

                <View
                    style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 25,
                    }}
                >
                    <View style={{width: "50%"}}>
                        <Text
                            variant={"displayLarge"}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                                fontSize: 28,
                                color: theme.colors.onPrimary,
                                fontWeight: "bold",
                                maxWidth: 150,
                                flexDirection: "row"
                            }}
                        >
                            Hi <Text style={{
                            fontSize: 20,
                            color: theme.colors.onPrimary,
                            fontWeight: "bold",
                        }}>
                            {user?.name}
                        </Text>
                        </Text>
                    </View>
                    <View style={{
                        width: "50%",
                        alignItems: "flex-end"
                    }}>
                        {user?.avatarUri ? (
                            <Image
                                source={{uri: user?.avatarUri}}
                                style={{width: 60, height: 60, borderRadius: "100%"}}
                                resizeMode={"cover"}
                            />
                        ) : (
                            <Avatar.Icon
                                size={60}
                                icon="account"
                                style={{backgroundColor: theme.colors.primaryContainer}}
                            />
                        )}
                    </View>
                </View>
            </View>

            <LinearGradient
                colors={[`rgba(67, 85, 185,${isDark ? "0" : "0.6"})`, "transparent"]}
                style={{
                    left: 0,
                    right: 0,
                    height: 120,
                    marginTop: -60
                }}
            >

                <View
                    style={{
                        backgroundColor: theme.colors.surface,
                        marginHorizontal: 16,
                        borderRadius: 15,
                        marginTop: 30,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >

                    <SearchBox
                        style={{
                            width: "100%",
                        }}
                        onPress={handleSearchPress}
                    />

                </View>

            </LinearGradient>

            <View
                style={{
                    marginTop: 16,
                }}
            >
                <Slider data={sliderData}/>
            </View>


            <View style={{marginTop: 16, paddingHorizontal: 16}}>
                <SectionHeader
                    title="Best Seller Sticker"
                    onPressAction={() => {
                    }}
                />
                <StickerBoxList
                    loading={loading}
                    data={data}
                    reFetch={reFetch}
                    error={error}
                    errorMessage={errorMessage}
                />
            </View>


            <View style={{marginTop: 16, paddingHorizontal: 16}}>
                <SectionHeader
                    title="Sticker"
                    onPressAction={() => {
                    }}
                />
                <StickerCardList
                    loading={loading}
                    data={data}
                    reFetch={reFetch}
                    error={error}
                    errorMessage={errorMessage}
                />
            </View>

        </TabSafeAreaWrapper>
    );
}

export default Index;

