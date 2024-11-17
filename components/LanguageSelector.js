import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLanguage } from "../hooks/useLanguage";

export function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          currentLanguage === "ar" ? styles.active : styles.inactive,
        ]}
        onPress={() => setLanguage("ar")}
      >
        <Text style={styles.text}>ع</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          currentLanguage === "fr" ? styles.active : styles.inactive,
        ]}
        onPress={() => setLanguage("fr")}
      >
        <Text style={styles.text}>FR</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          currentLanguage === "en" ? styles.active : styles.inactive,
        ]}
        onPress={() => setLanguage("en")}
      >
        <Text style={styles.text}>EN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 8,
    justifyContent: "flex-end",
  },
  button: {
    marginHorizontal: 4,
    padding: 8,
    borderRadius: 16,
  },
  active: {
    backgroundColor: "#3b82f6", // Blue color
  },
  inactive: {
    backgroundColor: "#d1d5db", // Gray color
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});
