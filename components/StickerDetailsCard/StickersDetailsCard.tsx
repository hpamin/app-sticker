import React from 'react';
import {View} from 'react-native';
import {Card, Chip, Divider, IconButton, Text, useTheme,} from 'react-native-paper';
import {StickerDetailsCardProps} from "@/components/StickerDetailsCard/type";
import {styles} from "@/components/StickerDetailsCard/style";

const StickerDetailsCard = (
    {
        id,
        category = 'Stickers',
        availability = 'inStock',
        onInfoPress
    }: StickerDetailsCardProps
) => {
    const theme = useTheme();

    return (
        <Card
            style={[
                styles.card,
                {backgroundColor: theme.colors.surfaceVariant},
            ]}
            mode="elevated"
        >
            <Card.Content>
                <View style={styles.header}>
                    <Text
                        variant="titleLarge"
                        style={[
                            styles.title,
                            {color: theme.colors.onSurfaceVariant}
                        ]}
                    >
                        Sticker Details
                    </Text>
                    <IconButton
                        icon="information"
                        iconColor={theme.colors.primary}
                        size={24}
                        accessibilityLabel="Sticker information"
                        onPress={onInfoPress}
                    />
                </View>

                <Divider style={{backgroundColor: theme.colors.outline}}/>

                {/*<View style={styles.detailItem}>*/}
                {/*    <Text*/}
                {/*        variant="bodyMedium"*/}
                {/*        style={{color: theme.colors.onSurfaceVariant}}*/}
                {/*    >*/}
                {/*        Sticker&nbsp;ID:*/}
                {/*    </Text>*/}
                {/*    <Text*/}
                {/*        variant="bodyMedium"*/}
                {/*        style={{color: theme.colors.onSurface}}*/}
                {/*        numberOfLines={2}*/}
                {/*    >*/}
                {/*        {id ?? ""}*/}
                {/*    </Text>*/}
                {/*</View>*/}

                <View style={styles.detailItem}>
                    <Text
                        variant="bodyMedium"
                        style={{color: theme.colors.onSurfaceVariant}}
                    >
                        Category:
                    </Text>
                    <Chip
                        mode="outlined"
                        style={{backgroundColor: theme.colors.primaryContainer}}
                        textStyle={{color: theme.colors.onPrimaryContainer}}
                    >
                        {category ?? "unknown"}
                    </Chip>
                </View>

                <View style={styles.detailItem}>
                    <Text
                        variant="bodyMedium"
                        style={{color: theme.colors.onSurfaceVariant}}
                    >
                        Availability:
                    </Text>
                    <Chip
                        icon={availability === 'inStock' ? 'check' : 'close'}
                        style={{backgroundColor: theme.colors.secondaryContainer}}
                        textStyle={{color: theme.colors.onSecondaryContainer}}
                    >
                        {
                            availability === 'inStock'
                                ? 'In Stock'
                                : 'Out of Stock'
                        }
                    </Chip>
                </View>
            </Card.Content>
        </Card>
    );
};


export default StickerDetailsCard;
