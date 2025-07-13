import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    content: {
        padding: 20,
        borderRadius: 8,
        backgroundColor: "white",
        elevation: 2,
    },
    title: {
        textAlign: "center",
        marginBottom: 24,
        fontSize: 24,
        fontWeight: "bold",
    },
    fieldContainer: {
        marginBottom: 16,
    },
    input: {
        backgroundColor: "white",
    },
    helperText: {
        padding: 0,
        margin: 0,
        paddingHorizontal: 8,
    },
    submitButton: {
        marginTop: 16,
    },
    buttonLabel: {
        fontSize: 16,
    },
    buttonContent: {
        height: 48,
    },
    secondaryButton: {
        marginTop: 16,
    },
    secondaryButtonLabel: {
        fontSize: 14,
    },
});