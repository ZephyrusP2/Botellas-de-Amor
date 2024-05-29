import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StyledText from "../styles/StyledText";
import Header2 from "./Header2";
import { StyleSheet, View, Alert, ScrollView } from "react-native";
import StyledButton from "../styles/StyledButton";
import StyledInput from "../styles/StyledInput";
import theme from "../styles/theme";
import UserService from "../services/user";
import DispositionService from "../services/disposition";
import SiteService from "../services/site";

const RegisterBottle = ({ navigation }) => {
  const [bottleData, setBottleData] = useState({
    bottle_count: "",
    bottle_weight: "",
    collection_point: "",
  });
  const [puntosAcopio, setPuntosAcopio] = useState([]);

  useEffect(() => {
    async function fetchPuntosAcopio() {
      try {
        const token = localStorage.getItem("token");
        const response = await SiteService.listSite(token);
        setPuntosAcopio(response.data);
      } catch (error) {
        console.error("Error fetching puntos de acopio:", error);
      }
    }
    fetchPuntosAcopio();
    retrieveUser();
  }, []);

  const retrieveUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const id = await AsyncStorage.getItem("id");
      const response = await UserService.retrieve(token, id);
      setBottleData(response.data);
    } catch (error) {
      console.error("retrieveUser error", error);
    }
  };

  const goToRegisterBottle = () => {
    navigation.navigate("RegisterBottle");
    Alert.alert(
      "Botellas de amor",
      `¡Hola ${bottleData?.name || ""} estás registrando tu botella!`
    );
  };

  const goToProfile = () => {
    navigation.navigate("Profile");
  };

  const updateRegisterBottle = async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      const token = await AsyncStorage.getItem("token");
      data = {
        user: id,
        bottles: bottleData.bottle_count,
        weight: bottleData.bottle_weight,
        site: bottleData.collection_point,
      };
      const response = await DispositionService.create(token, data);
      setBottleData(response.data);
      Alert.alert(
        "Botellas de amor",
        `¡Hola ${bottleData?.name || ""} se actualizó la información correctamente!`
      );
    } catch (error) {
      console.error("update profile error", error);
      Alert.alert("Error", "Hubo un problema al registrar la botella.");
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
            title="RegisterBottle"
            onPress={goToRegisterBottle}
            style={styles.selectedPageButton}
          >
            Botella
          </StyledButton>
        </View>

        <View style={styles.formContainer}>
          <StyledText
            color="primary"
            size="medium"
            fontWeight="normal"
            style={styles.labelText}
          >
            Cantidad de Botellas
          </StyledText>
          <StyledInput
            placeholder="Cantidad de Botellas"
            value={bottleData.bottle_count}
            onChangeText={(bottle_count) =>
              setBottleData({ ...bottleData, bottle_count })
            }
            keyboardType="numeric"
          />

          <StyledText
            color="primary"
            size="medium"
            fontWeight="normal"
            style={styles.labelText}
          >
            Peso de las Botellas (kg)
          </StyledText>
          <StyledInput
            placeholder="Peso de la Botella"
            value={bottleData.bottle_weight}
            onChangeText={(bottle_weight) =>
              setBottleData({ ...bottleData, bottle_weight })
            }
            keyboardType="numeric"
          />

          <StyledText
            color="primary"
            size="medium"
            fontWeight="normal"
            style={styles.labelText}
          >
            Punto de Acopio
          </StyledText>
          <StyledInput
            placeholder="Punto de Acopio"
            value={bottleData.collection_point}
            onChangeText={(collection_point) =>
              setBottleData({ ...bottleData, collection_point })
            }
          />
        </View>

        <StyledButton onPress={updateRegisterBottle}>
          Registrar Botella
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

export default RegisterBottle;
