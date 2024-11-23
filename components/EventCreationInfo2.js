import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
  Alert,
} from "react-native";
import { Icon, Snackbar } from "react-native-paper";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { fetchUsers } from "../firestore/events/Publish";

const EventCreationInfo2 = ({
  location,
  selectedDate,
  setSelectedDate,
  navigation,
  handleSumbit,
}) => {
  // Set Arabic as the default locale
  LocaleConfig.defaultLocale = "ar";

  // State for Snackbar
  const [visible, setVisible] = useState(false);

  // Function to verify location and handle submit
  const handleSubmitWithVerification = async () => {
    if (location === "اختر مكانا للحدث") {
      Alert.alert(
        "تنبيه",
        "الرجاء إدخال الموقع قبل المتابعة",
        [
          {
            text: "حسناً",
            onPress: () => navigation.navigate("EventLocation"),
            style: "default",
          },
        ],
        { cancelable: false }
      );
      return;
    }
    if (!selectedDate) {
      Alert.alert("تنبيه", "الرجاء إدخال تاريخ قبل المتابعة", [
        {
          text: "حسناً",
          style: "default",
        },
      ]);
      return;
    }
    try {
      // Call the original submit handler
      await handleSumbit();
      // Show success message
      setVisible(true);
      // Optional: Navigate away after a delay
      setTimeout(() => {
        navigation.navigate("EventManager"); // Uncomment if needed
      }, 3000);
    } catch (error) {
      Alert.alert("خطأ", "حدث خطأ أثناء إنشاء الحدث. حاول مرة أخرى.", [
        { text: "حسناً" },
      ]);
    }
  };

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
          <Text style={[styles.value, !location && styles.placeholderText]}>
            {location || "الرجاء تحديد الموقع"}
          </Text>
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
        style={[styles.saveButton, !location && styles.saveButtonDisabled]}
        onPress={handleSubmitWithVerification}>
        <Text style={styles.saveButtonText}>حفظ المعلومات</Text>
      </TouchableOpacity>

      {/* Success Snackbar */}
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={4000}
        style={styles.snackbar}
        action={{
          label: "إغلاق",
          onPress: () => setVisible(false),
        }}>
        <View style={styles.snackbarContent}>
          <Icon source='check-circle' size={24} color='#fff' />
          <Text style={styles.snackbarText}>تم إنشاء الحدث بنجاح</Text>
        </View>
      </Snackbar>
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
    textAlign: "right",
  },
  value: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
  },
  placeholderText: {
    color: "#999",
    fontStyle: "italic",
  },
  subLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
    textAlign: "right",
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
    bottom: "5%",
    left: "3%",
    right: "3%",
  },
  saveButtonDisabled: {
    backgroundColor: "#ffcccc",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  snackbar: {
    backgroundColor: "#4CAF50", // Green color for success
    borderRadius: 8,
  },
  snackbarContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  snackbarText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
    textAlign: "right",
  },
});

// Locale configuration remains the same
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
