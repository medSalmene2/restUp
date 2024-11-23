import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Contact } from "../components/Contact";
import * as Speech from "expo-speech";
import { ContactList } from '../components/Contact';

export default function HomeScreen({ navigation }) {
  // Subservices categorized by main service with appropriate color shades
  const dailyNeeds = [
    {
      serviceTitle: "خدمات التسوق والتوصيل",
      description:
        "توصيل المواد الغذائية والمستلزمات الأساسية إلى منازل كبار السن.",
      color: "#8E44AD", // Base color
      image: require("../assets/1.jpg"),
      contacts: [
        {
          id: "101",
          name: "أحمد محمد",
          job: "سائق متخصص لكبار السن",
          image: require("../assets/driver1.jpg"),
          stars: 5,
          fee: 120,
          // availability: "متاح",
          // experience: "7 سنوات",
          // languages: ["العربية", "الإنجليزية"],
          // specialFeatures: [
          //   "مركبة مجهزة للكراسي المتحركة",
          //   "خبرة في نقل ذوي الاحتياجات الخاصة",
          // ],
          // vehicleInfo: {
          //   type: "تويوتا هايس",
          //   year: "2022",
          //   features: "مكيف - رافعة كرسي متحرك",
          // },
          phone: "920001111",
        },
      ],
    },
    {
      serviceTitle: "إعداد وتوصيل الوجبات",
      description:
        "تقديم وجبات يومية متوازنة ومخصصة للاحتياجات الغذائية لكبار السن.",
      color: "#7E3DA1", // Slightly darker shade
      image: require("../assets/2.jpg"),
      contacts: [
        {
          id: "102",
          name: "محمود علي",
          job: "طباخ متخصص",
          image: require("../assets/chef1.jpg"),
          stars: 5,
          fee: 150,
          availability: "متاح",
          experience: "10 سنوات",
          languages: ["العربية", "الفرنسية"],
          specialFeatures: ["خبرة في إعداد وجبات صحية", "مهارة في الطبخ المنزلي"],
          phone: "920001112",
        },
        // {
        //   id: "103",
        //   name: "منى سالم",
        //   job: "طباخة منزلية",
        //   image: require("../assets/chef2.png"),
        //   stars: 4.5,
        //   fee: 130,
        //   availability: "غير متاحة حالياً",
        //   experience: "8 سنوات",
        //   languages: ["العربية"],
        //   specialFeatures: ["تخصص في وجبات الحمية", "متابعة التغذية السليمة"],
        //   phone: "920001113",
        // },
      ],
      promotion: [
        {
          image: require("../assets/man2.png"),
          name: "محمود",
          job: "طباخ",
          stars: 5,
          fee: 30 ,
        },
      ],
    },
    {
      serviceTitle: "المساعدة في النظافة الشخصية",
      description: "مساعدة كبار السن في الاستحمام والعناية الشخصية.",
      color: "#9E4DB9", // Slightly lighter shade
      image: require("../assets/3.jpg"),
      contacts: [
        {
          id: "104",
          name: "ليلى خالد",
          job: "مختصة في النظافة الشخصية",
          image: require("../assets/caretaker1.jpg"),
          stars: 5,
          fee: 100,
          availability: "متاح",
          experience: "6 سنوات",
          languages: ["العربية", "الإنجليزية"],
          specialFeatures: [
            "مهارة في التعامل مع كبار السن",
            "خبرة في العناية الشخصية",
          ],
          phone: "920001114",
        },
      ],
    },
    {
      serviceTitle: "خدمات التنظيف المنزلي",
      description: "توفير خدمات التنظيف للحفاظ على بيئة صحية.",
      color: "#7A399D", // Darker purple shade
      image: require("../assets/4.jpg"),
      contacts: [
      {
        id: "105",
        name: "محمد رشيد",
        job: "عامل تنظيف",
        image: require("../assets/cleaner1.jpg"),
        stars: 4,
        fee: 80,
        availability: "متاح",
        experience: "3 سنوات",
        languages: ["العربية"],
        specialFeatures: ["استخدام منتجات صديقة للبيئة"],
        phone: "920001115",
      },
    ],
    },
    {
      serviceTitle: "خدمات غسل الملابس",
      description: "جمع وتنظيف الملابس وإعادتها.",
      color: "#A25CC0", // Lighter purple tone
      image: require("../assets/5.jpeg"),
    },
    {
      serviceTitle: "إدارة الأدوية",
      description: "تنظيم الأدوية والتأكد من تناولها في الوقت المحدد.",
      color: "#B06BCA", // Lighter and brighter shade
      image: require("../assets/6.jpg"),
      contacts: [
        {
          id: "107",
          name: "هدى صالح",
          job: "متخصصة في متابعة الأدوية",
          image: require("../assets/salwa.jpg"),
          stars: 5,
          fee: 110,
          availability: "متاح",
          experience: "4 سنوات",
          languages: ["العربية"],
          specialFeatures: ["تنظيم الجداول الدوائية", "تذكير بالمواعيد"],
          phone: "920001117",
        },
      ],
    },
    {
      serviceTitle: "مرافقة في الأنشطة اليومية",
      description:
        "مرافقة المسنين عند أداء المهام اليومية مثل الذهاب إلى الطبيب.",
      color: "#C285D3", // Soft pastel lavender
      image: require("../assets/7.jpg"),
    },
    {
      serviceTitle: "العناية بالحديقة",
      description: "تقديم خدمات العناية بالحديقة.",
      color: "#D49ADC", // Lighter pastel shade
      image: require("../assets/8.jpg"),
      contacts: [
      {
        id: "108",
        name: "سالم بن علي",
        job: "متخصص في صيانة الحدائق",
        image: require("../assets/gardener1.jpg"),
        stars: 5,
        fee: 100,
        availability: "متاح",
        experience: "10 سنوات",
        languages: ["العربية", "الإنجليزية"],
        specialFeatures: ["تصميم حدائق", "تركيب أنظمة الري"],
        phone: "920001121",
      },
      // {
      //   id: "109",
      //   name: "حسن عبد الرحمن",
      //   job: "عامل حدائق",
      //   image: require("../assets/gardener2.jpg"),
      //   stars: 4.5,
      //   fee: 90,
      //   availability: "غير متاح حاليًا",
      //   experience: "8 سنوات",
      //   languages: ["العربية"],
      //   specialFeatures: ["زراعة النباتات", "إزالة الأعشاب الضارة"],
      //   phone: "920001122",
      // },
    ],
    },
    {
      serviceTitle: "إدارة الشؤون المالية",
      description: "المساعدة في إدارة الفواتير والشؤون المالية.",
      color: "#E6B0E0", // Very light pastel tone
      image: require("../assets/9.jpg"),
      contacts: [
      {
        id: "110",
        name: "مروان الشامسي",
        job: "مستشار مالي",
        image: require("../assets/finance1.png"),
        stars: 5,
        fee: 200,
        availability: "متاح",
        experience: "12 سنة",
        languages: ["العربية", "الفرنسية"],
        specialFeatures: ["إعداد تقارير مالية", "مساعدة في تسديد الفواتير"],
        phone: "920001123",
      },
      // {
      //   id: "114",
      //   name: "هالة يوسف",
      //   job: "محاسبة",
      //   image: require("../assets/finance2.jpg"),
      //   stars: 4.8,
      //   fee: 180,
      //   availability: "متاح",
      //   experience: "9 سنوات",
      //   languages: ["العربية", "الإنجليزية"],
      //   specialFeatures: ["إدارة الحسابات", "تحليل مالي"],
      //   phone: "920001124",
      // },
    ],
    },
    {
      serviceTitle: "خدمات إصلاحات وصيانة المنزل",
      description: "دعم إصلاحات وصيانة المنزل مثل السباكة.",
      color: "#F3D3F2", // Softest pastel shade
      image: require("../assets/10.jpg"),
      contacts: [
        {
          id: "5",
          name: "عماد الكيلاني",
          job: "فني سباكة",
          image: require("../assets/Plumber1.jpg"),
          stars: 5,
          fee: 150,
          availability: "متاح",
          experience: "15 سنة",
          languages: ["العربية"],
          specialFeatures: ["إصلاح أنابيب المياه", "تركيب الأدوات الصحية"],
          phone: "920001125",
        },
        // {
        //   id: "6",
        //   name: "أكرم سعيد",
        //   job: "فني كهرباء",
        //   image: require("../assets/electrician1.jpg"),
        //   stars: 4.7,
        //   fee: 160,
        //   availability: "متاح",
        //   experience: "11 سنة",
        //   languages: ["العربية", "الإنجليزية"],
        //   specialFeatures: ["إصلاح أعطال الكهرباء", "تركيب أنظمة الإضاءة"],
        //   phone: "920001126",
        // },
      ],
    },
  ];

  const paramedical = [
    {
      serviceTitle: "الرعاية المنزلية التمريضية",
      description: "تقديم خدمات التمريض في المنزل.",
      color: "#48C9B0",
      image: require("../assets/11.jpeg"),
      contacts: [
        {
          id: "201",
          name: "ليلى يوسف",
          job: "ممرضة منزلية",
          image: require("../assets/nurse1.png"),
          stars: 5,
          fee: 150,
          // availability: "متاح",
          // experience: "8 سنوات",
          // languages: ["العربية", "الإنجليزية"],
          // specialFeatures: [
          //   "رعاية طبية شاملة",
          //   "متابعة علاج الحالات المزمنة",
          // ],
          phone: "920001131",
        },
        // {
        //   id: "202",
        //   name: "سامي خالد",
        //   job: "ممرض متخصص",
        //   image: require("../assets/nurse2.jpg"),
        //   stars: 4.8,
        //   fee: 140,
        //   // availability: "متاح",
        //   // experience: "6 سنوات",
        //   // languages: ["العربية"],
        //   // specialFeatures: [
        //   //   "خبرة في العناية بالجرح",
        //   //   "مساعدة في العلاج الطبيعي",
        //   // ],
        //   phone: "920001132",
        // },
      ],
      promotion: [
        {
          image: require("../assets/doctor.png"),
          name: "محمود",
          job: "ممرض",
          stars: 5,
          fee: 50 ,
        },
      ],
    },
    {
      serviceTitle: "العلاج الطبيعي",
      description: "جلسات علاج لتحسين الحركة والقدرة الجسدية.",
      color: "#41B39E",
      image: require("../assets/12.jpeg"),
      contacts: [
        {
          id: "203",
          name: "مازن أحمد",
          job: "أخصائي علاج طبيعي",
          image: require("../assets/physio1.jpeg"),
          stars: 5,
          fee: 180,
          availability: "متاح",
          experience: "10 سنوات",
          languages: ["العربية", "الفرنسية"],
          specialFeatures: [
            "جلسات تقوية العضلات",
            "تأهيل ما بعد الجراحة",
            "علاج آلام الظهر",
            "إعادة تأهيل الإصابات الرياضية",
          ],
          phone: "920001133",
        },
      ],
    },
    {
      serviceTitle: "العلاج الوظيفي",
      description: "مساعدة المسنين على تحسين القدرة على أداء الأنشطة اليومية.",
      color: "#56D3C3",
      image: require("../assets/13.jpg"),
      contacts: [
        {
          id: "205",
          name: "هند فاضل",
          job: "أخصائية علاج وظيفي",
          image: require("../assets/occupational1.jpg"),
          stars: 5,
          fee: 160,
          availability: "متاح",
          experience: "9 سنوات",
          languages: ["العربية", "الإنجليزية"],
          specialFeatures: [
            "تحسين القدرة على الأنشطة اليومية",
            "برامج تدريب الحركة الدقيقة",
          ],
          phone: "920001135",
        },
        // {
        //   id: "206",
        //   name: "جمال سعيد",
        //   job: "أخصائي علاج وظيفي",
        //   image: require("../assets/occupational2.jpg"),
        //   stars: 4.6,
        //   fee: 155,
        //   availability: "متاح",
        //   experience: "8 سنوات",
        //   languages: ["العربية"],
        //   specialFeatures: [
        //     "مساعدة في علاج الحوادث",
        //     "تحسين التوازن والتنسيق",
        //   ],
        //   phone: "920001136",
        // },
      ],
    },
    {
      serviceTitle: "العلاج بالكلام واللغة",
      description: "دعم المسنين الذين يعانون من صعوبات في الكلام.",
      color: "#3DAF93",
      image: require("../assets/14.jpg"),
      promotion: [{ image: require("../assets/ahmed.png"), name: "احمد", job: "ممرض", stars: 4 }],
      contacts: [
        // {
        //   id: "207",
        //   name: "أحمد شريف",
        //   job: "أخصائي نطق ولغة",
        //   image: require("../assets/contacts/speech1.jpg"),
        //   stars: 5,
        //   fee: 200,
        //   availability: "متاح",
        //   experience: "12 سنة",
        //   languages: ["العربية", "الإنجليزية"],
        //   specialFeatures: [
        //     "تدريب على تحسين النطق",
        //     "علاج صعوبات التواصل",
        //     "جلسات لتحسين مهارات اللغة",
        //   ],
        //   phone: "920001137",
        // },
      ],
    },
    {
      serviceTitle: "الرعاية التنفسية",
      description: "تقديم الدعم للأشخاص الذين يعانون من مشاكل تنفسية.",
      color: "#63DACD",
      image: require("../assets/15.jpg"),
      contacts: [

      ],
    },
    {
      serviceTitle: "إدارة الألم",
      description: "توفير استراتيجيات لتخفيف الألم المزمن.",
      color: "#39A786",
      image: require("../assets/16.jpg"),
      contacts: [

      ],
    },
    {
      serviceTitle: "الخدمات الاجتماعية الصحية",
      description: "دعم نفسي واجتماعي لكبار السن وأسرهم.",
      color: "#5EE1D4",
      image: require("../assets/17.jpg"),
      contacts: [

      ],
    },
    {
      serviceTitle: "خدمات التغذية والاستشارة الغذائية",
      description:
        "وضع خطط غذائية مخصصة لكبار السن بناءً على احتياجاتهم الصحية وحالاتهم الطبية.",
      color: "#2E9F80",
      image: require("../assets/18.jpg"),
      contacts: [

      ],
    },
    {
      serviceTitle: "العناية بالقدم",
      description:
        "خدمات العناية بالقدم للأشخاص المسنين الذين يعانون من مشاكل القدم أو السكري.",
      color: "#6FE5D9",
      image: require("../assets/19.jpg"),
      contacts: [

      ],
    },
    {
      serviceTitle: "العلاج بالأجهزة التعويضية",
      description:
        "توفير وتركيب أجهزة دعم مثل المشدات، الأطراف الصناعية، وأدوات المساعدة على الحركة لتحسين جودة الحياة.",
      color: "#48C9B0",
      image: require("../assets/20.jpg"),
      contacts: [

      ],
    },
  ];

  const entertainment = [
    {
      serviceTitle: "الفعاليات الأجتماعية",
      description:
        "  توفّر للأشخاص المسنين فرصة التواصل الاجتماعي والمشاركة في الأنشطة الجماعية. المنضمة من الأفراد",
      color: "#E91E63", // Base color
      image: require("../assets/21.png"),
      contacts: [

      ],
    },
    {
      serviceTitle: "الأنشطة الرياضية الخفيفة ",
      description:
        "مثل المشي، اليوغا، وتمارين التمدد التي تساعد على تحسين اللياقة البدنية.",
      color: "#D81B60", // Slightly darker shade
      image: require("../assets/22.jpg"),
      contacts: [

      ],
    },
    {
      serviceTitle: "ورشات الفنون والحرف اليدوية ",
      description:
        "أنشطة مثل الرسم، الحياكة، والتطريز التي تساعد على تعزيز الإبداع والحفاظ على المهارات اليدوية.",
      color: "#C2185B", // Darker pink shade
      image: require("../assets/23.jpg"),
      contacts: [

      ],
    },
    {
      serviceTitle: "برامج القراءة والكتب ",
      description:
        "مجموعات القراءة ونوادي الكتاب التي تساعد في تحفيز العقل وتبادل الآراء.",
      color: "#AD1457", // Deep pink shade
      image: require("../assets/24.png"),
    },
    {
      serviceTitle: "الرحلات الجماعية ",
      description:
        "تنظيم رحلات محلية أو سياحية لزيارة الأماكن الثقافية أو الطبيعية.",
      color: "#F06292", // Slightly lighter shade
      image: require("../assets/25.jpg"),
    },
    {
      serviceTitle: "برامج العلاج بالموسيقى ",
      description:
        "جلسات الاستماع إلى الموسيقى أو المشاركة في الغناء لتحسين الحالة النفسية.",
      color: "#F48FB1", // Light pink
      image: require("../assets/26.jpg"),
    },
    {
      serviceTitle: "التدليك والاسترخاء ",
      description:
        "خدمات الاسترخاء والعلاج بالتدليك للمساعدة على تقليل التوتر الجسدي والنفسي.",
      color: "#F8BBD0", // Soft pastel pink
      image: require("../assets/27.jpg"),
    },
    {
      serviceTitle: "دروس الطبخ الصحية ",
      description: "تعلم تحضير وجبات صحية تلائم احتياجاتهم الغذائية.",
      color: "#FCE4EC", // Very light pastel pink
      image: require("../assets/28.jpg"),
    },
    {
      serviceTitle: "ألعاب الطاولة والأنشطة الذهنية ",
      description:
        "مثل الشطرنج، الكلمات المتقاطعة، والألغاز التي تساعد في تنشيط العقل.",
      color: "#E91E63", // Base color again to balance the palette
      image: require("../assets/29.jpg"),
    },
    {
      serviceTitle: "الحدائق والبستنة ",
      description: "أنشطة تساعد على تعزيز الشعور بالإنجاز والارتباط بالطبيعة.",
      color: "#F06292", // Another slight variation of lighter pink
      image: require("../assets/30.jpg"),
    },
  ];

  const transport = [
    {
      serviceTitle: "خدمات النقل المجتمعي ",
      description:
        "خدمات مخصصة لنقل كبار السن إلى الأماكن الاجتماعية والمرافق الصحية.",
      color: "#FF5722", // Base color
      image: require("../assets/31.jpg"),
      contacts : [
        {
          id: "1",
          name: "أحمد شوقي",
          job: "سائق نقل اجتماعي",
          image: require("../assets/driver2.jpg"),
          stars: 5,
          fee: "5 د.ت / كيلومتر",
          baseFee: 10, // Initial fee
          availability: "متاح",
          experience: "10 سنوات",
          languages: ["العربية", "الإنجليزية"],
          specialFeatures: [
            "سيارة واسعة تناسب مجموعات صغيرة",
            "خبرة في نقل كبار السن إلى المرافق الاجتماعية"
          ],
          vehicleInfo: {
            type: "تويوتا هايس",
            year: "2020",
            features: "مكيف هواء - أبواب منزلقة"
          },
          phone: "920001150",
          pricingLogic: (distance) => `التكلفة الإجمالية: ${10 + distance * 5} د.ت`
        }
      ]
    },
    {
      serviceTitle: "النقل الطبي ",
      description:
        "توفير سيارات لنقل الأشخاص المسنين إلى المواعيد الطبية والمستشفيات.",
      color: "#F4511E", // Slightly darker shade
      image: require("../assets/32.png"),
    },
    {
      serviceTitle: "خدمة التوصيل الخاص ",
      description: "سيارات خاصة أو تاكسيات مخصصة لنقل المسنين بأمان وراحة.",
      color: "#E64A19", // Darker orange-red
      image: require("../assets/33.jpeg"),
    },
    {
      serviceTitle: "النقل للأنشطة الاجتماعية ",
      description:
        "توفير وسائل نقل للمشاركة في الأنشطة الاجتماعية، مثل الأندية والرحلات.",
      color: "#D84315", // Deep red-orange
      image: require("../assets/34.jpg"),
    },

    {
      serviceTitle: "نقل الأشخاص ذوي الإعاقة ",
      description:
        "سيارات مجهزة بمقاعد مخصصة ووسائل لدعم الأشخاص الذين يعانون من مشاكل الحركة.",
      color: "#BF360C", // Very dark reddish-orange
      image: require("../assets/35.jpeg"),
    },
    {
      serviceTitle: "النقل بالطلب ",
      description:
        "خدمات حجز مسبق للنقل المخصص للأشخاص المسنين بناءً على احتياجاتهم الفردية.",
      color: "#FF8A65", // Lighter shade
      image: require("../assets/36.jpg"),
    },
    {
      serviceTitle: "خدمات التوصيل اليومية ",
      description:
        "توصيل البقالة والأدوية والاحتياجات اليومية إلى منازل كبار السن.",
      color: "#FF7043", // Light orange-red
      image: require("../assets/37.jpg"),
    },
    {
      serviceTitle: "الرحلات الجماعية للترفيه ",
      description:
        "تنظيم وسائل نقل جماعية لزيارة الأماكن السياحية أو المشاركة في الأنشطة الترفيهية.",
      color: "#FFAB91", // Soft light orange
      image: require("../assets/38.jpg"),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/flower.png")}
          style={styles.flowerIcon}
        />
        <Text style={styles.greeting}>صباح النور سي علي</Text>
      </View>

      <View style={styles.logoSection}>
        <Image source={require("../assets/Logo.png")} style={styles.logo} />
      </View>

      <View>
        <TouchableOpacity
          onPress={() => {
            Speech.speak("مساعدة شبه طبية", { language: "ar" });

            navigation.navigate("List", {
              serviceTitle: "مساعدة شبه طبية",
              subServices: paramedical,
              image: require("../assets/paraMedical.jpg"),
            });
          }}
          style={[styles.button, { backgroundColor: "#48C9B0" }]}>
          <Text style={styles.buttonText}>مساعدة شبه طبية</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Speech.speak("حاجيات يومية", { language: "ar" });

            navigation.navigate("List", {
              serviceTitle: "حاجيات يومية",
              subServices: dailyNeeds,
              image: require("../assets/dailyNeeds.png"),
            });
          }}
          style={[styles.button, { backgroundColor: "#8E44AD" }]}>
          <Text style={styles.buttonText}>حاجيات يومية</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Speech.speak("ترفيه", { language: "ar" });
            navigation.navigate("List", {
              serviceTitle: "ترفيه",
              subServices: entertainment,
              image: require("../assets/entertainment.jpg"),
            });
          }}
          style={[styles.button, { backgroundColor: "#E91E63" }]}>
          <Text style={styles.buttonText}>ترفيه</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Speech.speak("تنقل", { language: "ar" });

            navigation.navigate("List", {
              serviceTitle: "تنقل",
              subServices: transport,
              image: require("../assets/transport.jpg"),
            });
          }}
          style={[styles.button, { backgroundColor: "#FF5722" }]}>
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
    width: 50,
    height: 50,
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
