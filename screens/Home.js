import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome'; 

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
    
      <View style={styles.header}>
        <Image 
          source={require('../assets/flower.jpg')}  
          style={styles.flowerIcon}
        />
        <Text style={styles.greeting}>صباح النور سي علي</Text>
      </View>

  
      <View style={styles.logoSection}>
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo}
        />
      </View>


      <View>
        <TouchableOpacity onPress={() => navigation.navigate('MedicalAssistance')} style={[styles.button, {backgroundColor: '#48C9B0'}]}>
          <Text style={styles.buttonText}>مساعدة شبه طبية</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('DailyNeeds')} style={[styles.button, {backgroundColor: '#8E44AD'}]}>
          <Text style={styles.buttonText}>حاجيات يومية</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Loisir')} style={[styles.button, {backgroundColor: '#E91E63'}]}>
          <Text style={styles.buttonText}>ترفيه</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: '#FF5722'}]}>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF2F8',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  flowerIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495E',
  },
  logoSection: {
    alignItems: 'center',
    marginVertical: 20,
    marginBottom:70
  },
  logo: {
    width: 150,
    height: 150,
  },
  button: {
    padding: 15,
    borderRadius: 25,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    marginRight: 10,
  },
});


