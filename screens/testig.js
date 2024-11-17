import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  I18nManager,
} from "react-native";
import { TextInput, Button, Text, Chip, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const EventInfoScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [guestCount, setGuestCount] = useState(1);
  const theme = useTheme();

  const categories = ["رياضة", "ثقافة", "تكنولوجيا", "فن", "تعليم"];

  const toggleCategory = category => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else if (selectedCategories.length < 3) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const incrementGuest = () => {
    setGuestCount(prev => prev + 1);
  };

  const decrementGuest = () => {
    if (guestCount > 1) {
      setGuestCount(prev => prev - 1);
    }
  };

  I18nManager.forceRTL(true);

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
        <ScrollView horizontal contentContainerStyle={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <Chip
              key={index}
              style={styles.categoryChip}
              onPress={() => toggleCategory(category)}
              selected={selectedCategories.includes(category)}
              selectedColor='green'
              textStyle={{
                color: "black",
                fontSize:16
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
          style={[styles.input, styles.smallInput]}
          multiline
          numberOfLines={2}
          right={<TextInput.Icon icon='pencil-box-multiple-outline' />}
          {...rtlTextInputProps}
        />

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
      </ScrollView>

      {/* Submit Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>حفظ المعلومات</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    paddingBottom: 100, // Add extra padding to ensure content doesn't get hidden behind the button
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
    minHeight: 120,
  },
  smallInput: {
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
  section: {
    marginTop: 40,
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

export default EventInfoScreen;