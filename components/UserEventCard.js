import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const UserEventCard = ({ name, phone, imageSource, numberOfPeople, role }) => {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={imageSource} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        {role === "organizer" && (
          <Text style={styles.details}>الهاتف: {phone}</Text>
        )}
        {role === "participant" && (
          <Text style={styles.details}>عدد الأشخاص المرافقين : {numberOfPeople}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Arial",
  },
  details: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    fontFamily: "Arial",
  },
});

export default UserEventCard;
