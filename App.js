import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LanguageProvider, useLanguage } from "./hooks/useLanguage";
import HomeScreen from "./screens/Home";
import FinalSubService from "./screens/FinalSubService";
import SubServicesList from "./screens/SubServicesList";
import ProfileScreen from "./screens/ProfileScreen";
import Map from "./screens/Map";
import Login from "./screens/Login";
import Signup from "./screens/SignUp";
import EventManager from "./screens/EventManager";
import EventInfoScreen from "./screens/testig";
import EventCreation from "./screens/EventCreation";
import EventsScreen from "./screens/EventScreen";
import { IconButton, Menu, Provider as PaperProvider } from "react-native-paper";
import { I18nManager } from "react-native"; // For RTL
import 'intl-pluralrules';


// const Stack = createStackNavigator();

// function AppNavigator() {
//   const { t, setLanguage } = useLanguage();
//   const [menuVisible, setMenuVisible] = React.useState(false);

//   // Step 3: Language Switcher Menu
//   const renderLanguageMenu = () => (
//     <Menu
//       visible={menuVisible}
//       onDismiss={() => setMenuVisible(false)}
//       anchor={
//         <IconButton
//           style={{ marginRight: 15 }}
//           icon="translate"
//           size={20}
//           color="black"
//           onPress={() => setMenuVisible(true)}
//         />
//       }
//     >
//       <Menu.Item
//         onPress={() => changeLanguage("en")}
//         title="English"
//       />
//       <Menu.Item
//         onPress={() => changeLanguage("fr")}
//         title="Français"
//       />
//       <Menu.Item
//         onPress={() => changeLanguage("ar")}
//         title="العربية"
//       />
//     </Menu>
//   );

//   // Step 4: Change Language and Handle RTL
//   const changeLanguage = (lang) => {
//     setLanguage(lang);
//     if (lang === "ar") {
//       I18nManager.forceRTL(true);
//     } else {
//       I18nManager.forceRTL(false);
//     }
//   };

//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Login"
//         screenOptions={({ navigation }) => ({
//           headerRight: () => (
//             <>
//               {/* Render the Language Switcher Menu */}
//               {renderLanguageMenu()}
//               <IconButton
//                 style={{ marginRight: 15 }}
//                 icon="account"
//                 size={20}
//                 color="black"
//                 mode="outlined"
//                 onPress={() => {
//                   navigation.navigate("Profile");
//                 }}
//               />
//             </>
//           ),
//         })}
//       >
//         <Stack.Screen
//           name="Login"
//           component={Login}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Signup"
//           component={Signup}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="FinalSubService"
//           component={FinalSubService}
//           options={({ route }) => ({
//             title: route.params?.subServiceTitle || t("home.service"), // Dynamic translation
//           })}
//         />
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{ title: t("home.greeting") }}
//         />
//         <Stack.Screen
//           name="List"
//           component={SubServicesList}
//           options={({ route }) => ({
//             title: route.params?.serviceTitle || t("home.serviceList"), // Dynamic translation
//           })}
//         />
//         <Stack.Screen
//           name="Profile"
//           component={ProfileScreen}
//           options={{
//             title: t("profile.title"), // Translated title
//             headerRight: null,
//           }}
//         />
//         <Stack.Screen
//           name="Map"
//           component={Map}
//           options={{
//             title: t("home.location"), // Translated title
//             headerRight: null,
//           }}
//         />
//         <Stack.Screen
//           name="EventManager"
//           component={EventManager}
//           options={{
//             title: t("home.events"), // Translated title
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

export default function App() {
  return (
    // <LanguageProvider>
    //   <PaperProvider>
    //     <AppNavigator />
    //   </PaperProvider>
    // </LanguageProvider>
    <EventsScreen/>
  );
}
