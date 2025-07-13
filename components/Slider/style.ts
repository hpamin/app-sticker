import {Dimensions, StyleSheet} from "react-native";

const {width} = Dimensions.get("screen");

export const styles = StyleSheet.create({
//     pagination
    dotsContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    dots: {
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },


//     item Slider
    itemContainer: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',

    },
    imageBanner: {
        width: "100%",
        height: 220,
        borderRadius: 16,
    },
    cardItem: {
        width: width ,
        paddingHorizontal: 16
    },
    cardContentItem: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        borderRadius: 16,
    }
})