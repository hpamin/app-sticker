import React from "react";
import {KeyboardAvoidingView, Platform, View} from "react-native";
import {Button, HelperText, Text, TextInput, useTheme} from "react-native-paper";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useRouter} from "expo-router";
import useUserStorage from "@/lib/hooks/useUserStorage/useUserStorage";
import {UserInfo} from "@/lib/hooks/useUserStorage/types";
import {styles} from "@/lib/pageStyles/signup/style";
import 'react-native-get-random-values';
import TabSafeAreaWrapper from "@/components/Layout/TabSafeAreaWrapper/TabSafeAreaWrapper";

const SignUp = () => {
    const theme = useTheme();
    const router = useRouter();
    const { signUp } = useUserStorage();

    const schema = yup.object({
        name: yup
            .string()
            .min(3, "Name must be more than 3 characters")
            .required("Name is required"),
        email: yup
            .string()
            .email("Email is invalid")
            .required("Email is required"),
        phone: yup
            .string()
            .matches(/^09\d{9}$/, "09*********")
            .required("Phone number is required."),
        password: yup
            .string()
            .min(8, "Password must be more than 8 characters")
            .required("Password is required"),
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<UserInfo>({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            password: "",
            avatarUri: ""
        }
    });

    const onSubmit = async (data: UserInfo) => {
        try {
            await signUp(data);
            router.replace("/auth/signin");
        } catch (error) {
            console.error("Sign up failed:", error);
        }
    };

    return (
        <TabSafeAreaWrapper
            keyboardAvoiding={true}
            style={styles.container}
        >
            <View style={[
                styles.content,
                {backgroundColor: theme.colors.inverseOnSurface}
            ]}>
                <Text
                    style={[styles.title, {color: theme.colors.primary}]}
                >
                    Create Account
                </Text>

                {/* Name */}
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { value, onChange } }) => (
                        <View style={styles.fieldContainer}>
                            <TextInput
                                label="Full Name"
                                value={value}
                                onChangeText={onChange}
                                mode="outlined"
                                error={!!errors.name}
                                style={[styles.input,
                                    {backgroundColor: theme.colors.inverseOnSurface,}]}
                                left={<TextInput.Icon icon="account" />}
                                theme={{
                                    colors: {
                                        primary: theme.colors.primary,
                                    },
                                }}
                            />
                            <HelperText
                                type="error"
                                visible={!!errors.name}
                                style={styles.helperText}
                            >
                                {errors.name?.message}
                            </HelperText>
                        </View>
                    )}
                />

                {/* Email */}
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { value, onChange } }) => (
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
                                left={<TextInput.Icon icon="email" />}
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

                {/* Phone */}
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
                        <View style={styles.fieldContainer}>
                            <TextInput
                                label={"Phone Number"}
                                value={value}
                                onChangeText={onChange}
                                mode="outlined"
                                error={!!errors.phone}
                                keyboardType="number-pad"
                                maxLength={11}
                                style={[styles.input,
                                    {backgroundColor: theme.colors.inverseOnSurface,}]}
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

                {/* Password */}
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { value, onChange } }) => (
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
                                left={<TextInput.Icon icon="key" />}
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
                    icon="account-plus"
                    contentStyle={styles.buttonContent}
                >
                    Sign Up
                </Button>

                <Button
                    mode="text"
                    onPress={() => router.push("/auth/signin")}
                    style={styles.secondaryButton}
                    labelStyle={styles.secondaryButtonLabel}
                >
                    Already have an account? Sign In
                </Button>
            </View>
        </TabSafeAreaWrapper>
    );
};



export default SignUp;