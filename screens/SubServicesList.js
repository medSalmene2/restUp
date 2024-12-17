import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import Service from "../components/Service";
import { useNavigation } from "@react-navigation/native";
import * as Speech from "expo-speech";
import Contact from "../components/Contact";

const SubServicesList = ({ route }) => {
  const { subServices, image } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={{
          width: "95%",
          height: "25%",
          alignSelf: "center",
          marginBottom: 20,
        }}
      />

      <ScrollView>
        {subServices.map((subService, index) => (
          <View key={index}>
            {/* Navigate to FinalSubService with contacts and subService data */}
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                if (subService.serviceTitle === "Événements sociaux") {
                  navigation.navigate("EventManager");
                  return;
                }
                navigation.navigate("FinalSubService", {
                  subServiceTitle: subService.serviceTitle,
                  description: subService.description,
                  image: subService.image,
                  contacts: subService.contacts || [],
                });

                Speech.speak(subService.serviceTitle, { language: "fr" });
              }}
            >
              <Service
                key={index}
                bgColor={subService.color}
                text={subService.serviceTitle}
                textColor={"black"}
                image={subService.image}
              />
            </TouchableOpacity>

            {/* Render promotion section if available */}
            {subService.promotion?.map((promoted) => (
              <Contact
                key={promoted.name}
                name={promoted.name}
                job={promoted.job}
                stars={promoted.stars}
                image={promoted.image}
                fee={promoted.fee}
              />
            ))}
          </View>
        ))}

        {/* Mic Button */}
        <View style={styles.requestContainer}>
          <Text style={styles.requestText}> Informations supplémentaires</Text>
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
    borderRadius: 10,
    padding: 12,
    marginBottom: 5,
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
});
