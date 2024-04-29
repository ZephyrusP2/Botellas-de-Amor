import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserService from "../services/user";
import StyledText from "../styles/StyledText";
import Header2 from "./Header2";
import { StyleSheet, View, Image, Alert, ScrollView } from "react-native";
import StyledButton from "../styles/StyledButton";
import theme from "../styles/theme";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    retrieveUser();
  }, []);

  const retrieveUser = async () => {
    const token = await AsyncStorage.getItem("token");
    const id = await AsyncStorage.getItem("id");
    UserService.retrieve(token, id)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("retrieve user error", error);
      });
  };

  const goToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const goToAnalisis = () => {
    navigation.navigate("Analisis");
  };

  const goToProfile = () => {
    navigation.navigate("Profile");
    Alert.alert(
      "Botellas de amor",
      `¡Hola ${userData?.name || ""} estas viendo tu perfil!`
    );
  };

  const deleteUser = async () => {
    const id = userData?.id;
    const token = await AsyncStorage.getItem("token");
    UserService.delete(token, id)
      .then(() => {
        AsyncStorage.clear();
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("login", error);
        setError(error.toString());
      });
  };

  return (
    <>
      <Header2 />
      <ScrollView>
        <View style={styles.buttonContainer}>
          <StyledButton
            title="Perfil"
            onPress={goToProfile}
            style={styles.selectedPageButton}
          >
            Perfil
          </StyledButton>
          <StyledButton
            title="Análisis"
            onPress={goToAnalisis}
            style={styles.notSelectedPageButton}
          >
            Análisis
          </StyledButton>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require("../images/user.png")} style={styles.image} />
        </View>
        <StyledText
          color="secondary"
          size="large"
          fontWeight="bold"
          align="center"
          style={[styles.textMargin, { fontSize: 40 }]}
        >
          {userData?.name || ""}
        </StyledText>
        <StyledText
          color="primary"
          size="large"
          fontWeight="bold"
          align="center"
          style={[styles.textMargin, { fontSize: 20 }]}
        >
          ID. {userData?.id || ""}
        </StyledText>
        <StyledText
          color="primary"
          size="large"
          fontWeight="bold"
          align="left"
          style={[styles.textMargin, { fontSize: 20, marginLeft: 10 }]}
        >
          Usuario
        </StyledText>
        <StyledText
          style={[styles.textMargin, { fontSize: 25, marginLeft: 10 }]}
        >
          {userData?.name || ""}
        </StyledText>
        <StyledText
          color="primary"
          size="large"
          fontWeight="bold"
          align="left"
          style={[styles.textMargin, { fontSize: 20, marginLeft: 10 }]}
        >
          Apellido
        </StyledText>
        <StyledText
          style={[styles.textMargin, { fontSize: 25, marginLeft: 10 }]}
        >
          {userData?.last_name || ""}
        </StyledText>
        <StyledText
          color="primary"
          size="large"
          fontWeight="bold"
          align="left"
          style={[styles.textMargin, { fontSize: 20, marginLeft: 10 }]}
        >
          Género
        </StyledText>
        <StyledText
          style={[styles.textMargin, { fontSize: 25, marginLeft: 10 }]}
        >
          {userData?.gender || ""}
        </StyledText>
        <StyledText
          color="primary"
          size="large"
          fontWeight="bold"
          align="left"
          style={[styles.textMargin, { fontSize: 20, marginLeft: 10 }]}
        >
          Correo
        </StyledText>
        <StyledText
          style={[styles.textMargin, { fontSize: 25, marginLeft: 10 }]}
        >
          {userData?.email || ""}
        </StyledText>
        <StyledText
          color="primary"
          size="large"
          fontWeight="bold"
          align="left"
          style={[styles.textMargin, { fontSize: 20, marginLeft: 10 }]}
        >
          Contraseña
        </StyledText>
        <StyledText
          style={[styles.textMargin, { fontSize: 25, marginLeft: 10 }]}
        >
          {"**********"}
        </StyledText>
        <View style={styles.buttonContainer2}>
          <StyledButton
            title="Editar Perfil"
            onPress={goToEditProfile}
            style={styles.updateButton}
          >
            Editar Perfil
          </StyledButton>
          <StyledButton
            title="Eliminar Perfil"
            onPress={deleteUser}
            style={styles.deleteButton}
          >
            Eliminar Perfil
          </StyledButton>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    marginVertical: 10,
  },
  buttonContainer2: {
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  textMargin: {
    marginTop: 10,
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
  notSelectedPageButton: {
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
  deleteButton: {
    backgroundColor: theme.colors.secondary,
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
  updateButton: {
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

export default Profile;
