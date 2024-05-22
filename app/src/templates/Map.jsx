import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { View, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { MAPS_TOKEN } from '@env';
import MapService from "../services/map";


// DEBEMOS PEDIR LA UBICACION DEL USUARIO PARA USARLA ACA
const origin = { latitude: 6.234339, longitude: -75.576908 }; // Origen fijo (por ejemplo, la ubicación actual del usuario)

export default function Map() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [destination, setDestination] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    retrieveSites();
    // console.log(location);
  }, []);

  const retrieveSites = async () => {
    const token = await AsyncStorage.getItem("token");
    const id = await AsyncStorage.getItem("id");
    MapService.retrieve(token, id)
      .then((response) => {
        // Convertir las locations en markers
        const newMarkers = response.data.map((location, index) => ({
          id: index + 1,
          title: location.name,
          coordinate: {
            latitude: parseFloat(location.latitude),
            longitude: parseFloat(location.longitude)
          }
        }));
        setMarkers(newMarkers);
      })
      .catch((error) => {
        console.error("retrieve user error", error);
      });
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

  const handleNavigationStart = () => {
    if (selectedMarker) {
      setDestination(selectedMarker.coordinate);
      console.log(destination)
    }
  };

  const renderMarkers = () => {
    return markers.map(marker => (
      <Marker
        key={marker.id}
        coordinate={marker.coordinate}
        title={marker.title}
        onPress={() => handleMarkerPress(marker)}
      />
    ));
  };

  const renderDirections = () => {
    if (destination) {
      return (
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={MAPS_TOKEN}
          strokeWidth={3}
          strokeColor="#FD595A"
        />
      );
    }
    return null;
  };

  return (
    <View style={{ flex: 1, marginBottom: 70 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 6.234339,
          longitude: -75.576908,
          latitudeDelta: 0.4,
          longitudeDelta: 0.4
        }}
      >
        {renderMarkers()}
        {destination && <Marker coordinate={destination} />}
        {renderDirections()}
      </MapView>
      <Button title="Ir" onPress={handleNavigationStart} disabled={!selectedMarker} />
    </View>
  );
}
