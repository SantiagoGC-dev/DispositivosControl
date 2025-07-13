import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MainMenu = ({ navigation }) => {
  const menuItems = [
    {
      title: "Luces de casa",
      icon: "lightbulb-on",
      screen: "LightsScreen"
    },
    {
      title: "Puertas",
      icon: "door",
      screen: "DoorsScreen"
    },
    {
      title: "Clima",
      icon: "thermometer",
      screen: "ClimateScreen"
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Menú Principal</Title>
      
      {menuItems.map((item, index) => (
        <Card key={index} style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <MaterialCommunityIcons 
              name={item.icon} 
              size={40} 
              color="#6200ee" 
            />
            <View style={styles.textContainer}>
              <Title>{item.title}</Title>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate(item.screen)}
                style={styles.button}
              >
                Ver opción
              </Button>
            </View>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
    marginTop: 8,
  },
  card: {
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    borderRadius: 5,
  }
});

export default MainMenu;