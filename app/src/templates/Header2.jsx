import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native'; 
import StyledBackground from "../styles/StyledBackgroud";
import StyledText from "../styles/StyledText";

export default function Header2() {
  const navigation = useNavigation(); 

  const handleClick = () => {
    navigation.navigate("Home"); 
  };

  return (
    <StyledBackground style={styles.bg}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handleClick}>
          <Image style={styles.image1} source={require("../images/return.png")} />
        </TouchableOpacity>
        <Image style={styles.image2} source={require("../images/logofull.png")} />
        <Image style={styles.image3} source={require("../images/logout.png")} />
      </View>
    </StyledBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    marginTop: 20,
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image1: {
    margin: 30,
    width: 30,
    height: 35,
  },
  image2: {
    margin: 10,
    width: 156,
    height: 77,
  },
  image3: {
    margin: 30,
    width: 40,
    height: 30,
  },
});
