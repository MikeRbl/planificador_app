import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ControlPresupuesto = ({ presupuesto, gastos }) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => total + Number(gasto.cantidad), 0);
    
    const totalDisponible = Number(presupuesto) - totalGastado;

    setGastado(totalGastado);
    setDisponible(totalDisponible);
  }, [gastos, presupuesto]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.centrarValores}>
        <Text style={styles.texto}>
          <Text style={styles.label}>Presupuesto: </Text>${presupuesto}
        </Text>
        <Text style={styles.texto}>
          <Text style={styles.label}>Disponible: </Text>${disponible}
        </Text>
        <Text style={styles.texto}>
          <Text style={styles.label}>Gastado: </Text>${gastado}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor:{
    padding: 20,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 }
},
  centrarValores:{
    alignItems: 'flex-start'
},
  texto:{
    fontSize: 18,
    marginBottom: 5,
    color: '#333'
},
  label:{
    fontWeight: 'bold',
    color: '#1048A4'
}
});

export default ControlPresupuesto;