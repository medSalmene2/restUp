import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  // TextInput,
  Switch,
  StyleSheet,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TextInput } from "react-native-paper";

// Configure calendar for Arabic locale
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
  dayNames: [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ],
  dayNamesShort: ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
};
LocaleConfig.defaultLocale = "ar";

export default FilterModal = ({
  visible,
  onClose,
  onApply,
  initialFilters = {
    dateRange: { start: null, end: null },
    guestRange: [0, 50],
    nearbyEvents: false,
    radius: "5",
  },
}) => {
  const [filters, setFilters] = useState(initialFilters);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectingDateFor, setSelectingDateFor] = useState(null); // 'start' or 'end'

  const formatDate = date => {
    if (!date) return "غير محدد";
    date = new Date(date);
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear().toString();
    return `${d}/${m}/${y}`;
  };

  const handleDateSelect = date => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [selectingDateFor]: date.dateString,
      },
    }));
    setShowCalendar(false);
  };

  const renderCalendarModal = () => (
    <Modal
      visible={showCalendar}
      transparent
      animationType='slide'
      onRequestClose={() => setShowCalendar(false)}>
      <View style={styless.calendarModalContainer}>
        <View style={styless.calendarModalContent}>
          <View style={styless.calendarHeader}>
            <Text style={styless.calendarTitle}>
              {selectingDateFor === "start"
                ? "اختر تاريخ البداية"
                : "اختر تاريخ النهاية"}
            </Text>
            <TouchableOpacity onPress={() => setShowCalendar(false)}>
              <Ionicons name='close' size={24} color='#333' />
            </TouchableOpacity>
          </View>
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={{
              [filters.dateRange[selectingDateFor]]: {
                selected: true,
                selectedColor: "red",
              },
            }}
            minDate={
              selectingDateFor === "end" ? filters.dateRange.start : undefined
            }
            maxDate={
              selectingDateFor === "start" ? filters.dateRange.end : undefined
            }
            enableSwipeMonths
            theme={{
              todayTextColor: "red",
              selectedDayBackgroundColor: "red",
              arrowColor: "red",
            }}
          />
        </View>
      </View>
    </Modal>
  );

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <Modal
      animationType='slide'
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <View style={styless.modalContainer}>
        <View style={styless.modalContent}>
          <View style={styless.modalHeader}>
            <Text style={styless.modalTitle}>فلترة الأحداث</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name='close' size={24} color='#333' />
            </TouchableOpacity>
          </View>

          <ScrollView style={styless.filterOptionsContainer}>
            {/* Date Range Section */}
            <View style={styless.filterSection}>
              <Text style={styless.filterSectionTitle}>نطاق التاريخ</Text>
              <View style={styless.datePickerContainer}>
                <TouchableOpacity
                  style={styless.dateButton}
                  onPress={() => {
                    setSelectingDateFor("start");
                    setShowCalendar(true);
                  }}>
                  <Text style={styless.dateLabel}>تاريخ البداية</Text>
                  <Text style={styless.dateValue}>
                    {formatDate(filters.dateRange.start)}
                  </Text>
                  <MaterialIcons name='calendar-today' size={20} color='#666' />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styless.dateButton}
                  onPress={() => {
                    setSelectingDateFor("end");
                    setShowCalendar(true);
                  }}>
                  <Text style={styless.dateLabel}>تاريخ النهاية</Text>
                  <Text style={styless.dateValue}>
                    {formatDate(filters.dateRange.end)}
                  </Text>
                  <MaterialIcons name='calendar-today' size={20} color='#666' />
                </TouchableOpacity>
              </View>
            </View>

            {/* Guests Range Section */}
            <View style={styless.filterSection}>
              <Text style={styless.filterSectionTitle}>عدد الضيوف</Text>
              <Text style={styless.rangeText}>
                من {filters.guestRange[0]} إلى {filters.guestRange[1]} ضيف
              </Text>
              <View style={styless.sliderContainer}>
                <MultiSlider
                  values={filters.guestRange}
                  min={0}
                  max={50}
                  step={2}
                  sliderLength={280}
                  selectedStyle={{ backgroundColor: "red" }}
                  unselectedStyle={{ backgroundColor: "#DEDEDE" }}
                  containerStyle={{ height: 40 }}
                  markerStyle={{
                    height: 24,
                    width: 24,
                    backgroundColor: "red",
                    borderWidth: 2,
                    borderColor: "white",
                  }}
                  onValuesChange={values =>
                    setFilters(prev => ({ ...prev, guestRange: values }))
                  }
                />
              </View>
            </View>

            {/* Nearby Events Section */}
            <View style={styless.filterSection}>
              <View style={styless.nearbyToggleContainer}>
                <Text style={styless.filterSectionTitle}>الأحداث القريبة</Text>
                <Switch
                  trackColor={{ false: "#DEDEDE", true: "#ffb3b3" }}
                  thumbColor={filters.nearbyEvents ? "red" : "#f4f3f4"}
                  onValueChange={() =>
                    setFilters(prev => ({
                      ...prev,
                      nearbyEvents: !prev.nearbyEvents,
                    }))
                  }
                  value={filters.nearbyEvents}
                />
              </View>

              {filters.nearbyEvents && (
                <View style={styless.radiusInputContainer}>
                  <TextInput
                    style={styless.radiusInput}
                    keyboardType='numeric'
                    value={filters.radius}
                    onChangeText={value =>
                      setFilters(prev => ({ ...prev, radius: value }))
                    }
                    placeholder='1'
                    maxLength={2}
                  />
                  <Text style={styless.radiusUnit}>كيلومتر</Text>
                </View>
              )}
            </View>
          </ScrollView>

          <View style={styless.modalButtonContainer}>
            <TouchableOpacity
              style={styless.resetButton}
              onPress={resetFilters}>
              <Text style={styless.resetButtonText}>إعادة تعيين</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styless.applyFilterButton}
              onPress={() => onApply(filters)}>
              <Text style={styless.applyFilterButtonText}>تطبيق</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {renderCalendarModal()}
    </Modal>
  );
};

const styless = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  filterOptionsContainer: {
    padding: 16,
  },
  filterSection: {
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  datePickerContainer: {
    gap: 12,
  },
  dateButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  dateLabel: {
    fontSize: 14,
    color: "#666",
  },
  dateValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  sliderContainer: {
    alignItems: "center",
    marginTop: 20,
    direction: "ltr",
  },
  rangeText: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  nearbyToggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  radiusInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    padding: 5,
  },
  radiusInput: {
    width: "50%",
    height: 40,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    textAlign: "center",
    backgroundColor: "#FFFFFF",
  },
  radiusUnit: {
    fontSize: 14,
    color: "#666",
    marginRight: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  resetButton: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  applyFilterButton: {
    flex: 1,
    backgroundColor: "red",
    paddingVertical: 12,
    marginLeft: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  applyFilterButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  calendarModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
  },
  calendarModalContent: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 12,
    padding: 16,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
