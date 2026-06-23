import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Importamos los componentes nativos de dibujo
import Svg, { Circle } from 'react-native-svg';
import { formatearCantidad } from '../helpers';

const ControlPresupuesto = ({ presupuesto, gastos }) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => total + Number(gasto.cantidad), 0);
    const totalDisponible = Number(presupuesto) - totalGastado;

    // Calculamos el porcentaje del 0 al 100
    const basePresupuesto = Number(presupuesto);
    const nuevoPorcentaje = basePresupuesto > 0 ? Math.round((totalGastado / basePresupuesto) * 100) : 0;

    setPorcentaje(nuevoPorcentaje);
    setGastado(totalGastado);
    setDisponible(totalDisponible);
  }, [gastos, presupuesto]);

  // Matemáticas para dibujar el círculo
  const size = 200;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Limitamos el progreso visual a 100 para que el círculo no se rompa si gastas de más
  const porcentajeGrafica = porcentaje > 100 ? 100 : porcentaje;
  const strokeDashoffset = circumference - (porcentajeGrafica / 100) * circumference;

  return (
    <View style={styles.contenedor}>
      <View style={styles.centrarGrafica}>
        <View style={styles.graficaWrapper}>
          
          {/* Gráfica Circular nativa a prueba de fallos */}
          <Svg width={size} height={size}>
            {/* Círculo de fondo (Gris) */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#F5F5F5"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Círculo de progreso (Azul o Rojo) */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={porcentaje > 100 ? '#ef4444' : '#3b82f6'}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${size / 2} ${size / 2})`} // Comienza desde arriba (12 en el reloj)
            />
          </Svg>

          {/* Texto central */}
          <View style={styles.textoCentral}>
            <Text style={styles.porcentajeTexto}>{porcentaje}%</Text>
            <Text style={styles.gastadoTexto}>Gastado</Text>
          </View>
        </View>
      </View>

      <View style={styles.contenedorTexto}>
        <Text style={styles.valor}>
          <Text style={styles.label}>Presupuesto: </Text>
          {formatearCantidad(presupuesto)}
        </Text>
        <Text style={styles.valor}>
          <Text style={styles.label}>Disponible: </Text>
          {formatearCantidad(disponible)}
        </Text>
        <Text style={styles.valor}>
          <Text style={styles.label}>Gastado: </Text>
          {formatearCantidad(gastado)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    padding: 30,
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: -40,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center'
  },
  centrarGrafica: {
    alignItems: 'center',
    marginBottom: 30
  },
  graficaWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200
  },
  textoCentral: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  porcentajeTexto: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333'
  },
  gastadoTexto: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: 'bold'
  },
  contenedorTexto: {
    width: '100%',
    alignItems: 'flex-start'
  },
  valor: {
    fontSize: 20,
    marginBottom: 10,
    color: '#333'
  },
  label: {
    fontWeight: 'bold',
    color: '#3b82f6'
  }
});

export default ControlPresupuesto;