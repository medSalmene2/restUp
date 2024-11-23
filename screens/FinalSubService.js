import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Contact from "../components/Contact";

const FinalSubService = ({ route, navigation }) => {
  const { description, image, contacts } = route.params;

  return (
    <View style={styles.container}>
      {/* Display the subservice image */}
      <Image source={image} style={{ width: "95%", height: "25%", alignSelf: "center" }} />

      {/* Display the subservice description */}
      <View style={{ margin: 10 }}>
        <Text style={{ textAlign: "center" }}>{description}</Text>
      </View>

      {/* Render contacts dynamically */}
      <ScrollView>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <Contact
              key={contact.id}
              name={contact.name}
              job={contact.job}
              stars={contact.stars}
              image={contact.image}
              fee={contact.fee}
              onSchedulePress={() => navigation.navigate("Schedule")}
            />
          ))
        ) : (
          <Text style={styles.noContactsText}>لا يوجد جهات اتصال لهذه الخدمة</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default FinalSubService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f7fa",
    padding: 16,
  },
  noContactsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
});
