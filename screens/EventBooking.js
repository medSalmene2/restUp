import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function BookingConfirmationScreen({ navigation }) {
  const [participants, setParticipants] = useState("1");
  const [additionalInfo, setAdditionalInfo] = useState("");

  return (
    <ScrollView style={styles.container}>
    
      <Text style={styles.title}>Music Festival 2023</Text>
      <Image
        style={styles.image}
        source={{
          uri: "https://via.placeholder.com/300x150", 
        }}
      />
      <Text style={styles.description}>
        Join us for an unforgettable experience at the Music Festival 2023.
        Enjoy live performances by top artists, food and drinks, and much more!
      </Text>
      <Text style={styles.details}>July 23, 2023</Text>
      <Text style={styles.details}>Central Park, NYC</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Number of Participants:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={participants}
          onChangeText={(text) => setParticipants(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Additional Information:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Any special requests or comments?"
          value={additionalInfo}
          onChangeText={(text) => setAdditionalInfo(text)}
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => alert("Booking Confirmed!")}
      >
        <Text style={styles.buttonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 15,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    marginTop: 25,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
    textAlign: "center",
  },
  details: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginBottom: 8,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#333",
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#FF5733",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
