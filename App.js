import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';

export default function App() {
  // Inicializamos el estado del presupuesto en 0
  const [presupuesto, setPresupuesto] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />
        
        <NuevoPresupuesto 
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
        />
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Un gris muy claro para contrastar y mantener el diseño limpio
  },
  header: {
    backgroundColor: '#3b82f6', // Excelente elección de azul para una interfaz minimalista
    paddingTop: 50, // Un poco de espacio arriba (útil en iOS/Android)
    paddingBottom: 40,
    alignItems: 'center',
  },
});