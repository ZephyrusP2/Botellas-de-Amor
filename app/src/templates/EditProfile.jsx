import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from '../services/user';
import StyledText from '../styles/StyledText';
import Header2 from './Header2';
import { StyleSheet, View, Alert } from 'react-native';
import { StyledButton, StyledButton2, StyledButton4 } from "../styles/StyledButton";
import StyledInput from "../styles/StyledInput";

const EditProfile = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: '',
    last_name: '',
    birth_date: '',
    location: '',
    gender: '',
    email: ''
  });

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');
      const response = await UserService.getUserData(token, id);
      setUserData(response.data);
    } catch (error) {
      console.error('getUserData error', error);
    }
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile'); 
    Alert.alert('Botellas de amor', `¡Hola ${userData?.name || ''} estás editando tu perfil!`);
  };

  const handleProfile = () => {
    navigation.navigate('Profile'); 
  };

  const handleUpdateProfile = async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      const token = await AsyncStorage.getItem('token');
      const response = await UserService.update(token, id, userData);
      setUserData(response.data);
      Alert.alert('Botellas de amor', `¡Hola ${userData?.name ||''} se actualizó la información correctamente!`);
    } catch (error) {
      console.error('getUserData error', error);
    }
  };

  return (
    <>
      <Header2 />
      <View style={styles.buttonContainer}>
        <StyledButton4 title='Perfil' onPress={handleProfile}>Perfil</StyledButton4>
        <StyledButton2 title='EditProfile' onPress={handleEditProfile}>Editar Perfil</StyledButton2>
      </View>

      <View style={styles.formContainer}>
        <StyledText color='primary' size='medium' fontWeight='normal' style={styles.labelText}>Nombre</StyledText>
        <StyledInput placeholder="Nombre" value={userData.name} onChangeText={(name) => setUserData({...userData, name})} />
        
        <StyledText color='primary' size='medium' fontWeight='normal' style={styles.labelText}>Apellido</StyledText>
        <StyledInput placeholder="Apellido" value={userData.last_name} onChangeText={(last_name) => setUserData({...userData, last_name})} />
        
        <StyledText color='primary' size='medium' fontWeight='normal' style={styles.labelText}>Fecha de Nacimiento</StyledText>
        <StyledInput placeholder="Fecha de Nacimiento" value={userData.birth_date} onChangeText={(birth_date) => setUserData({...userData, birth_date})} />
        
        <StyledText color='primary' size='medium' fontWeight='normal' style={styles.labelText}>Ubicación</StyledText>
        <StyledInput placeholder="Ubicación" value={userData.location} onChangeText={(location) => setUserData({...userData, location})} />
        
        <StyledText color='primary' size='medium' fontWeight='normal' style={styles.labelText}>Género</StyledText>
        <StyledInput placeholder="Género" value={userData.gender} onChangeText={(gender) => setUserData({...userData, gender})} />
        
        <StyledText color='primary' size='medium' fontWeight='normal' style={styles.labelText}>Email</StyledText>
        <StyledInput placeholder="Email" value={userData.email} onChangeText={(email) => setUserData({...userData, email})} />
      </View>

      <StyledButton onPress={handleUpdateProfile}>Actualizar Información</StyledButton>
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
});

export default EditProfile;
