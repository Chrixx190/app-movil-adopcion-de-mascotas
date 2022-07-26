
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, {useState} from 'react';
import ListaMascotas from '../components/ListaMascotas';



export default function Home () {
  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>
      <Text style={styles.textoprincipal}>Inicio</Text>
      <ListaMascotas />
    </View>
  )
};

const styles = StyleSheet.create({
  textoprincipal:{
    top: 30,
    left: 20,
    fontSize: 35,
    fontWeight: 'bold',
    color: '#F2D1D1',
  },
  
});

