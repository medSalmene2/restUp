import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Checkbox } from "react-native-paper";
import COLORS from "../constants/colors";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firestore/config/config";
import { useAuth } from "../firestore/auth/AuthContext";

const Login = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  // const { user } = useAuth();
  // if (user?.uid) {
  //   navigation.navigate("home");
  // }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background.png")}
        resizeMode='cover'
        style={styles.back}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/name.png")}
            resizeMode='contain'
          />

          {/* Champ Numéro de Téléphone */}
          <View style={styles.inputContainer}>
            <TextInput
              value={phone}
              onChangeText={val => setPhone(val)}
              style={styles.input}
              placeholder='Numéro de téléphone'
              placeholderTextColor='#CCCCCC'
              keyboardType='phone-pad' // Utilise le pavé numérique pour le numéro de téléphone
            />
          </View>

          {/* Champ Mot de Passe */}
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: "#0092D6",
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
              marginBottom: 12,
            }}>
            <TextInput
              placeholder='Entrez le mot de passe'
              placeholderTextColor='#CCCCCC'
              secureTextEntry={isPasswordShown}
              style={{
                width: "100%",
                textAlign: "left",
                paddingHorizontal: 20,
              }}
              value={password}
              onChangeText={val => setPassword(val)}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                left: 12,
              }}>
              {isPasswordShown == true ? (
                <Ionicons name='eye-off' size={24} color={COLORS.black} />
              ) : (
                <Ionicons name='eye' size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>

          {/* Souviens-toi de moi et mot de passe oublié */}
          <View style={styles.rememberView}>
            <View style={styles.checkboxContainer}>
              <Checkbox.Android
                status={isChecked ? "checked" : "unchecked"}
                onPress={() => setIsChecked(!isChecked)}
                color='#008BCE'
              />
              <Text style={styles.rememberMeText}>Se souvenir de moi</Text>
            </View>
          </View>

          {/* Bouton Connexion */}
          <Button
            style={styles.loginButton}
            onPress={async () => {
              try {
                const userCredential = await signInWithEmailAndPassword(
                  auth,
                  `${phone}@domain.com`, // Firebase nécessite un email, donc nous convertissons le téléphone en format email
                  password
                );
                if (userCredential.user) {
                  navigation.navigate("Home");
                }
              } catch (error) {
                console.log(error);
                let errorMessage = "Une erreur s'est produite lors de la connexion";

                switch (error.code) {
                  case "auth/invalid-email":
                    errorMessage = "Numéro de téléphone incorrect";
                    break;
                  case "auth/user-disabled":
                    errorMessage = "Ce compte a été désactivé";
                    break;
                  case "auth/user-not-found":
                    errorMessage = "Aucun compte trouvé avec ce numéro";
                    break;
                  case "auth/wrong-password":
                    errorMessage = "Mot de passe incorrect";
                    break;
                }

                Alert.alert("Erreur", errorMessage);
              }
            }}
            mode='contained-tonal'
            buttonColor='#007DC0'
            textColor='white'>
            Connexion
          </Button>
          <View style={styles.registerContainer}>
            <Pressable onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.registerText}>
                Pas de compte ? <Text style={styles.boldText}>Inscrivez-vous</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4fb",
    justifyContent: "center",
  },
  innerContainer: {
    paddingHorizontal: 20,
    width: "85%",
    alignSelf: "center",
    marginBottom: 100,
  },
  back: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  rememberView: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 8,
    textAlign: "left",
  },
  logo: {
    width: 400,
    height: 400,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
    paddingBottom: 20,
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 12,
    textAlign: "left",
  },
  input: {
    width: "100%",
    height: 48,
    borderColor: "#30AADD",
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 22,
    fontSize: 16,
    textAlign: "left",
  },
  passwordContainer: {
    paddingLeft: 22,
    height: 48,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#0092D6",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    textAlign: "left",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  rememberMeText: {
    fontSize: 16,
    color: "#808080",
    textAlign: "left",
  },
  loginButton: {
    marginTop: 18,
    marginBottom: 4,
    width: "50%",
    alignSelf: "center",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 22,
  },
  registerText: {
    fontSize: 16,
    color: "#222222",
  },
  boldText: {
    fontWeight: "bold",
    color: "#0092D6",
  },
});

export default Login;
