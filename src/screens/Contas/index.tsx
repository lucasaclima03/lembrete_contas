import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';

import DatePicker from 'react-native-date-picker';

import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

export default function Contas() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
//   const [startDate, setStartDate] = useState();
  const [selectedStartDate, setSelectedStartDate] = useState(null);

  const startDate = selectedStartDate ? selectedStartDate.format('YYYY-MM-DD').toString() : '';

  return (
    <SafeAreaView>
      <View style={styles.container} >
        <Text style={styles.text}>Registre sua conta a pagar</Text>
        <TextInput style={styles.input} placeholder='Nome da conta' />
        <Text style={styles.text}>Escolha uma data para te lembrar</Text>        
        <View>
        <CalendarPicker
        scrollable= {true}   
            onDateChange={setSelectedStartDate}
        />        
        <Text>Data selecionada {startDate} </Text>

        </View>
        <View>
            
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    justifyContent: 'center',    
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    alignContent: 'flex-start',
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 15
  },
  input: {
    borderWidth: 1,
    padding: 5,
    marginHorizontal: 10
  }
});
