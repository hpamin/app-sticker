import React from 'react';
import {Card, Text, useTheme} from 'react-native-paper';
import {styles} from "@/components/StickerBox/style";
import {StickerBoxProps} from "@/components/StickerBox/type";
import {View} from "react-native";
import StarRating from "@/components/Rate/Rate";
import {Image} from 'expo-image';


const StickerBoxItem = (
    {
        data,
        onPress
    }: StickerBoxProps
) => {

    const {
        image,
        name,
        rate
    } = data
    const theme = useTheme();

    return (
        <Card
            mode="contained"
            onPress={onPress}
            style={[
                styles.cardBox,
                {backgroundColor: theme.colors.inverseOnSurface}
            ]}
        >
            <View style={{position: "relative"}}>
                <Image
                    source={image}
                    style={styles.imageBox}
                    contentFit="cover"
                    transition={300}
                    cachePolicy="disk"
                />

                <View style={{
                    position: "absolute",
                    end: 0,
                    top: 0,
                    paddingVertical: 2,
                    paddingHorizontal: 4,
                    borderBottomStartRadius: 16,
                    borderTopEndRadius: 16,
                    backgroundColor: theme.colors.inverseOnSurface
                }}>
                    <StarRating
                        size={15}
                        justNumber={true}
                        rating={rate}
                    />

                </View>
            </View>

            <Card.Content style={styles.contentBox}>
                <Text
                    variant="bodyMedium"
                    style={[
                        styles.StickerNameBox,
                        {color: theme.colors.onSurface}
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {name}
                </Text>
            </Card.Content>
        </Card>
    );
};


export default StickerBoxItem;
