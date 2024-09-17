import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function HomeScreen({ navigation }) {
  // Subservices categorized by main service with appropriate color shades
  const dailyNeeds = [
    {
      serviceTitle: "خدمات التسوق والتوصيل",
      description: "توصيل المواد الغذائية والمستلزمات الأساسية إلى منازل كبار السن.",
      color: "#8E44AD", // Base color
      image: require("../assets/1.jpg")
    },
    {
      serviceTitle: "إعداد وتوصيل الوجبات",
      description: "تقديم وجبات يومية متوازنة ومخصصة للاحتياجات الغذائية لكبار السن.",
      color: "#7E3DA1", // Slightly darker shade
      image: require("../assets/2.jpg")
    },
    {
      serviceTitle: "المساعدة في النظافة الشخصية",
      description: "مساعدة كبار السن في الاستحمام والعناية الشخصية.",
      color: "#9E4DB9", // Slightly lighter shade
      image: require("../assets/3.jpg")
    },
    {
      serviceTitle: "خدمات التنظيف المنزلي",
      description: "توفير خدمات التنظيف للحفاظ على بيئة صحية.",
      color: "#7A399D", // Darker purple shade
      image: require("../assets/4.jpg")
    },
    {
      serviceTitle: "خدمات غسل الملابس",
      description: "جمع وتنظيف الملابس وإعادتها.",
      color: "#A25CC0", // Lighter purple tone
      image: require("../assets/5.jpeg")
    },
    {
      serviceTitle: "إدارة الأدوية",
      description: "تنظيم الأدوية والتأكد من تناولها في الوقت المحدد.",
      color: "#B06BCA", // Lighter and brighter shade
      image: require("../assets/6.jpg")
    },
    {
      serviceTitle: "مرافقة في الأنشطة اليومية",
      description: "مرافقة المسنين عند أداء المهام اليومية مثل الذهاب إلى الطبيب.",
      color: "#C285D3", // Soft pastel lavender
      image: require("../assets/7.jpg")
    },
    {
      serviceTitle: "العناية بالحديقة",
      description: "تقديم خدمات العناية بالحديقة.",
      color: "#D49ADC", // Lighter pastel shade
      image: require("../assets/8.jpg")
    },
    {
      serviceTitle: "إدارة الشؤون المالية",
      description: "المساعدة في إدارة الفواتير والشؤون المالية.",
      color: "#E6B0E0", // Very light pastel tone
      image: require("../assets/9.jpg")
    },
    {
      serviceTitle: "خدمات إصلاحات وصيانة المنزل",
      description: "دعم إصلاحات وصيانة المنزل مثل السباكة.",
      color: "#F3D3F2", // Softest pastel shade
      image: require("../assets/10.jpg")
    },
  ];
  

  const paramedical = [
    {
      serviceTitle: "الرعاية المنزلية التمريضية",
      description: "تقديم خدمات التمريض في المنزل.",
      color: "#48C9B0", 
      image: require("../assets/11.jpeg")
    },
    {
      serviceTitle: "العلاج الطبيعي",
      description: "جلسات علاج لتحسين الحركة والقدرة الجسدية.",
      color: "#41B39E", 
      image: require("../assets/12.jpeg")
    },
    {
      serviceTitle: "العلاج الوظيفي",
      description: "مساعدة المسنين على تحسين القدرة على أداء الأنشطة اليومية.",
      color: "#56D3C3", 
      image: require("../assets/13.jpg")
    },
    {
      serviceTitle: "العلاج بالكلام واللغة",
      description: "دعم المسنين الذين يعانون من صعوبات في الكلام.",
      color: "#3DAF93", 
      image: require("../assets/14.jpg")
    },
    {
      serviceTitle: "الرعاية التنفسية",
      description: "تقديم الدعم للأشخاص الذين يعانون من مشاكل تنفسية.",
      color: "#63DACD", 
      image: require("../assets/15.jpg")
    },
    {
      serviceTitle: "إدارة الألم",
      description: "توفير استراتيجيات لتخفيف الألم المزمن.",
      color: "#39A786", 
      image: require("../assets/16.jpg")
    },
    {
      serviceTitle: "الخدمات الاجتماعية الصحية",
      description: "دعم نفسي واجتماعي لكبار السن وأسرهم.",
      color: "#5EE1D4", 
      image: require("../assets/17.jpg")
    },
    {
      serviceTitle: "خدمات التغذية والاستشارة الغذائية",
      description: "وضع خطط غذائية مخصصة لكبار السن بناءً على احتياجاتهم الصحية وحالاتهم الطبية.",
      color: "#2E9F80", 
      image: require("../assets/18.jpg")
    },
    {
      serviceTitle: "العناية بالقدم",
      description: "خدمات العناية بالقدم للأشخاص المسنين الذين يعانون من مشاكل القدم أو السكري.",
      color: "#6FE5D9", 
      image: require("../assets/19.jpg")
    },
    {
      serviceTitle: "العلاج بالأجهزة التعويضية",
      description: "توفير وتركيب أجهزة دعم مثل المشدات، الأطراف الصناعية، وأدوات المساعدة على الحركة لتحسين جودة الحياة.",
      color: "#48C9B0", 
      image: require("../assets/20.jpg")
    },
  ];
  

  const entertainment = [
    {
      serviceTitle: "النوادي الاجتماعية ",
      description:
        "توفّر للأشخاص المسنين فرصة التواصل الاجتماعي والمشاركة في الأنشطة الجماعية.",
      color: "#E91E63", // Base color
      image: require("../assets/21.png")
    },
    {
      serviceTitle: "الأنشطة الرياضية الخفيفة ",
      description:
        "مثل المشي، اليوغا، وتمارين التمدد التي تساعد على تحسين اللياقة البدنية.",
      color: "#D81B60", // Slightly darker shade
      image: require("../assets/22.jpg")
    },
    {
      serviceTitle: "ورشات الفنون والحرف اليدوية ",
      description:
        "أنشطة مثل الرسم، الحياكة، والتطريز التي تساعد على تعزيز الإبداع والحفاظ على المهارات اليدوية.",
      color: "#C2185B", // Darker pink shade
      image: require("../assets/23.jpg")
    },
    {
      serviceTitle: "برامج القراءة والكتب ",
      description:
        "مجموعات القراءة ونوادي الكتاب التي تساعد في تحفيز العقل وتبادل الآراء.",
      color: "#AD1457", // Deep pink shade
      image: require("../assets/24.png")
    },
    {
      serviceTitle: "الرحلات الجماعية ",
      description:
        "تنظيم رحلات محلية أو سياحية لزيارة الأماكن الثقافية أو الطبيعية.",
      color: "#F06292", // Slightly lighter shade
      image: require("../assets/25.jpg")
    },
    {
      serviceTitle: "برامج العلاج بالموسيقى ",
      description:
        "جلسات الاستماع إلى الموسيقى أو المشاركة في الغناء لتحسين الحالة النفسية.",
      color: "#F48FB1", // Light pink
      image: require("../assets/26.jpg")
    },
    {
      serviceTitle: "التدليك والاسترخاء ",
      description:
        "خدمات الاسترخاء والعلاج بالتدليك للمساعدة على تقليل التوتر الجسدي والنفسي.",
      color: "#F8BBD0", // Soft pastel pink
      image: require("../assets/27.jpg")
    },
    {
      serviceTitle: "دروس الطبخ الصحية ",
      description:
        "تعلم تحضير وجبات صحية تلائم احتياجاتهم الغذائية.",
      color: "#FCE4EC", // Very light pastel pink
      image: require("../assets/28.jpg")
    },
    {
      serviceTitle: "ألعاب الطاولة والأنشطة الذهنية ",
      description:
        "مثل الشطرنج، الكلمات المتقاطعة، والألغاز التي تساعد في تنشيط العقل.",
      color: "#E91E63", // Base color again to balance the palette
      image: require("../assets/29.jpg")
    },
    {
      serviceTitle: "الحدائق والبستنة ",
      description:
        "أنشطة تساعد على تعزيز الشعور بالإنجاز والارتباط بالطبيعة.",
      color: "#F06292", // Another slight variation of lighter pink
      image: require("../assets/30.jpg")
    },
  ];
  
  

  const transport = [
    {
      serviceTitle: "خدمات النقل المجتمعي ",
      description:
        "خدمات مخصصة لنقل كبار السن إلى الأماكن الاجتماعية والمرافق الصحية.",
      color: "#FF5722", // Base color
      image: require("../assets/31.jpg")
    },
    {
      serviceTitle: "النقل الطبي ",
      description:
        "توفير سيارات لنقل الأشخاص المسنين إلى المواعيد الطبية والمستشفيات.",
      color: "#F4511E", // Slightly darker shade
      image: require("../assets/32.png")
    },
    {
      serviceTitle: "خدمة التوصيل الخاص ",
      description:
        "سيارات خاصة أو تاكسيات مخصصة لنقل المسنين بأمان وراحة.",
      color: "#E64A19", // Darker orange-red
      image: require("../assets/33.jpeg")
    },
    {
      serviceTitle: "النقل للأنشطة الاجتماعية ",
      description:
        "توفير وسائل نقل للمشاركة في الأنشطة الاجتماعية، مثل الأندية والرحلات.",
      color: "#D84315", // Deep red-orange
    },
    {
      serviceTitle: "نقل الأشخاص ذوي الإعاقة ",
      description:
        "سيارات مجهزة بمقاعد مخصصة ووسائل لدعم الأشخاص الذين يعانون من مشاكل الحركة.",
      color: "#BF360C", // Very dark reddish-orange
    },
    {
      serviceTitle: "النقل بالطلب ",
      description:
        "خدمات حجز مسبق للنقل المخصص للأشخاص المسنين بناءً على احتياجاتهم الفردية.",
      color: "#FF8A65", // Lighter shade
    },
    {
      serviceTitle: "خدمات التوصيل اليومية ",
      description:
        "توصيل البقالة والأدوية والاحتياجات اليومية إلى منازل كبار السن.",
      color: "#FF7043", // Light orange-red
    },
    {
      serviceTitle: "الرحلات الجماعية للترفيه ",
      description:
        "تنظيم وسائل نقل جماعية لزيارة الأماكن السياحية أو المشاركة في الأنشطة الترفيهية.",
      color: "#FFAB91", // Soft light orange
    },
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
        <Image source={require("../assets/Logo.png")} style={styles.logo} />
      </View>

      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("List", {
              serviceTitle: "مساعدة شبه طبية",
              subServices: paramedical,
              image: require("../assets/paraMedical.jpg"),
            })
          }
          style={[styles.button, { backgroundColor: "#48C9B0" }]}
        >
          <Text style={styles.buttonText}>مساعدة شبه طبية</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("List", {
              serviceTitle: "حاجيات يومية",
              subServices: dailyNeeds,
              image: require("../assets/dailyNeeds.png"),
            })
          }
          style={[styles.button, { backgroundColor: "#8E44AD" }]}
        >
          <Text style={styles.buttonText}>حاجيات يومية</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("List", {
              serviceTitle: "ترفيه",
              subServices: entertainment,
              image: require("../assets/entertainment.jpg"),
            })
          }
          style={[styles.button, { backgroundColor: "#E91E63" }]}
        >
          <Text style={styles.buttonText}>ترفيه</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("List", {
              serviceTitle: "تنقل",
              subServices: transport,
              image: require("../assets/transport.jpg"),
            })
          }
          style={[styles.button, { backgroundColor: "#FF5722" }]}
        >
          <Text style={styles.buttonText}>تنقل</Text>
        </TouchableOpacity>
      </View>
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
    width: 250,
    height: 250,
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
});
