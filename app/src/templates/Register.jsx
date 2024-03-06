import React from 'react';
import { View, ScrollView, Image, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import StyledBackground from '../styles/StyledBackgroud';
import StyledText from '../styles/StyledText';
import StyledInput from '../styles/StyledInput';
import StyledButton from '../styles/StyledButton';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';


const Register = () => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [borndate, setBorndate] = useState(new Date());

    const [genre, setGenre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    function onRegister() {
        // Función vacía
    }

    function onSubmit(){
        // funcion vacia
    }

    return (
        <StyledBackground bg='secondary' style={styles.background} >
            <KeyboardAvoidingView style={{ flex: 1 }}
                keyboardVerticalOffset={120}
                behavior='padding'>

                <StyledBackground bg='primary' style={styles.logoContainer}>
                </StyledBackground>

                <StyledBackground bg='primary'>
                    <View style={styles.contentContainer}>
                        <StyledText color='secondary' size='large' fontWeight='bold' align='center' style={styles.title}>Registro</StyledText>

                        <StyledText color='primary' size='medium' fontWeight='normal' style={styles.labelText}>Nombre</StyledText>
                        <StyledInput
                            placeholder="Nombre"
                            onChangeText={(name) => setName(name)}

                        />

                        <StyledText color='primary' size='medium' fontWeight='normal' style={styles.labelText}>Apellido</StyledText>
                        <StyledInput
                            placeholder="Apellido"
                            onChangeText={(password) => setPassword(password)}
                            secureTextEntry={true}
                        />

                        <StyledText color='primary' size='medium' fontWeight='normal' style={styles.labelText}>Fecha De Nacimiento</StyledText>
                        <StyledInput
                            placeholder="Fecha De Nacimiento"
                            onChangeText={(password) => setPassword(password)}
                            secureTextEntry={true}
                        />

                        <DateTimePicker
                            mode='date'
                            display='spinner'
                            value={borndate}
                            onChange={(event, selectedDate) => {
                                const currentDate = selectedDate || borndate;
                                setBorndate(currentDate);
                                setShowPicker(false);
                            }}
                        />

                        <StyledText color='primary' size='medium' fontWeight='normal' style={styles.labelText}>Genero</StyledText>
                        <StyledInput
                            placeholder="Genero"
                            onChangeText={(password) => setPassword(password)}
                            secureTextEntry={true}
                        />


                        <StyledText color='primary' size='medium' fontWeight='normal' style={styles.labelText}>Email</StyledText>
                        <StyledInput
                            placeholder="Email"
                            onChangeText={(password) => setPassword(password)}
                            secureTextEntry={true}
                        />

                        <StyledText color='primary' size='medium' fontWeight='normal' style={styles.labelText}>Contraseña</StyledText>
                        <StyledInput
                            placeholder="Contraseña"
                            onChangeText={(password) => setPassword(password)}
                            secureTextEntry={true}
                        />

                        <StyledButton onPress={() => onSubmit(username, password)} >
                            Registrarme
                        </StyledButton>

                        <TouchableOpacity onPress={() => onRegister()} style={styles.bottom}>
                            <StyledText size='medium' color='primary' align='center'>Iniciar sesión</StyledText>
                        </TouchableOpacity>

                    </View>
                </StyledBackground>


            </KeyboardAvoidingView>

        </StyledBackground>
    );
};

export default Register;


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
        height: '7%',
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