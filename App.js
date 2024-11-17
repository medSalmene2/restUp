import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LanguageProvider, useLanguage } from "./hooks/useLanguage";
import HomeScreen from "./screens/Home";
import FinalSubService from "./screens/FinalSubService";
import SubServicesList from "./screens/SubServicesList";
import { IconButton } from "react-native-paper";
import ProfileScreen from "./screens/ProfileScreen";
import Map from "./screens/Map";
import Login from "./screens/Login";
import Signup from "./screens/SignUp";
import EventManager from "./screens/EventManager";
import EventInfoScreen from "./screens/testig";
import EventCreation from "./screens/EventCreation";
import EventDetailsScreen from "./screens/EventDetails";
// import EventsScreen from "./screens/EventScreen";

const Stack = createStackNavigator();

function AppNavigator() {
  const { t } = useLanguage();

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
            title: route.params?.subServiceTitle || t("home.service"), // Dynamic translation
          })}
        />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: t("home.greeting") }}
        />
        <Stack.Screen
          name='List'
          component={SubServicesList}
          options={({ route }) => ({
            title: route.params?.serviceTitle || t("home.serviceList"), // Dynamic translation
          })}
        />
        <Stack.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            title: t("profile.title"), // Translated title
            headerRight: null,
          }}
        />
        <Stack.Screen
          name='Map'
          component={Map}
          options={{
            title: t("home.location"), // Translated title
            headerRight: null,
          }}
        />
        <Stack.Screen
          name='EventManager'
          component={EventManager}
          options={{
            title: t("home.events"), // Translated title
          }}
        />
        <Stack.Screen
          name='EventCreation'
          component={EventCreation}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppNavigator />
    </LanguageProvider>
    // <EventManager/>
  );
}
