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
import YouTubePlayer from "react-native-youtube-iframe";

const Proyectos = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState();
  const [showPlayer, setShowPlayer] = useState(false);

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
      <ScrollView>
        <View style={styles.cardContainer}>
          <View style={styles.p4}>
            <Text style={styles.subtitle}>Soy Botellas de amor</Text>
            <Text style={styles.text}>
              Botellas de amor busca enamorar a las personas para lograr un
              planeta libre de basura plástica.
            </Text>
            <Text style={styles.text}>
              Para lograrlo tenemos una estrategia de economía circular que nos
              permite transformar los residuos plásticos en listones de plástico
              reciclado RPL. Y así construir obras sociales para comunidades
              vulnerables.
            </Text>
            {showPlayer && (
              <YouTubePlayer
                height={200}
                play={true}
                videoId="62kImBO-3GQ" // El ID del video de YouTube que quieres reproducir
              />
            )}
            <Text style={styles.subtitle} onPress={() => setShowPlayer(true)}>
              Un Problema Transformado En Solución
            </Text>
            <Text style={styles.text}>
              Hace varios años surgió el eco-ladrillo como propuesta de
              reciclaje para reducir la cantidad de residuos que iban a la
              basura pero no era una solución efectiva ni sostenible a largo
              plazo y perdió fuerza.
            </Text>
            <Image
              source={require("../images/info2.png")}
              style={styles.image}
            />
            <Text style={styles.text}>
              John Berrío López, después de haber trabajado e investigado por
              varios años el aprovechamiento de residuos, explora la “madera
              plástica” o RPL (Recycled Plastic Lumber) y descubre que es
              posible producirla a partir de los plásticos flexibles que
              contenían los Ecoladrillos. Así es como con cerca de seis
              toneladas de plásticos flexibles construye una vivienda
              confortable y con características de alta calidad. El resultado
              permite visualizar la posibilidad de desarrollar un método
              constructivo sostenible para ayudar a reducir el déficit de
              vivienda del país y, por qué no, del mundo.
            </Text>
            <Text style={styles.text}>
              Con esta premisa y aprovechando el auge de los Ecoladrillos,
              método de separación que le daba la posibilidad a las personas de
              guardar sus residuos en botellas para ser usadas como elemento
              constructivo, John, junto a Kelly Rodríguez (Cofundadora) y su
              equipo de trabajo; desarrollan un plan educativo, ambiental y
              económico con alto impacto social para trabajar por la reducción
              del plástico y construir felicidad. Una estrategia de economía
              circular para cerrar el ciclo de los residuos plásticos flexibles
              transformándolos en RPL.
            </Text>
            <Text style={styles.text}>
              Así nace esta estrategia que solo es posible cuando cada persona
              se concientiza y se hace responsable de sus residuos plásticos
              depositándolos en botellas de amor. De esta manera evitamos la
              llegada de millones de toneladas de plástico a la basura, a la vez
              que se beneficia a comunidades vulnerables.
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
  },
  p4: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 8,
  },
});

export default Proyectos;
