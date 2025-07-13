import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {Surface, useTheme} from "react-native-paper";
import Loading from "@/components/Loading/Loading";
import ErrorRetry from "@/components/ErrorRetry/ErrorRetry";
import {LinearGradient} from 'expo-linear-gradient';
import {styles} from "@/components/StickerCard/style";
import {StickerListData} from "@/lib/fetch/useList/type";
import {useRouter} from "expo-router";
import StickerCardItem from "@/components/StickerCard/StickerCardItem";

const StickerCardList = (
    {
        loading,
        data,
        reFetch,
        error,
        errorMessage,
    }: StickerListData
) => {

    const [showFade, setShowFade] = useState(false);
    const theme = useTheme();
    const router = useRouter();

    const handlePress = (id: string) => {
        router.push(`/stickers/${id}`);
    };
    const handleScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setShowFade(offsetY > 10);
    };

    if (loading) {
        return <Loading/>;
    }
    if (error) {
        return <ErrorRetry onRetry={reFetch}/>
    }

    return (
        <Surface
            style={{
                flex: 1,
                backgroundColor: theme.colors.background
            }}
            elevation={0}
        >
            {showFade && (
                <LinearGradient
                    colors={['rgba(255,255,255,0.8)', 'transparent']}
                    style={styles.fadeTop}
                    pointerEvents="none"
                />

            )}
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <StickerCardItem
                        onPress={() => handlePress(item?.id)}
                        data={item}
                    />
                )}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 8, gap: 24}}
            />
        </Surface>
    );
};

export default StickerCardList;