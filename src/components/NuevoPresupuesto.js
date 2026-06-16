import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, handlePresupuesto }) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Definir Presupuesto</Text>
      
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Agrega tu presupuesto"
        value={presupuesto.toString()}
        onChangeText={setPresupuesto}
      />
      
      <Pressable style={styles.boton} onPress={handlePresupuesto}>
        <Text style={styles.botonTexto}>Añadir Presupuesto</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor:{
    padding: 20
  },
  titulo:{
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
    color: '#3b82f6'
  },
  input:{
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    textAlign: 'center'
  },
  boton:{
    backgroundColor: '#1048A4',
    padding: 10,
    borderRadius: 10
  },
  botonTexto:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
});

export default NuevoPresupuesto;