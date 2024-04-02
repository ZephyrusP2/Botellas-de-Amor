import { Image, StyleSheet, ScrollView } from "react-native";
import Header from "./Header";
import StyledBackground from "../styles/StyledBackgroud";
import StyledText from "../styles/StyledText";
import UserService from "../services/user";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
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

  return (
    <ScrollView>
      <Header />
      <StyledBackground display="center">
        <StyledText size="large">Hola! {userData?.name}</StyledText>
        <StyledBackground display="center" style={styles.row}>
          <StyledText size="large">Nivel </StyledText>
          <Image style={styles.image1} source={require("../images/king.png")} />
        </StyledBackground>
      </StyledBackground>
      <StyledBackground display="center" style={styles.row}>
        <StyledBackground>
          <Image
            style={styles.image2}
            source={require("../images/bottle.png")}
          />
        </StyledBackground>
        <StyledBackground style={styles.info}>
          <StyledBackground>
            <StyledText style={styles.number} align="center">
              17
            </StyledText>
            <StyledText style={styles.label} color="primary" align="center">
              Botellas
            </StyledText>
          </StyledBackground>
          <StyledBackground>
            <StyledText style={styles.number} align="center">
              {userData?.carbon_footprint}
            </StyledText>
            <StyledText style={styles.label} color="primary" align="center">
              Huella de carbono
            </StyledText>
          </StyledBackground>
        </StyledBackground>
      </StyledBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 5,
  },
  image1: {
    margin: 10,
    width: 21,
    height: 18,
  },
  image2: {
    margin: 10,
    width: 161,
    height: 376,
  },
  info: {
    gap: 20,
  },
  number: {
    fontSize: 60,
    fontWeight: "bold",
  },
  label: {
    fontSize: 25,
  },
});
