import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import theme from './theme';

const styles = StyleSheet.create({
  input: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    padding: 10,
    width: '90%',
    borderRadius: 15,
    marginBottom: 10,
    fontSize: theme.fontSizes.medium,
    fontFamily: theme.fonts.main,
    color: theme.colors.textPrimary,
  },
});


const StyledInput = ({ style, secureTextEntry, ...rest }) => {
    return <TextInput style={[styles.input, style]} secureTextEntry={secureTextEntry} {...rest} />;
  };
  

export default StyledInput;





