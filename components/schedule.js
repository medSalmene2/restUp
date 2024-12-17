import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { Ionicons } from "@expo/vector-icons";

export default function AppointmentScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced time slots with availability status and duration
  const slots = {
    morning: [
      { time: "10:10 am", available: true, duration: "30 min" },
      { time: "10:30 am", available: false, duration: "30 min" },
      { time: "10:50 am", available: true, duration: "30 min" },
      { time: "11:20 am", available: true, duration: "30 min" },
      { time: "11:40 am", available: true, duration: "30 min" },
    ],
    afternoon: [
      { time: "02:00 pm", available: true, duration: "30 min" },
      { time: "02:20 pm", available: true, duration: "30 min" },
      { time: "02:40 pm", available: true, duration: "30 min" },
      { time: "03:00 pm", available: false, duration: "30 min" },
      { time: "03:20 pm", available: true, duration: "30 min" },
    ],
    evening: [
      { time: "07:00 pm", available: true, duration: "30 min" },
      { time: "07:20 pm", available: true, duration: "30 min" },
      { time: "07:40 pm", available: false, duration: "30 min" },
      { time: "08:00 pm", available: true, duration: "30 min" },
      { time: "08:20 pm", available: true, duration: "30 min" },
    ],
  };

  const getAvailableSlots = period =>
    slots[period].filter(slot => slot.available).length;

  const handleConfirmAppointment = useCallback(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "Appointment Confirmed!",
        `Your appointment has been scheduled for ${new Date(
          selectedDate
        ).toLocaleDateString("ar", {
          month: "short",
          day: "numeric",
        })} at ${selectedTime}`,
        [
          {
            text: "OK",
            onPress: () => {
              setSelectedTime(null);
              setSelectedPeriod(null);
            },
          },
        ]
      );
    }, 1500);
  }, [selectedDate, selectedTime]);

  const renderTimeSlot = ({ item, period }) => (
    <TouchableOpacity
      style={[
        styles.slotButton,
        !item.available && styles.disabledSlotButton,
        selectedTime === item.time && styles.selectedSlotButton,
      ]}
      disabled={!item.available}
      onPress={() => {
        setSelectedTime(item.time);
        setSelectedPeriod(period);
      }}>
      <Text
        style={[
          styles.slotText,
          !item.available && styles.disabledSlotText,
          selectedTime === item.time && styles.selectedSlotText,
        ]}>
        {item.time}
      </Text>
      <Text
        style={[
          styles.durationText,
          !item.available && styles.disabledSlotText,
          selectedTime === item.time && styles.selectedSlotText,
        ]}>
        {item.duration}
      </Text>
      {!item.available && <Text style={styles.unavailableText}>تم حجزه</Text>}
    </TouchableOpacity>
  );

  const renderTimePeriod = (period, slotsData) => (
    <View style={styles.periodContainer}>
      <View style={styles.periodHeaderContainer}>
        <View style={styles.periodHeaderLeft}>
          <Text style={styles.periodHeader}>
            {period === "morning"
              ? "صباح"
              : period === "afternoon"
              ? "بعد الظهر"
              : "مساء"}
          </Text>
          <Ionicons
            name={
              period === "morning"
                ? "sunny-outline"
                : period === "afternoon"
                ? "partly-sunny-outline"
                : "moon-outline"
            }
            size={20}
            color='#1A1A1A'
          />
        </View>
        <Text style={styles.slotsCount}>
          {getAvailableSlots(period.toLowerCase())} حجوزات متاحة
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.timeSlotsList}
        style={{ direction: "ltr" }}>
        {[...slotsData].reverse().map(item => (
          <View key={item.time}>{renderTimeSlot({ item, period })}</View>
        ))}
      </ScrollView>
    </View>
  );

  const isAppointmentSelected = selectedDate && selectedTime;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header with Back Button */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.headerTitle}>حجز موعد</Text>
            <Text style={styles.headerSubtitle}>
              حدد التاريخ والوقت المفضل لديك
            </Text>
          </View>
        </View>

        {/* Calendar Strip */}
        <View style={styles.calendarContainer}>
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
            onDateSelected={date => setSelectedDate(date)}
            highlightDateNameStyle={styles.calendarHighlightText}
            highlightDateNumberStyle={styles.calendarHighlightNumber}
            dateNameStyle={styles.calendarDateName}
            dateNumberStyle={styles.calendarDateNumber}
            iconContainer={styles.calendarIconContainer}
            calendarHeaderStyle={styles.calendarHeader}
            minDate={new Date()}
            maxDate={new Date().setDate(new Date().getDate() + 30)}
          />
        </View>

        {/* Selected Date with Icon */}
        <View style={styles.selectedDateContainer}>
          <View style={styles.selectedDateRow}>
            <Text style={styles.selectedDateLabel}>التاريخ المحدد</Text>

            <Ionicons name='calendar-outline' size={20} color='#007BFF' />
          </View>
          <Text style={styles.selectedDateText}>
            {new Date(selectedDate).toLocaleDateString("ar", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>

        {/* Time Slots */}
        <View style={styles.timeSlotsContainer}>
          <Text style={styles.timeSlotsHeader}>الفترات الزمنية المتاحة</Text>
          {renderTimePeriod("morning", slots.morning)}
          {renderTimePeriod("afternoon", slots.afternoon)}
          {renderTimePeriod("Evening", slots.evening)}
        </View>

        {/* Selected Time Summary */}
        {selectedTime && (
          <View style={styles.summaryContainer}>
            <View style={styles.summaryIconRow}>
              <Ionicons name='time-outline' size={20} color='#007BFF' />
              <Text style={styles.summaryLabel}>اختيارك</Text>
            </View>
            <Text style={styles.summaryText}>
              {`${new Date(selectedDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })} at ${selectedTime} (${selectedPeriod})`}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            !isAppointmentSelected && styles.confirmButtonDisabled,
          ]}
          disabled={!isAppointmentSelected || isLoading}
          onPress={handleConfirmAppointment}>
          {isLoading ? (
            <ActivityIndicator color='#FFFFFF' />
          ) : (
            <Text style={styles.confirmButtonText}>
              {isAppointmentSelected
                ? "Confirm Appointment"
                : "Select Date & Time"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    direction: "rtl",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666666",
  },

  selectedDateContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  selectedDateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  selectedDateLabel: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 8,
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },

  periodHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  slotButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginRight: 8,
    minWidth: 100,
  },
  disabledSlotButton: {
    backgroundColor: "#F5F5F5",
    borderColor: "#E0E0E0",
    borderWidth: 1,
  },
  disabledSlotText: {
    color: "#B0B0B0",
  },
  durationText: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
  },
  unavailableText: {
    fontSize: 12,
    color: "#FF3B30",
    marginTop: 4,
  },
  summaryContainer: {
    backgroundColor: "#E8F2FF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  summaryIconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
    direction: "rtl",
  },
  headerContainer: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666666",
  },
  calendarContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 10,
    marginBottom: 24,
  },
  calendarStrip: {
    height: 100,
    borderRadius: 12,
    direction: "ltr",
  },
  calendarHighlightText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  calendarHighlightNumber: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  calendarDateName: {
    color: "#666666",
    fontSize: 12,
  },
  calendarDateNumber: {
    color: "#1A1A1A",
    fontSize: 16,
    fontWeight: "600",
  },
  calendarIconContainer: {
    flex: 0.1,
  },
  calendarHeader: {
    color: "#1A1A1A",
    fontSize: 16,
    fontWeight: "600",
  },
  selectedDateContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 10,
    marginBottom: 24,
  },
  selectedDateLabel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  timeSlotsContainer: {
    marginBottom: 24,
  },
  timeSlotsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  periodContainer: {
    marginBottom: 24,
  },
  periodHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  periodHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginLeft: 10,
  },
  slotsCount: {
    fontSize: 14,
    color: "#666666",
  },
  timeSlotsList: {
    paddingRight: 16,
  },
  slotButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginRight: 8,
  },
  selectedSlotButton: {
    backgroundColor: "#007BFF",
  },
  slotText: {
    fontSize: 14,
    color: "#1A1A1A",
    fontWeight: "500",
  },
  selectedSlotText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  summaryContainer: {
    backgroundColor: "#E8F2FF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#007BFF",
    marginBottom: 4,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: "#F5F5F5",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  confirmButton: {
    paddingVertical: 16,
    backgroundColor: "#007BFF",
    borderRadius: 12,
    alignItems: "center",
  },
  confirmButtonDisabled: {
    backgroundColor: "#B0B0B0",
    shadowOpacity: 0.1,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
