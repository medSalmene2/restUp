import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  I18nManager,
  Platform,
  Alert,
} from "react-native";
import {
  TextInput,
  Text,
  Chip,
  useTheme,
  Icon,
  Switch,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const EventCreationInfo1 = ({
  navigation,
  title,
  setTitle,
  description,
  setDescription,
  notes,
  setNotes,
  selectedCategories,
  setSelectedCategories,
  guestCount,
  setGuestCount,
  isAllDay,
  setIsAllDay,
  fromTime,
  setFromTime,
  toTime,
  setToTime,
}) => {
  const theme = useTheme();
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const categories = ["رياضة", "ثقافة", "تكنولوجيا", "موسيقى", "تعليم", "طبخ","قراءة","رسم "];
  const [errors, setErrors] = useState({
    title: false,
    categories: false,
    description: false,
    time: false,
  });

  // Helper function to add minutes to a date
  const addMinutes = (date, minutes) => {
    return new Date(date.getTime() + minutes * 60000);
  };

  // Helper function to get minutes difference between two dates
  const getMinutesDifference = (date1, date2) => {
    return Math.floor((date2.getTime() - date1.getTime()) / 60000);
  };

  const toggleCategory = category => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else if (selectedCategories.length < 3) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const incrementGuest = () => {
    setGuestCount(prev => prev + 1);
    console.log("hey");
  };

  const decrementGuest = () => {
    console.log("hey");
    if (guestCount > 1) {
      setGuestCount(prev => prev - 1);
    }
  };

  const formatTime = date => {
    return date.toLocaleTimeString("en", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const onFromTimeChange = (event, selectedTime) => {
    setShowFromPicker(false);
    if (selectedTime) {
      setFromTime(selectedTime);

      // If toTime exists, check if it's still valid with new fromTime
      if (toTime) {
        const minEndTime = addMinutes(selectedTime, 30);
        if (toTime < minEndTime) {
          // Automatically adjust toTime to be 30 minutes after new fromTime
          setToTime(minEndTime);
          Alert.alert(
            "تنبيه",
            "تم تعديل وقت النهاية تلقائياً ليكون بعد 30 دقيقة من وقت البداية",
            [{ text: "حسناً" }]
          );
        }
      }

      setErrors(prev => ({ ...prev, time: false }));
    }
  };

  const onToTimeChange = (event, selectedTime) => {
    setShowToPicker(false);
    if (selectedTime && fromTime) {
      const minEndTime = addMinutes(fromTime, 30);

      if (selectedTime <= fromTime) {
        Alert.alert("خطأ", "يجب أن يكون وقت النهاية بعد وقت البداية", [
          { text: "حسناً" },
        ]);
        return;
      }

      if (selectedTime < minEndTime) {
        Alert.alert(
          "خطأ",
          "يجب أن يكون وقت النهاية بعد وقت البداية بـ 30 دقيقة على الأقل",
          [{ text: "حسناً" }]
        );
        return;
      }

      setToTime(selectedTime);
      setErrors(prev => ({ ...prev, time: false }));
    }
  };

  // Validation function
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: false,
      categories: false,
      description: false,
      time: false,
    };

    // Title validation
    if (!title || title.trim().length === 0) {
      newErrors.title = true;
      isValid = false;
    }

    // Categories validation
    if (selectedCategories.length === 0) {
      newErrors.categories = true;
      isValid = false;
    }

    // Description validation
    if (!description || description.trim().length === 0) {
      newErrors.description = true;
      isValid = false;
    }

    // Time validation (only if not all day)
    if (!isAllDay && (!fromTime || !toTime)) {
      newErrors.time = true;
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      let errorMessage = "يرجى تصحيح الأخطاء التالية:\n";
      if (newErrors.title) errorMessage += "- يجب إدخال العنوان\n";
      if (newErrors.categories)
        errorMessage += "- يجب اختيار فئة واحدة على الأقل\n";
      if (newErrors.description) errorMessage += "- يجب إدخال الوصف\n";
      if (newErrors.time) errorMessage += "- يجب تحديد وقت البداية والنهاية\n";

      Alert.alert("تنبيه", errorMessage, [{ text: "حسناً" }]);
    }

    return isValid;
  };

  // Common TextInput props for RTL support
  const rtlTextInputProps = {
    textAlign: "right",
    textAlignVertical: "center",
    writingDirection: "rtl",
    theme: {
      ...theme,
      colors: {
        ...theme.colors,
        text: "black",
      },
    },
    contentStyle: {
      textAlign: "right",
      writingDirection: "rtl",
    },
  };
  const handleNext = () => {
    if (validateForm()) {
      navigation.navigate("EventDetails");
    }
  };
  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Title Input */}
        <View style={styles.inputContainer}>
          <TextInput
            mode='outlined'
            label='العنوان'
            activeOutlineColor='red'
            value={title}
            onChangeText={setTitle}
            style={[styles.input, styles.largeInput]}
            right={<TextInput.Icon icon='format-title' />}
            {...rtlTextInputProps}
          />
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>اختر الفئة:</Text>
        <ScrollView
          horizontal
          contentContainerStyle={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <Chip
              key={index}
              style={styles.categoryChip}
              onPress={() => toggleCategory(category)}
              selected={selectedCategories.includes(category)}
              selectedColor='green'
              textStyle={{
                color: "black",
                fontSize: 16,
              }}>
              {category}
            </Chip>
          ))}
        </ScrollView>

        {/* Description */}
        <View style={styles.inputContainer}>
          <TextInput
            mode='outlined'
            label='الوصف'
            value={description}
            activeOutlineColor='red'
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            style={[styles.input, styles.descriptionInput]}
            right={<TextInput.Icon icon='text-box-plus-outline' />}
            {...rtlTextInputProps}
          />
        </View>

        {/* Notes */}
        <TextInput
          mode='outlined'
          label='ملاحظات'
          value={notes}
          activeOutlineColor='red'
          onChangeText={setNotes}
          style={styles.input}
          multiline
          numberOfLines={2}
          right={<TextInput.Icon icon='pencil-box-multiple-outline' />}
          {...rtlTextInputProps}
        />

        {/* Time Selection Section */}
        <View style={styles.timeSection}>
          <View style={styles.allDayContainer}>
            <Text style={styles.sectionTitle}>طوال اليوم</Text>
            <Switch value={isAllDay} onValueChange={setIsAllDay} color='red' />
          </View>

          {!isAllDay && (
            <View style={styles.timePickerContainer}>
              <View style={styles.timeInputContainer}>
                <Text style={styles.timeLabel}>من</Text>
                <TouchableOpacity
                  style={styles.timeButton}
                  onPress={() => setShowFromPicker(true)}>
                  <Text style={styles.timeButtonText}>
                    {formatTime(fromTime)}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.timeInputContainer}>
                <Text style={styles.timeLabel}>إلى</Text>
                <TouchableOpacity
                  style={styles.timeButton}
                  onPress={() => setShowToPicker(true)}>
                  <Text style={styles.timeButtonText}>
                    {formatTime(toTime)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {showFromPicker && (
            <DateTimePicker
              value={fromTime}
              mode='time'
              is24Hour={true}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onFromTimeChange}
            />
          )}

          {showToPicker && (
            <DateTimePicker
              value={toTime}
              mode='time'
              is24Hour={true}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onToTimeChange}
            />
          )}
        </View>

        {/* Guest Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>الضيوف</Text>
          <View style={styles.counter}>
            <TouchableOpacity
              onPress={incrementGuest}
              style={styles.counterButton}>
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
            <View style={styles.counterValueContainer}>
              <Text style={styles.counterValue}>{guestCount}</Text>
            </View>
            <TouchableOpacity
              onPress={decrementGuest}
              style={styles.counterButton}>
              <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleNext}>
          <View style={styles.buttonContent}>
            <Text style={styles.saveButtonText}>التالي</Text>
          </View>
          <Icon source={"chevron-right"} size={25} color='white' />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    textAlign: "right",
    writingDirection: "rtl",
  },
  largeInput: {
    fontSize: 18,
  },
  descriptionInput: {
    minHeight: 80,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
    textAlign: "right",
  },
  categoriesContainer: {
    flexDirection: "row-reverse",
    marginBottom: 16,
  },
  categoryChip: {
    marginHorizontal: 4,
    backgroundColor: "#f0f0f0",
  },
  selectedChip: {
    backgroundColor: "green",
  },
  timeSection: {
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    // padding: 10,
    direction: "rtl",
  },
  allDayContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
  },
  timePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  timeInputContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  timeLabel: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
    textAlign: "right",
  },
  timeButton: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
  },
  timeButtonText: {
    fontSize: 16,
    color: "#333",
  },
  section: {
    marginTop: 10,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  counterButton: {
    backgroundColor: "red",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  counterText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  counterValueContainer: {
    width: 50,
    alignItems: "center",
  },
  counterValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  buttonContent: {
    flex: 1,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default EventCreationInfo1;
