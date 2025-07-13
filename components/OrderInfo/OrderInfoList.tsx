import {FlatList, View} from "react-native";
import React from "react";
import OrderInfoItem from "@/components/OrderInfo/OrderInfoItem";
import {OrderInfoListProps} from "@/components/OrderInfo/type";


const OrderInfoList = (
    {
        data
    }: OrderInfoListProps
) => {

    return (
        <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8 }}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.order.id}
                renderItem={({ item }) => (
                    <OrderInfoItem data={item} />
                )}
                contentContainerStyle={{ paddingBottom: 24, gap: 16 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default OrderInfoList;
