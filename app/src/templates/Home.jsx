import { Image, StyleSheet, ScrollView } from "react-native"
import Header from "./Header"
import StyledBackground from "../styles/StyledBackgroud"
import StyledText from "../styles/StyledText"


export default function Home() {
    return (
        <ScrollView>
            <Header />
            <StyledBackground display='center'>
                <StyledText size='large'>Mstermigol</StyledText>
                <StyledBackground display='center' style={styles.row} >
                    <StyledText size='large'>Nivel 7</StyledText>
                    <Image style={styles.image1} source={require("../images/king.png")} />
                </StyledBackground>
            </StyledBackground>
            <StyledBackground display='center' style={styles.row}>
                <StyledBackground>
                <Image style={styles.image2} source={require("../images/bottle.png")} />
                </StyledBackground>
                <StyledBackground style={styles.info}>
                    <StyledBackground>
                        <StyledText style={styles.number} align = "center">
                            17
                        </StyledText>
                        <StyledText style={styles.label} color="primary" align = "center">
                            Botellas
                        </StyledText>
                    </StyledBackground >
                    <StyledBackground>
                        <StyledText style={styles.number} align = "center">
                            150g
                        </StyledText>
                        <StyledText  style={styles.label}  color="primary" align = "center">
                            Huella de plastico
                        </StyledText>
                    </StyledBackground>
                </StyledBackground>
            </StyledBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
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
    info:{
        gap: 20,
    },
    number:{
        fontSize: 60,
        fontWeight: 'bold',
     },
    label:{
        fontSize: 25,
    }

});
