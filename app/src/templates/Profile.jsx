import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from '../services/user';
import StyledText from '../styles/StyledText';
import Header2 from './Header2';
import { StyleSheet, View, Image, Alert } from 'react-native';
import { StyledButton, StyledButton2, StyledButton3, StyledButton6, StyledButton5 } from "../styles/StyledButton"; // Importar StyledButton

const Profile = ({ navigation }) => {
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

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleDeleteProfile = async () => {
    const id = userData?.id;
    const token = await AsyncStorage.getItem("token");
    UserService.deleteUser(token, id)
      .then(() => {
        AsyncStorage.setItem("token", null);
        AsyncStorage.setItem("id", null);
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log("login", error);
        setError(error.toString());
      });
  };

  const handleAnalisis = () => {
    navigation.navigate('Analisis');
  };

  const handleProfile = () => {
    // Lógica para manejar perfil
    navigation.navigate('Profile');
    Alert.alert('Botellas de amor', `¡Hola ${userData?.name || ''} estas viendo tu perfil!`);
  };

  return (
    <>
      <Header2 />
      <View style={styles.buttonContainer}>
        <StyledButton2 title='Perfil' onPress={handleProfile} style="primaryButton">Perfil</StyledButton2>
        <StyledButton3 title='Análisis' onPress={handleAnalisis} >Análisis</StyledButton3>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../images/user.png")}
          style={styles.image}
        />
      </View>
      <StyledText color='secondary' size='large' fontWeight='bold' align='center' style={[styles.textMargin, { fontSize: 40 }]}>
        {userData?.name || ''}
      </StyledText>
      <StyledText color='primary' size='large' fontWeight='bold' align='center' style={[styles.textMargin, { fontSize: 20 }]}>
        ID. {userData?.id || ''}
      </StyledText>
      <StyledText color='primary' size='large' fontWeight='bold' align='left' style={[styles.textMargin, { fontSize: 20, marginLeft: 10 }]}>
        Usuario
      </StyledText>
      <StyledText style={[styles.textMargin, { fontSize: 25, marginLeft: 10 }]}>
        {userData?.name || ''}
      </StyledText>
      <StyledText color='primary' size='large' fontWeight='bold' align='left' style={[styles.textMargin, { fontSize: 20, marginLeft: 10 }]}>
        Apellido
      </StyledText>
      <StyledText style={[styles.textMargin, { fontSize: 25, marginLeft: 10 }]}>
        {userData?.last_name || ''}
      </StyledText>
      <StyledText color='primary' size='large' fontWeight='bold' align='left' style={[styles.textMargin, { fontSize: 20, marginLeft: 10 }]}>
        Género
      </StyledText>
      <StyledText style={[styles.textMargin, { fontSize: 25, marginLeft: 10 }]}>
        {userData?.gender || ''}
      </StyledText>
      <StyledText color='primary' size='large' fontWeight='bold' align='left' style={[styles.textMargin, { fontSize: 20, marginLeft: 10 }]}>
        Correo
      </StyledText>
      <StyledText style={[styles.textMargin, { fontSize: 25, marginLeft: 10 }]}>
        {userData?.email || ''}
      </StyledText>
      <StyledText color='primary' size='large' fontWeight='bold' align='left' style={[styles.textMargin, { fontSize: 20, marginLeft: 10 }]}>
        Contraseña
      </StyledText>
      <StyledText style={[styles.textMargin, { fontSize: 25, marginLeft: 10 }]}>
        {'**********'}
      </StyledText>
      <View style={styles.buttonContainer2}>
        <StyledButton6 title='Editar Perfil' onPress={handleEditProfile} >Editar Perfil</StyledButton6>
        <StyledButton5 title='Eliminar Perfil' onPress={handleDeleteProfile} >Eliminar Perfil</StyledButton5>
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
  buttonContainer2: {
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  textMargin: {
    marginTop: 10,
  },
});

export default Profile;
