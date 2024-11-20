import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CategoryTabs from "../components/CategoryTabs";
import EventCard from "../components/EventCards";
import { fetchEvents } from "../firestore/events/Find";
import NoEventsView from "../components/NoEventsView";

export default function EventsScreen() {
  // const events = [
  //   {
  //     id: 1,
  //     title: "Food Tasting Event",
  //     image: require("../assets/foodTasting.jpg"),
  //   },
  //   {
  //     id: 2,
  //     title: "Art Show",
  //     image: require("../assets/Art.jpg"),
  //   },
  //   {
  //     id: 3,
  //     title: "Fitness Class",
  //     image: require("../assets/fitness.jpg"),
  //   },
  //   {
  //     id: 4,
  //     title: "Music Class",
  //     image: require("../assets/music.jpg"),
  //   },
  // ];

  const [selectedCategs, setSelectedCategs] = useState(["الجميع"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const categs = selectedCategs.includes("الجميع") ? null : selectedCategs;
      const eventsData = await fetchEvents(categs);
      setEvents(eventsData);
      // console.log(JSON.stringify(events));
    };
    getEvents();
  }, [selectedCategs, searchQuery]);

  const toggleFilterModal = () => {
    setIsFilterModalVisible(!isFilterModalVisible);
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

      <ScrollView style={styles.eventsContainer}>
        <View style={styles.eventsGrid}>
          {events.length > 0 ? (
            events.map(event => (
              <View key={event.id} style={styles.eventCardWrapper}>
                <EventCard event={event} />
              </View>
            ))
          ) : (
            <NoEventsView />
          )}
        </View>
      </ScrollView>

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
});
