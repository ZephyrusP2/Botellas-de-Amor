import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import StyledBackground from "../styles/StyledBackgroud";
import StyledText from "../styles/StyledText";
import StyledInput from "../styles/StyledInput";
import StyledButton from "../styles/StyledButton";
import { useState } from "react";
import UserService from "../services/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  login = async (email, password) => {
    if (!email || !password) {
      setErrorMessage("Llena todos los campos");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }
    const userData = {
      email: email,
      password: password,
    };
    UserService.login(userData)
      .then((response) => {
        setToken(response.data.token);
        setEmail(userData.email);
        AsyncStorage.setItem("token", response.data.token);
        AsyncStorage.setItem("email", userData.email);
        const id = response.data.id.toString();
        AsyncStorage.setItem("id", id);
        navigation.navigate("Content");
      })
      .catch((error) => {
        console.error("login", error);
        setError(error.toString());
      });
  };

  onRegister = () => {
    navigation.navigate("Register");
  };

  onForgotPassword = () => {};

  return (
    <StyledBackground bg="secondary" style={styles.background}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={120}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <StyledBackground bg="primary" style={styles.logoContainer}>
          <Image source={require("../images/logo.png")} />
        </StyledBackground>

        <StyledBackground bg="primary">
          <View style={styles.contentContainer}>
            <StyledText
              color="secondary"
              size="large"
              fontWeight="bold"
              align="center"
              style={styles.title}
            >
              Iniciar Sesión
            </StyledText>

            <StyledText
              color="primary"
              size="medium"
              fontWeight="normal"
              style={styles.labelText}
            >
              Correo
            </StyledText>
            <StyledInput
              placeholder="Correo"
              onChangeText={(email) => setEmail(email)}
              secureTextEntry={false}
            />
            <StyledText
              color="primary"
              size="medium"
              fontWeight="normal"
              style={styles.labelText}
            >
              Contraseña
            </StyledText>
            <StyledInput
              placeholder="Contraseña"
              onChangeText={(password) => setPassword(password)}
              secureTextEntry={true}
            />

            {errorMessage && (
              <StyledText color="danger" size="medium" align="center">
                {errorMessage}
              </StyledText>
            )}
            <StyledButton onPress={() => login(email, password)}>
              Comenzar
            </StyledButton>

            <TouchableOpacity
              onPress={() => onRegister()}
              style={styles.bottom}
            >
              <StyledText size="medium" color="primary" align="center">
                Registrarme
              </StyledText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onForgotPassword()}
              style={styles.bottom}
            >
              <StyledText size="medium" color="primary" align="center">
                Recuperar contraseña
              </StyledText>
            </TouchableOpacity>
          </View>
        </StyledBackground>
      </KeyboardAvoidingView>
    </StyledBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
  },
  background: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flex: 1,
  },
  logoContainer: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
    height: "100%",
  },
  labelText: {
    marginBottom: 10,
    marginLeft: 25,
  },
  bottom: {
    marginBottom: 10,
  },
});
