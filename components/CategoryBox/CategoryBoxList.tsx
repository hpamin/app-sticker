import React from 'react';
import {Dimensions, FlatList} from 'react-native';
import {useFetchResource} from "@/lib/fetch/useList/useList";
import {Surface, useTheme} from "react-native-paper";
import Loading from "@/components/Loading/Loading";
import ErrorRetry from "@/components/ErrorRetry/ErrorRetry";
import {CategoryData} from "@/components/CategoryBox/type";
import CategoryItem from "@/components/CategoryBox/CategoryBoxItem";


const CategoryList = () => {

    const {width} = Dimensions.get('screen');
    const CATEGORY_ITEM_WIDTH = 160;
    const numColumns = Math.floor(width / CATEGORY_ITEM_WIDTH);

    const {
        error,
        loading,
        data,
        reFetch
    } = useFetchResource<CategoryData>("categories");

    const theme = useTheme();
    if (loading) {
        return <Loading/>;
    }
    if (error) {
        return <ErrorRetry onRetry={reFetch}/>
    }

    return (
        <Surface
            style={{
                flex: 1,
                backgroundColor: theme.colors.background
            }}
            elevation={0}
        >
            <FlatList
                style={{flex: 1}}
                data={data ?? []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <CategoryItem data={item} />
                )}
                numColumns={numColumns}
                contentContainerStyle={{gap: 16}}
                columnWrapperStyle={{justifyContent: "space-around", gap: 16}}
                showsHorizontalScrollIndicator={false}
            />
        </Surface>
    );
};

export default CategoryList;