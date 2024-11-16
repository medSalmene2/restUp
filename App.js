import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/Home";
import FinalSubService from "./screens/FinalSubService";
import SubServicesList from "./screens/SubServicesList";
import { IconButton } from "react-native-paper";
import ProfileScreen from "./screens/ProfileScreen";
import Map from "./screens/Map";
import Login from "./screens/Login";
import Signup from "./screens/SignUp";
import EventManager from "./screens/EventManager";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='login'
        screenOptions={({ navigation }) => ({
          headerRight: () => (
            <IconButton
              style={{ marginRight: 15 }}
              icon={"account"}
              size={20}
              color='black'
              mode='outlined'
              onPress={() => {
                navigation.navigate("Profile");
              }}
            />
          ),
        })}>
        <Stack.Screen
          name='Login'
          component={Login}
          options={({ route }) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name='Signup'
          component={Signup}
          options={({ route }) => ({
            headerShown: false,
          })}
        />
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
        <Stack.Screen
          name='Profile'
          component={ProfileScreen}
          options={() => ({
            title: "حسابك", // Set dynamic title
            headerRight: null,
          })}
        />
        <Stack.Screen
          name='Map'
          component={Map}
          options={() => ({
            title: "الموقع", // Set dynamic title
            headerRight: null,
          })}
        />
        <Stack.Screen
          name='EventManager'
          component={EventManager}
          options={() => ({
            title: "الفعاليات", // Set dynamic title
            // headerRight: null,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

