import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {Text, useTheme} from "react-native-paper";
import {useFetchResource} from "@/lib/fetch/useList/useList";
import {OrderSticker} from "@/lib/fetch/useList/type";
import Loading from "@/components/Loading/Loading";
import ErrorRetry from "@/components/ErrorRetry/ErrorRetry";
import OrderInfoList from "@/components/OrderInfo/OrderInfoList";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import useUserStorage from "@/lib/hooks/useUserStorage/useUserStorage";
import {User} from "@/lib/hooks/useUserStorage/types";
import TabSafeAreaWrapper from "@/components/Layout/TabSafeAreaWrapper/TabSafeAreaWrapper";

const Orders = () => {
    const theme = useTheme();
    const [user, setUser] = useState<User | null>(null);
    const {getCurrentUser} = useUserStorage()

    const {
        error,
        loading,
        data,
        reFetch
    } = useFetchResource<OrderSticker>("orders", {local: true});

    const sortedData = data?.sort(
        (a, b) => new Date(b.order.date).getTime() - new Date(a.order.date).getTime()
    );
    const filteredData = sortedData?.filter((item) => item.order.userId === user?.id);

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        };

        fetchUser();
    }, []);

    if (loading) return <Loading/>;
    if (error) return <ErrorRetry onRetry={reFetch}/>;

    const hasOrders = filteredData && filteredData.length > 0;

    return (
        <TabSafeAreaWrapper
            scroll={false}
            style={{flex: 1}}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    marginTop: 16
                }}
            >
                <Text
                    variant="headlineLarge"
                    style={{
                        color: theme.colors.primary,
                        fontWeight: "bold"
                    }}
                >
                    Order Sticker
                </Text>
                <Text
                    variant="headlineMedium"
                    style={{
                        color: theme.colors.secondary,
                        marginLeft: 6
                    }}
                >
                    ({filteredData?.length ?? 0})
                </Text>
            </View>

            {
                hasOrders ? (
                    <OrderInfoList data={filteredData}/>
                ) : (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 16
                        }}
                    >
                        <MaterialCommunityIcons
                            name="package-variant"
                            size={80}
                            color={theme.colors.onSurfaceVariant}
                            style={{marginBottom: 8}}
                        />
                        <Text
                            variant="titleMedium"
                            style={{color: theme.colors.onSurfaceVariant, textAlign: "center"}}
                        >
                            No orders found
                        </Text>

                    </View>
                )}
        </TabSafeAreaWrapper>
    );
};

export default Orders;
