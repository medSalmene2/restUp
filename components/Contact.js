import React from "react";
import { View, Text, Image, StyleSheet, Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";

const Contact = ({ image, name, job, stars }) => {
  const makeCall = async () => {
    const phoneNumber = "tel:92066519";
    try {
      const supported = await Linking.canOpenURL(phoneNumber);
      if (supported) {
        await Linking.openURL(phoneNumber);
      } else {
        Alert.alert("This device doesn't support making calls");
      }
    } catch (err) {
      console.error("Error making call: ", err);
    }
  };
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.job}>{job}</Text>
        <View style={{ flexDirection: "row-reverse" }}>
          {Array(stars)
            .fill()
            .map((_, index) => (
              <FontAwesome key={index} name='star' size={28} color='#FFD700' />
            ))}
        </View>
      </View>
      <IconButton
        icon='phone'
        size={22}
        onPress={makeCall}
        style={{ alignSelf: "flex-start" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoContainer: {
    marginHorizontal: 15,
    flex: 1,
    // backgroundColor: "red",
    alignItems: "flex-end",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  job: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default Contact;
