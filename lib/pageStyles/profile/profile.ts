import {StyleSheet} from "react-native";


export const profileStyles = StyleSheet.create({

    scrollContainer: {
        paddingBottom: 32,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        elevation: 0,
    },
    header: {
        marginBottom: 24,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    fieldContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
        color: '#666',
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 24,

    },
    priceLabel: {
        fontSize: 18,
        fontWeight: '600',
    },
    priceValue: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    expressLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16
    },
    submitButton: {
        marginTop: 8,
        borderRadius: 8,
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContent: {
        flexDirection: 'row-reverse',
        height: 48,
    },
    container: {
        // paddingBottom: 12
    },
    contentContainer: {
        paddingBottom: 32,
    },
    avatarContainer: {
        // width: "auto",
        alignItems: 'center',
        marginVertical: 16,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    section: {
        padding: 16,
    },
    input: {
        // marginBottom: 2,
    },
    divider: {
        height: 1,
        marginHorizontal: 16,
        marginVertical: 8,
    },
    actionButtonsContainer: {
        marginTop: 16
    },
    actionButton: {
        marginTop: 8,
    },
});