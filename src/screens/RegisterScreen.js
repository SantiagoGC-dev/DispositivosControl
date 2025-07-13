import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Title } from 'react-native-paper';
import axios from 'axios';

const API_URL = 'http://192.168.0.166:3000/auth';

export default function RegisterScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post(`${API_URL}/register`, { nombre, email, password });
      setError('');
      navigation.navigate('Login');
    } catch (err) {
      setError('Error al registrar usuario');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>
        Registrarse
      </Title>
      
      <TextInput 
        label="Nombre" 
        value={nombre} 
        onChangeText={setNombre} 
        style={styles.input}
        theme={{ colors: { primary: '#6200ee' } }}
      />
      
      <TextInput 
        label="Email" 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input}
        theme={{ colors: { primary: '#6200ee' } }}
      />
      
      <TextInput 
        label="Contraseña" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        style={styles.input}
        theme={{ colors: { primary: '#6200ee' } }}
      />
      
      {error && <Text style={styles.error}>{error}</Text>}
      
      <Button 
        mode="contained" 
        onPress={handleRegister}
        style={styles.button}
        labelStyle={styles.buttonLabel}
        color="#6200ee"
      >
        Registrarse
      </Button>
      
      <Button 
        onPress={() => navigation.navigate('Login')}
        style={styles.secondaryButton}
        labelStyle={styles.secondaryButtonLabel}
        color="#03dac6"
      >
        Ya tengo cuenta
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    marginBottom: 25,
    textAlign: 'center',
    color: '#6200ee',
    fontSize: 24
  },
  input: { 
    marginBottom: 15,
    backgroundColor: 'white'
  },
  error: { 
    color: '#b00020', 
    marginBottom: 15,
    textAlign: 'center'
  },
  button: {
    marginTop: 15,
    paddingVertical: 5,
    borderRadius: 5
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16
  },
  secondaryButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#03dac6',
    borderRadius: 5
  },
  secondaryButtonLabel: {
    color: '#018786',
    fontSize: 14
  }
});