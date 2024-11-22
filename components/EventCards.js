import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import categories from "./EventCategoriesSet";
import { useNavigation } from "@react-navigation/native";

export default function EventCard({ event }) {
  const categImage =
    categories.find(cat => cat.name === event.categories[0])?.imageUrl ??
    require("../assets/event.png");
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => {
        navigation.navigate("EventOverview", { event });
      }}>
      <Image source={categImage} style={styles.eventImage} />
      <View style={styles.eventTitleContainer}>
        <Text style={styles.eventTitle} numberOfLines={2} ellipsizeMode='tail'>
          {event.title}
        </Text>
      </View>

      {/* Added a divider */}
      <View style={styles.divider} />

      <View style={styles.eventDateContainer}>
        <Ionicons
          name='time-outline'
          size={14}
          color='#666'
          style={styles.icon}
        />
        <Text style={styles.eventDate}>{event.date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  eventCard: {
    width: 150,
    marginHorizontal: 8,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  eventImage: {
    width: "100%",
    height: 80,
    resizeMode: "cover",
  },
  eventTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 8,
  },
  // New divider style
  divider: {
    height: 1,
    backgroundColor: "red", // Light gray divider
    marginHorizontal: 8,
  },
  eventDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 8,
  },
  icon: {
    marginRight: 6,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
    fontFamily: "Arial",
  },
  eventDate: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Arial",
  },
});
