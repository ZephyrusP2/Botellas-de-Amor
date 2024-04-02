import React from "react";
import { Text, StyleSheet } from "react-native";
import theme from "./theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorSecondary: {
    color: theme.colors.textSecondary,
  },
  colorTertiary: {
    color: 'white',
  },
  bold: {
    fontWeight: theme.fontWeights.bold,
  },
  TextAlignCenter: {
    textAlign: "center",
  },
  textSizeSmall: {
    fontSize: theme.fontSizes.small,
  },
  textSizeMedium: {
    fontSize: theme.fontSizes.medium,
  },
  textSizeLarge: {
    fontSize: theme.fontSizes.large,
  },
});

export default function StyledText({
  align,
  children,
  color,
  size,
  fontWeight,
  style,
  ...restOfProps
}) {
  const textStyles = [
    styles.text,
    align === "center" && styles.TextAlignCenter,
    color === "primary" && styles.colorPrimary,
    color === "secondary" && styles.colorSecondary,
    color === "tertiary" && styles.colorTertiary,
    size === "small" && styles.textSizeSmall,
    size === "medium" && styles.textSizeMedium,
    size === "large" && styles.textSizeLarge,
    fontWeight === "bold" && styles.bold,
    style,
  ];

  return (
    <Text style={textStyles} {...restOfProps}>
      {children}
    </Text>
  );
}
