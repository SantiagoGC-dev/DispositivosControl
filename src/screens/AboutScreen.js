import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Title } from 'react-native-paper';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Acerca de la App</Title>
      <Text style={styles.text}>
        Aplicación para control de dispositivos inteligentes
      </Text>
      <Text style={styles.text}>
        Versión 1.0.0
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default AboutScreen;