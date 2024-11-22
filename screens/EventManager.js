import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EventCard from "../components/EventCards";

const EventSection = ({ title, events, iconName }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Icon name={iconName} size={24} color='red' />
    </View>
    {events.length > 0 ? (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {events.map((event, index) => (
          <EventCard
            key={index}
            imageUrl={event.imageUrl}
            title={event.title}
            date={event.date}
          />
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
    <Text style={styles.emptyStateText}>ليس لذيك اي فعالية في {title}</Text>
  </View>
);

const EventManager = ({ navigation }) => {
  const [scheduledEvents, setScheduledEvents] = useState([]);
  const [organizedEvents, setOrganiezedEvents] = useState([]);
  const [eventHistory, setEventHistory] = useState([]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("EventExplore");
          }}>
          <Text style={styles.buttonText}>استكشف الفعاليات</Text>
          <Icon name='compass-outline' size={24} color='#ffffff' />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("EventCreation");
          }}>
          <Text style={styles.buttonText}>إنشاء فعالية</Text>
          <Icon name='plus-circle-outline' size={24} color='#ffffff' />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <EventSection
          title='فعالياتي المجدولة'
          events={scheduledEvents}
          iconName='calendar-clock'
        />
        <EventSection
          title='الفعاليات المنظمة'
          events={organizedEvents}
          iconName='calendar-star'
        />
        <EventSection
          title='سجل الفعاليات'
          events={eventHistory}
          iconName='history'
        />
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
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    padding: 20,
  },
  button: {
    flexDirection: "row-reverse",
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
    direction: "rtl",
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
});

export default EventManager;
