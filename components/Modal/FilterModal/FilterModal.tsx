import React, {useEffect, useMemo, useRef} from 'react';
import {View} from 'react-native';
import {Button, Checkbox, Text, useTheme} from 'react-native-paper';
import {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetModal,
    BottomSheetScrollView
} from '@gorhom/bottom-sheet';
import {FilterModalProps} from '@/components/Modal/FilterModal/type';
import {styles} from '@/components/Modal/FilterModal/style';

const FilterModal = (
    {
        visible,
        onDismiss,
        onApply,
        categoriesData,
        selectedCategories,
        toggleCategory,
        isBestSeller,
        toggleBestSeller,
    }: FilterModalProps
) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null)
    const theme = useTheme()
    const snapPoints = useMemo(() => ['50%', '70%'], [])

    useEffect(() => {
        if (visible) {
            bottomSheetModalRef.current?.present()
        } else {
            bottomSheetModalRef.current?.close()
        }
    }, [visible]);

    const renderBackDrop = (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
            {...props}
            opacity={0.5}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior="close"
        />
    )

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={snapPoints}
            onDismiss={onDismiss}
            enablePanDownToClose
            backgroundStyle={{backgroundColor: theme.colors.inverseOnSurface}}
            backdropComponent={renderBackDrop}
        >
            <BottomSheetScrollView
                contentContainerStyle={{padding: 20}}
                showsVerticalScrollIndicator={false}
            >
                <Text
                    variant="titleMedium"
                    style={[
                        styles.title,
                        {color: theme.colors.onSurface}
                    ]}

                >
                    Filter Products
                </Text>

                <Text
                    variant="labelLarge"
                    style={[
                        styles.sectionTitle,
                        {color: theme.colors.onSurface}
                    ]}
                >
                    Categories
                </Text>
                {categoriesData?.map((item) => (
                    <Checkbox.Item
                        key={item.id}
                        label={item.name}
                        status={selectedCategories.includes(item?.name) ? "checked" : "unchecked"}
                        onPress={() => toggleCategory(item?.name)}
                        labelStyle={{color: theme.colors.onSurface}}
                        uncheckedColor={theme.colors.outline}
                        position={"trailing"}
                        mode={"android"}
                    />
                ))}

                <Text
                    variant="labelLarge"
                    style={[
                        styles.sectionTitle,
                        {color: theme.colors.onSurface}
                    ]}
                >
                    Other Filters
                </Text>

                    <Checkbox.Item
                        label={"Best Seller Only"}
                        status={isBestSeller ? "checked" : "unchecked"}
                        onPress={toggleBestSeller}
                        labelStyle={{color: theme.colors.onSurface}}
                        uncheckedColor={theme.colors.outline}
                        position={"trailing"}
                        mode={"android"}
                    />

                <Button
                    mode="contained"
                    onPress={onApply}
                    style={styles.applyButton}
                    labelStyle={styles.applyButtonLabel}
                >
                    Apply Filters
                </Button>
            </BottomSheetScrollView>
        </BottomSheetModal>
    );
};

export default FilterModal;
