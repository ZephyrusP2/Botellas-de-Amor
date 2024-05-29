import React from "react";
import { StyleSheet } from "react-native";
import Login from "./src/templates/Login";
import Register from "./src/templates/Register";
import Content from "./src/templates/Content";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Profile from "./src/templates/Profile";
import Analisis from "./src/templates/Analisis";
import { useState } from "react";
import { useEffect } from "react";
import EditProfile from "./src/templates/EditProfile";
import Proyectos from "./src/templates/Proyectos";
import Conocenos from "./src/templates/Conocenos";
import Materiales from "./src/templates/Materiales";
import RegisterBottle from "./src/templates/RegisterBottle";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const id = await AsyncStorage.getItem("id");
      const token = await AsyncStorage.getItem("token");

      if (id !== null && token !== null) {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, []);

  const [fontsLoaded, fontError] = useFonts({
    "League-Spartan": require("./src/assets/fonts/LeagueSpartan.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer onReady={onLayoutRootView} style={styles.container}>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? "Content" : "Login"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Content" component={Content} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Analisis" component={Analisis} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Conocenos" component={Conocenos} />
        <Stack.Screen name="Proyectos" component={Proyectos} />
        <Stack.Screen name="Materiales" component={Materiales} />
        <Stack.Screen name="RegisterBottle" component={RegisterBottle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
