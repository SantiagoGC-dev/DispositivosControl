import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Switch, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getLights, toggleLight } from '../components/api/lightsApi';


const LightsScreen = () => {
  const [lights, setLights] = useState([]);

  useEffect(() => {
    fetchLights();
  }, []);

  const fetchLights = async () => {
    try {
      const data = await getLights();
      const formatted = data.map(light => ({
        id: light.id,
        name: light.nombre,
        status: light.estado === 'encendida'
      }));
      setLights(formatted);
    } catch (error) {
      console.error('Error al obtener luces:', error);
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleLight(id);
      fetchLights(); // recargar estado real
    } catch (error) {
      console.error('Error al cambiar estado de luz:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Luces de la casa</Title>
      {lights.map((light) => (
        <Card key={light.id} style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <MaterialCommunityIcons 
              name="lightbulb" 
              size={30} 
              color={light.status ? "#FFD700" : "#808080"} 
            />
            <Text style={styles.lightName}>{light.name}</Text>
            <Switch 
              value={light.status} 
              onValueChange={() => handleToggle(light.id)} 
            />
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, marginTop: 80 },
  title: { fontSize: 24, marginBottom: 16 },
  card: { marginBottom: 10 },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  lightName: {
    flex: 1,
    marginLeft: 15,
    fontSize: 18,
  }
});

export default LightsScreen;
