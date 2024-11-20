import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { I18nManager } from 'react-native';

I18nManager.forceRTL(false); // Set to false for Left-to-Right (LTR)

export default function CategoryTabs({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.scrollContent} 
    >
      {categories.map((category) => (
        
        <TouchableOpacity
          key={category}
          onPress={() => setSelectedCategory(category)}
          style={[
            styles.tab,
            selectedCategory === category && styles.selectedTab,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              selectedCategory === category && styles.selectedTabText,
            ]}
          >
            {category}
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
  },
  scrollContent: {
    justifyContent: 'flex-start', // Align tabs to the start
    paddingHorizontal: 8, // Optional spacing on both sides
  },
  tab: {
    paddingHorizontal: 20,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center', 
    alignItems: 'center', 
    
  },
  selectedTab: {
    backgroundColor: '#000',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  selectedTabText: {
    color: '#fff',
  },
});