import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from './theme';

const StyledBackground = ({ bg, children, style, ...restOfProps }) => {
    const styles = StyleSheet.create({
        bgPrimary: {
            backgroundColor: theme.bgColors.primary,
        },

    });

    const backgroundStyles = [
        bg === 'primary' && styles.bgPrimary,

        style,
    ];

    return (
        <View style={backgroundStyles} {...restOfProps}>
            {children}
        </View>
    );
};

export default StyledBackground;
