import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, SafeAreaView, TextPropTypes } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons'
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns'

import { storeTask, indexTask } from './src/api';

export default function App() {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false)
  const [data, setData] = useState([])

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const submit = () => {
    const stringDate = date.toString()
    storeTask([...data, ...[{ id: Math.random(), title, date: stringDate }]])
  }

  useEffect(() => {
    indexTask(setData)
  }, [])

  const removeItem = (props) => {
    storeTask(data.filter(item => props !== item))
  }

  const renderItem = ({ item }) => {
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)
    let status = {}
    const convertDate = new Date(item.date)
    convertDate.setHours(0, 0, 0, 0)

    if (currentDate > item.date) {
      status = { color: 'red', text: 'Atrasado' }
    } else if (currentDate.getTime() === convertDate.getTime()) {
      status = { color: 'yellow', text: 'Finalizar Hoje' }
    } else {
      status = { color: 'green', text: 'Tem Tempo...' }
    }

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <View style={{ borderColor: status.color, padding: 20, borderWidth: 1, width: '80%', borderRadius: 16, }}>
          <Text>{status.text}</Text>
          <Text>{item.title}</Text>
          <View><Text>Data de conclusão: {format(convertDate, 'dd/MM/yyyy')}</Text></View>
        </View>
        <TouchableOpacity onPress={() => removeItem(item)}><Ionicons name='trash' size={24} color='red' /></TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Lista de Tarefas</Text>
        </View>
        <View style={{ alignItems: 'center', flexDirection: 'row', width: '100%', marginTop: 16, justifyContent: 'space-between' }}>
          <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Tarefa: </Text>
          <TextInput style={{ width: '80%', borderColor: 'grey', borderWidth: 1, padding: 8, borderRadius: 8, color: 'black' }} value={title} onChangeText={(value) => { setTitle(value) }} autoCorrect={false} />
        </View>
        <View style={{ alignItems: 'center', flexDirection: 'row', width: '100%', marginTop: 16, justifyContent: 'space-between' }}>
          <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Data de conclusão: </Text>
          <RNDateTimePicker mode="date" display="calendar" value={date} onChange={onChange} style={{ height: 50, width: 100, color: 'black' }} />
          <TouchableOpacity onPress={() => { setShow(!show) }}><AntDesign name="calendar" size={24} color="grey" /></TouchableOpacity>
        </View>
        {show && (<RNDateTimePicker mode="date" display="spinner" value={date} onChange={onChange} />)}

        <TouchableOpacity onPress={submit} style={{ marginVertical: 16, width: '100%', padding: 8, backgroundColor: '#ed145b', alignItems: 'center', borderRadius: 8 }}><Text style={{
          color: 'black',
          fontSize: 16,
          fontWeight: '700'
        }}>Adicionar</Text></TouchableOpacity>
        <FlatList
          data={data}
          style={{ marginBottom: 200 }}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
//'#1c2022'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
  },
  containerView: {
    width: '100%',
    padding: 16
  },
  header: {
    backgroundColor: '#ed145b',
    width: '100%',
    borderRadius: 4,
    alignItems: 'center'
  },
  headerText: {
    color: '#1c2022',
    fontSize: 16,
    fontWeight: '700'
  },
});
