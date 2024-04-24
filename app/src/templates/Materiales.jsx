import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserService from "../services/user";
import Header2 from "./Header2";
import { StyleSheet, View, Text, Image, Alert, ScrollView, TouchableOpacity } from "react-native";
import StyledButton from "../styles/StyledButton";
import theme from "../styles/theme";
import { useNavigation } from '@react-navigation/native';
import Header3 from "./Header3";
import StyledText from "../styles/StyledText";

const sharedClasses = {
    textZinc: { color: '#374151' },
    textRed: { color: '#EF4444' },
    textBlue: { color: '#3B82F6' },
};

const Materiales = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState();

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
                <View style={styles.cardContainerBolsas}>
                    <View style={styles.p4}>
                        <View style={styles.card}>
                            <View style={styles.content}>
                                <Text style={styles.title}>PUEDES LLENAR BOTELLAS CON...</Text>
                                <View style={styles.imageContainer}>
                                    <Image source={require('../images/botella.png')} style={[styles.image, { height: 130, width: 100, marginLeft: 50 }]} />
                                </View>
                                <View style={styles.itemContainer}>
                                    <Image source={require('../images/bolsa.png')} style={[styles.image, { height: 130, width: 90 }]} />
                                    <View style={styles.textContainer}>
                                        <Text style={[styles.subtitle, sharedClasses.textBlue]}>BOLSAS</Text>
                                        <Text style={sharedClasses.textZinc}>de todo tipo: Arroz, pasta, galletas, cereales, bolsa del mercado, salsa, leche, carnes, yogurt...</Text>
                                    </View>
                                </View>
                                <View style={styles.item}>
                                    <Text style={[styles.subtitle, sharedClasses.textRed]}>RECUERDA</Text>
                                    <Text style={sharedClasses.textZinc}>Sin restos de alimentos</Text>
                                </View>
                                <View style={styles.footer}>
                                    <Text style={styles.tag}>BOLSAS DE PAPEL</Text>
                                    <Text style={sharedClasses.textZinc}>NO</Text>
                                </View>
                            </View>
                            <View style={styles.footer}>
                                <View style={styles.footerImageContainer}>
                                    <Image source={require('../images/logofull.png')} style={{ height: 80, width: 180 }} />
                                </View>
                            </View>

                        </View>
                    </View>
                </View>

                <View style={styles.cardContainerEnvolturas}>
                    <View style={styles.p4}>
                        <View style={styles.card}>
                            <View style={styles.content}>
                                <Text style={styles.title}>PUEDES LLENAR BOTELLAS CON...</Text>
                                <View style={styles.imageContainer}>
                                    <Image source={require('../images/botella.png')} style={[styles.image, { height: 130, width: 100, marginLeft: 50 }]} />
                                </View>
                                <View style={styles.itemContainer}>
                                    <Image source={require('../images/empaque.png')} style={[styles.image, { height: 130, width: 90 }]} />
                                    <View style={styles.textContainer}>
                                        <Text style={[styles.subtitle, sharedClasses.textBlue]}>ENVOLTURAS</Text>
                                        <Text style={sharedClasses.textZinc}>de golosinas y snacks: Papas, helados, chocolates, galletas, bombones, dulces, frutos secos...</Text>
                                    </View>
                                </View>
                                <View style={styles.item}>
                                    <Text style={[styles.subtitle, sharedClasses.textRed]}>RECUERDA</Text>
                                    <Text style={sharedClasses.textZinc}>Sin restos de alimentos</Text>
                                </View>
                                <View style={styles.footer}>
                                    <Text style={styles.tag}>TETRAPACK O ALUMINIO</Text>
                                    <Text style={sharedClasses.textZinc}>NO</Text>
                                </View>
                            </View>
                            <View style={styles.footer}>
                                <View style={styles.footerImageContainer}>
                                    <Image source={require('../images/logofull.png')} style={{ height: 80, width: 180 }} />
                                </View>
                            </View>

                        </View>
                    </View>
                </View>

                <View style={styles.cardContainerElementos}>
                    <View style={styles.p4}>
                        <View style={styles.card}>
                            <View style={styles.content}>
                                <Text style={styles.title}>PUEDES LLENAR BOTELLAS CON...</Text>
                                <View style={styles.imageContainer}>
                                    <Image source={require('../images/botella.png')} style={[styles.image, { height: 130, width: 100, marginLeft: 50 }]} />
                                </View>
                                <View style={styles.itemContainer}>
                                    <Image source={require('../images/elementos.png')} style={[styles.image, { height: 130, width: 90 }]} />
                                    <View style={styles.textContainer}>
                                        <Text style={[styles.subtitle, sharedClasses.textBlue]}>ELEMENTOS</Text>
                                        <Text style={sharedClasses.textZinc}>desechables plásticos: Mezcladores, pitillos, vasos, tubos de cremas, cubiertos, cepillos de dientes...</Text>
                                    </View>
                                </View>
                                <View style={styles.item}>
                                    <Text style={[styles.subtitle, sharedClasses.textRed]}>RECUERDA</Text>
                                    <Text style={sharedClasses.textZinc}>Sin restos de alimentos</Text>
                                </View>
                                <View style={styles.footer}>
                                    <Text style={styles.tag}>LATEX, ICOPOR O CAUCHO</Text>
                                    <Text style={sharedClasses.textZinc}>NO</Text>
                                </View>
                            </View>
                            <View style={styles.footer}>
                                <View style={styles.footerImageContainer}>
                                    <Image source={require('../images/logofull.png')} style={{ height: 80, width: 180 }} />
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    cardContainerBolsas: {
        padding: 16,
    },
    cardContainerEnvolturas: {
        padding: 16,
    },
    cardContainerElementos: {
        padding: 16,
    },
    p4: {
        padding: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#374151',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 8,
    },
    imageContainer: {
        alignItems: 'flex-end', // Alinea la imagen a la derecha
    },
    itemContainer: {
        flexDirection: 'row', // Alinea la bolsa y el texto en una fila
        alignItems: 'center', // Alinea la bolsa y el texto verticalmente
        marginBottom: 16,
    },
    textContainer: {
        flex: 1, // El texto ocupará el espacio restante
        marginLeft: 8, // Añade un margen entre la bolsa y el texto
    },
    card: {
        maxWidth: 300,
        marginVertical: 8,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    content: {
        padding: 16,
    },
    item: {
        marginBottom: 16,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        backgroundColor: '#F3F4F6',
        flex: 1, // Añade flex: 1 para que el footer ocupe todo el espacio vertical disponible
    },
    footerImageContainer: {
        alignItems: 'center',
    },

    tag: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        fontSize: 14,
        color: '#EF4444',
        backgroundColor: '#FEE2E2',
        borderRadius: 999,
    },
});

export default Materiales;
