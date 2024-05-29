import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserService from "../services/user";
import Header2 from "./Header2";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import StyledButton from "../styles/StyledButton";
import theme from "../styles/theme";
import { useNavigation } from "@react-navigation/native";
import Header3 from "./Header3";
import StyledText from "../styles/StyledText";
import MaterialFactory from "./MaterialFactory";

const sharedClasses = {
  textZinc: { color: "#374151" },
  textRed: { color: "#FD595A" },
  textBlue: { color: "#0AB5B8" },
};

const Materiales = () => {
  const navigation = useNavigation();
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

  return (
    <>
      <Header3 />
      <View style={[{ backgroundColor: "#FD595A", flex: 1 }]}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[styles.cardContainerMateriales]}>
            <MaterialFactory
              image1={require("../images/botella.png")}
              image2={require("../images/bolsa.png")}
              element={"BOLSAS"}
              elementSubtitle={"de todo tipo: "}
              items={
                "Arroz, pasta, galletas, cereales, bolsa del mercado, salsa, leche, carnes, yogurt..."
              }
              forbiddenArticles={"BOLSAS DE PAPEL"}
            />

            <MaterialFactory
              image1={require("../images/botella.png")}
              image2={require("../images/empaque.png")}
              element={"ENVOLTURAS"}
              elementSubtitle={"de golosinas y snacks: "}
              items={
                "Papas, helados, chocolates, galletas, bombones, dulces, frutos secos..."
              }
              forbiddenArticles={"TETRAPACK O \nALUMINIO"}
            />

            <MaterialFactory
              image1={require("../images/botella.png")}
              image2={require("../images/elementos.png")}
              element={"ELEMENTOS"}
              elementSubtitle={"desechables plásticos: "}
              items={
                "Mezcladores, pitillos, vasos, tubos de cremas, cubiertos, cepillos de dientes..."
              }
              forbiddenArticles={"LATEX, ICOPOR\n O CAUCHO"}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainerMateriales: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Materiales;
