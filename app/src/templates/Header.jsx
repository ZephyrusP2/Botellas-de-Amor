import React from "react";
import { View, Image, StyleSheet } from "react-native";
import StyledBackground from "../styles/StyledBackgroud";

export default function Header() {
    return (
        <StyledBackground style={styles.bg}>
            <View style={styles.imageContainer}>
                <Image style={styles.image1} source={require("../images/user.png")} />
                <Image style={styles.image2} source={require("../images/logofull.png")} />
                <Image style={styles.image3} source={require("../images/colombia.png")} />
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
        margin: 10,
        width: 49,
        height: 49,
    },
    image2: {
        margin: 10,
        width: 156,
        height: 77,
    },
    image3: {
        margin: 10,
        width: 49,
        height: 49,
    },
});
