import React from "react";
import {View, StyleSheet, KeyboardAvoidingView, Platform} from "react-native";
import {useRouter} from "expo-router";
import {Button, HelperText, TextInput, useTheme, Title, Text} from "react-native-paper";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import useUserStorage from "@/lib/hooks/useUserStorage/useUserStorage";
import {FormValues} from "@/lib/pageStyles/order/type";
import {signInProps} from "@/lib/hooks/useUserStorage/types";
import 'react-native-get-random-values';
import TabSafeAreaWrapper from "@/components/Layout/TabSafeAreaWrapper/TabSafeAreaWrapper";
import {styles} from "@/lib/pageStyles/signin/style";

const SignIn = () => {
    const theme = useTheme();
    const router = useRouter();
    const {signIn} = useUserStorage();

    const schema = yup.object({
        email: yup
            .string()
            .email("Please enter a valid email address")
            .required("Email is required"),
        password: yup
            .string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
    });

    const {
        control,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm<signInProps>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "mmd@gmail.com",
            password: "123456789",
        },
        mode: "onChange",
    });

    const onSubmit = async (data: signInProps) => {
        try {
            await signIn(data);
            router.replace("/");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <TabSafeAreaWrapper
            keyboardAvoiding={true}
            style={[
                styles.container,
                {backgroundColor: theme.colors.surface}
            ]}
        >
            <View style={[
                styles.content,
                {backgroundColor: theme.colors.inverseOnSurface}
            ]}>
                <Text
                    style={[styles.title, {color: theme.colors.primary}]}
                >
                    Sign In
                </Text>

                {/* Email Input */}
                <Controller
                    control={control}
                    name="email"
                    render={({field: {value, onChange}}) => (
                        <View style={styles.fieldContainer}>
                            <TextInput
                                label="Email"
                                value={value}
                                onChangeText={onChange}
                                mode="outlined"
                                error={!!errors.email}
                                style={[styles.input,
                                    {backgroundColor: theme.colors.inverseOnSurface,}]}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                left={<TextInput.Icon icon="email"/>}
                                theme={{
                                    colors: {
                                        primary: theme.colors.primary,
                                    },
                                }}
                            />
                            <HelperText
                                type="error"
                                visible={!!errors.email}
                                style={styles.helperText}
                            >
                                {errors.email?.message}
                            </HelperText>
                        </View>
                    )}
                />

                {/* Password Input */}
                <Controller
                    control={control}
                    name="password"
                    render={({field: {value, onChange}}) => (
                        <View style={styles.fieldContainer}>
                            <TextInput
                                label="Password"
                                value={value}
                                onChangeText={onChange}
                                mode="outlined"
                                error={!!errors.password}
                                style={[styles.input,
                                    {backgroundColor: theme.colors.inverseOnSurface,}]}
                                secureTextEntry
                                autoCapitalize="none"
                                textContentType="password"
                                left={<TextInput.Icon icon="key"/>}
                                theme={{
                                    colors: {
                                        primary: theme.colors.primary,
                                    },
                                }}
                            />
                            <HelperText
                                type="error"
                                visible={!!errors.password}
                                style={styles.helperText}
                            >
                                {errors.password?.message}
                            </HelperText>
                        </View>
                    )}
                />

                <Button
                    mode="contained"
                    onPress={handleSubmit(onSubmit)}
                    style={styles.submitButton}
                    labelStyle={styles.buttonLabel}
                    disabled={!isValid}
                    icon="login"
                    contentStyle={styles.buttonContent}
                >
                    Sign In
                </Button>

                <Button
                    mode="text"
                    onPress={() => router.push("/auth/signup")}
                    style={styles.secondaryButton}
                    labelStyle={styles.secondaryButtonLabel}
                >
                    Don't have an account? Sign Up
                </Button>
            </View>
        </TabSafeAreaWrapper>
    );
};


export default SignIn;