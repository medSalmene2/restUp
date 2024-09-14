import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


const PersonCard = ({ image }) => {
  // const { name, job, feedbackStars, pictureUrl } = person;

  return (
    <View style={styles.card}>
      <Image source={require("../assets/image.png")} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Salmen ghar</Text>
        <Text style={styles.job}>Worker</Text>
        <View style={{flexDirection:"row"}} >
          {Array(5).fill().map((_, index) => (
            <FontAwesome key={index} name="star" size={28} color="#FFD700" />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    borderColor:'black',
    borderWidth:1,
    margin:10

  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoContainer: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom:5
  },
  job: {
    fontSize: 16,
    marginBottom:20
  },
  
});

export default PersonCard;