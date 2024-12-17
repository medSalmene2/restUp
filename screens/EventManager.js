import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EventCard from "../components/EventCards";
import { fetchUserBookedEvents } from "../firestore/events/Find"; // Import your fetch function
import { useAuth } from "../firestore/auth/AuthContext";
const EventSection = ({ title, events, iconName, isLoading }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Icon name={iconName} size={24} color='red' />
    </View>
    {isLoading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='red' />
      </View>
    ) : events.length > 0 ? (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ direction: "ltr", alignSelf: "flex-start" }}
        directionalLockEnabled>
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </ScrollView>
    ) : (
      <EmptyState title={title} />
    )}
  </View>
);

const EmptyState = ({ title }) => (
  <View style={styles.emptyStateContainer}>
    <Icon name='calendar-blank' size={64} color='#CCCCCC' />
    <Text style={styles.emptyStateText}>Vous n'avez aucun événement dans {title}</Text>
  </View>
);

const EventManager = ({ navigation }) => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [upcomingOrganizedEvents, setUpcomingOrganizedEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const userId = user?.id;
      if (!userId) {
        throw new Error("Utilisateur non authentifié");
      }

      // Récupérer les événements réservés
      const { pastEvents, upcomingEvents, upcomingOrganizedEvents } =
        await fetchUserBookedEvents(userId);

      // Mettre à jour l'état avec les données récupérées
      setUpcomingEvents(upcomingEvents);
      setPastEvents(pastEvents);
      setUpcomingOrganizedEvents(upcomingOrganizedEvents);
    } catch (err) {
      console.error("Erreur lors du chargement des événements:", err);
      setError("Erreur lors du chargement des événements");
    } finally {
      setIsLoading(false);
    }
  };

  const renderError = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>
        {error || "Une erreur est survenue lors du chargement des événements"}
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={loadEvents}>
        <Text style={styles.retryButtonText}>Essayer à nouveau</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("EventExplore")}>
          <Text style={styles.buttonText}>Explorer les événements</Text>
          <Icon name='compass-outline' size={24} color='#ffffff' />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("EventCreation")}>
          <Text style={styles.buttonText}>Créer un événement</Text>
          <Icon name='plus-circle-outline' size={24} color='#ffffff' />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {error ? (
          renderError()
        ) : (
          <>
            <EventSection
              title='Mes événements programmés'
              events={upcomingEvents}
              iconName='calendar-clock'
              isLoading={isLoading}
            />
            <EventSection
              title='Événements organisés'
              events={upcomingOrganizedEvents}
              iconName='calendar-star'
              isLoading={isLoading}
            />
            <EventSection
              title='Historique des événements'
              events={pastEvents}
              iconName='history'
              isLoading={isLoading}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingVertical: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
    width: "45%",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    marginRight: 8,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Arial",
  },
  scrollContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    // direction: "rtl",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Arial",
    marginHorizontal: 8,
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginHorizontal: 16,
  },
  emptyStateText: {
    marginTop: 16,
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  errorContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Arial",
  },
  retryButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  retryButtonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Arial",
  },
});

export default EventManager;
