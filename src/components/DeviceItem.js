import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Switch, Card } from 'react-native-paper';

const DeviceItem = ({ device, onToggle }) => {
  const isLight = device.type === 'light';
  const isOn = isLight ? device.status === 'on' : device.status === 'unlocked';

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.container}>
          <Text style={styles.name}>{device.name}</Text>
          <Text style={styles.type}>{isLight ? 'Luz' : 'Puerta'}</Text>
          {isLight ? (
            <Switch value={isOn} onValueChange={() => onToggle(device.id)} />
          ) : (
            <TouchableOpacity
              style={[styles.button, isOn ? styles.unlocked : styles.locked]}
              onPress={() => onToggle(device.id)}
            >
              <Text style={styles.buttonText}>
                {isOn ? 'ABIERTO' : 'CERRADO'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 2,
  },
  type: {
    fontSize: 14,
    color: 'gray',
    flex: 1,
  },
  button: {
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  unlocked: {
    backgroundColor: '#4CAF50',
  },
  locked: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DeviceItem;