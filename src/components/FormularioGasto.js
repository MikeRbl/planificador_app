import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

const FormularioGasto = ({ setModalVisible, handleGasto, gastoEditar, setGastoEditar, eliminarGasto }) => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fecha, setFecha] = useState(dayjs());
  const [id, setId] = useState('');

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad.toString());
      setCategoria(gastoEditar.categoria);
      setFecha(dayjs(gastoEditar.fecha));
      setId(gastoEditar.id);
    } else {
      setNombre('');
      setCantidad('');
      setCategoria('');
      setFecha(dayjs());
      setId('');
    }
  }, [gastoEditar]);

  const agregarGasto = () => {
    if (nombre.trim() === '' || cantidad.trim() === '' || categoria === '') {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    const nuevoGasto = { nombre, cantidad: Number(cantidad), categoria, fecha: fecha.valueOf() };
    if (id) { nuevoGasto.id = id; }
    
    handleGasto(nuevoGasto);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setGastoEditar({});
  };

  return (
    <View style={styles.contenedor}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formulario}>
          <Text style={styles.titulo}>{gastoEditar.id ? 'Editar Gasto' : 'Nuevo Gasto'}</Text>
          
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Gasto</Text>
            <TextInput style={styles.input} placeholder="Ej. Comida" value={nombre} onChangeText={setNombre} />
          </View>
          
          <View style={styles.campo}>
            <Text style={styles.label}>Cantidad</Text>
            <TextInput style={styles.input} placeholder="Ej. 300" keyboardType="numeric" value={cantidad} onChangeText={setCantidad} />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Categoría</Text>
            <View style={styles.pickerContenedor}>
              <Picker selectedValue={categoria} onValueChange={(valor) => setCategoria(valor)}>
                <Picker.Item label="-- Seleccione --" value="" />
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

          <View style={styles.campo}>
            <Text style={styles.label}>Fecha Gasto</Text>
            <View style={styles.fechaContenedor}>
              <DateTimePicker mode="single" date={fecha} onChange={(params) => setFecha(params.date)} selectedItemColor="#3b82f6" headerButtonColor="#3b82f6" />
            </View>
          </View>

        {gastoEditar.id && (
          <Pressable 
            style={[styles.boton, styles.btnEliminar]} 
            onPress={() => eliminarGasto(id)}
          >
            <Text style={styles.botonTexto}>Eliminar Gasto</Text>
          </Pressable>
        )}
          
          <View style={styles.contenedorBotones}>
            <Pressable style={[styles.boton, styles.btnCancelar]} onPress={cerrarModal}>
              <Text style={styles.botonTexto}>Cancelar</Text>
            </Pressable>
            <Pressable style={[styles.boton, styles.btnAgregar]} onPress={agregarGasto}>
              <Text style={styles.botonTexto}>{gastoEditar.id ? 'Guardar Cambios' : 'Agregar Gasto'}</Text>
            </Pressable>
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#1E293B', paddingTop: 40, paddingHorizontal: 20 },
  formulario: { backgroundColor: '#fff', padding: 20, borderRadius: 15, elevation: 5, shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, marginBottom: 40 },
  titulo: { fontSize: 24, textAlign: 'center', marginBottom: 20, fontWeight: 'bold', color: '#3b82f6' },
  campo: { marginBottom: 15 },
  label: { color: '#64748b', fontWeight: 'bold', fontSize: 16, marginBottom: 5, textTransform: 'uppercase' },
  input: { backgroundColor: '#f5f5f5', padding: 12, borderRadius: 10, fontSize: 16 },
  pickerContenedor: { backgroundColor: '#f5f5f5', borderRadius: 10, overflow: 'hidden' },
  fechaContenedor: { backgroundColor: '#f5f5f5', borderRadius: 10, padding: 10 },
  contenedorBotones: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  boton: { padding: 15, borderRadius: 10, flex: 1 },
  btnCancelar: { backgroundColor: '#ef4444', marginRight: 10 },
  btnAgregar: { backgroundColor: '#3b82f6', marginLeft: 10 },
  btnEliminar: { backgroundColor: '#ef4444', marginBottom: 15 },
  botonTexto: { color: '#fff', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', fontSize: 14 }
});

export default FormularioGasto;