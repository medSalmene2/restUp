import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import Service from "../components/Service";

const SubServicesList = ({ route }) => {
  const { serviceTitle, subServices } = route.params;
  console.log(route.params);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>{serviceTitle}</Text>
        {subServices.map((service, index) => (
          <TouchableOpacity style={styles.optionButton} key={index}>
            <Service
              bgColor={service.color}
              text={service.serviceTitle}
              textColor={"black"}
            />
          </TouchableOpacity>
        ))}

        <View style={styles.requestContainer}>
          <Text style={styles.requestText}>يمكنك الطلب</Text>
          <TouchableOpacity style={styles.micButton}>
            <Text style={styles.micText}>🎤</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SubServicesList;

const styles = StyleSheet.create({
  optionButton: {
    backgroundColor: "#64b5f6",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#e0f7fa",
    padding: 16,
  },
  requestContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  requestText: {
    fontSize: 18,
    color: "#0288d1",
  },
  micButton: {
    backgroundColor: "#ff5252",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
  micText: {
    fontSize: 24,
    color: "#fff",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0288d1",
    textAlign: "center",
    marginBottom: 16,
  },
});
