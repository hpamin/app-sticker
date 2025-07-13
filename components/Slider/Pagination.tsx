import {Dimensions, View} from 'react-native';
import Animated, {Extrapolation, interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {useTheme as usePaperTheme} from 'react-native-paper';
import {styles} from "@/components/Slider/style";
import {PaginationProps} from "@/components/Slider/type";


const {width} = Dimensions.get('screen');

const Pagination = (
    {
        data,
        scrollX,
        paginationIndex
    }: PaginationProps) => {
    const theme = usePaperTheme();

    return (
        <View style={styles.dotsContainer}>
            {
                data?.map((_, index) => {
                const animatedStyle = useAnimatedStyle(() => {
                    const dotWidth = interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width],
                        [8, 20, 8],
                        Extrapolation.CLAMP
                    );
                    return { width: dotWidth };
                });

                return (
                    <Animated.View
                        key={index}
                        style={[
                            styles.dots,
                            { backgroundColor: paginationIndex === index
                                    ? theme.colors.primary
                                    : theme.colors.backdrop
                            },
                            animatedStyle
                        ]}
                    />

                );
            })}
        </View>
    );
};


export default Pagination;