import {Platform, StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 10,
        left: 16,
        zIndex: 100000,
        borderRadius: 12,
    },
    headerContainer: {
        height: 300,
        marginBottom: 16,
    },
    headerImage: {
        flex: 1,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '40%',
    },
    headerContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    headerTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontWeight: 'bold',
        flex: 1,
    },
    bestSellerChip: {
        marginLeft: 8,
    },
    contentContainer: {
        // padding: 16,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        padding: 16,
    },
    priceText: {
        fontWeight: 'bold',
    },
    ratingContainer: {
        flexDirection: 'row',
    },
    description: {
        marginBottom: 24,
        lineHeight: 24,
        padding: 16,
    },
    sliderContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        padding: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        padding: 16,
    },
    button: {
        flex: 1,
        borderRadius: 12,
    },
    buttonContent: {
        height: 48,
    },
    detailsCard: {
        borderRadius: 16,
        overflow: 'hidden',
    },
    detailsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    detailsTitle: {
        fontWeight: 'bold',
    },
    detailItem: {
        padding: 16,
    },
});

export const orderStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        position: 'relative',
    },
    scrollContainer: {
        paddingBottom: 32,
    },
    card: {
        flexGrow: 1,
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
        marginBottom: 24,
    },
    input: {
        height: 48,
        borderRadius: 4,
        justifyContent: 'center',
        fontSize: 16,
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


//     drop down
    dropdown: {
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 12,
    },
    icon: {
        marginRight: 5,
    },
    labelDropDown: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    containerStyle: {
        borderRadius: 4,
    },
    selectedTextStyle: {
        fontSize: 16,
        borderRadius: 6,
        borderWidth: 1,
    },
    dropDownIcon: {
        paddingStart: 5,
        marginEnd: 16
    },
});