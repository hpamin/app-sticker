import {View} from "react-native";
import React from "react";
import {SearchCardListProps} from "@/components/SearchCard/type";
import SearchCardItem from "@/components/SearchCard/SearchCardItem";

const SearchCardList = (
    {
        data,
        style,
        onPressItem
    }: SearchCardListProps
) => {

    return (
        <View style={style}>
            {data?.map((item) => (
                <SearchCardItem
                    key={item.id}
                    data={item}
                    onPress={() => onPressItem?.(item?.id)}
                />
            ))}
        </View>
    )
}
export default SearchCardList;