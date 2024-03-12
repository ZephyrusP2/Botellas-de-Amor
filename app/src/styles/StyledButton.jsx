import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import StyledText from "./StyledText";
import theme from "./theme";

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    width: "87%",
    marginTop: 10,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    padding: 10,
    borderRadius: 5,
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
});

const StyledButton = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <StyledText size="medium" align="center" style={styles.button}>
        {children}
      </StyledText>
    </TouchableOpacity>
  );
};

export default StyledButton;
