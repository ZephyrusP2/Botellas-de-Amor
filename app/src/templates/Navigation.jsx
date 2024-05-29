import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Info from "./Info";
import Home from "./Home";
import Map from "./Map";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingHorizontal: 5,
          paddingTop: 0,
          paddingBottom: 10,
          backgroundColor: "#FD595A",
          position: "absolute",
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          color: "white",
          fontSize: 18,
        },
      })}
    >
      <Tab.Screen
        name="Info"
        component={Info}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require("../images/info_selected.png")
                  : require("../images/info.png")
              }
              style={{ width: size, height: size }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require("../images/home_selected.png")
                  : require("../images/home.png")
              }
              style={{ width: size, height: size }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Mapa"
        component={Map}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require("../images/mapa_selected.png")
                  : require("../images/mapa.png")
              }
              style={{ width: size, height: size }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return <MyTabs />;
}
