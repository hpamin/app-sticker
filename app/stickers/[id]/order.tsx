import React, {useEffect, useState} from 'react';
import {Alert, Platform, View} from 'react-native';
import {useLocalSearchParams, useRouter} from "expo-router";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, HelperText, Switch, Text, TextInput, useTheme} from "react-native-paper";
import {FormValues} from "@/lib/pageStyles/order/type";
import {priceTable, StickerMaterial, StickerSize} from "@/lib/priceTable/priceTable";
import {orderStyles} from "@/lib/pageStyles/order/style";
import {useCreate} from "@/lib/fetch/useCreate/useCreate";
import {useShow} from "@/lib/fetch/useShow/useShow";
import {User} from "@/lib/hooks/useUserStorage/types";
import useUserStorage from "@/lib/hooks/useUserStorage/useUserStorage";
import {Dropdown} from 'react-native-element-dropdown';
import {Ionicons} from "@expo/vector-icons";
import TabSafeAreaWrapper from "@/components/Layout/TabSafeAreaWrapper/TabSafeAreaWrapper";
import useStickerPrice from "@/lib/hooks/useStickerPrice/useStickerPrice";
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';

const Order = () => {

    const router = useRouter();
    const {id} = useLocalSearchParams();
    const safeID = Array.isArray(id) ? id[0] : id;
    const theme = useTheme();

    const sizeOptions = Object.keys(priceTable) as StickerSize[];
    const materialOptions = Object.keys(priceTable["2"]) as StickerMaterial[];
    const {data: selectedData} = useShow('stickers', safeID)
    const {state} = useCreate("orders")
    const [user, setUser] = useState<User | null>(null);
    const {getCurrentUser} = useUserStorage()

    const schema = yup.object({
        name: yup
            .string()
            .min(3)
            .required("The name entered is not valid."),
        phone: yup
            .string()
            .matches(/^09\d{9}$/, "09*********")
            .required("Phone number is required."),
        email: yup
            .string()
            .email("Email is invalid")
            .required("Email is required."),
        size: yup
            .mixed<StickerSize>()
            .oneOf(sizeOptions, "Please select size")
            .required("Size is required"),
        count: yup
            .string()
            .matches(/^\d+$/, "Enter a number")
            .test("max", "Maximum number is 10,000", (value) => {
                if (!value) return false;
                return parseInt(value, 10) <= 10000;
            })
            .required("Count is required."),
        material: yup
            .mixed<StickerMaterial>()
            .oneOf(materialOptions, "Please select the material type")
            .required("Material is required."),
        express: yup
            .boolean()
            .required(),
    })
    const {
        control,
        handleSubmit,
        formState: {errors},
        watch
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            size: "2",
            count: "",
            material: "glossy",
            express: false
        }
    })
    const size = watch('size')
    const count = parseInt(watch("count") || "0")
    const material = watch("material")
    const express = watch("express")
    const price = useStickerPrice(size, count, material, express);
    const onSubmit = async (data: FormValues) => {
        const orderData = {
            ...selectedData,
            order: {
                ...data,
                price,
                id: uuid(),
                date: Date.now(),
                userId: user?.id
            }
        }
        Alert.alert("Order JSON", JSON.stringify(orderData, null, 2), [
            {
                text: "Submit",
                onPress: async () => {
                    try {
                        await state({value: orderData, local: true});
                        router.replace("/orders");
                    } catch (err) {
                        Alert.alert("Error", "Failed to send data");
                    }
                },
            },
            {text: "Cancel", style: "cancel"},
        ]);
    };

    const stickerSize = [
        {value: "2", label: "2 cm"},
        {value: "4", label: "4 cm"},
        {value: "6", label: "6 cm"},
        {value: "8", label: "8 cm"},
        {value: "10", label: "10 cm"},
    ];
    const stickerMaterial = [
        {label: "Glossy", value: "glossy"},
        {label: "Matt", value: "matt"},
        {label: "Transparent", value: "transparent"},
    ]


    useEffect(() => {
        (async () => {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        })();
    }, []);


    return (
        <TabSafeAreaWrapper
            keyboardAvoiding
            scroll
            style={[
                orderStyles.container,
                {backgroundColor: theme.colors.background}
            ]}
        >

            {/*<IconButton*/}
            {/*    icon="arrow-left"*/}
            {/*    size={24}*/}
            {/*    style={[styles.backButton, {backgroundColor: theme.colors.primaryContainer}]}*/}
            {/*    iconColor={theme.colors.onPrimaryContainer}*/}
            {/*    onPress={() => router.back()}*/}
            {/*/>*/}


            <View style={orderStyles.card}>
                {/* Header */}
                <View style={orderStyles.header}>
                    <Text style={[orderStyles.headerText, {color: theme.colors.primary}]}>
                        Sticker Order Form
                    </Text>
                </View>

                {/* name */}
                <Controller
                    control={control}
                    name={'name'}
                    render={({
                                 field: {
                                     value,
                                     onChange
                                 }
                             }) => (
                        <View style={orderStyles.fieldContainer}>
                            <TextInput
                                label={"Full Name"}
                                value={value}
                                onChangeText={onChange}
                                mode={'outlined'}
                                error={!!errors.name}
                                style={orderStyles.input}
                                left={<TextInput.Icon icon="account"/>}
                                theme={{
                                    colors: {
                                        primary: theme.colors.primary,
                                    }
                                }}
                            />
                            <HelperText
                                type={"error"}
                                visible={!!errors.name}
                                style={{padding: 0, margin: 0}}
                            >
                                {errors.name?.message}
                            </HelperText>
                        </View>
                    )}
                />

                {/*Phone*/}
                <Controller
                    control={control}
                    name={'phone'}
                    render={(
                        {
                            field: {
                                value,
                                onChange
                            }
                        }
                    ) => (
                        <View style={orderStyles.fieldContainer}>
                            <TextInput
                                label={"Phone Number"}
                                value={value}
                                onChangeText={onChange}
                                mode="outlined"
                                error={!!errors.phone}
                                keyboardType="number-pad"
                                maxLength={11}
                                style={orderStyles.input}
                                left={<TextInput.Icon icon="phone"/>}
                                theme={{
                                    colors: {
                                        primary: theme.colors.primary,
                                    }
                                }}
                            />
                            <HelperText
                                type={"error"}
                                visible={!!errors.phone}
                                style={{padding: 0, margin: 0}}
                            >
                                {errors.phone?.message}
                            </HelperText>
                        </View>
                    )}
                />

                {/*Email*/}
                <Controller
                    control={control}
                    name={'email'}
                    render={(
                        {
                            field: {
                                value,
                                onChange
                            }
                        }
                    ) => (
                        <View style={orderStyles.fieldContainer}>
                            <TextInput
                                label={"Email Address"}
                                value={value}
                                onChangeText={onChange}
                                mode={'outlined'}
                                error={!!errors.email}
                                style={orderStyles.input}
                                left={<TextInput.Icon icon="email"/>}
                                theme={{
                                    colors: {
                                        primary: theme.colors.primary,
                                    }
                                }}
                            />
                            <HelperText
                                type={"error"}
                                visible={!!errors.email}
                                style={{padding: 0, margin: 0}}
                            >
                                {errors.email?.message}
                            </HelperText>
                        </View>
                    )}
                />
                {/*Count*/}
                <Controller
                    control={control}
                    name={'count'}
                    render={(
                        {
                            field: {
                                value,
                                onChange
                            }
                        }
                    ) => (
                        <View style={orderStyles.fieldContainer}>
                            <TextInput
                                label={"Count"}
                                value={value}
                                onChangeText={onChange}
                                mode="outlined"
                                error={!!errors.count}
                                keyboardType="number-pad"
                                maxLength={5}
                                style={orderStyles.input}
                                left={<TextInput.Icon icon="numeric"/>}
                                theme={{
                                    colors: {
                                        primary: theme.colors.primary,
                                    }
                                }}
                            />
                            <HelperText
                                type={"error"}
                                visible={!!errors.count}
                                style={{padding: 0, margin: 0}}
                            >
                                {errors.count?.message}
                            </HelperText>
                        </View>
                    )}
                />


                {/*size*/}
                <Controller
                    control={control}
                    name="size"
                    render={({field: {value, onChange}}) => (
                        <View style={orderStyles.fieldContainer}>
                            <Dropdown
                                mode={"auto"}
                                data={stickerSize}
                                search
                                maxHeight={300}
                                labelField={"label"}
                                valueField={"value"}
                                value={value}
                                onChange={item => onChange(item.value)}
                                placeholder="Select Size (cm)"
                                renderLeftIcon={() => (
                                    <Ionicons
                                        name="resize-outline"
                                        size={24}
                                        style={[orderStyles.dropDownIcon, {color: theme.colors.onSurfaceVariant}]}
                                    />
                                )}
                                style={[orderStyles.input, orderStyles.dropdown, {
                                    borderColor: errors.size
                                        ? theme.colors.error
                                        : theme.colors.outline,
                                    paddingVertical: Platform.OS === 'ios'
                                        ? 14
                                        : 8,
                                    backgroundColor: theme.colors.background
                                }]}
                                placeholderStyle={{
                                    color: theme.colors.onSurfaceVariant,
                                }}
                                selectedTextStyle={[
                                    orderStyles.placeholderStyle,
                                    {color: theme.colors.onSurface,}
                                ]}
                                containerStyle={[
                                    orderStyles.containerStyle,
                                    {
                                        backgroundColor: theme.colors.elevation?.level2 || theme.colors.surfaceVariant,
                                        borderColor: theme.colors.outline,
                                    }
                                ]}
                                itemContainerStyle={{
                                    backgroundColor: theme.colors.elevation?.level2 || theme.colors.surfaceVariant,
                                }}
                                itemTextStyle={{
                                    color: theme.colors.onSurface,
                                }}
                                activeColor={theme.colors.primaryContainer}
                            />
                            <HelperText type="error" visible={!!errors.size}>
                                {errors.size?.message}
                            </HelperText>
                        </View>
                    )}
                />


                {/* Material */}
                <Controller
                    control={control}
                    name="material"
                    render={({field: {value, onChange}}) => (
                        <View style={orderStyles.fieldContainer}>
                            <Dropdown
                                mode={"auto"}
                                data={stickerMaterial}
                                search
                                maxHeight={300}
                                labelField={"label"}
                                valueField={"value"}
                                value={value}
                                onChange={(item) => onChange(item.value)}
                                placeholder="Material"
                                renderLeftIcon={() => (
                                    <Ionicons
                                        name="layers-outline"
                                        size={24}
                                        style={[orderStyles.dropDownIcon, {color: theme.colors.onSurfaceVariant}]}
                                    />
                                )}
                                style={[orderStyles.input, orderStyles.dropdown, {
                                    borderColor: errors.size
                                        ? theme.colors.error
                                        : theme.colors.outline,
                                    paddingVertical: Platform.OS === 'ios'
                                        ? 14
                                        : 8,
                                    backgroundColor: theme.colors.background
                                }]}
                                placeholderStyle={{
                                    color: theme.colors.onSurfaceVariant,
                                }}
                                selectedTextStyle={[
                                    orderStyles.placeholderStyle,
                                    {color: theme.colors.onSurface,}
                                ]}
                                containerStyle={[
                                    orderStyles.containerStyle,
                                    {
                                        backgroundColor: theme.colors.elevation?.level2 || theme.colors.surfaceVariant,
                                        borderColor: theme.colors.outline,
                                    }
                                ]}
                                itemContainerStyle={{
                                    backgroundColor: theme.colors.elevation?.level2 || theme.colors.surfaceVariant,
                                }}
                                itemTextStyle={{
                                    color: theme.colors.onSurface,
                                }}
                                activeColor={theme.colors.primaryContainer}
                            />
                            <HelperText type="error" visible={!!errors.material}>
                                {errors.material?.message}
                            </HelperText>
                        </View>
                    )}
                />

                <Controller
                    control={control}
                    name={'express'}
                    render={({
                                 field: {
                                     value,
                                     onChange
                                 }
                             }
                    ) => (
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: 8
                            }}>
                                <Text
                                    style={[
                                        orderStyles.priceLabel,
                                        {color: theme.colors.onSurface,}
                                    ]}
                                >
                                    Express Printing?
                                </Text>
                                <Switch value={value} onValueChange={onChange}/>
                            </View>
                        </View>
                    )}

                />

                {/* Price Display */}
                <View style={orderStyles.priceContainer}>
                    <Text style={[orderStyles.priceLabel, {color: theme.colors.onSurface}]}>
                        Total Price:
                    </Text>
                    <Text style={[orderStyles.expressLabel, {color: theme.colors.primary}]}>
                        {price.toLocaleString('de-DE', {minimumFractionDigits: 2})} €
                    </Text>
                </View>

                <Button
                    mode={"contained"}
                    onPress={handleSubmit(onSubmit)}
                    style={orderStyles.submitButton}
                    labelStyle={orderStyles.buttonLabel}
                    icon="cart"
                    contentStyle={orderStyles.buttonContent}
                >
                    Place Order
                </Button>
            </View>
        </TabSafeAreaWrapper>
    );
}


export default Order;