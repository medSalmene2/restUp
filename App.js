import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/Home";
import FinalSubService from "./screens/FinalSubService";
import SubServicesList from "./screens/SubServicesList";

const Stack = createStackNavigator();

export default function App() {
  const image = require("./assets/image.png");
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='FinalSubService'
          component={FinalSubService}
          options={({ route }) => ({
            title: route.params?.subServiceTitle || "الخدمة", // Set dynamic title
          })}
        />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: "Home Screen" }}
        />
        <Stack.Screen
          name='List'
          component={SubServicesList}
          options={({ route }) => ({
            title: route.params?.serviceTitle || "قائمة الخدمات", // Set dynamic title
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EAF2F8",
  },
  container: {
    flex: 1,
    backgroundColor: "#EAF2F8",
    justifyContent: "center",
  },
});
