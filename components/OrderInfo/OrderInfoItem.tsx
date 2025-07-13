import React from "react";
import {Image, StyleSheet, View} from "react-native";
import {Card, Chip, Divider, Text, useTheme} from "react-native-paper";
import {OrderSticker} from "@/lib/fetch/useList/type";
import {useRouter} from "expo-router";
import {Ionicons} from "@expo/vector-icons";

const OrderInfoItem = (
    {
        data
    }: { data: OrderSticker }
) => {
    const theme = useTheme();
    const router = useRouter();

    const {
        id,
        name,
        image,
        category,
        description,
        isBestSeller,
        order
    } = data;

    const {
        name: customerName,
        phone,
        email,
        size,
        count,
        material,
        express,
        price
    } = order;

    return (
        <Card
            mode="outlined"
            style={styles.container}
            contentStyle={{padding: 16, paddingVertical: 20}}
            onPress={() => router.push(`/stickers/${id}`)}
        >
            {isBestSeller && (
                <View
                    style={styles.bestSeller}
                >
                    <Ionicons
                        name={"checkmark"}
                        size={16}
                        style={{color: theme.colors.secondary}}
                    />
                    <Text
                        style={{color: theme.colors.secondary}}
                    >
                        Best Seller

                    </Text>
                </View>
            )}
            <Card.Title
                title={name}
                style={{padding: 0}}
                subtitle={`Category: ${category}`}
                left={() => (
                    <Image
                        source={{uri: image}}
                        style={styles.image}
                    />
                )}
                right={() => (
                    <View style={styles.rightCard}>

                        <Chip
                            style={{backgroundColor: theme.colors.primaryContainer}}
                            textStyle={{color: theme.colors.onPrimaryContainer}}
                        >
                            ${price.toFixed(2)}
                        </Chip>
                    </View>
                )}
            />

            <Card.Content style={{padding: 0}}>
                <Text
                    variant="bodyMedium"
                    style={{marginBottom: 6}}
                >
                    {description}
                </Text>
                <Divider style={{marginVertical: 4}}/>

                <View style={styles.specsContainer}>
                    <View
                        style={styles.detailsOrder}
                    >
                        <View style={styles.specItem}>
                            <Ionicons
                                name="resize-outline"
                                size={16}
                                style={styles.specIcon}
                            />
                            <Text variant="bodyMedium">Size: {size} cm</Text>
                        </View>

                        <View style={styles.specItem}>
                            <Ionicons
                                name="list-outline"
                                size={16}
                                style={styles.specIcon}
                            />
                            <Text variant="bodyMedium">Count: {count} pcs</Text>
                        </View>

                        <View style={styles.specItem}>
                            <Ionicons
                                name="layers"
                                size={16}
                                style={styles.specIcon}
                            />

                            <Text variant="bodyMedium">Material: {material}</Text>
                        </View>
                    </View>

                    <View style={styles.shippingContainer}>
                        <Chip
                            icon={express ? "rocket" : "clock-outline"}
                            mode="flat"
                            style={[
                                styles.shippingChip,
                                {backgroundColor: express ? theme.colors.tertiaryContainer : theme.colors.primaryContainer}
                            ]}
                        >
                            {express ? "Express Shipping" : "Standard Shipping"}
                        </Chip>
                    </View>
                </View>

                <View style={{marginTop: 8}}>
                    <Text variant="labelSmall">Customer: {customerName} ({phone})</Text>
                    <Text variant="labelSmall">Email: {email}</Text>
                </View>
            </Card.Content>
        </Card>
    );
};
const styles = StyleSheet.create({
    container: {
        borderRadius: 12
    },
    bestSeller: {
        position: 'absolute',
        end: 16,
        top: 10,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: 'center',
        gap: 4,
        padding: 3,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 8
    },
    rightCard: {
        flexDirection: "row",
        alignItems: "center"
    },
    detailsOrder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    specsContainer: {
        marginBottom: 12,
    },
    specItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    specIcon: {
        marginRight: 8,
        color: '#666',
    },
    shippingContainer: {
        marginTop: 8,
    },
    shippingChip: {
        alignSelf: 'flex-start',
    },

});

export default OrderInfoItem;