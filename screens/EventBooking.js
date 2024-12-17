import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";
import categories from "../components/EventCategoriesSet";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addEventParticipant } from "../firestore/events/Book";
import { useAuth } from "../firestore/auth/AuthContext";

export default function EventBooking() {
  const [participants, setParticipants] = useState(1);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const route = useRoute();
  const { event } = route.params;
  const navigation = useNavigation();

  const categImage =
    categories.find(cat => cat.name === event.categories[0])?.imageUrl ??
    require("../assets/event.png");

  const { user } = useAuth();

  const handleBooking = async () => {
    if (isLoading) return;
  
    setIsLoading(true);
    try {
      if (!user) {
        Alert.alert("Erreur", "Vous devez vous connecter d'abord");
        navigation.navigate("Login");
        return;
      }
  
      await addEventParticipant(
        event.id,
        user.id,
        user.firstName + " " + user.lastName,
        participants
      );
  
      setSnackbarMessage("Réservation effectuée avec succès !");
      setSnackbarVisible(true);
      setTimeout(() => {
        navigation.navigate("EventManager");
      }, 3000);
    } catch (error) {
      console.error(error);
      let errorMessage = "Une erreur s'est produite lors de la réservation. ";
      switch (error.message) {
        case "Organizer cannot book their own event":
          errorMessage += "Vous ne pouvez pas réserver un événement que vous organisez.";
          break;
        case "Event is full":
          errorMessage += "Désolé, l'événement est complet.";
          break;
        case "Event not found":
          errorMessage += "Événement introuvable.";
          break;
        default:
          errorMessage += error.message;
      }
      Alert.alert("Erreur", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  const isBookingDisabled = isLoading || parseInt(participants) < 1;
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={categImage} />
        <View style={styles.dateChip}>
          <Ionicons name='calendar-outline' size={20} color='#fff' />
          <Text style={styles.dateChipText}>{event.date}</Text>
        </View>
      </View>
  
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{event.title}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name='location-outline' size={20} color='#666' />
          <Text style={styles.locationText}>{event.location}</Text>
        </View>
        <Text style={styles.description}>{event.description}</Text>
  
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre de participants :</Text>
          <View style={styles.participantsContainer}>
            <TouchableOpacity
              style={[
                styles.counterButton,
                parseInt(participants) <= 1 && styles.disabledButton,
              ]}
              disabled={parseInt(participants) <= 1}
              onPress={() => setParticipants(prev => Math.max(1, prev - 1))}>
              <Text style={styles.counterButtonText}>-</Text>
            </TouchableOpacity>
            <Text
              textAlign='center'
              style={{ marginHorizontal: 50, fontSize: 22 }}>
              {participants}
            </Text>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setParticipants(prev => prev + 1)}>
              <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
  
        <View style={styles.formGroup}>
          <Text style={styles.label}>Informations supplémentaires :</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Avez-vous des demandes spéciales ou des commentaires ?"
            placeholderTextColor='#999'
            value={additionalInfo}
            onChangeText={text => setAdditionalInfo(text)}
            multiline
            numberOfLines={4}
            textAlign='left'
            textAlignVertical='top'
          />
        </View>
  
        <TouchableOpacity
          style={[styles.button, isBookingDisabled && styles.disabledButton]}
          onPress={handleBooking}
          disabled={isBookingDisabled}>
          {isLoading ? (
            <ActivityIndicator color='#fff' />
          ) : (
            <Text style={styles.buttonText}>Confirmer la réservation</Text>
          )}
        </TouchableOpacity>
      </View>
  
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={{ backgroundColor: "#4CAF50" }} // Couleur verte pour succès
        action={{
          label: "Fermer",
          onPress: () => setSnackbarVisible(false),
        }}>
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
  );
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
    padding: 8,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
  },
  dateChip: {
    position: "absolute",
    bottom: 35,
    right: 20,
    backgroundColor: "rgba(255,83,51,0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  dateChipText: {
    color: "#fff",
    marginRight: 6,
    fontWeight: "600",
  },
  contentContainer: {
    padding: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: -30,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "right",
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  locationText: {
    color: "#666",
    marginRight: 6,
    fontSize: 15,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    textAlign: "right",
    lineHeight: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    textAlign: "right",
    fontWeight: "600",
  },
  participantsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 8,
    width: "90%",
    margin: "auto",
  },
  counterButton: {
    backgroundColor: "#FF5733",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  counterButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  participantsInput: {
    width: 60,
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#f5f5f5",
  },
  textArea: {
    textAlign: "right",
  },
  button: {
    backgroundColor: "#FF5733",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    disabledButton: {
      opacity: 0.5,
    },
  },
});
