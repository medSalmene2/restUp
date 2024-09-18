// import {
//     View,
//     Text,
//     Image,
//     Pressable,
//     TextInput,
//     TouchableOpacity,
//     ScrollView,
//     Alert,
//     ImageBackground,
//   } from "react-native";
//   import React, { useState } from "react";
//   import { SafeAreaView } from "react-native-safe-area-context";
//   import COLORS from "../constants/colors";
//   import { Ionicons } from "@expo/vector-icons";
//   import Checkbox from "expo-checkbox";
//   import { RadioButton, Button } from "react-native-paper";
//   import ImageUpload from "../components/ImageUpload";
//   import DateTimePickerModal from "react-native-modal-datetime-picker";

//   const Signup = ({ navigation }) => {
//     const [phoneNumber, setPhone] = useState("");
//     const [firstName, setFirstname] = useState("");
//     const [lastName, setLastname] = useState("");
//     const [password, setPassword] = useState("");
//     const [rePassword, setRePassword] = useState("");
//     const [isPasswordShown, setIsPasswordShown] = useState(true);
//     const [termsChecked, setTermsChecked] = useState(false);
//     const [gender, setGender] = useState("");
//     const [message, setMessage] = useState("");

//     const [profileImage, setProfileImage] = useState("");

//     const [phoneError, setPhoneError] = useState("");
//     const [passwordError, setPasswordError] = useState("");
//     const [rePasswordError, setRePasswordError] = useState("");

//     const validatePassword = (password) => {
//       let re = /^(?=.*[A-Z])(?=.*[0-9])/;
//       return re.test(password);
//     };

//     const handlePasswordChange = (text) => {
//       setPassword(text);
//       const isValid = validatePassword(text);
//       setPasswordError(
//         isValid
//           ? ""
//           : " Password should include at least one capital letter and one number"
//       );
//     };

//     const handleRePasswordChange = (text) => {
//       setRePassword(text);
//       setRePasswordError(text === password ? "" : " Passwords do not match!");
//     };

//     const validatePhone = (phone) => {
//       let re = /^[\d]{8}$/;
//       return re.test(phone);
//     };

//     const handlePhoneChange = (text) => {
//       setPhone(text);
//       const isValid = validatePhone(text);
//       setPhoneError(isValid ? "" : " Invalid phone number");
//     };

//     const handleSubmit = () => {
//       // setPhoneError("");
//       // setPasswordError("");
//       // setRePasswordError("");
//       // if (
//       //   phoneNumber === "" ||
//       //   firstName === "" ||
//       //   lastName === "" ||
//       //   rePassword === "" ||
//       //   password === "" ||
//       //   gender === ""
//       // ) {
//       //   setMessage("Please fill in all fields!");
//       // } else if (!validatePhone(phoneNumber)) {
//       //   setMessage("Invalid phone number");
//       // } else if (password.length <= 7) {
//       //   setMessage("Password should have more than 7 characters");
//       // } else if (!validatePassword(password)) {
//       //   setMessage(
//       //     "Password should include at least one capital letter and one number"
//       //   );
//       // } else if (password !== rePassword) {
//       //   setMessage("Passwords do not match!");
//       // } else if (!termsChecked) {
//       //   setMessage("Please agree to the terms and conditions");
//       // } else {
//         // Firebase integration will go here in the future
//         // You can use the phoneNumber as the user ID
//         navigation.navigate("Home");
//       // }
//     };

//     const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//     const [isDateSelected, setDateSelected] = useState(null);

//     const showDatePicker = () => {
//       setDatePickerVisibility(true);
//     };

//     const hideDatePicker = () => {
//       setDatePickerVisibility(false);
//     };

//     const handleConfirm = date => {
//       setDateSelected(date);
//       hideDatePicker();
//     };

//     const handleDateTimeChange = selectedDateOrTime => {
//       setFromTimePickerVisible(false);

//       if (isDatePickerVisible) {
//         setDatePickerVisibility(false);
//         setCustomSelectedDate(selectedDateOrTime);

//         return;
//       }
//     };

//     return (
//       <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

//         <ScrollView keyboardDismissMode="on-drag">
//           <View style={{ flex: 1, marginHorizontal: 22 }}>
//             <View style={{ marginVertical: 22 }}>
//               <Text
//                 style={{
//                   fontSize: 22,
//                   fontWeight: "bold",
//                   marginVertical: 12,
//                   color: COLORS.blue,
//                 }}
//               >
//                 Create Account
//               </Text>
//             </View>

//             <View style={{ marginBottom: 12 }}>
//               <Text
//                 style={{
//                   fontSize: 16,
//                   fontWeight: 400,
//                   marginVertical: 8,
//                   color: COLORS.blue,
//                   fontWeight: "bold",
//                 }}
//               >
//                 First Name
//               </Text>

//               <View
//                 style={{
//                   width: "100%",
//                   height: 48,
//                   borderColor: COLORS.black,
//                   borderWidth: 1,
//                   borderRadius: 8,
//                   alignItems: "center",
//                   justifyContent: "center",
//                   paddingLeft: 22,
//                   backgroundColor: "white",
//                 }}
//               >
//                 <TextInput
//                   placeholder="Enter your first name"
//                   placeholderTextColor={COLORS.black}
//                   keyboardType="name-phone-pad"
//                   style={{
//                     width: "100%",
//                   }}
//                   value={firstName}
//                   onChangeText={setFirstname}
//                 />
//               </View>
//             </View>

//             <View style={{ marginBottom: 12 }}>
//               <Text
//                 style={{
//                   fontSize: 16,
//                   fontWeight: 400,
//                   marginVertical: 8,
//                   color: COLORS.blue,
//                   fontWeight: "bold",
//                 }}
//               >
//                 Last Name
//               </Text>

//               <View
//                 style={{
//                   width: "100%",
//                   height: 48,
//                   borderColor: COLORS.black,
//                   borderWidth: 1,
//                   borderRadius: 8,
//                   alignItems: "center",
//                   justifyContent: "center",
//                   paddingLeft: 22,
//                   backgroundColor: "white",
//                 }}
//               >
//                 <TextInput
//                   placeholder="Enter your last name"
//                   placeholderTextColor={COLORS.black}
//                   keyboardType="name-phone-pad"
//                   style={{
//                     width: "100%",
//                   }}
//                   value={lastName}
//                   onChangeText={setLastname}
//                 />
//               </View>
//             </View>

//             <View style={{ marginBottom: 12 }}>
//               <Text
//                 style={{
//                   fontSize: 16,
//                   fontWeight: 400,
//                   marginVertical: 8,
//                   color: COLORS.blue,
//                   fontWeight: "bold",
//                 }}
//               >
//                 Password {""}
//                 {passwordError && (
//                   <Text style={{ color: "red" }}>{passwordError}</Text>
//                 )}
//               </Text>

//               <View
//                 style={{
//                   width: "100%",
//                   height: 48,
//                   borderColor: COLORS.black,
//                   borderWidth: 1,
//                   borderRadius: 8,
//                   alignItems: "center",
//                   justifyContent: "center",
//                   paddingLeft: 22,
//                   backgroundColor: "white",
//                 }}
//               >
//                 <TextInput
//                   placeholder="Enter your password"
//                   placeholderTextColor={COLORS.black}
//                   secureTextEntry={isPasswordShown}
//                   style={{
//                     width: "100%",
//                   }}
//                   value={password}
//                   onChangeText={handlePasswordChange}
//                 />

//                 <TouchableOpacity
//                   onPress={() => setIsPasswordShown(!isPasswordShown)}
//                   style={{
//                     position: "absolute",
//                     right: 12,
//                   }}
//                 >
//                   {isPasswordShown == true ? (
//                     <Ionicons name="eye-off" size={24} color={COLORS.black} />
//                   ) : (
//                     <Ionicons name="eye" size={24} color={COLORS.black} />
//                   )}
//                 </TouchableOpacity>
//               </View>
//             </View>

//             <View style={{ marginBottom: 12 }}>
//               <Text
//                 style={{
//                   fontSize: 16,
//                   fontWeight: 400,
//                   marginVertical: 8,
//                   color: COLORS.blue,
//                   fontWeight: "bold",
//                 }}
//               >
//                 Confirm Password {""}
//                 {rePasswordError && (
//                   <Text style={{ color: "red" }}>{rePasswordError}</Text>
//                 )}
//               </Text>

//               <View
//                 style={{
//                   width: "100%",
//                   height: 48,
//                   borderColor: COLORS.black,
//                   borderWidth: 1,
//                   borderRadius: 8,
//                   alignItems: "center",
//                   justifyContent: "center",
//                   paddingLeft: 22,
//                   backgroundColor: "white",
//                 }}
//               >
//                 <TextInput
//                   placeholder="Enter your password"
//                   placeholderTextColor={COLORS.black}
//                   secureTextEntry={isPasswordShown}
//                   style={{
//                     width: "100%",
//                   }}
//                   value={rePassword}
//                   onChangeText={handleRePasswordChange}
//                 />

//                 <TouchableOpacity
//                   onPress={() => setIsPasswordShown(!isPasswordShown)}
//                   style={{
//                     position: "absolute",
//                     right: 12,
//                   }}
//                 >
//                   {isPasswordShown == true ? (
//                     <Ionicons name="eye-off" size={24} color={COLORS.black} />
//                   ) : (
//                     <Ionicons name="eye" size={24} color={COLORS.black} />
//                   )}
//                 </TouchableOpacity>
//               </View>
//             </View>

//             <View style={{ marginBottom: 12 }}>
//               <Text
//                 style={{
//                   fontSize: 16,
//                   fontWeight: 400,
//                   marginVertical: 8,
//                   color: COLORS.blue,
//                   fontWeight: "bold",
//                 }}
//               >
//                 Phone Number {""}
//                 {phoneError && <Text style={{ color: "red" }}>{phoneError}</Text>}
//               </Text>

//               <View
//                 style={{
//                   width: "100%",
//                   height: 48,
//                   borderColor: COLORS.black,
//                   borderWidth: 1,
//                   borderRadius: 8,
//                   alignItems: "center",
//                   justifyContent: "center",
//                   paddingLeft: 22,
//                   backgroundColor: "white",
//                 }}
//               >
//                 <TextInput
//                   placeholder="Enter your phone number"
//                   placeholderTextColor={COLORS.black}
//                   keyboardType="phone-pad"
//                   style={{
//                     width: "100%",
//                   }}
//                   value={phoneNumber}
//                   onChangeText={handlePhoneChange}
//                 />
//               </View>
//             </View>

//             <View  style={{
//                   width: "60%",
//                   height: 150,
//                   alignItems: "center",
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                   paddingLeft: 22,

//                   marginTop: 18,
//                 }}>
//             <View
//                 style={{
//                   width: "100%",
//                   height: 48,

//                   alignItems: "center",
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                   paddingLeft: 22,

//                   marginTop: 18,
//                 }}>
//                 <Button
//                   title='Show Date Picker'
//                   onPress={showDatePicker}
//                   mode='outlined'
//                   textColor='grey'>
//                   {isDateSelected
//                     ? isDateSelected.toLocaleDateString("en-GB", {
//                         day: "2-digit",
//                         month: "2-digit",
//                         year: "2-digit",
//                       })
//                     : "Birthday"}
//                 </Button>
//                 <DateTimePickerModal
//                   isVisible={isDatePickerVisible}
//                   mode='date'
//                   onConfirm={handleConfirm}
//                   onCancel={hideDatePicker}
//                   // onValueChange={handleDateTimeChange}
//                 />
//               </View>

//             <View
//               style={{
//                 marginEnd: 20,
//               }}>
//               <ImageUpload
//                 profileImage={profileImage}
//                 setProfileImage={setProfileImage}
//               />
//             </View>
//             </View>

//             <View
//               style={{
//                 width: "100%",
//                 height: 48,
//                 flexDirection: "row",
//                 marginBottom: 12,
//                 alignItems: "center",
//               }}
//             >
//               <Checkbox
//                 value={termsChecked}
//                 onValueChange={setTermsChecked}
//                 color={termsChecked ? COLORS.blue : undefined}
//               />
//               <Text style={{ marginLeft: 12 }}>
//                 I agree to the{" "}
//                 <Text
//                   style={{
//                     fontWeight: "bold",
//                     color: COLORS.blue,
//                     textDecorationLine: "underline",
//                   }}
//                   onPress={() => {
//                     Alert.alert(
//                       "Terms and Conditions",
//                       "These are the terms and conditions for using this app."
//                     );
//                   }}
//                 >
//                   Terms and Conditions
//                 </Text>
//               </Text>
//             </View>

//             {message ? <Text style={{ color: "red" }}>{message}</Text> : null}

//             <Button
//               mode="contained"
//               onPress={handleSubmit}
//               style={{ backgroundColor: COLORS.blue, padding: 8 }}
//             >
//               Sign Up
//             </Button>
//           </View>
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "center",
//               marginVertical: 22,
//             }}>
//             <Text style={{ fontSize: 16, color: COLORS.black }}>
//               Already have an account
//             </Text>
//             <Pressable onPress={() => navigation.navigate("Login")}>
//               <Text
//                 style={{
//                   fontSize: 16,
//                   color: COLORS.b100,
//                   fontWeight: "bold",
//                   marginLeft: 6,
//                 }}>
//                 Login
//               </Text>
//             </Pressable>
//           </View>

//         </ScrollView>
//       </SafeAreaView>
//     );
//   };

//   export default Signup;

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

  const handleSubmit = () => {
    // setPhoneError("");
    // setPasswordError("");
    // setRePasswordError("");
    // if (
    //   phoneNumber === "" ||
    //   firstName === "" ||
    //   lastName === "" ||
    //   rePassword === "" ||
    //   password === "" ||
    //   gender === ""
    // ) {
    //   setMessage("يرجى ملء جميع الحقول!");
    // } else if (!validatePhone(phoneNumber)) {
    //   setMessage("رقم الهاتف غير صالح");
    // } else if (password.length <= 7) {
    //   setMessage("يجب أن تتكون كلمة المرور من أكثر من 7 أحرف");
    // } else if (!validatePassword(password)) {
    //   setMessage(
    //     "يجب أن تحتوي كلمة المرور على حرف كبير ورقم"
    //   );
    // } else if (password !== rePassword) {
    //   setMessage("كلمات المرور غير متطابقة!");
    // } else if (!termsChecked) {
    //   setMessage("يرجى الموافقة على الشروط والأحكام");
    // } else {
    // Firebase integration will go here in the future
    // You can use the phoneNumber as the user ID
    navigation.navigate("Home");
    // }
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
              إنشاء حساب
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
              الاسم
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
                placeholder="أدخل اسمك "
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
              اسم العائلة
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
                placeholder="أدخل اسم عائلتك"
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
              كلمة المرور {""}
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
                placeholder="أدخل كلمة المرور"
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
              تأكيد كلمة المرور {""}
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
                placeholder="أدخل كلمة المرور"
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
              رقم الهاتف {""}
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
                placeholder="أدخل رقم هاتفك"
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
              الجنس
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
                    <Text>ذكر</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 22,
                    }}
                  >
                    <RadioButton.Android value="female" />
                    <Text>أنثى</Text>
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
              صورة الملف الشخصي
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
              تاريخ الميلاد
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
                  : " اختر تاريخ الميلاد"}
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
            <Text>أوافق على الشروط والأحكام</Text>
          </View>

          <Text style={{ color: "red", marginBottom: 12 }}>{message}</Text>

          <Button
            mode="contained"
            onPress={handleSubmit}
            style={{ backgroundColor: COLORS.blue, padding: 8 }}
          >
            إنشاء حساب
          </Button>
        </View>
        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "center",
            marginVertical: 22,
          }}
        >
          <Text style={{ fontSize: 16, color: COLORS.black }}>لديك حساب؟</Text>
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
              تسجيل الدخول{" "}
            </Text>
          </Pressable>
          {/* </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
