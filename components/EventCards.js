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

  console.log(event);

  return (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => {
        navigation.navigate("EventOverview", { event });
      }}>
      <Image source={categImage} style={styles.eventImage} />

      {/* Added organizer chip */}
      {event.isOrganizer && (
        <View style={styles.organizerChip}>
          <Ionicons name='star' size={12} color='#ffffff' />
          <Text style={styles.organizerText}>منظم</Text>
        </View>
      )}

      <View style={styles.eventTitleContainer}>
        <Text style={styles.eventTitle} numberOfLines={2} ellipsizeMode='tail'>
          {event.title}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.eventDateContainer}>
        <Ionicons
          name='calendar-outline'
          size={18}
          color='#666'
          style={styles.icon}
        />
        <Text style={styles.eventDate}>{event.date}</Text>
      </View>

      <View style={styles.participantsContainer}>
        <Ionicons
          name='people-outline'
          size={18}
          color='#666'
          style={styles.icon}
        />
        <Text style={styles.participantsText}>
          {event.currentParticipants || 0}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  eventCard: {
    direction: "rtl",
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
  // Added organizer chip styles
  organizerChip: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#2196F3",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  organizerText: {
    color: "#ffffff",
    fontSize: 12,
    marginLeft: 4,
    fontFamily: "Arial",
    fontWeight: "bold",
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
  divider: {
    height: 1,
    backgroundColor: "red",
    marginHorizontal: 8,
  },
  eventDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 8,
  },
  icon: {
    marginHorizontal: 6,
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
    fontWeight: "bold",
  },
  participantsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    marginBottom: 8,
  },
  participantsText: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Arial",
    fontWeight: "bold",
  },
});
