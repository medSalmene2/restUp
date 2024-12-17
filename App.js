import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { changeLanguage } from "./i18n";
import HomeScreen from "./screens/Home";
import FinalSubService from "./screens/FinalSubService";
import SubServicesList from "./screens/SubServicesList";
import ProfileScreen from "./screens/ProfileScreen";
import Map from "./screens/Map";
import Login from "./screens/Login";
import Signup from "./screens/SignUp";
import EventManager from "./screens/EventManager";
import EventCreation from "./screens/EventCreation";
import EventExplore from "./screens/EventExplore";
import {
  IconButton,
  Menu,
  Provider as PaperProvider,
} from "react-native-paper";
import "intl-pluralrules";
import EventDetailsScreen from "./screens/EventDetails";
import EventBooking from "./screens/EventBooking";
import AppointmentScreen from "./components/schedule";
import TranslationProvider ,{ useTranslation }from "./components/TranslationContext"
import { AuthContextProvider } from "./firestore/auth/AuthContext";
import { I18nManager } from "react-native";
import RNRestart from "react-native-restart";
import i18n from "./i18n";

import ExampleScreen from "./test";
import RidePriceMap from "./screens/TransportMap";
import TransportMap from "./screens/TransportMap";

const Stack = createStackNavigator();
function AppNavigator() {
  // const { t, currentLanguage } = useTranslation();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Signup'
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='FinalSubService'
          component={FinalSubService}
          options={({ route }) => ({
            title: route.params?.subServiceTitle || "Service",
          })}
        />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: "Bonjour" }}
        />
        <Stack.Screen
          name="Schedule"
          component={AppointmentScreen}
          options={{
            title: 'Réserver un rendez-vous',
          }}
        />
        <Stack.Screen
          name='List'
          component={SubServicesList}
          options={({ route }) => ({
            title: route.params?.serviceTitle || "Liste des services",
          })}
        />
        <Stack.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            title: "Profil",
            headerRight: null,
          }}
        />
        <Stack.Screen
          name='Map'
          component={Map}
          options={{
            title: "Emplacement",
            headerRight: null,
          }}
        />
        <Stack.Screen
          name='EventManager'
          component={EventManager}
          options={{
            title: "Événements",
          }}
        />
        <Stack.Screen
          name='EventCreation'
          component={EventCreation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='EventExplore'
          component={EventExplore}
        />
        <Stack.Screen
          name='EventBooking'
          component={EventBooking}
        />
        <Stack.Screen
          name='EventOverview'
          component={EventDetailsScreen}
        />
        <Stack.Screen
          name='TransportMap'
          component={TransportMap}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}

export default function App() {
  return (
    <AuthContextProvider>   
     {/* <TranslationProvider> */}
        <AppNavigator />
        {/* </TranslationProvider> */}
    </AuthContextProvider>
  );
}
