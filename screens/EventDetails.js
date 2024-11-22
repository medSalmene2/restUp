import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";


export default function EventDetailsScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Annual Tech Conference 2023</Text>
        <Text style={styles.description}>
          Join us for an immersive experience at the Annual Tech Conference
          2023, where industry leaders will gather to discuss the latest trends
          in technology and innovation. This event will feature keynote
          speeches, panel discussions, and networking opportunities.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Date & Time</Text>
          <Text style={styles.sectionContent}>
            March 15, 2023, 9:00 AM - 5:00 PM
          </Text>
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
                uri: "https://via.placeholder.com/50",
              }}
            />
            <View>
              <Text style={styles.organizerName}>Sarah Johnson</Text>
              <Text style={styles.organizerPhone}>Phone: (123) 456-7890</Text>
            </View>
          </View>
        </View>

        {/* Participants Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Participants</Text>
          {/* Participant 1 */}
          <View style={styles.organizer}>
            <Image
              style={styles.organizerImage}
              source={{
                uri: "https://via.placeholder.com/50",
              }}
            />
            <View>
              <Text style={styles.participantName}>John Doe</Text>
              <Text style={styles.participantPhone}>Phone: (987) 654-3210</Text>
            </View>
          </View>
          {/* Participant 2 */}
          <View style={styles.organizer}>
            <Image
              style={styles.organizerImage}
              source={{
                uri: "https://via.placeholder.com/50",
              }}
            />
            <View>
              <Text style={styles.participantName}>Jane Smith</Text>
              <Text style={styles.participantPhone}>Phone: (555) 123-4567</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("BookingConfirmation")}
        >
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
    textAlign: "center", // Center the header
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
    textAlign: "center", // Center the title
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    lineHeight: 22,
    textAlign: "justify", // Improve text readability
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
    textDecorationLine: "underline", // Add underlines for better separation
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
    marginBottom: 10, // Add spacing between participants
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
  organizerPhone: {
    fontSize: 12,
    color: "#666",
  },
  participantName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  participantPhone: {
    fontSize: 12,
    color: "#666",
  },
  button: {
    backgroundColor: "#FF5733",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
