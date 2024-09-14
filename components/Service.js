import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";

export default function Service({ image, bgColor, text, textColor }) {
  return (
    <View style={styles.container(bgColor)}>
      {/* Avatar positioned absolutely */}
      <Avatar.Image style={styles.avatar} size={40} source={image} />
      <View style={styles.content}>
        <Text style={styles.text(textColor)}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: bgColor => ({
    width: "85%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: bgColor,
    borderRadius: 10,
    margin: 5,
  }),
  avatar: {
    position: "absolute", // Allows overlapping
    left: -20, // Adjust to overlap the border
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopStartRadius: 50,
    borderBottomStartRadius: 50,
    paddingVertical: 15,
    // Add space to avoid the avatar overlapping the text
  },
  text: color => ({
    textAlign: "center",
    fontSize: 16,
    color: color,
  }),
});
