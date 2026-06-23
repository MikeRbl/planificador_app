import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Filtro = ({ filtro, setFiltro }) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Filtrar Gastos</Text>
      <View style={styles.pickerContenedor}>
        <Picker
          selectedValue={filtro}
          onValueChange={(valor) => setFiltro(valor)}
        >
          <Picker.Item label="-- Todas las Categorías --" value="" />
          <Picker.Item label="Ahorro" value="ahorro" />
          <Picker.Item label="Comida" value="comida" />
          <Picker.Item label="Casa" value="casa" />
          <Picker.Item label="Gastos Varios" value="gastos" />
          <Picker.Item label="Ocio" value="ocio" />
          <Picker.Item label="Salud" value="salud" />
          <Picker.Item label="Suscripciones" value="suscripciones" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 }
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#64748b',
    marginBottom: 5,
    textAlign: 'center'
  },
  pickerContenedor: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden'
  }
});

export default Filtro;