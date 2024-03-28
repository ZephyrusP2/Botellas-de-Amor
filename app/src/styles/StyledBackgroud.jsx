import React from "react";
import { View, StyleSheet } from "react-native";
import theme from "./theme";

const StyledBackground = ({ bg, display, children, style, ...restOfProps }) => {
  const styles = StyleSheet.create({
    bgPrimary: {
      backgroundColor: theme.bgColors.primary,
    },
    displayCenter: {
      justifyContent: "center",
      alignItems: "center",
    }
    
  });

  const backgroundStyles = [
    bg === "primary" && styles.bgPrimary, 
    display === "center" && styles.displayCenter , style];

  return (
    <View style={backgroundStyles} {...restOfProps}>
      {children}
    </View>
  );
};

export default StyledBackground;
