import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import UserEventCard from "../components/UserEventCard"; 
import { fetchUserInfo } from "../firestore/User";
import { fetchParticipantsInfo } from "../firestore/events/Find";
import EventMap from "./EventMap";
export default function EventDetailsScreen({ navigation, route }) {
  const { event } = route.params;
  const [organizerInfo, setOrganizerInfo] = useState({
    firstName: "User",
    lastName: "User",
    phonNumber: "*******",
  });
  const [participantsInfo, setParticipantsInfo] = useState([]);

  const fetchOrganizerInfo = async () => {
    const userInfo = await fetchUserInfo(event.organizerId);
    setOrganizerInfo(userInfo);
  };
  const getParticipantsInfo = async () => {
    const userInfo = await fetchParticipantsInfo(event.id);
    setParticipantsInfo(userInfo);
  };
  useEffect(() => {
    fetchOrganizerInfo();
    getParticipantsInfo();
  }, []);

  console.log(event);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{event.title}</Text>

        <View style={styles.categoriesContainer}>
          {event.categories.map((category, index) => (
            <View key={index} style={styles.categoryChip}>
              <Ionicons name="information-outline" size={16} color="white" />
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.description}>{event.description}</Text>

        <View style={styles.section}>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeader}>Date et Heure</Text>
            <Ionicons name="calendar-outline" size={20} color="red" />
          </View>
          <Text style={styles.sectionContent}>
            {event.date}{" "}
            {event.allDay
              ? "Toute la journée"
              : event.fromTime + "--" + event.toTime}
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeader}>Lieu</Text>
            <Ionicons name="location-outline" size={20} color="red" />
          </View>
          <TouchableOpacity>
            <EventMap location={event.locationPoint} />
          </TouchableOpacity>
          <Text style={styles.sectionContent}>{event.location} </Text>
        </View>

        {/* Section Organisateur */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeader}>Organisateur</Text>
            <Ionicons name="person-outline" size={20} color="red" />
          </View>
          <UserEventCard
            name={organizerInfo?.firstName + " " + organizerInfo?.lastName}
            phone={organizerInfo?.phoneNumber}
            imageSource={require("../assets/profilePlaceHolder.png")}
            role="organisateur"
          />
        </View>

        {/* Section Participants */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeader}>Participants</Text>
            <Ionicons name="people-outline" size={20} color="red" />
          </View>
          <View style={styles.participantsContainer}>
            {participantsInfo.length > 0 ? (
              participantsInfo.map((participant, index) => (
                <UserEventCard
                  key={index} // Assurez-vous de fournir une clé unique pour chaque élément mappé
                  name={participant.username}
                  phone={participant.phoneNumber}
                  imageSource={require("../assets/profilePlaceHolder.png")}
                  role={"participant"}
                  numberOfPeople={participant.nbrOfPersons}
                />
              ))
            ) : (
              <Text>Il n'y a pas encore de participants</Text> // Optionnel : Message si aucun participant
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    direction: "rtl",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    margin: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#000",
    fontFamily: "Arial",
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Allows wrapping to the next line if needed
    gap: 8, // Space between chips
    marginBottom: 16, // Adjust as necessary
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  categoryText: {
    marginRight: 6,
    color: "white",
    fontSize: 14,
    fontFamily: "Arial",
  },
  description: {
    fontSize: 15,
    color: "#444",
    marginBottom: 24,
    lineHeight: 24,
    fontFamily: "Arial",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 8,
    fontFamily: "Arial",
  },
  sectionContent: {
    fontSize: 15,
    color: "#444",
    marginBottom: 12,
    fontFamily: "Arial",
  },
  mapImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },
  participantsContainer: {
    gap: 12,
  },
});
