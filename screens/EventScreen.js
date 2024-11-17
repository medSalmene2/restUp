import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CategoryTabs from '../components/CategoryTabs';
import EventCard from '../components/EventCards';


export default function EventsScreen() {
  const categories = ['All', 'Music', 'Workshops', 'Conference'];
  const events = [
    {
      id: 1,
      title: 'Food Tasting Event',
      image: require("../assets/foodTasting.jpg"),
    },
    {
      id: 2,
      title: 'Art Show',
      image: require("../assets/Art.jpg"),
    },
    {
      id: 3,
      title: 'Fitness Class',
      image: require("../assets/fitness.jpg"),
    },
    {
      id: 4,
      title: 'Music Class',
      image: require("../assets/music.jpg"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover exciting events{'\n'}near you</Text>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for events by name, location, or category"
          placeholderTextColor="#999"
        />
      </View>

      <CategoryTabs categories={categories} />

      <ScrollView style={styles.eventsContainer}>
        <View style={styles.eventsGrid}>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <View style={styles.navItem}>
          <Ionicons name="home" size={24} color="#000" />
          <Text style={styles.navText}>My Events</Text>
        </View>
        <View style={styles.navItem}>
          <Ionicons name="filter" size={24} color="#666" />
          <Text style={styles.navText}>Filter</Text>
        </View>
        <View style={styles.navItem}>
          <Ionicons name="ticket-outline" size={24} color="#666" />
          <Text style={styles.navText}>Tickets</Text>
        </View>
        <View style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#666" />
          <Text style={styles.navText}>Profile</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    margin: 16,
    borderRadius: 25,
    padding: 10,
  },
  searchIcon: {
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  eventsContainer: {
    flex: 1,
  },
  eventsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
});