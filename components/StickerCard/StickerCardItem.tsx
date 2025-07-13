import React from 'react';
import {View} from 'react-native';
import {Card, Text, Button, useTheme} from 'react-native-paper';
import {StickerCardItemProps} from "@/components/StickerCard/type";
import {styles} from "@/components/StickerCard/style";
import {Image} from 'expo-image';

const StickerCardItem = (
    {
        data,
        onPress
    }: StickerCardItemProps
) => {
    const theme = useTheme();
    const {
        id,
        image,
        name,
        price,
        description
    } = data

    return (
        <Card
            style={[
                styles.card,
                {backgroundColor: theme.colors.surface}
            ]}
            mode="contained"
        >
            <Card.Content style={styles.container}>
                <Image
                    source={image}
                    style={styles.image}
                    contentFit="cover"
                    transition={300}
                    cachePolicy="disk"
                />

                <View style={styles.contentContainer}>
                    <View style={styles.headerRow}>
                        <Text
                            variant="titleSmall"
                            style={styles.title}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {name}
                        </Text>
                        <Text
                            variant="titleMedium"
                            style={styles.price}
                        >
                            ${price}
                        </Text>
                    </View>
                    <Text
                        variant="labelSmall"
                        style={styles.description}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {description}
                    </Text>
                    <Button
                        mode="contained"
                        onPress={onPress}
                        style={styles.button}
                        icon="cart-outline"
                    >
                        Buy Now
                    </Button>
                </View>
            </Card.Content>
        </Card>
    );
};

export default StickerCardItem;