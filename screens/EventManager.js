import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Icon } from "react-native-paper";
import { TouchableOpacity } from "react-native";

const EventManager = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchableContainer}>
        <View style={styles.textIconContainer}>
          <Text style={styles.titleText}>أحداثك المجدولة</Text>
          <Icon source={"calendar"} size={20} style={styles.icon} />
        </View>
        <Icon source={"chevron-left"} size={25} />
      </TouchableOpacity>
    </View>
  );
};
export default EventManager;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F5F7F8",
  },
  touchableContainer: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row-reverse", // RTL alignment
    justifyContent: "space-between",
    alignItems: "center",
  },
  textIconContainer: {
    flexDirection: "row-reverse", // Align text and icon in RTL
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    marginLeft: 10, // Adjust space between text and icon
  },
  icon: {
    marginLeft: 5, // Fine-tune spacing
  },
});
