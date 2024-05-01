import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserService from "../services/user";
import StyledText from "../styles/StyledText";
import Header2 from "./Header2";
import {
  StyleSheet,
  View,
  Image,
  Alert,
  ScrollView,
  TextInput,
} from "react-native";
import StyledButton from "../styles/StyledButton";
import theme from "../styles/theme";
import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";

const Analisis = ({ navigation }) => {
  const [userData, setUserData] = useState();
  const [data, setData] = useState([
    { month: 1, value: 20 },
    { month: 2, value: 30 },
    { month: 3, value: 40 },
    { month: 4, value: 25 },
    { month: 1, value: 27 },
    { month: 2, value: 30 },
    { month: 3, value: 40 },
    { month: 4, value: 25 },
    { month: 1, value: 20 },
    { month: 2, value: 30 },
    { month: 3, value: 40 },
    { month: 4, value: 25 },
    { month: 1, value: 20 },
    { month: 2, value: 30 },
    { month: 3, value: 40 },
    { month: 4, value: 25 },
  ]);
  const [selectedX, setSelectedX] = useState("");
  const [projection, setProjection] = useState(null);

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

  const goToAnalisis = () => {
    navigation.navigate("Analisis");
    Alert.alert(
      "Botellas de amor",
      `¡Hola ${userData?.name || ""} estás viendo tus estadísticas!`,
    );
  };

  const goToProfile = () => {
    navigation.navigate("Profile");
  };

  const handleInputChange = (text) => {
    setSelectedX(text);
    calculateProjection(text);
  };

  const calculateProjection = (x) => {
    const xValue = parseFloat(x);
    if (!isNaN(xValue)) {
      const nearestDataPoint = data.reduce((nearest, current) => {
        return Math.abs(current.month - xValue) <
          Math.abs(nearest.month - xValue)
          ? current
          : nearest;
      });
      setProjection(nearestDataPoint.value);
    } else {
      setProjection(null);
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
            style={styles.notSelectedPageButton}
          >
            Perfil
          </StyledButton>
          <StyledButton
            title="Análisis"
            onPress={goToAnalisis}
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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Valor de x"
            onChangeText={handleInputChange}
            keyboardType="numeric"
          />
        </View>
        {projection !== null && (
          <StyledText
            color="secondary"
            size="medium"
            fontWeight="bold"
            align="center"
            style={styles.textMargin}
          >
            Proyección para x = {selectedX}: {projection}
          </StyledText>
        )}
        <View style={styles.chartContainer}>
          <View style={{ flexDirection: "row", height: 200 }}>
            <YAxis
              data={data.map((item) => item.value)}
              contentInset={{ top: 20, bottom: 20 }}
              svg={{ fontSize: 10, fill: theme.colors.text }}
              numberOfTicks={5}
              formatLabel={(value) => `${value}`}
            />
            <View style={{ flex: 1 }}>
              <BarChart
                style={{ flex: 1 }}
                data={data.map((item) => item.value)}
                svg={{ fill: theme.colors.primary }}
                contentInset={{ top: 20, bottom: 20 }}
              >
                <Grid />
              </BarChart>
              <XAxis
                style={{ marginHorizontal: -10 }}
                data={data}
                formatLabel={(value, index) => data[index].month}
                contentInset={{ left: 10, right: 10 }}
                svg={{ fontSize: 10, fill: theme.colors.text }}
              />
            </View>
          </View>
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
  inputContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  input: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  chartContainer: {
    height: 300,
    padding: 20,
  },
});

export default Analisis;
