import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function Loisir() {
  return (
    <View style={styles.container}>
     
      <ScrollView>
       
        <Text style={styles.heading}>ترفيه</Text>


        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>خدمات التسوق والتوصيل</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}> إعداد وتوصيل الوجبات </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>  المساعدة في النظافة الشخصية </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>  خدمات التنظيف المنزلي </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}> خدمات غسل الملابس </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>  إدارة الأدوية</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>مرافقة في الأنشطة اليومية </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}> العناية بالحديقة</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}> إدارة الشؤون المالية</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}> خدمات إصلاحات وصيانة المنزل </Text>
        </TouchableOpacity>


        <View style={styles.requestContainer}>
          <Text style={styles.requestText}>يمكنك الطلب</Text>
          <TouchableOpacity style={styles.micButton}>
            <Text style={styles.micText}>🎤</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa', 
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0288d1',
    textAlign: 'center',
    marginBottom: 16,
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  role: {
    fontSize: 16,
    color: '#757575',
  },
  ratingLabel: {
    fontSize: 14,
    color: '#757575',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 18,
    color: '#FFD700', 
  },
  optionButton: {
    backgroundColor: '#64b5f6', 
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#fff',
  },
  requestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  requestText: {
    fontSize: 18,
    color: '#0288d1',
  },
  micButton: {
    backgroundColor: '#ff5252', 
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  micText: {
    fontSize: 24,
    color: '#fff',
  },
});
