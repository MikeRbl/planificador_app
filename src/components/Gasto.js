import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { formatearCantidad, formatearFecha } from '../helpers';

const diccionarioIconos = {
    ahorro: require('../../assets/icono_ahorro.png'),
    comida: require('../../assets/icono_comida.png'),
    casa: require('../../assets/icono_casa.png'),
    gastos: require('../../assets/icono_gastos.png'),
    ocio: require('../../assets/icono_ocio.png'),
    salud: require('../../assets/icono_salud.png'),
    suscripciones: require('../../assets/icono_suscripciones.png')
};

const Gasto = ({ gasto, setGastoEditar }) => {
  const { nombre, cantidad, categoria, fecha } = gasto;

  return (
    <Pressable onLongPress={() => setGastoEditar(gasto)}>
      <View style={styles.contenedor}>
        <View style={styles.contenido}>
          
          <Image 
              style={styles.icono}
              source={diccionarioIconos[categoria]}
          />

          <View style={styles.contenedorTexto}>
            <Text style={styles.categoria}>{categoria}</Text>
            <Text style={styles.nombre}>{nombre}</Text>
            <Text style={styles.fecha}>{formatearFecha(fecha)}</Text>
          </View>
        </View>
        
        <Text style={styles.cantidad}>{formatearCantidad(cantidad)}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 }
  },
  contenido: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  icono: { width: 50, height: 50, marginRight: 20 },
  contenedorTexto: { justifyContent: 'center', flex: 1 },
  categoria: { color: '#94a3b8', fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 5 },
  nombre: { fontSize: 22, color: '#334155', marginBottom: 5 },
  fecha: { fontWeight: 'bold', color: '#64748b' },
  cantidad: { fontSize: 20, fontWeight: 'bold', color: '#3b82f6' }
});

export default Gasto;