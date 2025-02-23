import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>À propos de l'application</Text>
      <Text style={styles.text}>
        Cette application a été conçue pour faciliter la gestion de photos médicales et la communication entre professionnels de la santé. Elle permet de centraliser les images, les remarques et les directives afin d'assurer un suivi optimal des dossiers patients.
      </Text>
      <Text style={styles.subtitle}>À propos de Khalid Sajed</Text>
      <Text style={styles.text}>
        Khalid Sajed est un développeur passionné, spécialisé dans la création d'applications mobiles innovantes. Pour toute question ou suggestion, n'hésitez pas à le contacter à l'adresse : khalidsajed1975@gmail.com.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: 22,
    
  },
});

