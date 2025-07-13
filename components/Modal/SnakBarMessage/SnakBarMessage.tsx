import React from "react";
import {View} from "react-native";
import {Portal, Snackbar} from "react-native-paper";
import {SnackbarPortalProps} from "@/components/Modal/SnakBarMessage/type";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const SnackbarPortal = (
    {
        visible,
        onDismiss,
        message,
        duration = 2000,
        actionLabel = "OK",
        onActionPress,
    }: SnackbarPortalProps
) => {
    const insets = useSafeAreaInsets();

    return (
        <Portal>
            <Snackbar
                visible={visible}
                onDismiss={onDismiss}
                duration={duration}
                action={{
                    label: actionLabel,
                    onPress: onActionPress ?? onDismiss,
                }}
                style={{
                    alignSelf: "center",
                    borderRadius: 8,
                    width: "90%",
                }}
            >
                {message}
            </Snackbar>
        </Portal>
    );
};

export default SnackbarPortal;
