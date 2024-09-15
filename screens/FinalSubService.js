import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Contact from "../components/Contact";

const FinalSubService = ({ route }) => {
  const contactImage = require("../assets/image.png");
  const { description, image } = route.params;
  return (
    <View style={styles.container}>
      <Image source={image} style={{ width: "95%", height: "15%" , alignSelf:"center" }} />
      <View style={{ margin: 10 }}>
        <Text style={{ textAlign: "center" }}>{description}</Text>
      </View>
      <ScrollView>
        <Contact name={"صالحة"} job={"منضفة"} image={contactImage} stars={5} />
        <Contact name={"صالحة"} job={"منضفة"} image={contactImage} stars={5} />
        <Contact name={"صالحة"} job={"منضفة"} image={contactImage} stars={5} />
        <Contact name={"صالحة"} job={"منضفة"} image={contactImage} stars={5} />
      </ScrollView>
    </View>
  );
};

export default FinalSubService;

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
