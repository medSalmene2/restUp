import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { RadioButton, Button } from "react-native-paper";
import ImageUpload from "../components/ImageUpload";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { signupHandler } from "../firestore/auth/Signup";

const Signup = ({ navigation }) => {
  const [phoneNumber, setPhone] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [termsChecked, setTermsChecked] = useState(false);
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState("");

  const [profileImage, setProfileImage] = useState("");

  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");

  const validatePassword = (password) => {
    let re = /^(?=.*[A-Z])(?=.*[0-9])/;
    return re.test(password);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    const isValid = validatePassword(text);
    setPasswordError(
      isValid ? "" : " يجب أن تحتوي كلمة المرور على حرف كبير ورقم"
    );
  };

  const handleRePasswordChange = (text) => {
    setRePassword(text);
    setRePasswordError(text === password ? "" : "كلمات المرور غير متطابقة!");
  };

  const validatePhone = (phone) => {
    let re = /^[\d]{8}$/;
    return re.test(phone);
  };

  const handlePhoneChange = (text) => {
    setPhone(text);
    const isValid = validatePhone(text);
    setPhoneError(isValid ? "" : " رقم هاتف غير صالح");
  };

  const handleSubmit = async () => {
    setMessage("");

    try {
      // Input validation
      if (
        !phoneNumber ||
        !firstName ||
        !lastName ||
        !rePassword ||
        !password ||
        !gender ||
        !isDateSelected
      ) {
        setMessage("Veuillez remplir tous les champs !");
        return;
      }

      if (!validatePhone(phoneNumber)) {
        setMessage("Numéro de téléphone invalide");
        return;
      }

      if (password.length <= 7) {
        setMessage("Le mot de passe doit contenir plus de 7 caractères");
        return;
      }

      if (!validatePassword(password)) {
        setMessage("Le mot de passe doit contenir une majuscule et un chiffre");
        return;
      }

      if (password !== rePassword) {
        setMessage("Les mots de passe ne correspondent pas !");
        return;
      }

      if (!termsChecked) {
        setMessage("Veuillez accepter les termes et conditions");
        return;
      }

      let profileImageUrl = "";

      // Upload profile image if exists
      if (profileImage) {
        const storage = getStorage();
        const imageRef = ref(
          storage,
          `profile-images/${userCredential.user.uid}`
        );

        const response = await fetch(profileImage);
        const blob = await response.blob();

        await uploadBytes(imageRef, blob);
        profileImageUrl = await getDownloadURL(imageRef);
      }
      await signupHandler(
        firstName,
        lastName,
        phoneNumber,
        gender,
        isDateSelected,
        profileImageUrl,
        password
      );
      navigation.navigate("Home");
    } catch (err) {
      console.error("Signup error:", err);

      // Handle specific Firebase errors
      switch (err.code) {
        case "auth/email-already-in-use":
          setMessage("Le numéro de téléphone est déjà utilisé");
          break;
        case "auth/invalid-email":
          setMessage("Numéro de téléphone invalide");
          break;
        case "auth/operation-not-allowed":
          setMessage("L'inscription est actuellement désactivée");
          break;
        case "auth/weak-password":
          setMessage("Mot de passe trop faible");
          break;
        default:
          setMessage("Une erreur s'est produite lors de l'inscription");
      }
    }
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDateSelected, setDateSelected] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateSelected(date);
    hideDatePicker();
  };

  const handleDateTimeChange = (selectedDateOrTime) => {
    setFromTimePickerVisible(false);

    if (isDatePickerVisible) {
      setDatePickerVisibility(false);
      setCustomSelectedDate(selectedDateOrTime);

      return;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView keyboardDismissMode="on-drag">
        <View style={{ flex: 1, marginHorizontal: 22 }}>
          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginVertical: 12,
                color: COLORS.blue,
                textAlign: "right",
              }}
            >
              Créer un compte{" "}
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: COLORS.blue,
                fontWeight: "bold",
                textAlign: "right",
                password: 8,
              }}
            >
              Prénom
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
                backgroundColor: "white",
              }}
            >
              <TextInput
                placeholder="Entrez votre prénom"
                placeholderTextColor={COLORS.black}
                keyboardType="name-phone-pad"
                style={{
                  width: "100%",
                  textAlign: "right",
                  paddingHorizontal: 20,
                }}
                value={firstName}
                onChangeText={setFirstname}
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: COLORS.blue,
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              Nom de famille
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
                backgroundColor: "white",
              }}
            >
              <TextInput
                placeholder=" Entrez votre nom de famille "
                placeholderTextColor={COLORS.black}
                keyboardType="name-phone-pad"
                style={{
                  width: "100%",
                  textAlign: "right",
                  paddingHorizontal: 20,
                }}
                value={lastName}
                onChangeText={setLastname}
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: COLORS.blue,
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              Mot de passe {""}
              {passwordError && (
                <Text style={{ color: "red" }}>{passwordError}</Text>
              )}
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
                backgroundColor: "white",
              }}
            >
              <TextInput
                placeholder="Entrez votre mot de passe "
                placeholderTextColor={COLORS.black}
                secureTextEntry={isPasswordShown}
                style={{
                  width: "100%",
                  textAlign: "right",
                  paddingHorizontal: 20,
                }}
                value={password}
                onChangeText={handlePasswordChange}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={{
                  position: "absolute",
                  left: 12,
                }}
              >
                {isPasswordShown == true ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.black} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: COLORS.blue,
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              Confirmez le mot de passe {""}
              {rePasswordError && (
                <Text style={{ color: "red" }}>{rePasswordError}</Text>
              )}
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
                backgroundColor: "white",
              }}
            >
              <TextInput
                placeholder=" Entrez votre mot de passe "
                placeholderTextColor={COLORS.black}
                secureTextEntry={isPasswordShown}
                style={{
                  width: "100%",
                  textAlign: "right",
                  paddingHorizontal: 20,
                }}
                value={rePassword}
                onChangeText={handleRePasswordChange}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={{
                  position: "absolute",
                  left: 12,
                }}
              >
                {isPasswordShown == true ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.black} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: COLORS.blue,
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              Numéro de téléphone {""}
              {phoneError && <Text style={{ color: "red" }}>{phoneError}</Text>}
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
                backgroundColor: "white",
              }}
            >
              <TextInput
                placeholder="Entrez votre numéro de téléphone "
                placeholderTextColor={COLORS.black}
                keyboardType="phone-pad"
                style={{
                  width: "100%",
                  textAlign: "right",
                  paddingHorizontal: 20,
                }}
                value={phoneNumber}
                onChangeText={handlePhoneChange}
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: COLORS.blue,
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              Genre
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              <RadioButton.Group
                onValueChange={(newValue) => setGender(newValue)}
                value={gender}
              >
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <RadioButton.Android value="male" />
                    <Text>Male</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 22,
                    }}
                  >
                    <RadioButton.Android value="female" />
                    <Text>Female</Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: COLORS.blue,
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              Photo de profil
            </Text>

            <ImageUpload
              image={profileImage}
              onImageChange={(image) => setProfileImage(image)}
            />
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: COLORS.blue,
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              Date de naissance
            </Text>

            <Button
              title="Show Date Picker"
              onPress={showDatePicker}
              mode="outlined"
              textColor="grey"
              width="100%"
            >
              {isDateSelected
                ? isDateSelected.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })
                : " Entrez date de naissance "}
            </Button>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              // onValueChange={handleDateTimeChange}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <Checkbox
              value={termsChecked}
              onValueChange={setTermsChecked}
              color={COLORS.blue}
            />
            <Text>J'accepte les termes et conditions</Text>
          </View>

          <Text style={{ color: "red", marginBottom: 12 }}>{message}</Text>

          <Button
            mode="contained"
            onPress={handleSubmit}
            style={{ backgroundColor: COLORS.blue, padding: 8 }}
          >
            Créer un compte{" "}
          </Button>
        </View>
        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "center",
            marginVertical: 22,
          }}
        >
          <Text style={{ fontSize: 16, color: COLORS.black }}>
            {" "}
            Vous avez déjà un compte ?
          </Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.b100,
                fontWeight: "bold",
                marginLeft: 6,
              }}
            >
              {" "}
              Se connecter{" "}
            </Text>
          </Pressable>
          {/* </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
