import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    // Sticker Card Item
    card: {
        padding: 0,
        borderRadius: 12,
        elevation: 2,
    },
    container: {
        width: 160,
        paddingHorizontal: 8,
        paddingVertical: 0,
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        width: 160,
        height: 160,
        borderRadius: 8,
    },
    contentContainer: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    marginTop: 8,
    },
    title: {
        maxWidth: 80,
        fontWeight: 'bold',
    },
    price: {
        fontWeight: '600',
    },
    description: {
        marginTop: 4,
        marginBottom: 8,
        color: '#666',
        textAlign: "justify"
    },
    button: {
        margin: 0,
        padding: 0,
        alignSelf: 'flex-start',
        justifyContent: "center",
        borderRadius: 8,
    },
    // liner gradint
    fadeTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 30,
        zIndex: 10,
    },
});
