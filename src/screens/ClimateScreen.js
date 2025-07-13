import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Text } from 'react-native-paper';
import Slider from '@react-native-community/slider'; 

const ClimateScreen = () => {
  const [temperature, setTemperature] = useState(22);
  const [humidity, setHumidity] = useState(45);
  const [fanSpeed, setFanSpeed] = useState(2);

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Control Climático</Title>
      
      <Card style={styles.card}>
        <Card.Content>
          <Text>Temperatura: {temperature}°C</Text>
          <Slider
            style={styles.slider}
            minimumValue={16}
            maximumValue={30}
            value={temperature}
            onValueChange={setTemperature}
            step={1}
            minimumTrackTintColor="#6200ee"
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text>Humedad: {humidity}%</Text>
          <Slider
            style={styles.slider}
            minimumValue={30}
            maximumValue={70}
            value={humidity}
            onValueChange={setHumidity}
            step={5}
            minimumTrackTintColor="#1E90FF"
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text>Ventilador: Nivel {fanSpeed}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={3}
            value={fanSpeed}
            onValueChange={setFanSpeed}
            step={1}
            minimumTrackTintColor="#696969"
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  card: {
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default ClimateScreen;