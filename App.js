import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet, Pressable, Text, Modal, ScrollView } from 'react-native';

import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import Header from './src/components/Header';
import ListadoGastos from './src/components/ListadoGastos';
import Filtro from './src/components/Filtro';

const App = () => {
  const [presupuesto, setPresupuesto] = useState('');
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);  
  const [gastos, setGastos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModalVisible(true);
    }
  }, [gastoEditar]);

  useEffect(() => {
    if (filtro) {
      const arrayFiltrado = gastos.filter(gasto => gasto.categoria === filtro);
      setGastosFiltrados(arrayFiltrado);
    } else {
      // Importante: Si se quita el filtro, limpiamos el arreglo filtrado
      setGastosFiltrados([]);
    }
  }, [filtro, gastos]);

  const handlePresupuesto = () => {
    const presupuestoNumerico = Number(presupuesto);
    if (isNaN(presupuestoNumerico) || presupuestoNumerico <= 0) {
      Alert.alert('Error', 'El presupuesto no es válido.');
      return;
    }
    setIsValidPresupuesto(true);
  };

  const handleGasto = (gasto) => {
    if (gasto.id) {
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastosActualizados);
    } else {
      gasto.id = Date.now().toString();
      setGastos([...gastos, gasto]);
    }
    
    setModalVisible(false);
    setGastoEditar({});
  };

  const eliminarGasto = (id) => {
    Alert.alert(
      '¿Deseas eliminar este gasto?',
      'Un gasto eliminado no se puede recuperar',
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Sí, Eliminar', 
          onPress: () => {
            // Filtramos el arreglo para quitar el ID seleccionado
            const gastosActualizados = gastos.filter(gastoState => gastoState.id !== id);
            
            // Actualizamos el estado principal
            setGastos(gastosActualizados);
            
            // Cerramos el modal y limpiamos la memoria de edición
            setModalVisible(false);
            setGastoEditar({});
          }
        }
      ]
    );
  };

  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
        </View>
        
        <View style={styles.cuerpo}>
          {isValidPresupuesto ? (
            <>
              <ControlPresupuesto 
                presupuesto={presupuesto} 
                gastos={gastos} 
              />

              <Filtro 
                filtro={filtro}
                setFiltro={setFiltro}
              />
              
              <ListadoGastos 
                gastos={gastos}
                setGastoEditar={setGastoEditar}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}
              />
            </>
          ) : (
            <NuevoPresupuesto
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              handlePresupuesto={handlePresupuesto}
            />
          )}
        </View>
      </ScrollView>

      {isValidPresupuesto && (
        <>
          <Pressable 
            style={styles.btnNuevoGasto}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.btnNuevoGastoTexto}>+</Text>
          </Pressable>

          <Modal visible={modalVisible} animationType="slide">
            <FormularioGasto 
              setModalVisible={setModalVisible}
              handleGasto={handleGasto} 
              gastoEditar={gastoEditar}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto} // ¡Aseguramos que la prop viaje al formulario!
            />
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { backgroundColor: '#3b82f6', paddingTop: 50, paddingBottom: 40, width: '100%', alignItems: 'center' },
  cuerpo: { flex: 1 },
  btnNuevoGasto: { position: 'absolute', bottom: 40, right: 30, width: 60, height: 60, backgroundColor: '#f59e0b', borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3.84 },
  btnNuevoGastoTexto: { color: '#FFF', fontSize: 35, fontWeight: 'bold', marginTop: -4 }
});

export default App;