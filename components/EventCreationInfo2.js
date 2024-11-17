import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
} from "react-native";
import { Icon } from "react-native-paper";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { fetchUsers } from "../firestore/events/Publish";

const EventCreationInfo2 = ({
  location,
  setLocation,
  selectedDate,
  setSelectedDate,
  navigation,
}) => {
  // Set Arabic as the default locale
  LocaleConfig.defaultLocale = "ar";

  return (
    <View style={styles.container}>
      {/* Location Selector */}
      <View style={styles.section}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EventLocation");
          }}>
          <View style={styles.locationButton}>
            <Icon source={"chevron-left"} size={25} />
            <Text style={styles.label}>الموقع</Text>
          </View>
          <Text style={styles.value}>{location}</Text>
        </TouchableOpacity>
      </View>

      {/* Date Picker */}
      <View style={styles.section}>
        <Text style={styles.label}>التاريخ</Text>
        <Text style={styles.subLabel}>اختر تاريخًا للحدث</Text>
        <Calendar
          style={styles.calendar}
          firstDay={1}
          onDayPress={day => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: {
              selected: true,
              marked: true,
              selectedColor: "red",
            },
          }}
          theme={{
            arrowColor: "black",
            todayTextColor: "red",
            selectedDayBackgroundColor: "red",
            textDayFontFamily: "Arial",
            textMonthFontFamily: "Arial",
            textDayHeaderFontFamily: "Arial",
          }}
          renderArrow={direction =>
            direction === "right" ? (
              <Icon source={"chevron-right"} size={25} />
            ) : (
              <Icon source={"chevron-left"} size={25} />
            )
          }
        />
      </View>
      {/* Submit Button */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={async () => {
          console.log("pressed");
          await fetchUsers();
        }}>
        <Text style={styles.saveButtonText}>حفظ المعلومات</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  section: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 2,
  },
  locationButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "right", // Aligns Arabic text to the right
  },
  value: {
    fontSize: 14,
    color: "#666",
    textAlign: "right", // Aligns Arabic text to the right
  },
  subLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
    textAlign: "right", // Aligns Arabic text to the right
  },
  calendar: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 5,
  },
  saveButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    bottom: "5%", // Position 5% from bottom
    left: "3%",
    right: "3%",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
LocaleConfig.locales["ar"] = {
  monthNames: [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ],
  monthNamesShort: [
    "ينا.",
    "فبر.",
    "مار.",
    "أبر.",
    "ماي.",
    "يون.",
    "يول.",
    "أغس.",
    "سبت.",
    "أكت.",
    "نوف.",
    "ديس.",
  ],
  dayNames: [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ],
  dayNamesShort: ["أحد", "إثن", "ثلاث", "أربع", "خميس", "جمعه", "سبت"],
  today: "اليوم",
};
export default EventCreationInfo2;
