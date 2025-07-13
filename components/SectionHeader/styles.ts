import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 8,
        width: "100%",
        alignItems: "center",
    },
    title: {
        flex: 1,
        fontWeight: "bold",
        fontSize: 17,
        color: "#585a61",
    },
    button: {
        borderRadius: 15,
        paddingHorizontal: 8,
    },
    buttonLabel: {
        fontWeight: "bold",
        fontSize: 13,
    },
});