import React from "react";
import { StyleSheet, View, Text, Image, Alert, ScrollView, TouchableOpacity } from "react-native";

const sharedClasses = {
    textZinc: { color: '#374151' },
    textRed: { color: '#FD595A' },
    textBlue: { color: '#0AB5B8' },
};
const MaterialFactory = ({image1, image2, element, elementSubtitle, items, forbiddenArticles}) => {
    
    return(
        <>
        <View style={styles.p4}>
            <View style={styles.card}>
                <View style={styles.content}>
                    <Text style={[styles.title, { fontSize: 30 }]}>
                        <Text style={{ color: '#0AB5B8' }}> PUEDES LLENAR</Text> {'\n'}
                        <Text style={{ color: '#FD595A', fontSize: 44 }}> BOTELLAS </Text> {'\n'}
                        <Text style={{ color: '#FD595A', fontSize: 44 }}> CON...</Text>
                    </Text>
                    <View style={styles.imageContainer}>
                        <Image source={image1} style={[styles.image, { height: 130, width: 100, marginLeft: 50 }]} />
                    </View>
                    <View style={styles.itemContainer}>
                        <Image source={image2} style={[styles.image, { height: 130, width: 90 }]} />
                        <View style={styles.textContainer}>
                            <Text style={[styles.subtitle, sharedClasses.textRed, { fontSize: 25 }]}>{element}</Text>
                            <Text style={[sharedClasses.textRed, { fontSize: 20 }]}>{elementSubtitle}</Text>
                            <Text style={[sharedClasses.textBlue, { fontSize: 20 }]}>{items}</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <Text style={[styles.subtitle, sharedClasses.textRed, { fontSize: 30, textAlign: 'center' }]}>RECUERDA</Text>
                        <Text style={{ color: '#0AB5B8', fontSize: 24, textAlign: 'center' }}>Sin restos de alimentos</Text>
                    </View>
                    <View style={[styles.footer, { backgroundColor: '#FD595A' }]}>
                        <Text style={[styles.tag, { color: 'white', fontSize: 15 }]}>{forbiddenArticles}</Text>
                        <Text style={[sharedClasses.textZinc, { color: 'white', fontSize: 30 }]}>
                            NO
                        </Text>
                    </View>

                </View>
                <View style={[styles.footer2]}>
                    <View style={[styles.footerImageContainer]}>
                        <Image source={require('../images/logofullblanco.png')} style={{ height: 80, width: 160 }} />
                    </View>
                </View>

            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
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
        alignItems: 'flex-end',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    textContainer: {
        flex: 1,
        marginLeft: 8,
    },
    card: {
        width: '100%',
        maxWidth: 300,
        marginVertical: 8,
        borderRadius: 8,
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
    footer2: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    footerImageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FD595A',
        padding: 8,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    
});

export default MaterialFactory;