import React, { forwardRef } from 'react';
import { Searchbar, useTheme, IconButton } from 'react-native-paper';
import { styles } from '@/components/SearchBox/styles';
import { SearchBoxProps } from '@/components/SearchBox/type';

const SearchBox = forwardRef(
    (
        {
            onSearchQueryChange,
            value = '',
            onPress,
            onFilterPress,
            autoFocus = false,
            placeholder = 'Search...',
            style,
        }: SearchBoxProps,
        ref,
    ) => {

        const theme = useTheme();
        const onChangeSearch = (query: string) => {
            onSearchQueryChange?.(query);
        };

        const isDark = theme.dark;

        const inputBackgroundColor = isDark
            ? 'rgb(35, 35, 42)'
            : 'rgb(245, 243, 252)';

        const inputTextColor = theme.colors.onSurface;
        const placeholderColor = isDark
            ? 'rgba(228, 225, 230, 0.38)'
            : 'rgba(27, 27, 31, 0.38)';

        return (
            <Searchbar
                ref={ref as any}
                placeholder={placeholder}
                placeholderTextColor={placeholderColor}
                value={value}
                onChangeText={onChangeSearch}
                autoFocus={autoFocus}
                style={[
                    styles.container,
                    styles.searchbar,
                    {
                        backgroundColor: inputBackgroundColor,
                        borderColor: theme.colors.outline,
                        borderWidth: 1,
                    },
                    style,
                ]}
                inputStyle={[
                    styles.searchInputStyle,
                    { color: inputTextColor },
                ]}
                iconColor={theme.colors.primary}
                onPressIn={onPress}
                right={(props) =>
                    onFilterPress && value?.trim() ? (
                        <IconButton
                            {...props}
                            icon="filter-variant"
                            onPress={onFilterPress}
                            iconColor={theme.colors.primary}
                        />
                    ) : null
                }
            />
        );
    },
);

export default SearchBox;
