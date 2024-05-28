import React, { useState, useEffect } from "react";
import { Alert, Image, StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import Header from "./Header";
import StyledBackground from "../styles/StyledBackgroud";
import StyledText from "../styles/StyledText";
import UserService from "../services/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import ChallengeService from "../services/challenge";
import BottleService from "../services/bottle";

// Importa las imágenes de las botellas
import bottle1 from "../images/bottle.png";
import bottle2 from "../images/bottle1.png";
import bottle3 from "../images/bottle2.png";
import bottle4 from "../images/bottle3.png";
import bottle5 from "../images/bottle4.png";
import bottle6 from "../images/bottle5.png";

const getRandomFact = async () => {
  const response = await fetch('api/information/fact/random');
  const data = await response.json();
  return data.fact;
};

export default function Home() {
  const [userData, setUserData] = useState();
  const [challenges, setChallenges] = useState([]);
  const [isChecked, setChecked] = useState([]);
  const [bottleData, setBottleData] = useState();
  const [userBottles, setUserBottles] = useState();

  useEffect(() => {
    retrieveUser();
    listChallenges();
    retrieveBottle();
    retrieveUserBottles();
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

  const listChallenges = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await ChallengeService.list(token);
      setChallenges(response.data);
      setChecked(new Array(response.data.length).fill(false));
    } catch (error) {
      console.error("Error fetching challenges", error);
    }
  };

  const toggleCheck = async (index) => {
    const newChecked = [...isChecked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
    const status = newChecked[index] ? "checked" : "unchecked";
    const challengeData = {
      challenge_id: challenges[index].id,
      status: status,
    };
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await ChallengeService.toggle(token, challengeData);
      setBottleData(response.data);
    } catch (error) {
      console.error("toggle error", error);
    }
  };

  const retrieveBottle = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await BottleService.retrieve(token);
      setBottleData(response.data);
    } catch (error) {
      console.error("retrieveBottle error", error);
    }
  };
  
  const retrieveUserBottles = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const id = await AsyncStorage.getItem("id");
      const response = await UserService.bottles(token, id);
      setUserBottles(response.data);
    } catch (error) {
      console.error("retrieveUserBottles error", error);
    }
  };

  const showAlert = async () => {
    try {
      const randomFact = await getRandomFact();
      Alert.alert(
        "Botellas de amor",
        `¡Hola ${userData?.name || ""} sabías que: ${randomFact} !`,
      );
    } catch (error) {
      console.error("Error fetching random fact", error);
    }
  };

  // Determina la imagen de la botella según el nivel
  const getBottleImage = () => {
    const level = bottleData?.level || 0;
    if (level === 1) {
      return bottle1;
    } else if (level === 2) {
      return bottle2;
    } else if (level >= 3 && level <= 5) {
      return bottle3;
    } else if (level >= 6 && level <= 8) {
      return bottle4;
    } else if (level === 9) {
      return bottle5;
    } else if (level >= 10 && level <= 99) {
      return bottle6;
    } 
  };

  return (
    <ScrollView>
      <Header />
      <StyledBackground display="center">
        <StyledText size="large">¡Hola, {userData?.name}!</StyledText>
        <StyledBackground display="center" style={styles.row}>
          <StyledText size="large">Nivel {bottleData?.level}</StyledText>
          <Image style={styles.image1} source={require("../images/king.png")} />
        </StyledBackground>
      </StyledBackground>
      <StyledBackground display="center" style={styles.row}>
        <StyledBackground>
          <TouchableOpacity onPress={showAlert}>
            <Image
              style={styles.image2}
              source={getBottleImage()} // Utiliza la función para obtener la imagen de la botella
            />
          </TouchableOpacity>
        </StyledBackground>
        <StyledBackground style={styles.info}>
          <StyledBackground>
            <StyledText style={styles.number} align="center">
              {userBottles?.bottles}
            </StyledText>
            <StyledText style={styles.label} color="primary" align="center">
              Botellas
            </StyledText>
          </StyledBackground>
          <StyledBackground>
            <StyledText style={styles.number} align="center">
              {userData?.plastic_footprint}
            </StyledText>
            <StyledText style={styles.label} color="primary" align="center">
              Huella de plástico
            </StyledText>
          </StyledBackground>
        </StyledBackground>
      </StyledBackground>
      {/* retos */}
      <StyledText
        fontWeight="bold"
        size="large"
        style={{ marginBottom: 10, marginLeft: 20 }}
      >
        Retos
      </StyledText>
      <StyledBackground style={{ marginBottom: 100 }}>
        {challenges.map((challenge, index) => (
          <StyledBackground
            key={index}
            style={{ marginBottom: 20 }}
            display="content"
          >
            <StyledBackground
              bg="secondary"
              display="row"
              style={{ padding: 10, borderRadius: 10, width: "90%" }}
            >
              <StyledText
                size="medium"
                fontWeight="bold"
                color="tertiary"
                style={{ maxWidth: "90%" }}
              >
                {challenge.challenge} {challenge.experience}xp
              </StyledText>

              <View style={styles.section}>
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked[index]}
                  onValueChange={() => toggleCheck(index)}
                  color={isChecked[index] ? "#C6D1D2" : undefined}
                />
              </View>
            </StyledBackground>
          </StyledBackground>
        ))}
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
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
  },
});
