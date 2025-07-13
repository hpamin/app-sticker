import {StyleSheet} from "react-native";


export const styles = StyleSheet.create({
    modalContent: {
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        marginBottom: 16,
        fontWeight: 'bold',
    },
    sectionTitle: {
        marginTop: 12,
        marginBottom: 8,
        color: '#555',
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    categoryText: {
        marginLeft: 8,
    },
    applyButton: {
        marginTop: 16,
        borderRadius: 8,
        paddingVertical: 6,
    },
    applyButtonLabel: {
        fontSize: 16,
    },
});