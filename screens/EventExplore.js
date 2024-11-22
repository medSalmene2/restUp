import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CategoryTabs from "../components/CategoryTabs";
import EventCard from "../components/EventCards";
import { fetchEvents } from "../firestore/events/Find";
import NoEventsView from "../components/NoEventsView";
export default function EventsScreen() {
  const [selectedCategs, setSelectedCategs] = useState(["الجميع"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [events, setEvents] = useState([]);

  // Add loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEvents = async () => {
      // Reset state before fetching
      setIsLoading(true);
      setError(null);

      try {
        const categs = selectedCategs.includes("الجميع")
          ? null
          : selectedCategs;
        const eventsData = await fetchEvents(categs);
        setEvents(eventsData);
      } catch (err) {
        // Handle any errors during fetching
        setError(err);
        console.error("Failed to fetch events:", err);
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
          <ActivityIndicator size='large' color='red' />
          <Text style={styles.loadingText}>جارٍ تحميل الأحداث...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Ionicons name='warning' size={50} color='red' />
          <Text style={styles.errorText}>حدث خطأ أثناء تحميل الأحداث</Text>
          <Text style={styles.errorSubtext}>
            يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              // Reset states and retry fetching
              setSelectedCategs(["الجميع"]);
              setSearchQuery("");
            }}>
            <Text style={styles.retryButtonText}>إعادة المحاولة</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <ScrollView style={styles.eventsContainer}>
        <View style={styles.eventsGrid}>
          {events.length > 0 ? (
            events.map((event,i) => (
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
        <Text style={styles.title}>اكتشف الأحداث المثيرة{"\n"}بالقرب منك</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons
          name='search-outline'
          size={20}
          color='red'
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder='البحث عن الأحداث حسب الاسم أو الموقع'
          placeholderTextColor='#999'
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          onPress={toggleFilterModal}
          style={styles.filterIconContainer}>
          <MaterialIcons name='tune' size={24} color='red' />
        </TouchableOpacity>
      </View>

      <CategoryTabs
        selectedCategs={selectedCategs}
        setSelectedCategs={setSelectedCategs}
      />

      {renderContent()}

      {/* Filter Modal */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={toggleFilterModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>فلترة الأحداث</Text>
              <TouchableOpacity onPress={toggleFilterModal}>
                <Ionicons name='close' size={24} color='black' />
              </TouchableOpacity>
            </View>

            {/* Filter options */}
            <View style={styles.filterOptionsContainer}>
              <Text>خيارات التصفية</Text>
              {/* Add more detailed filter controls here */}
            </View>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.applyFilterButton}
                onPress={toggleFilterModal}>
                <Text style={styles.applyFilterButtonText}>تطبيق الفلتر</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

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
    padding: 16,
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
