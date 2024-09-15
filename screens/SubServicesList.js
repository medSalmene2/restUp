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

const SubServicesList = ({ route }) => {
  const { subServices, image } = route.params;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={{ width: "95%", height: "15%", alignSelf: "center" , marginBottom:20 }}
      />
      <ScrollView>
        {subServices.map((subService, index) => (
          <TouchableOpacity
            style={styles.optionButton}
            key={index}
            onPress={() => {
              navigation.navigate("FinalSubService", {
                subServiceTitle: subService.serviceTitle,
                description: subService.description,
                image,
              });
            }}>
            <Service
              bgColor={subService.color}
              text={subService.serviceTitle}
              textColor={"black"}
              image={require("../assets/image.png")}
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
