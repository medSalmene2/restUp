import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Contact from "../components/Contact";

const FinalService = ({ route }) => {
  const image = require("../assets/image.png");
  const {serviceTitle} = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{serviceTitle}</Text>
      <View></View>
      <ScrollView>

      <Contact name={"صالحة"} job={"منضفة"} image={image} stars={5} />
      <Contact name={"صالحة"} job={"منضفة"} image={image} stars={5} />
      <Contact name={"صالحة"} job={"منضفة"} image={image} stars={5} />
      <Contact name={"صالحة"} job={"منضفة"} image={image} stars={5} />
      </ScrollView>
      <Contact name={"صالحة"} job={"منضفة"} image={image} stars={5} />
    </View>
  );
};

export default FinalService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f7fa",
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0288d1",
    textAlign: "center",
    marginBottom: 16,
  },
});
