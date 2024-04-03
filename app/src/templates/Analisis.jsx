import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserService from "../services/user";
import StyledText from "../styles/StyledText";
import Header2 from "./Header2";
import { StyleSheet, View, Image, Alert, ScrollView } from "react-native";
import StyledButton from "../styles/StyledButton";
import theme from "../styles/theme";

const Analisis = ({ navigation }) => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const token = await AsyncStorage.getItem("token");
    const id = await AsyncStorage.getItem("id");
    UserService.getUserData(token, id)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("getUserData error", error);
      });
  };

  const handleAnalisis = () => {
    navigation.navigate("Analisis");
    Alert.alert(
      "Botellas de amor",
      `¡Hola ${userData?.name || ""} estas viendo tus estadísticas!`
    );
  };

  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <>
      <Header2 />
      <ScrollView>
        <View style={styles.buttonContainer}>
          <StyledButton
            title="Perfil"
            onPress={handleProfile}
            style={styles.notSelectedPageButton}
          >
            Perfil
          </StyledButton>
          <StyledButton
            title="Análisis"
            onPress={handleAnalisis}
            style={styles.selectedPageButton}
          >
            Análisis
          </StyledButton>
        </View>
        <StyledText
          color="secondary"
          size="large"
          fontWeight="bold"
          align="left"
          style={[styles.textMargin, { fontSize: 20, marginLeft: 10 }]}
        >
          Estadísticas
        </StyledText>
        <View style={styles.imageContainer}>
          <Image
            source={require("../images/estadisticas.png")}
            style={styles.image}
          />
        </View>
        <StyledText
          color="secondary"
          size="large"
          fontWeight="bold"
          align="left"
          style={[styles.textMargin, { fontSize: 20, marginLeft: 10 }]}
        >
          Proyecciones
        </StyledText>
        <View style={styles.imageContainer}>
          <Image
            source={require("../images/proyecciones.png")}
            style={styles.image}
          />
        </View>
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
  imageContainer: {
    alignItems: "center",
    marginVertical: 2,
  },
  image: {
    width: 250,
    height: 250,
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
});

export default Analisis;
