import {StyleSheet} from "react-native";

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
    searchBoxStyle: {
        borderRadius: 12,
        elevation: 3,
    },
    content: {
        flexGrow: 1,
        padding: 16,
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
});
