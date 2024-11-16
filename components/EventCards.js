import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function EventCard({ event }) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={event.image} style={styles.image} />
      <Text style={styles.title}>{event.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '46%',
    margin: '2%',
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    padding: 8,
    textAlign: 'center',
  },
});