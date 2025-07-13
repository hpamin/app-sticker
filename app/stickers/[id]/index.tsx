import React from 'react';
import {ImageBackground, ScrollView, View} from 'react-native';
import {useLocalSearchParams, useRouter} from "expo-router";
import {useFetchResource} from "@/lib/fetch/useList/useList";
import {Button, Chip, IconButton, Text, useTheme,} from 'react-native-paper';
import Loading from "@/components/Loading/Loading";
import ErrorRetry from "@/components/ErrorRetry/ErrorRetry";
import Slider from "@/components/Slider/Slider";
import {StickerFetchProps} from "@/lib/fetch/useList/type";
import {LinearGradient} from 'expo-linear-gradient';
import StarRating from "@/components/Rate/Rate";
import StickerDetailsCard from "@/components/StickerDetailsCard/StickersDetailsCard";
import {styles} from "@/lib/pageStyles/order/style";

const StickerDetails = () => {
    const {id} = useLocalSearchParams();
    const router = useRouter();
    const theme = useTheme();
    const {
        data,
        loading,
        error,
        errorMessage,
        reFetch
    } = useFetchResource<StickerFetchProps>(`stickers`);
    const selectedItem = data?.find((item) => item.id === id);

    if (loading) {
        return <Loading/>;
    }
    if (!selectedItem || error) {
        return <ErrorRetry onRetry={reFetch}/>
    }
    return (
        <View style={{flex: 1, backgroundColor: theme.colors.background}}>
            <IconButton
                icon="arrow-left"
                size={24}
                style={[styles.backButton, {backgroundColor: theme.colors.primaryContainer}]}
                iconColor={theme.colors.onPrimaryContainer}
                onPress={() => router.push('/')}
            />

            <ScrollView
                style={{flex: 1}}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerContainer}>
                    <ImageBackground
                        source={
                            typeof selectedItem.image === "string"
                                ? {uri: selectedItem.image}
                                : selectedItem.image
                        }
                        style={styles.headerImage}
                        resizeMode="cover"
                    >

                        <LinearGradient
                            colors={['transparent', theme.colors.background]}
                            style={styles.gradient}
                        />
                    </ImageBackground>

                    <View style={[styles.headerContent, {backgroundColor: theme.colors.primaryContainer}]}>
                        <View style={styles.headerTextContainer}>
                            <Text
                                variant="headlineMedium"
                                style={[
                                    styles.headerTitle,
                                    {
                                        color: theme.colors.onPrimaryContainer
                                    }]}>
                                {selectedItem.name}
                            </Text>
                            {
                                selectedItem.isBestSeller && (
                                    <Chip
                                        mode="outlined"
                                        style={[
                                            styles.bestSellerChip,
                                            {
                                                backgroundColor: theme.colors.secondaryContainer,
                                                borderColor: theme.colors.secondary
                                            }]}
                                        textStyle={{color: theme.colors.onSecondaryContainer}}
                                    >
                                        Best Seller
                                    </Chip>
                                )}
                        </View>
                    </View>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.priceContainer}>
                        <Text
                            variant="displaySmall"
                            style={[
                                styles.priceText,
                                {color: theme.colors.primary}
                            ]}>
                            ${selectedItem.price.toFixed(2)}
                        </Text>

                        <StarRating
                            rating={selectedItem.rate}
                        />

                    </View>

                    <Text
                        variant="bodyLarge"
                        style={[
                            styles.description,
                            {color: theme.colors.onSurfaceVariant}
                        ]}>
                        {selectedItem.description}
                    </Text>

                    <View style={styles.sliderContainer}>
                        <Text
                            variant="titleMedium"
                            style={[
                                styles.sectionTitle,
                                {color: theme.colors.onSurface}
                            ]}>
                            Product Gallery
                        </Text>
                        <Slider data={selectedItem.slider}/>
                    </View>

                    <View style={styles.buttonGroup}>
                        <Button
                            mode="contained"
                            icon="cart"
                            style={[
                                styles.button,
                                {backgroundColor: theme.colors.primary}
                            ]}
                            labelStyle={{color: theme.colors.onPrimary}}
                            contentStyle={styles.buttonContent}
                            onPress={() => router.push(`/stickers/${id}/order`)}
                        >
                            Add to Cart
                        </Button>
                        {/*<Button*/}
                        {/*    mode="outlined"*/}
                        {/*    icon="heart"*/}
                        {/*    style={[*/}
                        {/*        styles.button,*/}
                        {/*        {borderColor: theme.colors.primary}*/}
                        {/*    ]}*/}
                        {/*    labelStyle={{color: theme.colors.primary}}*/}
                        {/*    contentStyle={styles.buttonContent}*/}
                        {/*>*/}
                        {/*    Wishlist*/}
                        {/*</Button>*/}
                    </View>

                    <View style={styles.detailItem}>
                        <StickerDetailsCard
                            id={selectedItem.id}
                            availability={"inStock"}
                            category={selectedItem.category}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};


export default StickerDetails;