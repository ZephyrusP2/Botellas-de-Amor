import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserService from "../services/user";
import StyledText from "../styles/StyledText";
import Header2 from "./Header2";
import { StyleSheet, View, Alert, ScrollView } from "react-native";
import StyledButton from "../styles/StyledButton";
import StyledInput from "../styles/StyledInput";
import theme from "../styles/theme";

const EditProfile = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: "",
    last_name: "",
    birth_date: "",
    location: "",
    gender: "",
    email: "",
  });

  useEffect(() => {
    retrieveUser();
  }, []);

  const retrieveUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const id = await AsyncStorage.getItem("id");
      const response = await UserService.retrieve(token, id);
      setUserData(response.data);
    } catch (error) {
      console.error("retrieveUser error", error);
    }
  };

  const goToEditProfile = () => {
    navigation.navigate("EditProfile");
    Alert.alert(
      "Botellas de amor",
      `¡Hola ${userData?.name || ""} estás editando tu perfil!`
    );
  };

  const goToProfile = () => {
    navigation.navigate("Profile");
  };

  const updateProfile = async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      const token = await AsyncStorage.getItem("token");
      const response = await UserService.update(token, id, userData);
      setUserData(response.data);
      Alert.alert(
        "Botellas de amor",
        `¡Hola ${userData?.name || ""} se actualizó la información correctamente!`
      );
    } catch (error) {
      console.error("update profile error", error);
    }
  };

  return (
    <>
      <Header2 />
      <ScrollView>
        <View style={styles.buttonContainer}>
          <StyledButton
            title="Perfil"
            onPress={goToProfile}
            style={styles.notselectedPageButton}
          >
            Perfil
          </StyledButton>
          <StyledButton
            title="EditProfile"
            onPress={goToEditProfile}
            style={styles.selectedPageButton}
          >
            Editar Perfil
          </StyledButton>
        </View>

        <View style={styles.formContainer}>
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
            value={userData.name}
            onChangeText={(name) => setUserData({ ...userData, name })}
          />

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
            value={userData.last_name}
            onChangeText={(last_name) =>
              setUserData({ ...userData, last_name })
            }
          />

          <StyledText
            color="primary"
            size="medium"
            fontWeight="normal"
            style={styles.labelText}
          >
            Fecha de Nacimiento
          </StyledText>
          <StyledInput
            placeholder="Fecha de Nacimiento"
            value={userData.birth_date}
            onChangeText={(birth_date) =>
              setUserData({ ...userData, birth_date })
            }
          />

          <StyledText
            color="primary"
            size="medium"
            fontWeight="normal"
            style={styles.labelText}
          >
            Ubicación
          </StyledText>
          <StyledInput
            placeholder="Ubicación"
            value={userData.location}
            onChangeText={(location) => setUserData({ ...userData, location })}
          />

          <StyledText
            color="primary"
            size="medium"
            fontWeight="normal"
            style={styles.labelText}
          >
            Género
          </StyledText>
          <StyledInput
            placeholder="Género"
            value={userData.gender}
            onChangeText={(gender) => setUserData({ ...userData, gender })}
          />

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
            value={userData.email}
            onChangeText={(email) => setUserData({ ...userData, email })}
          />
        </View>

        <StyledButton onPress={updateProfile}>
          Actualizar Información
        </StyledButton>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    marginVertical: 10,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  textMargin: {
    marginTop: 10,
  },
  labelText: {
    marginBottom: 10,
    marginLeft: 25,
  },
  selectedPageButton: {
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
  notselectedPageButton: {
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
});

export default EditProfile;
