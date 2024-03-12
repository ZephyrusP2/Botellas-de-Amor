import React from "react";
import {
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import StyledBackground from "../styles/StyledBackgroud";
import StyledText from "../styles/StyledText";
import StyledInput from "../styles/StyledInput";
import StyledButton from "../styles/StyledButton";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import UserService from "../services/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = ({ navigation }) => {
  const currentDate = new Date();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [lastname, setLastname] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [borndate, setBorndate] = useState(new Date());
  const [genre, setGenre] = useState("Hombre");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPickerDate, setShowPickerDate] = useState(false);
  const [showPickerGenre, setShowPickerGenre] = useState(false);
  const [error, setError] = useState("");

  const toggleDataPicker = () => {
    setShowPickerDate(!showPickerDate);
  };

  const toggleGenrePicker = () => {
    setShowPickerGenre(!showPickerGenre);
  };

  const onChangeDate = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate || borndate;
      setBorndate(currentDate);
      if (Platform.OS === "android") {
        toggleDataPicker();
      }
    } else {
      toggleDataPicker();
    }
  };

  const confirmDateIos = (event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate || borndate;
      setBorndate(currentDate);
    }
    toggleDataPicker();
  };

  const confirmGenreIos = () => {
    toggleGenrePicker();
  };

  function onLogin() {
    navigation.navigate("Login");
  }

  function onSubmit() {
    let isValid = true;

    // Validar nombre
    if (name.trim() === "") {
      setNameError("El nombre es requerido");
      isValid = false;
    } else if (name.length > 50) {
      setNameError("El nombre debe ser menor a 50 caracteres");
      isValid = false;
    } else {
      setNameError("");
    }

    // Validar apellido
    if (lastname.trim() === "") {
      setLastNameError("El apellido es requerido");
      isValid = false;
    } else if (name.length > 50) {
      setNameError("El apellido debe ser menor a 50 caracteres");
      isValid = false;
    } else {
      setLastNameError("");
    }

    // Validar email
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError("El email no es válido");
      isValid = false;
    } else {
      setEmailError("");
    }
  }

  return (
    <StyledBackground bg="secondary" style={styles.background}>
      <StyledBackground bg="primary" style={styles.borderUp}></StyledBackground>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.background}
      >
        <StyledBackground bg="primary">
          <View style={styles.contentContainer}>
            <StyledText
              color="secondary"
              size="large"
              fontWeight="bold"
              align="center"
              style={styles.title}
            >
              Registro
            </StyledText>

            <ScrollView>
              <StyledText
                color="primary"
                size="medium"
                fontWeight="normal"
                style={styles.labelText}
              >
                Nombre
              </StyledText>
              <StyledInput
                placeholder="Nombre"
                onChangeText={(name) => setName(name)}
              />
              {nameError !== "" && (
                <StyledText style={styles.errorText}>{nameError}</StyledText>
              )}

              <StyledText
                color="primary"
                size="medium"
                fontWeight="normal"
                style={styles.labelText}
              >
                Apellido
              </StyledText>
              <StyledInput
                placeholder="Apellido"
                onChangeText={(lastname) => setLastname(lastname)}
              />
              {lastNameError !== "" && (
                <StyledText style={styles.errorText}>
                  {lastNameError}
                </StyledText>
              )}

              <StyledText
                color="primary"
                size="medium"
                fontWeight="normal"
                style={styles.labelText}
              >
                Fecha De Nacimiento
              </StyledText>

              {!showPickerDate && (
                <Pressable onPress={toggleDataPicker}>
                  <StyledInput
                    placeholder="Fecha De Nacimiento"
                    value={borndate.toLocaleDateString("es-ES")}
                    editable={false}
                    onPressIn={toggleDataPicker}
                  />
                </Pressable>
              )}

              {showPickerDate && (
                <View>
                  <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={borndate}
                    onChange={onChangeDate}
                    maximumDate={currentDate}
                    style={styles.dataPicker}
                  />

                  {Platform.OS === "ios" && (
                    <StyledButton onPress={confirmDateIos}>
                      Aceptar
                    </StyledButton>
                  )}
                </View>
              )}

              <StyledText
                color="primary"
                size="medium"
                fontWeight="normal"
                style={styles.labelText}
              >
                Género
              </StyledText>

              {/* Android */}

              {Platform.OS === "android" && (
                <View style={styles.borderGenre}>
                  <Picker
                    selectedValue={genre}
                    onValueChange={(itemValue) => setGenre(itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Hombre" value="Hombre" />
                    <Picker.Item label="Mujer" value="Mujer" />
                    <Picker.Item label="Otro" value="Otro" />
                  </Picker>
                </View>
              )}

              {/* ios */}
              {!showPickerGenre && Platform.OS === "ios" && (
                <Pressable onPress={toggleGenrePicker}>
                  <StyledInput
                    // placeholder="Género"
                    value={genre}
                    editable={false}
                    onPressIn={toggleGenrePicker}
                  />
                </Pressable>
              )}

              {showPickerGenre && (
                <View>
                  <Picker
                    selectedValue={genre}
                    onValueChange={(itemValue) => setGenre(itemValue)}
                    style={styles.genrePicker}
                  >
                    <Picker.Item label="Hombre" value="Hombre" />
                    <Picker.Item label="Mujer" value="Mujer" />
                    <Picker.Item label="Otro" value="Otro" />
                  </Picker>
                  <StyledButton onPress={confirmGenreIos}>Aceptar</StyledButton>
                </View>
              )}

              <StyledText
                color="primary"
                size="medium"
                fontWeight="normal"
                style={styles.labelText}
              >
                Email
              </StyledText>
              <StyledInput
                placeholder="Email"
                onChangeText={(email) => setEmail(email)}
              />
              {emailError !== "" && (
                <StyledText style={styles.errorText}>{emailError}</StyledText>
              )}

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

              <StyledButton onPress={() => onSubmit()}>
                Registrarme
              </StyledButton>

              <TouchableOpacity onPress={() => onLogin()} style={styles.bottom}>
                <StyledText size="medium" color="primary" align="center">
                  Iniciar sesión
                </StyledText>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </StyledBackground>
      </KeyboardAvoidingView>
    </StyledBackground>
  );
};

export default Register;

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
  errorText: {
    marginBottom: 10,
    marginLeft: 25,
    color: "#FF5733",
  },
  borderUp: {
    width: "100%",
    height: "7%",
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
  dataPicker: {
    height: 120,
    marginTop: -20,
    width: "90%",
    alignSelf: "center",
  },
  borderGenre: {
    height: 60,
    width: "90%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#00C8EA",
    borderRadius: 15,
    marginBottom: 10,
  },
  picker: {
    fontFamily: "League-Spartan",
  },
  genrePicker: {
    height: 160,
    marginTop: -60,
    marginBottom: 30,
  },
});

