import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from '../services/user';
import StyledText from '../styles/StyledText';
import Header2 from './Header2';
import { StyleSheet, View, Image, Alert } from 'react-native';
import { StyledButton, StyledButton2, StyledButton3, StyledButton4 } from "../styles/StyledButton"; // Importar StyledButton

const Analisis = ({ navigation }) => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');
    UserService.getUserData(token, id)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('getUserData error', error);
      });
  };

  const handleAnalisis = () => {

        navigation.navigate('Analisis'); 
        Alert.alert('Botellas de amor', `¡Hola ${userData?.name || ''} estas viendo tus estadísticas!`);
  };

  const handleProfile = () => {
    navigation.navigate('Profile'); 
  };

  return (
    <>
      <Header2 />
      <View style={styles.buttonContainer}>
        <StyledButton4 title='Perfil' onPress={handleProfile} >Perfil</StyledButton4>
        <StyledButton2 title='Análisis' onPress={handleAnalisis} >Análisis</StyledButton2>
      </View>
      <StyledText color='secondary' size='large' fontWeight='bold' align='left' style={[styles.textMargin, { fontSize: 20, marginLeft: 10 }]}>
      Estadísticas
      </StyledText>
      <View style={styles.imageContainer}>
        <Image
          source={require("../images/estadisticas.png")}
          style={styles.image}
        />
      </View>
      <StyledText color='secondary' size='large' fontWeight='bold' align='left' style={[styles.textMargin, { fontSize: 20, marginLeft: 10 }]}>
      Proyecciones
      </StyledText>
      <View style={styles.imageContainer}>
        <Image
          source={require("../images/proyecciones.png")}
          style={styles.image}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 30,
        marginVertical: 10,
      },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 2,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  textMargin: {
    marginTop: 10,
  },
});

export default Analisis;
