import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen({ navigation }) {
  // u can change background color of service with color attribute in below arrays
  const dailyNeeds = [
    {
      serviceTitle: "خدمات التسوق والتوصيل",
      description:
        "تنظيم وسائل نقل جماعية لزيارة الأماكن السياحية أو المشاركة في الأنشطة الترفيهية.",
      color: "black",
    },
    { serviceTitle: "إعداد وتوصيل الوجبات", description: "", color: "" },
    { serviceTitle: "المساعدة في النظافة الشخصية", description: "", color: "" },
    { serviceTitle: "خدمات التنظيف المنزلي", description: "", color: "" },
    { serviceTitle: "خدمات غسل الملابس", description: "", color: "" },
    { serviceTitle: "إدارة الأدوية", description: "", color: "" },
    { serviceTitle: "مرافقة في الأنشطة اليومية", description: "", color: "" },
    { serviceTitle: "العناية بالحديقة", description: "", color: "" },
    { serviceTitle: "إدارة الشؤون المالية", description: "", color: "" },
    { serviceTitle: "خدمات إصلاحات وصيانة المنزل", description: "", color: "" },
  ];
  const paramedical = [
    {
      serviceTitle: "الرعاية المنزلية التمريضية",
      description: "",
      color: "black",
    },
    { serviceTitle: "العلاج الطبيعي", description: "", color: "" },
    { serviceTitle: "العلاج الوظيفي", description: "", color: "" },
    { serviceTitle: "العلاج بالكلام واللغة", description: "", color: "" },
    { serviceTitle: "الرعاية التنفسية", description: "", color: "" },
    { serviceTitle: "إدارة الألم", description: "", color: "" },
    { serviceTitle: "الخدمات الاجتماعية الصحية", description: "", color: "" },
    {
      serviceTitle: "خدمات التغذية والاستشارة الغذائية",
      description: "",
      color: "",
    },
    { serviceTitle: "العناية بالقدم", description: "", color: "" },
    { serviceTitle: "العلاج بالأجهزة التعويضية", description: "", color: "" },
  ];

  //entertainmeent is not finished
  const entertainment = [
    {
      serviceTitle: "خدمات التسوق والتوصيل",
      description: "",
      color: "black",
    },
    { serviceTitle: "إعداد وتوصيل الوجبات", description: "", color: "" },
    {
      serviceTitle: "  المساعدة في النظافة الشخصية",
      description: "",
      color: "",
    },
    { serviceTitle: "خدمات التنظيف المنزلي", description: "", color: "" },
    { serviceTitle: " خدمات غسل الملابس", description: "", color: "" },
    { serviceTitle: "إدارة الأدوية", description: "", color: "" },
    { serviceTitle: "مرافقة في الأنشطة اليومية ", description: "", color: "" },
    {
      serviceTitle: "العناية بالحديقة",
      description: "",
      color: "",
    },
    { serviceTitle: "إدارة الشؤون المالية", description: "", color: "" },
    { serviceTitle: "خدمات إصلاحات وصيانة المنزل", description: "", color: "" },
  ];

  // trasnport is not finished
  const transport = [
    {
      serviceTitle: "خدمات التسوق والتوصيل",
      description: "",
      color: "black",
    },
    { serviceTitle: "إعداد وتوصيل الوجبات", description: "", color: "" },
    {
      serviceTitle: "  المساعدة في النظافة الشخصية",
      description: "",
      color: "",
    },
    { serviceTitle: "خدمات التنظيف المنزلي", description: "", color: "" },
    { serviceTitle: " خدمات غسل الملابس", description: "", color: "" },
    { serviceTitle: "إدارة الأدوية", description: "", color: "" },
    { serviceTitle: "مرافقة في الأنشطة اليومية ", description: "", color: "" },
    {
      serviceTitle: "العناية بالحديقة",
      description: "",
      color: "",
    },
    { serviceTitle: "إدارة الشؤون المالية", description: "", color: "" },
    { serviceTitle: "خدمات إصلاحات وصيانة المنزل", description: "", color: "" },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/flower.jpg")}
          style={styles.flowerIcon}
        />
        <Text style={styles.greeting}>صباح النور سي علي</Text>
      </View>

      <View style={styles.logoSection}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
      </View>

      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("List", {
              serviceTitle: "مساعدة شبه طبية",
              subServices: paramedical,
            })
          }
          style={[styles.button, { backgroundColor: "#48C9B0" }]}>
          <Text style={styles.buttonText}>مساعدة شبه طبية</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("List", {
              serviceTitle: "حاجيات يومية",
              subServices: dailyNeeds,
            })
          }
          style={[styles.button, { backgroundColor: "#8E44AD" }]}>
          <Text style={styles.buttonText}>حاجيات يومية</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("List", {
              serviceTitle: "ترفيه",
              subServices: entertainment,
            })
          }
          style={[styles.button, { backgroundColor: "#E91E63" }]}>
          <Text style={styles.buttonText}>ترفيه</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#FF5722" }]}
          onPress={() =>
            navigation.navigate("List", {
              serviceTitle: "تنقل",
              subServices: transport,
            })
          }>
          <Text style={styles.buttonText}>تنقل</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.footer}>
        <Text style={styles.footerText}>يمكنك الطلب</Text>
        <TouchableOpacity>
          <Icon name="microphone" size={30} color="#E74C3C" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF2F8",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  flowerIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#34495E",
  },
  logoSection: {
    alignItems: "center",
    marginVertical: 20,
    marginBottom: 70,
  },
  logo: {
    width: 150,
    height: 150,
  },
  button: {
    padding: 15,
    borderRadius: 25,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    marginRight: 10,
  },
});
