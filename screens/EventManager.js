import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const EventCard = ({ imageUrl, title, date }) => (
  <View style={styles.eventCard}>
    <Image source={{ uri: imageUrl }} style={styles.eventImage} />
    <Text style={styles.eventTitle}>{title}</Text>
    <Text style={styles.eventDate}>{date}</Text>
  </View>
);

const EventSection = ({ title, events, iconName }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Icon name={iconName} size={24} color='red' />
    </View>
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
  </View>
);

const EventManager = ({ navigation }) => {
  // ... rest of the component remains the same ...
  const scheduledEvents = [
    {
      imageUrl: "https://placeholder.com/300x200",
      title: "مهرجان موسيقي",
      date: "24 نوفمبر 2024",
    },
    {
      imageUrl: "https://placeholder.com/300x200",
      title: "مؤتمر تقني",
      date: "30 نوفمبر 2024",
    },
    {
      imageUrl: "https://placeholder.com/300x200",
      title: "معرض فني",
      date: "5 ديسمبر 2024",
    },
    {
      imageUrl: "https://placeholder.com/300x200",
      title: "معرض فني",
      date: "5 ديسمبر 2024",
    },
    {
      imageUrl: "https://placeholder.com/300x200",
      title: "معرض فني",
      date: "5 ديسمبر 2024",
    },
  ];

  const organizedEvents = [
    {
      imageUrl: "https://placeholder.com/300x200",
      title: "ورشة برمجة",
      date: "15 نوفمبر 2024",
    },
    {
      imageUrl: "https://placeholder.com/300x200",
      title: "نادي الكتاب",
      date: "20 نوفمبر 2024",
    },
    {
      imageUrl: "https://placeholder.com/300x200",
      title: "معرض فني",
      date: "5 ديسمبر 2024",
    },
    {
      imageUrl: "https://placeholder.com/300x200",
      title: "معرض فني",
      date: "5 ديسمبر 2024",
    },
  ];

  const eventHistory = [
    {
      imageUrl: "https://placeholder.com/300x200",
      title: "حفلة رقص",
      date: "1 نوفمبر 2024",
    },
    {
      imageUrl: "https://placeholder.com/300x200",
      title: "ليلة سينما",
      date: "5 نوفمبر 2024",
    },
    {
      imageUrl: "https://placeholder.com/300x200",
      title: "معرض فني",
      date: "5 ديسمبر 2024",
    },
    {
      imageUrl: "https://placeholder.com/300x200",
      title: "معرض فني",
      date: "5 ديسمبر 2024",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {
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
  eventCard: {
    width: 150,
    marginHorizontal: 8,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  eventImage: {
    width: "100%",
    height: 80,
    resizeMode: "cover",
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "500",
    margin: 8,
    fontFamily: "Arial",
  },
  eventDate: {
    fontSize: 14,
    color: "#666",
    marginHorizontal: 8,
    marginBottom: 8,
    fontFamily: "Arial",
  },
});

export default EventManager;
