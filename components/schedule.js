import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";

export default function AppointmentScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const slots = {
    morning: ["10:10 am", "10:30 am", "10:50 am", "11:20 am", "11:40 am"],
    afternoon: ["02:00 pm", "02:20 pm", "02:40 pm"],
    evening: ["07:00 pm", "07:20 pm", "07:40 pm", "08:00 pm"],
  };

  const renderTimeSlots = (timeSlots, period) => (
    <View style={styles.slotContainer}>
      <Text style={styles.slotHeader}>{period} Slots</Text>
      <FlatList
        data={timeSlots}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.slotButton,
              selectedTime === item && styles.selectedSlotButton,
            ]}
            onPress={() => setSelectedTime(item)}
          >
            <Text
              style={[
                styles.slotText,
                selectedTime === item && styles.selectedSlotText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Appointment</Text>

      {/* Calendar Strip */}
      <CalendarStrip
        style={styles.calendarStrip}
        scrollable
        calendarAnimation={{ type: "sequence", duration: 30 }}
        daySelectionAnimation={{
          type: "background",
          duration: 200,
          highlightColor: "#007BFF",
        }}
        selectedDate={selectedDate}
        onDateSelected={(date) => setSelectedDate(date)}
        highlightDateNameStyle={{ color: "#fff" }}
        highlightDateNumberStyle={{ color: "#fff" }}
        calendarHeaderStyle={{ color: "#333" }}
        dateNameStyle={{ color: "#666" }}
        dateNumberStyle={{ color: "#666" }}
        iconLeft={require("../assets/left-arrow.png")} 
        iconRight={require("../assets/right-arrow.png")} 
        iconContainer={{ flex: 0.1 }}
      />

      {/* Selected Date */}
      <Text style={styles.selectedDateText}>
        Selected Date: {selectedDate.toDateString()}
      </Text>

      {/* Time Slots */}
      {renderTimeSlots(slots.morning, "Morning")}
      {renderTimeSlots(slots.afternoon, "Afternoon")}
      {renderTimeSlots(slots.evening, "Evening")}

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  calendarStrip: {
    height: 100,
    marginBottom: 16,
  },
  selectedDateText: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 16,
  },
  slotContainer: {
    marginTop: 16,
  },
  slotHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  slotButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginHorizontal: 4,
  },
  selectedSlotButton: {
    backgroundColor: "#007BFF",
    borderColor: "#0056b3",
  },
  slotText: {
    fontSize: 14,
    color: "#555555",
  },
  selectedSlotText: {
    color: "#FFFFFF",
  },
  confirmButton: {
    marginTop: 20,
    paddingVertical: 14,
    backgroundColor: "#007BFF",
    borderRadius: 10,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
