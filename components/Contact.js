import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Alert,
  I18nManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Surface } from "react-native-paper";

const Contact = ({ image, name, job, stars, fee, phone, onSchedulePress }) => {
  const makeCall = async () => {
    const phoneNumber = "tel:92066519";
    try {
      const supported = await Linking.canOpenURL(phoneNumber);
      if (supported) {
        await Linking.openURL(phoneNumber);
      } else {
        Alert.alert("Cet appareil ne prend pas en charge les appels");
      }
    } catch (err) {
      console.error("Erreur lors de l'appel : ", err);
    }
  };
  console.log(styles.scheduleText);

  return (
    <Surface style={styles.surface}>
      <TouchableOpacity
        style={styles.scheduleButton}
        onPress={onSchedulePress}
        activeOpacity={0.7}>
        <Ionicons name='calendar-outline' size={18} color='#114B96' />
        <Text style={styles.scheduleText}>Rendez-vous</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <View style={styles.imageSection}>
          <Image source={image} style={styles.image} />
          <View style={styles.ratingContainer}>
            {Array(stars)
              .fill()
              .map((_, index) => (
                <Ionicons key={index} name='star' size={16} color='#E6B121' />
              ))}
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.job}>{job}</Text>

          <View style={styles.feeContainer}>
            <Text style={styles.feeLabel}>Frais de consultation</Text>
            <Text style={styles.feeAmount}>{fee} </Text>
          </View>

          <TouchableOpacity style={styles.callButton} onPress={makeCall}>
            <Ionicons name='call-outline' size={20} color='#fff' />
            <Text style={styles.callButtonText}>Appeler maintenant</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Surface>
  );
};


const styles = StyleSheet.create({
  surface: {
    elevation: 4,
    borderRadius: 20,
    margin: 12,
    backgroundColor: "#fff",
    direction: "ltr",
  },
  scheduleButton: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F6FF",
    padding: 8,
    borderRadius: 12,
    zIndex: 1,
    gap: 6,
  },
  scheduleText: {
    color: "#114B96",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "right",
  },
  card: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  imageSection: {
    alignItems: "center",
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 16,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 4,
  },
  infoContainer: {
    flex: 1,
    marginRight: 16,
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    marginRight: 6,
    fontWeight: "bold",
    color: "#2D2D2D",
    marginBottom: 4,
    fontFamily: "System",
    textAlign: "right",
  },
  job: {
    fontSize: 16,
    marginRight: 8,
    color: "#666",
    marginBottom: 12,
    fontFamily: "System",
    textAlign: "right",
  },
  feeContainer: {
    backgroundColor: "#F7F7F7",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    marginLeft: 12,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    flex: 1,
    flexDirection: "row-reverse",
  },
  feeLabel: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
    marginLeft: 12,
    fontFamily: "System",
  },
  feeAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A936F",
    textAlign: "right",
    fontFamily: "System",
  },
  callButton: {
    backgroundColor: "#114B96",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 12,
    marginLeft: 12,
    gap: 8,
  },
  callButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "System",
  },
});

export default Contact;
