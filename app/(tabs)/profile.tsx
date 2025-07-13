import React, {useEffect, useState} from 'react';
import {Image, KeyboardAvoidingView, TouchableOpacity, View} from 'react-native';
import {Avatar, Button, Divider, HelperText, Text, TextInput, useTheme,} from 'react-native-paper';
import {Controller, useForm} from "react-hook-form";
import * as ImagePicker from 'expo-image-picker';
import useUserStorage from "@/lib/hooks/useUserStorage/useUserStorage";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {profileStyles} from "@/lib/pageStyles/profile/profile";
import {useRouter} from "expo-router";
import {ProfileFormValues} from "@/lib/pageStyles/profile/type";
import TabSafeAreaWrapper from "@/components/Layout/TabSafeAreaWrapper/TabSafeAreaWrapper";
import SnackbarPortal from "@/components/Modal/SnakBarMessage/SnakBarMessage";


const Profile = () => {
    const theme = useTheme();
    const router = useRouter();
    const {
        updatedUser,
        getCurrentUser,
        signOut
    } = useUserStorage();
    const [avatarUri, setAvatarUri] = useState<string | null>(null);
    const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);

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
        bio: yup
            .string()
            .default(""),
    });

    const {
        control,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<ProfileFormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            phone: "",
            bio: "",
            email: ""
        }
    });

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getCurrentUser();
            if (user) {
                setValue("name", user.name);
                setValue("email", user.email);
                setValue("phone", user.phone);
                setValue("bio", user.bio);
                if (user.avatarUri) {
                    setAvatarUri(user.avatarUri);
                }
            }
        };
        fetchUser();
    }, []);

    const pickAvatar = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            setAvatarUri(result.assets[0].uri);
        }
    };

    const onSubmit = async (data: ProfileFormValues) => {
        await updatedUser({
            ...data,
            avatarUri: avatarUri ?? undefined,
        });
        console.log({
            ...data,
            avatarUri,
        });
        setSnackbarVisible(true)
    };

    const handleSignOut = async () => {
        await signOut();
        router.push("/auth/signup")
    }
    return (
        <TabSafeAreaWrapper
            keyboardAvoiding={true}
            scroll={true}
            style={profileStyles.container}
        >
            <SnackbarPortal
                onDismiss={() => setSnackbarVisible(false)}
                visible={snackbarVisible}
                message={"Profile updated successfully! (please Refresh !!)"}
            />
            <TouchableOpacity
                onPress={pickAvatar}
                style={profileStyles.avatarContainer}
            >
                {avatarUri ? (
                    <Image
                        source={{uri: avatarUri}}
                        style={profileStyles.avatar}
                    />
                ) : (
                    <Avatar.Icon
                        size={120}
                        icon="account"
                        style={{backgroundColor: theme.colors.primaryContainer}}
                    />
                )}
                <Text style={{color: theme.colors.primary, marginTop: 8}}>
                    Tap to change photo
                </Text>
            </TouchableOpacity>

            <Divider style={[
                profileStyles.divider,
                {backgroundColor: theme.colors.outlineVariant}
            ]}/>

            <View style={profileStyles.section}>
                {/* Name */}
                <Controller
                    control={control}
                    name={'name'}
                    render={(
                        {
                            field: {
                                value,
                                onChange
                            }
                        }
                    ) => (
                        <View style={profileStyles.fieldContainer}>
                            <TextInput
                                label={"Name"}
                                value={value}
                                onChangeText={onChange}
                                mode="outlined"
                                error={!!errors.name}
                                style={[profileStyles.input]}
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
                {/* Email */}
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
                        <View style={profileStyles.fieldContainer}>
                            <TextInput
                                label={"Email"}
                                value={value}
                                onChangeText={onChange}
                                mode="outlined"
                                error={!!errors.email}
                                style={profileStyles.input}
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
                        <View style={profileStyles.fieldContainer}>
                            <TextInput
                                label={"Phone Number"}
                                value={value}
                                onChangeText={onChange}
                                mode="outlined"
                                error={!!errors.phone}
                                keyboardType="number-pad"
                                maxLength={11}
                                style={profileStyles.input}
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
                {/* Bio */}
                <Controller
                    control={control}
                    name="bio"
                    render={({field: {value, onChange}}) => (
                        <TextInput
                            label="Bio"
                            value={value}
                            onChangeText={onChange}
                            mode="outlined"
                            multiline
                            numberOfLines={4}
                            style={[profileStyles.input, {minHeight: 120}]}
                            left={<TextInput.Icon icon="pencil"/>}
                        />
                    )}
                />

                <View
                    style={profileStyles.actionButtonsContainer}
                >
                    <Button
                        mode="contained"
                        onPress={handleSubmit(onSubmit)}
                        style={profileStyles.actionButton}
                    >
                        Save Changes
                    </Button>
                    <Button
                        mode="outlined"
                        onPress={handleSignOut}
                        style={profileStyles.actionButton}
                    >
                        Sign Out
                    </Button>
                </View>

            </View>
        </TabSafeAreaWrapper>
    );
};


export default Profile;
