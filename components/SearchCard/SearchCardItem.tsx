import {View} from "react-native";
import {styles} from "@/components/SearchCard/style";
import {Card, Text, useTheme} from "react-native-paper";
import React from "react";
import {SearchCardItemProps} from "@/components/SearchCard/type";
import {Image} from "expo-image";

const SearchCardItem = (
    {
        data,
        onPress = () => {}
    }: SearchCardItemProps
) => {

    const theme = useTheme()
    const {
        id,
        image,
        name,
        price,
        isBestSeller
    } = data

    return (
        <Card
            onPress={onPress}
            key={id}
            style={styles.stickerCard}
        >
            <Image
                source={image}
                style={styles.stickerImage}
                contentFit="cover"
                transition={300}
                cachePolicy="disk"
            />
            <Card.Content
                style={styles.cardContent}
            >
                <Text
                    variant="titleMedium"
                    numberOfLines={1}
                    style={{color: theme.colors.onSurface}}
                >
                    {name}
                </Text>
                <View style={styles.priceContainer}>
                    <Text
                        variant="titleSmall"
                        style={[
                            styles.priceText,
                            {color: theme.colors.onSurface}
                        ]}
                    >
                        ${price.toFixed(2)}
                    </Text>
                    {isBestSeller && (
                        <View style={[
                            styles.badge,
                            {backgroundColor: theme.colors.primary}
                        ]}>
                            <Text style={styles.badgeText}>
                                Bestseller
                            </Text>
                        </View>
                    )}
                </View>
            </Card.Content>
        </Card>
    )
}
export default SearchCardItem;