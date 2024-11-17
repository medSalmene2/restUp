import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";

export default function EventDetailsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>EventConnect</Text>
        <Text style={styles.title}>Annual Tech Conference 2023</Text>
        <Text style={styles.description}>
          Join us for an immersive experience at the Annual Tech Conference 2023, where industry leaders will gather to discuss the latest trends in technology and innovation. This event will feature keynote speeches, panel discussions, and networking opportunities.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Date & Time</Text>
          <Text style={styles.sectionContent}>March 15, 2023, 9:00 AM - 5:00 PM</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Location</Text>
          <Image
            style={styles.mapImage}
            source={{
              uri: "https://via.placeholder.com/300x150", 
            }}
          />
          <Text style={styles.sectionContent}>
            Moscone Center, 747 Howard St, San Francisco, CA 94103
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Organizer</Text>
          <View style={styles.organizer}>
            <Image
              style={styles.organizerImage}
              source={{
                uri: "https://via.placeholder.com/50", // Replace with a real image URL
              }}
            />
            <View>
              <Text style={styles.organizerName}>Sarah Johnson</Text>
              <Text style={styles.organizerEmail}>Email: sarah.johnson@example.com</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Join/Book Event</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    lineHeight: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  sectionContent: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  mapImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  organizer: {
    flexDirection: "row",
    alignItems: "center",
  },
  organizerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  organizerName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  organizerEmail: {
    fontSize: 12,
    color: "#666",
  },
  button: {
    backgroundColor: "#FF5733",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
