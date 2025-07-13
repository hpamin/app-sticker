import {Dimensions} from 'react-native';
import {Card} from 'react-native-paper';
import {SliderItemProps} from '@/components/Slider/type';
import Animated, {Extrapolation, interpolate, useAnimatedStyle} from "react-native-reanimated";
import {styles} from "@/components/Slider/style";
import React from "react";
import {Image} from "expo-image";


const {width} = Dimensions.get("screen")

const SliderItem = (
    {
        index,
        data,
        scrollX
    }: SliderItemProps
) => {

    const {
        image
    } = data

    const reAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width],
                        [-width * 0.25, 0, width * 0.25],
                        Extrapolation.CLAMP
                    ),
                },
                {
                    scale: interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width],
                        [0.5, 1, 0.5],
                        Extrapolation.CLAMP
                    ),
                },
            ],
        };
    });

    return (
        <Animated.View
            style={[styles.itemContainer, reAnimatedStyle]}
            key={index}
        >
            <Card
                mode="elevated"
                elevation={0}
                style={styles.cardItem}
            >

                <Card.Content style={styles.cardContentItem}>
                    {image && (
                        <Image
                            source={image}
                            style={styles.imageBanner}
                            contentFit="cover"
                            transition={300}
                            cachePolicy="disk"
                        />
                    )
                    }
                </Card.Content>
            </Card>
        </Animated.View>
    );
};

export default SliderItem;