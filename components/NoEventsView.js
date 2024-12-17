import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const NoEventsView = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.noEventsContainer}>
      <Image
        source={require("../assets/NoEvent.png")}
        style={styles.noEventsImage}
        resizeMode='contain'
      />
  
      <Text style={styles.noEventsTitle}>Aucun événement actuellement</Text>
  
      <Text style={styles.noEventsSubtitle}>
        Il semble qu'aucun événement ne soit disponible pour le moment
      </Text>
  
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.addEventButton]}
          onPress={() => {
            navigation.navigate("EventCreation");
          }}>
          <Ionicons name='add' size={24} color='white' />
          <Text style={styles.actionButtonText}>Ajouter un événement</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};  

const styles = StyleSheet.create({
  noEventsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  noEventsImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  noEventsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  noEventsSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    gap: 10,
  },
  addEventButton: {
    backgroundColor: "red",
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NoEventsView;
