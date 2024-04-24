import React from 'react';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Header from './Header';
import StyledText from '../styles/StyledText';
import StyledButton from '../styles/StyledButton';
import theme from '../styles/theme';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel'; // Importa el componente del carrusel

const sharedClasses = {
  px4: 'px-4',
  mt4: 'mt-4',
  mb6: 'mb-6',
};

const Info = () => {
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate('Conocenos');
  };

  const handleClick2 = () => {
    navigation.navigate('Materiales');
  };

  const projects = [
    { image: require('../images/Proyectos/retiro.png'), description: 'Vivienda, El Retiro, Antioquia con Micro plast – Coldeplas' },
    { image: require('../images/Proyectos/itagui.png'), description: 'Vivienda, Itagüí, Antioquia – Alico empaques' },
    { image: require('../images/Proyectos/cali.png'), description: 'Vivienda, Cali, Valle – Alico empaques' },
    { image: require('../images/Proyectos/bogota.png'), description: 'Vivienda, Bogotá, Cundinamarca – ARB ' },
    { image: require('../images/Proyectos/cartagena.png'), description: '20 viviendas, Cartagena, Bolívar – Esenttia' },
    { image: require('../images/Proyectos/santuario.png'), description: 'Aula Ambiental, I.E Rural,  El Santuario, Antioquia – Griffith' },
    { image: require('../images/Proyectos/remedios.png'), description: 'Parque, Remedios, Antioquia – Obrar S.A.S' },
    { image: require('../images/Proyectos/remedios2.png'), description: 'Parque, Remedios, Antioquia – Obrar S.A.S' },
    { image: require('../images/Proyectos/cartagena2.png'), description: 'Parque, Cartagena, Bolívar – Constructora Monserrate' },
    { image: require('../images/Proyectos/rionegro.png'), description: 'Parque I.E. El tablazo. Rionegro, Antioquia – Grupo Nutresa' },
    { image: require('../images/Proyectos/guayabal.png'), description: 'Parque, I.E. Guayabal, Antioquia – Alico empaques' },
    { image: require('../images/Proyectos/bello.png'), description: 'Parque, Barrio El Pinar, Bello, Antioquia – Argos' },
    { image: require('../images/Proyectos/cali2.png'), description: 'Parque, Barrio Cali, Valle – Grupo Flexa' },
    { image: require('../images/Proyectos/ebejico.png'), description: 'Parque, I.E. Rural, Ebéjico, Antioquia – LFS, C.C. El Tesoro, C.C del Este' },
    { image: require('../images/Proyectos/sancristobal.png'), description: 'Parque, I.E. San Cristóbal, Medellín, Antioquia – Grupo Nutresa' },
    { image: require('../images/Proyectos/marinilla.png'), description: 'Parque, I.E Rural, Marinilla, Antioquia – Compañía Nacional de Chocolates' },
    { image: require('../images/Proyectos/itagui2.png'), description: '24 mesas Comedor, I.E. Itagüí, Antioquia – Micro plast – Coldeplast' },
    { image: require('../images/Proyectos/marinilla2.png'), description: 'Mesas Comedor, I.E. Marinilla, Antioquia – Compañía Nacional de Chocolates' },
    { image: require('../images/Proyectos/carmen.png'), description: 'Mesas Comedor, I.E. El Carmen, Antioquia – Botellas de amor fundación' },
    { image: require('../images/Proyectos/itagui3.png'), description: 'Mesa Comedor, I.E. Itagüí, Antioquia – Botellas de amor fundación' },
  ];

  // Renderizar un elemento del carrusel
  const renderProjectItem = ({ item }) => (
    <View style={styles.carouselItemContainer}>
      <Image source={item.image} style={[styles.projectImage, styles.imageWithBorder]} />
      <StyledText>{item.description}</StyledText>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={{ flex: 1 }}>
        <View>
          <View style={[sharedClasses.px4, styles.projectContainer]}>
          <StyledText style={[styles.heading, { alignSelf: 'flex-start' }]}>Proyectos</StyledText>
            <Carousel
              data={projects}
              renderItem={renderProjectItem}
              sliderWidth={Dimensions.get('window').width} // Ancho del slider es el ancho del dispositivo
              itemWidth={Dimensions.get('window').width - 100} // Ancho del item es un poco menos que el ancho del dispositivo
              layout={'default'}
              loop={true} // Hace que el carrusel sea un bucle
            />
          </View>

          <View style={[sharedClasses.px4, sharedClasses.mt4]}>
            <StyledText style={styles.heading}>Materiales</StyledText>
            <TouchableOpacity onPress={handleClick2}>
              <View style={styles.materialsContainer}>
                <Image source={require('../images/materiales.png')} style={[styles.materialsImage, styles.imageWithBorder]} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={[sharedClasses.px4, sharedClasses.mt4, sharedClasses.mb6]}>
            <StyledText style={styles.heading}>Conócenos</StyledText>
            <TouchableOpacity onPress={handleClick}>
              <View style={styles.logoContainer}>
                <Image style={[styles.foundationLogo, styles.imageWithBorder]} source={require('../images/logofull.png')} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.zinc800,
  },
  projectContainer: {
    width: '100%', // Ancho completo del dispositivo
    alignItems: 'center', // Centra los elementos horizontalmente
  },
  projectImage: {
    width: Dimensions.get('window').width * 0.8, // Ancho del carrusel es el 80% del ancho del dispositivo
    height: 210, // Alto del carrusel (modifica según sea necesario)
    borderRadius: 8,
    marginTop: 8,
  },
  materialsContainer: {
    alignItems: 'center',
  },
  materialsImage: {
    width: '90%',
    height: 170,
    marginTop: 2, // Ajusta este valor según sea necesario
    borderRadius: 8,
  },
  logoContainer: {
    alignItems: 'center',
  },
  foundationLogo: {
    width: '90%',
    height: 170,
    marginTop: 2, // Ajusta este valor según sea necesario
    borderRadius: 8,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: theme.colors.zinc900,
    backgroundColor: theme.colors.zinc800,
    padding: 8,
  },
  imageWithBorder: {
    borderWidth: 1, // Ancho del borde
    borderColor: '#DFDDDD', // Color del borde
  },
  carouselItemContainer: {
    marginRight: 50, // Espacio entre imágenes en el carrusel
  },
});

export default Info;
