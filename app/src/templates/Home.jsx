import { Image, StyleSheet, ScrollView, View } from "react-native";
import Header from "./Header";
import StyledBackground from "../styles/StyledBackgroud";
import StyledText from "../styles/StyledText";
import UserService from "../services/user";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import ChallengeService from "../services/challenge";
import challenge from "../services/challenge";

export default function Home() {
  const [userData, setUserData] = useState();
  const [challenges, setChallenges] = useState([]);
  const [isChecked, setChecked] = useState(
    new Array(challenges.length).fill(false)
  );
  const [bottleData, setBottleData] = useState();

  useEffect(() => {
    retreiveUser();
    listChallenges();
  }, []);

  const retreiveUser = async () => {
    const token = await AsyncStorage.getItem("token");
    const id = await AsyncStorage.getItem("id");
    UserService.retreive(token, id)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("retreiveUser error", error);
      });
  };

  const listChallenges = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await ChallengeService.list(token);
      setChallenges(response);
      setChecked(new Array(response.length).fill(false));
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
    const token = await AsyncStorage.getItem("token");
    ChallengeService.toggle(token, challengeData)
      .then((response) => {
        setBottleData(response.data);
      })
      .catch((error) => {
        console.error("toggle error", error);
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
              <StyledText size="medium" fontWeight="bold" color="tertiary">
                {challenge.challenge}
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
