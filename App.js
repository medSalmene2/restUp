import { StyleSheet } from "react-native";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import MedicalAssistance from './screens/Paramedical';
import DailyNeeds from "./screens/DailyNeeds";
import Loisir from "./screens/Loisir";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Home Screen' }}
        />
        <Stack.Screen 
          name="MedicalAssistance" 
          component={MedicalAssistance} 
          options={{ title: 'Medical Assistance' }} 
        />
          <Stack.Screen 
          name="DailyNeeds" 
          component={DailyNeeds} 
          options={{ title: 'Daily Needs' }} 
        />
          <Stack.Screen 
          name="Loisir" 
          component={Loisir} 
          options={{ title: 'Entertainment' }} 
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
