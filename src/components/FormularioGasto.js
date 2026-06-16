import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';

const FormularioGasto = ({ handleGasto }) => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');

  const agregarGasto = () => {
    if (nombre.trim() === '' || cantidad.trim() === '') {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    const nuevoGasto = {
      id: Date.now().toString(),
      nombre,
      cantidad: Number(cantidad)
    };

    handleGasto(nuevoGasto);

    setNombre('');
    setCantidad('');
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Nuevo Gasto</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre del Gasto (Ej. Comida)"
        value={nombre}
        onChangeText={setNombre}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Cantidad (Ej. 300)"
        keyboardType="numeric"
        value={cantidad}
        onChangeText={setCantidad}
      />
      
      <Pressable style={styles.boton} onPress={agregarGasto}>
        <Text style={styles.botonTexto}>Agregar Gasto</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor:{
    padding: 20,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3
},
  titulo:{
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#64748b'
},
  input:{
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15
},
  boton:{
    backgroundColor: '#f59e0b',
    padding: 12,
    borderRadius: 8
},
  botonTexto:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase'
}
});

export default FormularioGasto;