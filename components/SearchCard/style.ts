import {Dimensions, StyleSheet} from "react-native";

const {width} = Dimensions.get("screen");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    searchBar: {
        borderRadius: 12,
        elevation: 3,
    },
    content: {
        flexGrow: 1,
        padding: 16,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
    },
    resultsContainer: {
        flex: 1,
    },
    resultsCount: {
        marginBottom: 16,
    },
    stickersGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    stickerCard: {
        width: width / 2 - 24,
        marginBottom: 16,
        borderRadius: 12,
        // overflow: 'hidden',
    },
    stickerImage: {
        height: 150,
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 12,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    priceText: {
        fontWeight: 'bold',
    },
    badge: {
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
    },
});