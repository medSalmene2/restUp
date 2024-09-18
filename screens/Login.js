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
  KeyboardAvoidingView,
  Platform,
  Pressable
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Checkbox } from 'react-native-paper';
import COLORS from "../constants/colors";

const Login = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View
      
      style={styles.container}
    >
      <ImageBackground
        source={require("../assets/background.png")}
        resizeMode="cover"
        style={styles.back}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/name.png")}
            resizeMode="contain"
          />
          
          {/* Phone Number Input */}
          <View style={styles.inputContainer}>
            <TextInput
              value={phone}
              onChangeText={(val) => setPhone(val)}
              style={styles.input}
              placeholder=" رقم الهاتف"
              placeholderTextColor="#CCCCCC"
              keyboardType="phone-pad" // Use phone pad for phone number input
            />
          </View>
          
          {/* Password Input */}
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
              }}
            >
              <TextInput
                placeholder="أدخل كلمة المرور"
                placeholderTextColor="#CCCCCC"
                secureTextEntry={isPasswordShown}
                style={{
                  width: "100%",
                  textAlign: "right",
                  paddingHorizontal: 20,
                }}
                value={password}
                onChangeText={(val) => setPassword(val)}
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

          {/* Remember Me and Forgot Password */}
          <View style={styles.rememberView}>
            <View style={styles.checkboxContainer}>
              <Checkbox.Android
                status={isChecked ? "checked" : "unchecked"}
                onPress={() => setIsChecked(!isChecked)}
                color="#008BCE"
              />
              <Text style={styles.rememberMeText}>أبقيني مسجلا</Text>
            </View>
          </View>

          {/* Login Button */}
          <Button
            style={styles.loginButton}
            onPress={() => navigation.navigate("Home")}
            mode="contained-tonal"
            buttonColor="#007DC0"
            textColor="white"
          >
            تسجيل الدخول
          </Button>
           <View style={styles.registerContainer}>
            <Pressable onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.registerText}>
              ليس لديك حساب؟{" "}
                <Text style={styles.boldText}>سجل</Text>
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
    // alignItems: "center",
    flexDirection: "row",
    marginBottom: 8,
    textAlign: "right"
  },
  logo: {
    width: 500,
    height: 500,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
    paddingBottom: 20,
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 12,
    textAlign:"right",  
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
    textAlign:"right",
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
    textAlign: "right",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  rememberMeText: {
    fontSize: 16,
    color: "#808080",
    textAlign: "right"
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
