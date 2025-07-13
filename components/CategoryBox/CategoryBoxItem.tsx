import React from 'react';
import {Card, Text, TouchableRipple, useTheme} from 'react-native-paper';
import {Animated, Image, View} from 'react-native';
import {CategoryProps} from './type';
import {makeStyles} from "@/components/CategoryBox/style";

const CategoryItem = (
    {
        data,
        onPress,
        isSelected = false
    }: CategoryProps
) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const scaleValue = new Animated.Value(1);

    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View
            style={[
                {
                    transform: [{scale: scaleValue}],
                },
            ]}>
            <TouchableRipple
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                rippleColor={styles.ripple.color}
                borderless
                style={{borderRadius: 12}}
            >
                <Card
                    mode="contained"
                    style={[
                        styles.card,
                        isSelected && styles.selectedCard,
                        {backgroundColor: theme.colors.surfaceVariant},
                    ]}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: data.image }}
                            style={[
                                styles.image,
                                {
                                    tintColor: data.color || theme.colors.primary,
                                },
                            ]}
                            resizeMode="contain"
                        />
                    </View>
                    <Card.Content style={styles.contentContainer}>
                        <Text
                            variant="titleMedium"
                            style={[
                                styles.title,
                                isSelected && styles.selectedTitle,
                            ]}
                            numberOfLines={1}>
                            {data.name}
                        </Text>
                    </Card.Content>
                    {isSelected && <View style={styles.overlay}/>}
                </Card>
            </TouchableRipple>
        </Animated.View>
    );
};

export default CategoryItem;