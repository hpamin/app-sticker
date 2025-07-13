import React, {useEffect, useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedReaction,
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated';
import {Surface} from 'react-native-paper';
import SliderItem from "@/components/Slider/SliderItem";
import Pagination from "@/components/Slider/Pagination";
import {SliderProps} from "@/components/Slider/type";

const {width} = Dimensions.get('screen');

const Slider = (
    {
        data
    }: SliderProps
) => {

    const [paginationIndex, setPaginationIndex] = useState(0)
    const [isAutoPlay, setIsAutoPlay] = useState(true)
    const scrollX = useSharedValue(0)
    const ref = useRef<Animated.FlatList<any>>(null)


    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x
        },
    });

    useAnimatedReaction(
        () => scrollX.value,
        (currentValue) => {
            const index = Math.round(currentValue / width)
            runOnJS(setPaginationIndex)(index)
        },
        []
    );


    useEffect(() => {
        if (!isAutoPlay) return;

        const interval = setInterval(() => {
            let nextIndex = paginationIndex + 1
            if (nextIndex >= data?.length) {
                nextIndex = 0
            }
            ref.current?.scrollToOffset({
                offset: nextIndex * width,
                animated: true,
            });
        }, 3000);

        return () => clearInterval(interval)
    }, [paginationIndex, isAutoPlay])


    if (!data || data.length === 0) return null

    return (
        <Surface
            elevation={0}
        >
            <Animated.FlatList
                ref={ref}
                data={data}
                renderItem={(
                    {
                        item,
                        index
                    }
                ) => (
                    <SliderItem
                        index={index}
                        data={item}
                        scrollX={scrollX}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                keyExtractor={(item) => item.id.toString()}
                onScroll={onScrollHandler}
                onTouchStart={() => setIsAutoPlay(false)}
                onTouchEnd={() => setIsAutoPlay(true)}
            />

            <Pagination
                data={data}
                scrollX={scrollX}
                paginationIndex={paginationIndex}
            />
        </Surface>
    );
};


export default Slider;
