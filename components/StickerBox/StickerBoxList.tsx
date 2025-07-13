import React from 'react';
import {FlatList} from 'react-native';
import Loading from "@/components/Loading/Loading";
import {Surface, useTheme} from 'react-native-paper';
import ErrorRetry from "@/components/ErrorRetry/ErrorRetry";
import {StickerListData} from "@/lib/fetch/useList/type";
import {useRouter} from "expo-router";
import StickerBoxItem from "@/components/StickerBox/StickerBoxItem";

const StickerBoxList = (
    {
        error,
        loading,
        data,
        errorMessage,
        reFetch,
        onPress
    }: StickerListData
) => {
    const theme = useTheme();
    const router = useRouter();

    const handlePress = (id: string) => {
        router.push(`/stickers/${id}`);
    };


    if (loading) {
        return <Loading/>;
    }
    if (error) {
        return <ErrorRetry onRetry={reFetch}/>
    }
    const bestSellerSticker = data?.filter((item) => item.isBestSeller)

    return (
        <Surface
            style={{backgroundColor: theme.colors.background}}
            elevation={0}
        >
            <FlatList
                data={bestSellerSticker}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <StickerBoxItem
                        onPress={() => handlePress(item.id)}
                        data={item}
                    />
                )}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 8, gap: 24}}
            />
        </Surface>
    );
};

export default StickerBoxList;
