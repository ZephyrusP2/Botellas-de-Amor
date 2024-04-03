import React from "react";
import { View, StyleSheet } from "react-native";
import theme from "./theme";

const StyledBackground = ({ bg, display, children, style, ...restOfProps }) => {
  const styles = StyleSheet.create({
    bgPrimary: {
      backgroundColor: theme.bgColors.primary,
    },
    bgSecondary: {
      backgroundColor: theme.bgColors.secondary,
    },
    displayCenter: {
      justifyContent: "center",
      alignItems: "center",
    },
    displayRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    displayContent: {
      
      justifyContent: "center",
      alignItems: "center",
    }
    
  });

  const backgroundStyles = [
    bg === "primary" && styles.bgPrimary, 
    bg === "secondary" && styles.bgSecondary, 
    display === "center" && styles.displayCenter ,
    display === "row" && styles.displayRow ,
    display === "content" && styles.displayContent , style];

  return (
    <View style={backgroundStyles} {...restOfProps}>
      {children}
    </View>
  );
};

export default StyledBackground;
