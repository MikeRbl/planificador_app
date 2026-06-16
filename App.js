import React, { useState } from 'react';
import { SafeAreaView, View, Alert, StyleSheet } from 'react-native';

import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import Header from './src/components/Header'; // Tu Header original

const App = () => {
  const [presupuesto, setPresupuesto] = useState('');
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);  
  const [gastos, setGastos] = useState([]);

  const handlePresupuesto = () => {
    const presupuestoNumerico = Number(presupuesto);
    
    if (isNaN(presupuestoNumerico) || presupuestoNumerico <= 0) {
      Alert.alert('Error', 'El presupuesto no es válido. Debe ser mayor a 0.');
      return;
    }
    
    setIsValidPresupuesto(true);
  };

  const handleGasto = (gasto) => {
    setGastos([...gastos, gasto]);
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      <Header /> {/* Agregado para mantener el título de tu app */}
      <View>
        {isValidPresupuesto ? (
          <>
            <ControlPresupuesto 
              presupuesto={presupuesto} 
              gastos={gastos} 
            />
            <FormularioGasto 
              handleGasto={handleGasto} 
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: { 
    flex: 1, 
    backgroundColor: '#F5F5F5' 
  }
});

// ¡ESTA ES LA LÍNEA CRÍTICA QUE EVITA EL ERROR "got: object"!
export default App;