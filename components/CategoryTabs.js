import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import categories from "./EventCategoriesSet";

export default function CategoryTabs({ selectedCategs, setSelectedCategs }) {
  // Handler to toggle category selection
  const toggleCategory = category => {
    setSelectedCategs(prevCategs => {
      // If "الجميع" (All) is selected, reset to only that category
      if (category === "Tous") {
        return [category];
      }

      // If "الجميع" is currently selected, start a new selection with the clicked category
      if (prevCategs.includes("Tous")) {
        return [category];
      }

      // If category is already selected, remove it
      if (prevCategs.includes(category)) {
        const newCategs = prevCategs.filter(cat => cat !== category);
        // If no categories left, select "الجميع"
        return newCategs.length === 0 ? ["Tous"] : newCategs;
      }

      // Add the category to the selection
      return [...prevCategs, category];
    });
  };

  // Check if a category is selected
  const isCategorySelected = category => {
    return selectedCategs.includes(category);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.scrollContent}>
      {categories.map(category => (
        <TouchableOpacity
          key={category.name}
          onPress={() => toggleCategory(category.name)}
          style={[
            styles.tab,
            isCategorySelected(category.name) && styles.selectedTab,
          ]}>
          <Text
            style={[
              styles.tabText,
              isCategorySelected(category.name) && styles.selectedTabText,
            ]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 26,
    maxHeight: 50,
    direction: "ltr",
  },
  scrollContent: {
    justifyContent: "flex-start",
    paddingHorizontal: 8,
  },
  tab: {
    paddingHorizontal: 20,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedTab: {
    backgroundColor: "red",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  selectedTabText: {
    color: "#fff",
  },
});
