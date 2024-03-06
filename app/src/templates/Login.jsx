import React from 'react';
import { View, ScrollView, Image, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import StyledBackground from '../styles/StyledBackgroud';
import StyledText from '../styles/StyledText';
import StyledInput from '../styles/StyledInput';
import StyledButton from '../styles/StyledButton';
import { useState } from 'react';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function onSubmit(username, password) {
        // Función vacía
    }

    function onRegister() {
        // Función vacía
    }

    function onForgotPassword() {
        // Función vacía
    }
    
    return (
        <StyledBackground bg='secondary' style={styles.background} >
            <KeyboardAvoidingView style={{flex:1}} 
            keyboardVerticalOffset={120}
            behavior='padding'
            // behavior={Platform.OS === 'ios' ? "padding" : undefined}
            >

            <StyledBackground bg='primary' style={styles.logoContainer}>
                <Image source={require('../images/logo.png')} />
            </StyledBackground>

            <StyledBackground bg='primary'>
            <View style={styles.contentContainer}>
                <StyledText color='secondary' size='large' fontWeight='bold' align='center' style={styles.title}>Iniciar Sesión</StyledText>

                <StyledText color='primary' size='medium' fontWeight='normal' style={styles.labelText}>Usuario</StyledText>
                <StyledInput
                    placeholder="Usuario"
                    onChangeText={(username) => setUsername(username)}
                   
                />
                <StyledText color='primary' size='medium' fontWeight='normal' style={styles.labelText}>Contraseña</StyledText>
                <StyledInput
                    placeholder="Contraseña"
                    onChangeText={(password) => setPassword(password)}
                    secureTextEntry={true}
                />

                <StyledButton  onPress={() => onSubmit(username, password)} >
                   Comenzar
                </StyledButton>

                <TouchableOpacity onPress={() => onRegister()} style={styles.bottom}>
                    <StyledText size='medium' color='primary' align='center'>Registrarme</StyledText>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onForgotPassword()} style={styles.bottom}>
                    <StyledText size='medium'  color='primary' align='center'>Recuperar contraseña</StyledText>
                </TouchableOpacity>
            </View>
            </StyledBackground>

            
            </KeyboardAvoidingView>

        </StyledBackground>
    );
};

export default Login;


const styles = StyleSheet.create({
    title: {
        marginTop: 20,
    },  
    background: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        flex: 1,
    },    
    logoContainer: {
        width: '100%',
        height: '55%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'white',        
        height: '100%',
    },
    labelText: {
        marginBottom: 10,
        marginLeft: 25,
    },
    bottom: {
        marginBottom: 10,
    },
   
});