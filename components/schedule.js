import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  I18nManager,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";

// Enable RTL layout
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function AppointmentScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const slots = {
    morning: ["10:10 ص", "10:30 ص", "10:50 ص", "11:20 ص", "11:40 ص"],
    afternoon: ["02:00 م", "02:20 م", "02:40 م"],
    evening: ["07:00 م", "07:20 م", "07:40 م", "08:00 م"],
  };

  const renderTimeSlots = (timeSlots, period) => (
    <View style={styles.slotContainer}>
      <Text style={styles.slotHeader}>{`الفترة ${period}`}</Text>
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
      <Text style={styles.header}>موعدك</Text>

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
        onDateSelected={(date) => setSelectedDate(new Date(date))}
        highlightDateNameStyle={{ color: "#fff" }}
        highlightDateNumberStyle={{ color: "#fff" }}
        calendarHeaderStyle={{ color: "#333" }}
        dateNameStyle={{ color: "#666" }}
        dateNumberStyle={{ color: "#666" }}
        iconLeft={require("../assets/left-arrow.png")} // Replace with your RTL asset if needed
        iconRight={require("../assets/right-arrow.png")}
        iconContainer={{ flex: 0.1 }}
      />

      {/* Selected Date */}
      <Text style={styles.selectedDateText}>
        {`التاريخ المختار: ${selectedDate.toLocaleDateString()}`}
      </Text>

      {/* Time Slots */}
      {renderTimeSlots(slots.morning, "الصباحية")}
      {renderTimeSlots(slots.afternoon, "المسائية")}
      {renderTimeSlots(slots.evening, "الليلية")}

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>تأكيد الموعد</Text>
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
    color: "#007BFF",
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
    textAlign: "right",
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
    textAlign: "center",
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
