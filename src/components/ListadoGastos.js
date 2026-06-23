import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Gasto from './Gasto';

const ListadoGastos = ({ gastos, setGastoEditar, filtro, gastosFiltrados }) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Gastos</Text>

      {filtro ? (
        gastosFiltrados.map(gasto => (
          <Gasto 
            key={gasto.id}
            gasto={gasto}
            setGastoEditar={setGastoEditar}
          />
        ))
      ) : (
        gastos.map(gasto => (
          <Gasto 
            key={gasto.id}
            gasto={gasto}
            setGastoEditar={setGastoEditar}
          />
        ))
      )}

      {(gastos.length === 0 && filtro === '') ? (
        <Text style={styles.noGastos}>No hay gastos aún</Text>
      ) : null}

      {(filtro !== '' && gastosFiltrados.length === 0) ? (
        <Text style={styles.noGastos}>No hay gastos en esta categoría</Text>
      ) : null}
      
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: { 
    marginTop: 30, 
    marginBottom: 100, 
    paddingHorizontal: 15 
  },
  titulo: { 
    color: '#64748b', 
    fontSize: 24, 
    textAlign: 'center', 
    fontWeight: 'bold', 
    marginBottom: 20 
  },
  noGastos: { 
    marginTop: 20, 
    textAlign: 'center', 
    fontSize: 18, 
    color: '#94a3b8' 
  }
});

export default ListadoGastos;