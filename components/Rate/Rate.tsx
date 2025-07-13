import * as React from 'react';
import {View} from 'react-native';
import {Icon, Text, useTheme} from 'react-native-paper';
import {StarRatingProps} from "@/components/Rate/type";
import {styles} from "@/components/Rate/style";


const StarRating = (
    {
        rating,
        size = 24,
        color = '#FFD700',
        justNumber = false,
    }: StarRatingProps
) => {
    rating = rating ?? 0
    const theme = useTheme()
    const fullStars = Math.floor(rating)
    const halfStar = rating - fullStars > 0
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

    return (
        <View style={styles.row}>
            {
                justNumber ? (
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 4
                    }}>
                        <Icon
                            source="star"
                            size={size}
                            color={color}
                        />
                        <Text
                            variant={"titleSmall"}
                            style={{
                                color: theme.colors.onSurface
                            }}
                        >
                            {rating}/5
                        </Text>
                    </View>
                ) : (
                    <>
                        {Array
                            ?.from({length: fullStars})
                            ?.map((_, i) => (
                                <Icon
                                    key={`full-${i}`}
                                    source="star"
                                    size={size}
                                    color={color}
                                />
                            ))}

                        {halfStar && (
                            <Icon
                                source="star-half-full"
                                size={size}
                                color={color}
                            />
                        )}

                        {Array
                            ?.from({length: emptyStars})
                            ?.map((_, i) => (
                                <Icon
                                    source="star-outline"
                                    size={size}
                                    color={color}
                                />
                            ))}
                    </>

                )
            }
        </View>
    );
};

export default StarRating;
