import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CategoryTabs from "../components/CategoryTabs";
import EventCard from "../components/EventCards";
import { fetchEvents } from "../firestore/events/Find";
import NoEventsView from "../components/NoEventsView";
import { useAuth } from "../firestore/auth/AuthContext";
import FilterModal from "../components/FilterModal";
export default function EventsScreen() {
  const [selectedCategs, setSelectedCategs] = useState(["Tous"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const getEvents = async () => {
      // Reset state before fetching
      setIsLoading(true);
      setError(null);

      try {
        const categs = selectedCategs.includes("Tous") ? null : selectedCategs;
        const eventsData = await fetchEvents(user.id, categs);
        setEvents(eventsData);
      } catch (err) {
        // Handle any errors during fetching
        setError(err);
        console.error("Échec de la récupération des événements :", err);
      } finally {
        // Ensure loading state is set to false
        setIsLoading(false);
      }
    };

    getEvents();
  }, [selectedCategs, searchQuery]);

  const toggleFilterModal = () => {
    setIsFilterModalVisible(!isFilterModalVisible);
  };

  // Render loading state
  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="red" />
          <Text style={styles.loadingText}>Chargement des événements...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Ionicons name="warning" size={50} color="red" />
          <Text style={styles.errorText}>
            Une erreur est survenue lors du chargement des événements
          </Text>
          <Text style={styles.errorSubtext}>
            Veuillez vérifier votre connexion Internet et réessayer
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              // Réinitialiser les états et réessayer la récupération
              setSelectedCategs(["Tous"]);
              setSearchQuery("");
            }}
          >
            <Text style={styles.retryButtonText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <ScrollView style={styles.eventsContainer}>
        <View style={styles.eventsGrid}>
          {events.length > 0 ? (
            events.map((event, i) => (
              <View key={i} style={styles.eventCardWrapper}>
                <EventCard event={event} />
              </View>
            ))
          ) : (
            <NoEventsView />
          )}
        </View>
      </ScrollView>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Découvrez des événements passionnants près de chez vous
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="red"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher des événements par nom ou emplacement"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          onPress={toggleFilterModal}
          style={styles.filterIconContainer}
        >
          <MaterialIcons name="tune" size={24} color="red" />
        </TouchableOpacity>
      </View>

      <CategoryTabs
        selectedCategs={selectedCategs}
        setSelectedCategs={setSelectedCategs}
      />

      {renderContent()}

      {/* Filter Modal */}
      <FilterModal
        onClose={() => setIsFilterModalVisible(false)}
        visible={isFilterModalVisible}
        onApply={() => setIsFilterModalVisible(false)}
      />
    </SafeAreaView>
  );
}

// export default FilterModal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    direction: "rtl",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchIcon: {
    marginHorizontal: 10,
  },
  eventsContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  eventsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Space between cards
    paddingHorizontal: 8,
  },
  eventCardWrapper: {
    width: "48%", // Two cards per row
    marginBottom: 16, // Space between rows
  },

  eventCard: {
    flexBasis: "48%", // Each card takes 48% of the width
    marginBottom: 16, // Spacing between rows
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff", // Ensure a clear background for each card
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // For Android shadow
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: "#666",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  filterOptionsContainer: {
    marginBottom: 20,
  },
  modalButtonContainer: {
    alignItems: "center",
  },
  applyFilterButton: {
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  applyFilterButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Filter Icon Container
  filterIconContainer: {
    marginLeft: 10,
  },

  // Update search container to accommodate new layout
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    margin: 16,
    borderRadius: 25,
    padding: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    textAlign: "right",
  },
  // New loading and error styles
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  errorSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
