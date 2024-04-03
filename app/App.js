import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/templates/Login";
import Register from "./src/templates/Register";
import Content from "./src/templates/Content";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/templates/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Profile from "./src/templates/Profile";
import Header from "./src/templates/Header";
import Analisis from "./src/templates/Analisis";

SplashScreen.preventAutoHideAsync();

export default function App() {
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
        screenOptions={{
          headerShown: false,
        }}
      >
        {AsyncStorage.getItem("token") === null ||
        AsyncStorage.getItem("id") === null ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
          <Stack.Screen name="Content" component={Content} />
          <Stack.Screen name="Header" component={Header} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Analisis" component={Analisis} />
          </>
        )}
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
