import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Service from "./components/Service";
import Contact from "./components/Contact";

export default function App() {
  const image = require("./assets/image.png");
  return (
    <View style={styles.container}>
      <Contact image={image} stars={5} name={"salmene ghar"} job={"employee"} />
      <Service
        bgColor={"red"}
        textColor={"blue"}
        image={image}
        text={"hello"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
