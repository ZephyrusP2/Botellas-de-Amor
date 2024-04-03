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
  button2: {
    backgroundColor: theme.colors.primary,
    width: 100,
    height: 40,
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
  button3: {
    backgroundColor: "white", 
    width: 100,
    height: 40,
    marginTop: 10,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    padding: 10,
    borderRadius: 5,
    color: "black",
    textAlign: "center",
    marginBottom: 10,
},
button4: {
  backgroundColor: "white", 
  width: 100,
  height: 40,
  marginTop: 10,
  alignSelf: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: 5,
  padding: 10,
  borderRadius: 5,
  color: "black",
  textAlign: "center",
  marginBottom: 10,
},
button5: {
  backgroundColor: "red", 
  width: 300,
  height: 40,
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
button6: {
  backgroundColor: theme.colors.primary,
  width: 300,
  height: 40,
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

const StyledButton2 = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <StyledText size="medium" align="center" style={styles.button2}>
        {children}
      </StyledText>
    </TouchableOpacity>
  );
};

const StyledButton3 = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <StyledText size="medium" align="center" style={styles.button3}>
        {children}
      </StyledText>
    </TouchableOpacity>
  );
};

const StyledButton4 = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <StyledText size="medium" align="center" style={styles.button4}>
        {children}
      </StyledText>
    </TouchableOpacity>
  );
};

const StyledButton5 = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <StyledText size="medium" align="center" style={styles.button5}>
        {children}
      </StyledText>
    </TouchableOpacity>
  );
};

const StyledButton6 = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <StyledText size="medium" align="center" style={styles.button6}>
        {children}
      </StyledText>
    </TouchableOpacity>
  );
};

export { StyledButton, StyledButton2, StyledButton3, StyledButton4, StyledButton5, StyledButton6   };
