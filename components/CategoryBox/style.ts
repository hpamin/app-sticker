import {StyleSheet} from 'react-native';
import {MD3Theme} from 'react-native-paper';

export const makeStyles = (theme: MD3Theme) =>
    StyleSheet.create({
        card: {
            width: 120,
            height: 140,
            borderRadius: 12,
            elevation: 2,
            overflow: 'hidden',
        },
        selectedCard: {
            borderWidth: 2,
            borderColor: theme.colors.primary,
            elevation: 4,
            borderRadius: 12,
        },
        imageContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            height: 80,
            padding: 8,
        },
        image: {
            width: 60,
            height: 60,
        },
        contentContainer: {
            paddingHorizontal: 8,
            paddingBottom: 12,
            alignItems: 'center',
            borderRadius: 12,

        },
        title: {
            fontWeight: '600',
            textAlign: 'center',
        },
        selectedTitle: {
            color: theme.colors.primary,
            fontWeight: '700',
        },
        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: 12,

        },
        ripple: {
            color: theme.colors.primary,
            borderRadius: 12,

        },
    });