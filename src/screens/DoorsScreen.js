import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Button, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getDoors, toggleDoor } from '../components/api/doorsApi';


const DoorsScreen = () => {
  const [doors, setDoors] = useState([]);

  useEffect(() => {
    fetchDoors();
  }, []);

  const fetchDoors = async () => {
    try {
      const data = await getDoors();
      // Ajustar formato para la app
      const formatted = data.map(door => ({
        id: door.id,
        name: door.nombre,
        status: door.estado === 'cerrada' ? 'locked' : 'unlocked',
      }));
      setDoors(formatted);
    } catch (error) {
      console.error('Error al obtener puertas:', error);
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleDoor(id);
      fetchDoors(); // recargar estado real
    } catch (error) {
      console.error('Error al cambiar estado de puerta:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Control de Puertas</Title>
      
      {doors.map((door) => (
        <Card key={door.id} style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <MaterialCommunityIcons 
              name={door.status === 'locked' ? "door-closed" : "door-open"} 
              size={30} 
              color={door.status === 'locked' ? "#FF0000" : "#00FF00"} 
            />
            <Text style={styles.doorName}>{door.name}</Text>
            <Button 
              mode="contained" 
              color={door.status === 'locked' ? "#FF0000" : "#00FF00"}
              onPress={() => handleToggle(door.id)}
            >
              {door.status === 'locked' ? 'BLOQUEADA' : 'ABIERTA'}
            </Button>
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
  doorName: {
    flex: 1,
    marginLeft: 15,
    fontSize: 18,
  }
});

export default DoorsScreen;
