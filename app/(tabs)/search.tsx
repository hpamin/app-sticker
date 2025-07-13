import React, {useState} from 'react';
import {Keyboard, ScrollView, StyleSheet, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {useFetchResource} from "@/lib/fetch/useList/useList";
import Loading from "@/components/Loading/Loading";
import ErrorRetry from "@/components/ErrorRetry/ErrorRetry";
import {CategoriesData, StickerFetchProps} from "@/lib/fetch/useList/type";
import SearchBox from "@/components/SearchBox/SearchBox";
import SearchCardList from "@/components/SearchCard/SearchCardList";
import {useRouter} from "expo-router";
import EmptyState from "@/components/EmptyState/EmptyState";
import FilterModal from "@/components/Modal/FilterModal/FilterModal";
import TabSafeAreaWrapper from "@/components/Layout/TabSafeAreaWrapper/TabSafeAreaWrapper";
import {styles} from "@/lib/pageStyles/search/style";


const Search = () => {

    const theme = useTheme()
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [showFilterModal, setShowFilterModal] = useState<boolean>(false)
    const {data: categoriesData} = useFetchResource<CategoriesData>("categories")
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [isBestSeller, setIsBestSeller] = useState<boolean>(false)
    const router = useRouter()

    const {
        error,
        loading,
        data,
        reFetch
    } = useFetchResource<StickerFetchProps>("stickers");

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const toggleBestSeller = () => {
        setIsBestSeller(prev => !prev)
    };

    const handleApplyFilters = () => {
        setShowFilterModal(false)
    };

    const filteredData = data?.filter((item) => {
        const filterByQuery = item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        const filterByIsBestSeller = !isBestSeller || item?.isBestSeller
        const filterByCategories = selectedCategories.length === 0 || selectedCategories.includes(item.category)
        return filterByQuery && filterByIsBestSeller && filterByCategories
    }) || [];

    const handleShowFilter = () => {
        Keyboard.dismiss()
        setShowFilterModal(true)
    };

    if (loading) return <Loading/>
    if (error) return <ErrorRetry onRetry={reFetch}/>

    return (
        <TabSafeAreaWrapper
            scroll={false}
            style={styles.container}
        >

                <View style={[styles.header, {backgroundColor: theme.colors.primary}]}>
                    <SearchBox
                        value={searchQuery}
                        onSearchQueryChange={setSearchQuery}
                        placeholder="Search stickers..."
                        style={styles.searchBoxStyle}
                        onFilterPress={handleShowFilter}
                    />
                </View>

                <FilterModal
                    visible={showFilterModal}
                    onDismiss={() => setShowFilterModal(false)}
                    onApply={handleApplyFilters}
                    categoriesData={categoriesData ?? []}
                    selectedCategories={selectedCategories}
                    toggleCategory={toggleCategory}
                    isBestSeller={isBestSeller}
                    toggleBestSeller={toggleBestSeller}
                />

                <ScrollView contentContainerStyle={styles.content}>
                    {searchQuery.trim() === "" ? (
                        <EmptyState
                            icon="search"
                            message="Enter sticker name to search"
                        />
                    ) : filteredData.length === 0 ? (
                        <EmptyState
                            icon="alert-circle-outline"
                            message={`No results found for "${searchQuery}"`}
                            action={() => setSearchQuery("")}
                        />
                    ) : (
                        <View style={styles.resultsContainer}>
                            <Text variant="titleSmall"
                                  style={[styles.resultsCount, {color: theme.colors.onSurfaceVariant}]}>
                                {filteredData.length} results found
                            </Text>
                            <SearchCardList
                                data={filteredData}
                                onPressItem={(id) => router.push(`/stickers/${id}`)}
                                style={styles.stickersGrid}
                            />
                        </View>
                    )}
                </ScrollView>

        </TabSafeAreaWrapper>
    );
};


export default Search;
