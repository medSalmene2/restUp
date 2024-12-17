import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Contact } from "../components/Contact";
import * as Speech from "expo-speech";
import { ContactList } from "../components/Contact";
import { useAuth } from "../firestore/auth/AuthContext";

export default function HomeScreen({ navigation }) {
  // Subservices categorized by main service with appropriate color shades
  const dailyNeeds = [
    {
      serviceTitle: "Services d'achat et de livraison",
      description:
        "Livraison des produits alimentaires et des articles essentiels aux domiciles des personnes âgées.",
      color: "#8E44AD", // Couleur principale
      image: require("../assets/1.jpg"),
      contacts: [
        {
          id: "101",
          name: "Ahmed Mohamed",
          job: "Chauffeur spécialisé pour les personnes âgées",
          image: require("../assets/driver1.jpg"),
          stars: 5,
          fee: 120,
          phone: "920001111",
        },
      ],
    },
    {
      serviceTitle: "Préparation et livraison de repas",
      description:
        "Fournir des repas équilibrés et adaptés aux besoins nutritionnels des personnes âgées.",
      color: "#7E3DA1", // Teinte légèrement plus foncée
      image: require("../assets/2.jpg"),
      contacts: [
        {
          id: "102",
          name: "Mahmoud Ali",
          job: "Cuisinier spécialisé",
          image: require("../assets/chef1.jpg"),
          stars: 5,
          fee: 150,
          availability: "Disponible",
          experience: "10 ans",
          languages: ["Arabe", "Français"],
          specialFeatures: ["Expérience dans la préparation de repas sains", "Compétence en cuisine maison"],
          phone: "920001112",
        },
      ],
      promotion: [
        {
          image: require("../assets/man2.png"),
          name: "Mahmoud",
          job: "Cuisinier",
          stars: 5,
          fee: 30,
        },
      ],
    },
    {
      serviceTitle: "Aide à l'hygiène personnelle",
      description: "Aider les personnes âgées à se doucher et à prendre soin d'elles-mêmes.",
      color: "#9E4DB9", // Teinte légèrement plus claire
      image: require("../assets/3.jpg"),
      contacts: [
        {
          id: "104",
          name: "Leila Khaled",
          job: "Spécialiste de l'hygiène personnelle",
          image: require("../assets/caretaker1.jpg"),
          stars: 5,
          fee: 100,
          availability: "Disponible",
          experience: "6 ans",
          languages: ["Arabe", "Anglais"],
          specialFeatures: [
            "Compétence dans l'accompagnement des personnes âgées",
            "Expérience en soins personnels",
          ],
          phone: "920001114",
        },
      ],
    },
    {
      serviceTitle: "Services de nettoyage domestique",
      description: "Fournir des services de nettoyage pour maintenir un environnement sain.",
      color: "#7A399D", // Teinte violette plus foncée
      image: require("../assets/4.jpg"),
      contacts: [
        {
          id: "105",
          name: "Mohamed Rachid",
          job: "Agent de nettoyage",
          image: require("../assets/cleaner1.jpg"),
          stars: 4,
          fee: 80,
          availability: "Disponible",
          experience: "3 ans",
          languages: ["Arabe"],
          specialFeatures: ["Utilisation de produits écologiques"],
          phone: "920001115",
        },
      ],
    },
    {
      serviceTitle: "Services de lavage de vêtement",
      description: "Collecter, laver et retourner les vêtements.",
      color: "#A25CC0", // Teinte violette plus claire
      image: require("../assets/5.jpeg"),
    },
    {
      serviceTitle: "Gestion des médicaments",
      description: "Organiser les médicaments et s'assurer qu'ils sont pris à l'heure prévue.",
      color: "#B06BCA", // Teinte plus claire et lumineuse
      image: require("../assets/6.jpg"),
      contacts: [
        {
          id: "107",
          name: "Houda Saleh",
          job: "Spécialiste en suivi des médicaments",
          image: require("../assets/salwa.jpg"),
          stars: 5,
          fee: 110,
          availability: "Disponible",
          experience: "4 ans",
          languages: ["Arabe"],
          specialFeatures: ["Organisation des calendriers médicamenteux", "Rappel des rendez-vous"],
          phone: "920001117",
        },
      ],
    },
    {
      serviceTitle: "Accompagnement dans les activités quotidiennes",
      description:
        "Accompagner les personnes âgées dans leurs tâches quotidiennes comme aller chez le médecin.",
      color: "#C285D3", // Lavande pastel douce
      image: require("../assets/7.jpg"),
    },
    {
      serviceTitle: "Entretien du jardin",
      description: "Fournir des services d'entretien du jardin.",
      color: "#D49ADC", // Teinte pastel plus claire
      image: require("../assets/8.jpg"),
      contacts: [
        {
          id: "108",
          name: "Salem Ben Ali",
          job: "Spécialiste en entretien de jardin",
          image: require("../assets/gardener1.jpg"),
          stars: 5,
          fee: 100,
          availability: "Disponible",
          experience: "10 ans",
          languages: ["Arabe", "Anglais"],
          specialFeatures: ["Conception de jardins", "Installation de systèmes d'irrigation"],
          phone: "920001121",
        },
      ],
    },
    {
      serviceTitle: "Gestion des finances",
      description: "Aider à gérer les factures et les finances personnelles.",
      color: "#E6B0E0", // Ton pastel très clair
      image: require("../assets/9.jpg"),
      contacts: [
        {
          id: "110",
          name: "Marouane Chamssi",
          job: "Conseiller financier",
          image: require("../assets/finance1.png"),
          stars: 5,
          fee: 200,
          availability: "Disponible",
          experience: "12 ans",
          languages: ["Arabe", "Français"],
          specialFeatures: ["Rédaction de rapports financiers", "Aide au paiement des factures"],
          phone: "920001123",
        },
      ],
    },
    {
      serviceTitle: "Services de réparation et d'entretien de maison",
      description: "Soutenir les réparations et l'entretien de maison comme la plomberie.",
      color: "#F3D3F2", 
      image: require("../assets/10.jpg"),
      contacts: [
        {
          id: "5",
          name: "Imad Al-Kilani",
          job: "Technicien en plomberie",
          image: require("../assets/Plumber1.jpg"),
          stars: 5,
          fee: 150,
          availability: "Disponible",
          experience: "15 ans",
          languages: ["Arabe"],
          specialFeatures: ["Réparation des canalisations d'eau", "Installation des sanitaires"],
          phone: "920001125",
        },
      ],
    },
  ];

  const paramedical = [
    {
      serviceTitle: "Soins infirmiers à domicile",
      description: "Fournir des services infirmiers à domicile.",
      color: "#48C9B0",
      image: require("../assets/11.jpeg"),
      contacts: [
        {
          id: "201",
          name: "Leïla Youssef",
          job: "Infirmière à domicile",
          image: require("../assets/nurse1.png"),
          stars: 5,
          fee: 150,
          phone: "920001131",
        },
      ],
      promotion: [
        {
          image: require("../assets/doctor.png"),
          name: "Mahmoud",
          job: "Infirmier",
          stars: 5,
          fee: 50,
        },
      ],
    },
    {
      serviceTitle: "Kinésithérapie",
      description: "Séances de thérapie pour améliorer la mobilité et les capacités physiques.",
      color: "#41B39E",
      image: require("../assets/12.jpeg"),
      contacts: [
        {
          id: "203",
          name: "Mazen Ahmed",
          job: "Spécialiste en kinésithérapie",
          image: require("../assets/physio1.jpeg"),
          stars: 5,
          fee: 180,
          availability: "Disponible",
          experience: "10 ans",
          languages: ["Arabe", "Français"],
          specialFeatures: [
            "Séances de renforcement musculaire",
            "Rééducation post-opératoire",
            "Traitement des douleurs dorsales",
            "Rééducation des blessures sportives",
          ],
          phone: "920001133",
        },
      ],
    },
    {
      serviceTitle: "Ergothérapie",
      description: "Aider les personnes âgées à améliorer leur capacité à effectuer les activités quotidiennes.",
      color: "#56D3C3",
      image: require("../assets/13.jpg"),
      contacts: [
        {
          id: "205",
          name: "Hind Fadel",
          job: "Spécialiste en ergothérapie",
          image: require("../assets/occupational1.jpg"),
          stars: 5,
          fee: 160,
          availability: "Disponible",
          experience: "9 ans",
          languages: ["Arabe", "Anglais"],
          specialFeatures: [
            "Amélioration des capacités dans les activités quotidiennes",
            "Programmes d'entraînement de la motricité fine",
          ],
          phone: "920001135",
        },
      ],
    },
    {
      serviceTitle: "Orthophonie et langage",
      description: "Soutenir les personnes âgées souffrant de troubles de la parole.",
      color: "#3DAF93",
      image: require("../assets/14.jpg"),
      promotion: [
        { image: require("../assets/ahmed.png"), name: "Ahmed", job: "Infirmier", stars: 4 },
      ],
      contacts: [
        {
          id: "207",
          name: "Ahmed Cherif",
          job: "Spécialiste en orthophonie",
          image: require("../assets/speech1.jpg"),
          stars: 5,
          fee: 200,
          availability: "Disponible",
          experience: "12 ans",
          languages: ["Arabe", "Anglais"],
          specialFeatures: [
            "Entraînement à l'amélioration de la prononciation",
            "Traitement des troubles de la communication",
            "Séances pour améliorer les compétences linguistiques",
          ],
          phone: "920001137",
        },
      ],
    },
    {
      serviceTitle: "Soins respiratoires",
      description: "Fournir un soutien aux personnes souffrant de problèmes respiratoires.",
      color: "#63DACD",
      image: require("../assets/15.jpg"),
      contacts: [],
    },
    {
      serviceTitle: "Gestion de la douleur",
      description: "Proposer des stratégies pour soulager la douleur chronique.",
      color: "#39A786",
      image: require("../assets/16.jpg"),
      contacts: [],
    },
    {
      serviceTitle: "Services sociaux de santé",
      description: "Offrir un soutien psychologique et social aux personnes âgées et à leurs familles.",
      color: "#5EE1D4",
      image: require("../assets/17.jpg"),
      contacts: [],
    },
    {
      serviceTitle: "Services de nutrition et consultation diététique",
      description:
        "Concevoir des plans alimentaires personnalisés pour les personnes âgées selon leurs besoins de santé et conditions médicales.",
      color: "#2E9F80",
      image: require("../assets/18.jpg"),
      contacts: [],
    },
    {
      serviceTitle: "Soins des pieds",
      description:
        "Fournir des services de soins des pieds pour les personnes âgées souffrant de problèmes podologiques ou de diabète.",
      color: "#6FE5D9",
      image: require("../assets/19.jpg"),
      contacts: [],
    },
    {
      serviceTitle: "Thérapies par dispositifs prothétiques",
      description:
        "Fournir et installer des dispositifs de soutien tels que les attelles, les prothèses et les outils d'aide à la mobilité pour améliorer la qualité de vie.",
      color: "#48C9B0",
      image: require("../assets/20.jpg"),
      contacts: [],
    },
  ];  

  const entertainment = [
    {
      serviceTitle: "Événements sociaux",
      description:
        "Offrir aux personnes âgées l'opportunité de socialiser et de participer à des activités de groupe organisées par des individus.",
      color: "#E91E63", // Couleur de base
      image: require("../assets/21.png"),
      contacts: [],
    },
    {
      serviceTitle: "Activités sportives légères",
      description:
        "Comme la marche, le yoga et les exercices d'étirement qui aident à améliorer la condition physique.",
      color: "#D81B60", // Teinte légèrement plus foncée
      image: require("../assets/22.jpg"),
      contacts: [],
    },
    {
      serviceTitle: "Ateliers d'arts et d'artisanat",
      description:
        "Des activités telles que la peinture, le tricot et la broderie qui stimulent la créativité et préservent les compétences manuelles.",
      color: "#C2185B", // Teinte rose foncée
      image: require("../assets/23.jpg"),
      contacts: [],
    },
    {
      serviceTitle: "Programmes de lecture et de livres",
      description:
        "Des groupes de lecture et des clubs de livres pour stimuler l'esprit et échanger des idées.",
      color: "#AD1457", // Teinte rose profond
      image: require("../assets/24.png"),
    },
    {
      serviceTitle: "Excursions collectives",
      description:
        "Organisation de voyages locaux ou touristiques pour visiter des lieux culturels ou naturels.",
      color: "#F06292", // Teinte légèrement plus claire
      image: require("../assets/25.jpg"),
    },
    {
      serviceTitle: "Programmes de musicothérapie",
      description:
        "Des séances d'écoute de musique ou de chant pour améliorer l'état psychologique.",
      color: "#F48FB1", // Rose clair
      image: require("../assets/26.jpg"),
    },
    {
      serviceTitle: "Massages et relaxation",
      description:
        "Services de relaxation et de massage pour aider à réduire le stress physique et mental.",
      color: "#F8BBD0", // Rose pastel doux
      image: require("../assets/27.jpg"),
    },
    {
      serviceTitle: "Cours de cuisine saine",
      description: "Apprendre à préparer des repas sains adaptés à leurs besoins nutritionnels.",
      color: "#FCE4EC", // Rose pastel très clair
      image: require("../assets/28.jpg"),
    },
    {
      serviceTitle: "Jeux de société et activités mentales",
      description:
        "Comme les échecs, les mots croisés et les puzzles qui aident à stimuler l'esprit.",
      color: "#E91E63", // Couleur de base pour équilibrer la palette
      image: require("../assets/29.jpg"),
    },
    {
      serviceTitle: "Jardinage et horticulture",
      description:
        "Des activités qui renforcent le sentiment d'accomplissement et le lien avec la nature.",
      color: "#F06292", // Variation de rose plus clair
      image: require("../assets/30.jpg"),
    },
  ];

  const transport = [
    {
      serviceTitle: "Services de transport communautaire",
      description:
        "Des services dédiés pour transporter les personnes âgées vers les lieux sociaux et les établissements de santé.",
      color: "#FF5722", // Couleur de base
      image: require("../assets/31.jpg"),
      contacts: [
        {
          id: "1",
          name: "Ahmed Chaouki",
          job: "Chauffeur de transport communautaire",
          image: require("../assets/driver2.jpg"),
          stars: 5,
          fee: "5 DT / kilomètre",
          baseFee: 10, // Frais initiaux
          availability: "Disponible",
          experience: "10 ans",
          languages: ["Arabe", "Anglais"],
          specialFeatures: [
            "Voiture spacieuse adaptée aux petits groupes",
            "Expérience dans le transport des personnes âgées vers les installations sociales"
          ],
          vehicleInfo: {
            type: "Toyota Hiace",
            year: "2020",
            features: "Climatisation - Portes coulissantes"
          },
          phone: "920001150",
         
        }
      ]
    },
    {
      serviceTitle: "Transport médical",
      description:
        "Fournir des véhicules pour transporter les personnes âgées vers leurs rendez-vous médicaux et les hôpitaux.",
      color: "#F4511E", // Teinte légèrement plus foncée
      image: require("../assets/32.png"),
    },
    {
      serviceTitle: "Service de transport privé",
      description: "Voitures privées ou taxis dédiés pour transporter les personnes âgées en toute sécurité et confort.",
      color: "#E64A19", // Rouge orangé foncé
      image: require("../assets/33.jpeg"),
    },
    {
      serviceTitle: "Transport pour les activités sociales",
      description:
        "Fournir des moyens de transport pour participer à des activités sociales, comme les clubs et les sorties.",
      color: "#D84315", // Rouge orangé profond
      image: require("../assets/34.jpg"),
    },
    {
      serviceTitle: "Transport pour les personnes handicapées",
      description:
        "Véhicules équipés de sièges adaptés et de moyens de soutien pour les personnes ayant des problèmes de mobilité.",
      color: "#BF360C", // Rouge orangé très foncé
      image: require("../assets/35.jpeg"),
    },
    {
      serviceTitle: "Transport à la demande",
      description:
        "Services de réservation préalable pour le transport des personnes âgées selon leurs besoins individuels.",
      color: "#FF8A65", // Teinte plus claire
      image: require("../assets/36.jpg"),
    },
    {
      serviceTitle: "Services de livraison quotidienne",
      description:
        "Livraison d'épicerie, de médicaments et des besoins quotidiens au domicile des personnes âgées.",
      color: "#FF7043", // Rouge orangé clair
      image: require("../assets/37.jpg"),
    },
    {
      serviceTitle: "Excursions collectives pour le divertissement",
      description:
        "Organisation de transports collectifs pour visiter des sites touristiques ou participer à des activités récréatives.",
      color: "#FFAB91", // Orange clair doux
      image: require("../assets/38.jpg"),
    },
  ];
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/flower.png")}
          style={styles.flowerIcon}
        />
        <Text style={styles.greeting}>صباح النور {user?.firstName}</Text>
      </View>

  <View style={styles.logoSection}>
    <Image source={require("../assets/Logo.png")} style={styles.logo} />
  </View>

  <View>
    <TouchableOpacity
      onPress={() => {
        Speech.speak("Aide paramédicale", { language: "fr" });

        navigation.navigate("List", {
          serviceTitle: "Aide paramédicale",
          subServices: paramedical,
          image: require("../assets/paraMedical.jpg"),
        });
      }}
      style={[styles.button, { backgroundColor: "#48C9B0" }]}>
      <Text style={styles.buttonText}>Aide paramédicale</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => {
        Speech.speak("Besoins quotidiens", { language: "fr" });

        navigation.navigate("List", {
          serviceTitle: "Besoins quotidiens",
          subServices: dailyNeeds,
          image: require("../assets/dailyNeeds.png"),
        });
      }}
      style={[styles.button, { backgroundColor: "#8E44AD" }]}>
      <Text style={styles.buttonText}>Besoins quotidiens</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => {
        Speech.speak("Divertissement", { language: "fr" });
        navigation.navigate("List", {
          serviceTitle: "Divertissement",
          subServices: entertainment,
          image: require("../assets/entertainment.jpg"),
        });
      }}
      style={[styles.button, { backgroundColor: "#E91E63" }]}>
      <Text style={styles.buttonText}>Divertissement</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => {
        Speech.speak("Transport", { language: "fr" });

        navigation.navigate("List", {
          serviceTitle: "Transport",
          subServices: transport,
          image: require("../assets/transport.jpg"),
        });
      }}
      style={[styles.button, { backgroundColor: "#FF5722" }]}>
      <Text style={styles.buttonText}>Transport</Text>
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
