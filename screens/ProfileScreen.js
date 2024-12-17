import React, { useState ,useEffect  } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import i18n, { changeLanguage } from "../i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../firestore/auth/AuthContext";

const ProfileScreen = ({ route, navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const languages = [
    { label: "العربية", flag: require("../assets/tunisia.png") },
    { label: "Français", flag: require("../assets/france.png") },
    { label: "English", flag: require("../assets/uk.png") },
  ];

  const getLanguageLabel = (langCode) => {
    const lang = languages.find(l => l.value === langCode);
    return lang ? lang.label : "English";
  };

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLang = await AsyncStorage.getItem("appLanguage") || "en";
        setSelectedLanguage(getLanguageLabel(storedLang));
      } catch (error) {
        console.error("Error loading language:", error);
      }
    };
    loadLanguage();
  }, []);

  const handleLanguageChange = async (label) => {
    const selectedLang = languages.find(lang => lang.label === label);
    if (selectedLang) {
      setSelectedLanguage(label);
      setIsModalVisible(false);
      await changeLanguage(selectedLang.value);
    }
  };
const {user} = useAuth();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image source={require("../assets/elder.png")} size={80} />
          <View style={{ marginRight: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}>
              {user?.firstName} {user?.lastName}
            </Title>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Text style={{ color: "#777777", marginLeft: 20, fontSize: 18 }}>
            {user?.phoneNumber}          </Text>
          <Icon name='phone' color='#FF6347' size={20} />
        </View>
        <View style={styles.row}>
          <Text style={{ color: "#777777", marginLeft: 20, fontSize: 18 }}>
--          </Text>
          <Icon name='email' color='#FF6347' size={20} />
        </View>
        <TouchableRipple
          onPress={() => {
            navigation.navigate("Map");
          }}>
          <View style={[styles.row, { marginTop: 30 }]}>
            <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: "bold" }}>
              {route.params?.adress || "العوينة ,تونس"}
              <Icon name='chevron-down' color='#777777' size={20} />
            </Text>

            <Icon name='map-marker-radius' color='#FF6347' size={20} />
          </View>
        </TouchableRipple>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}>
          <Title>--</Title>
        </View>
        <View style={styles.infoBox}>
          <Title>--</Title>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>
              {i18n.t("profile.favorites")}
            </Text>
            <Icon name='heart-outline' color='#FF6347' size={25} />
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>{i18n.t("profile.payment")}</Text>
            <Icon name='credit-card' color='#FF6347' size={25} />
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>{i18n.t("profile.help")}</Text>
            <Icon name='account-check-outline' color='#FF6347' size={25} />
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => setIsModalVisible(true)}>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>
              {i18n.t("profile.language")} ({selectedLanguage})
            </Text>
            <Icon name='translate' color='#FF6347' size={25} />
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>
              {" "}
              {i18n.t("profile.logout")}{" "}
            </Text>
            <Icon name='logout' color='#FF6347' size={25} />
          </View>
        </TouchableRipple>
      </View>

      {/* Language Selection Modal */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {languages.map((language, index) => (
              <TouchableOpacity
                key={index}
                style={styles.languageOption}
                onPress={() => handleLanguageChange(language.label)} // Use label
              >
                <Avatar.Image source={language.flag} size={40} />
                <Text style={styles.languageText}>{language.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>
                {i18n.t("profile.close")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    direction: "rtl",
    paddingVertical:40
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    backgroundColor: "#FAF8F1",
    height: 100,
    borderRadius: 10,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    justifyContent: "space-between",
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  languageText: {
    marginLeft: 15,
    fontSize: 18,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ProfileScreen;
