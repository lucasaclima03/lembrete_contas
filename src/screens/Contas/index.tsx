import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';

import DatePicker from 'react-native-date-picker';

import CalendarPicker from 'react-native-calendar-picker';
import 'react-native-gesture-handler';


import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native'
import { useNotification } from '../../services/notifee';
import { ScrollView } from 'react-native-gesture-handler';

export default function Contas() {

  const {
    displayNotification,
    displayTriggerNotification,
    cancelAllNotifications
  } = useNotification();

  const handleDisplayNotification = async() => {
    // Display notification
    displayNotification('NotificationTitle', 'NotificationBody');
  }

  const handleCreateTriggerNotification = () => {
    // Display notification in 3 seconds
    displayTriggerNotification('NotificationTitle', 'NotificationBody', Date.now() + 5000);
  }
  
  const [open, setOpen] = useState(false);

  const [selectedStartDate, setSelectedStartDate] = useState(null);

  const startDate = selectedStartDate ? selectedStartDate.format('YYYY-MM-DD').toString() : '';

  const [date, setDate] = useState(new Date())

  const [title, setTitle] = useState('')
  

  async function marcarNotificacao(title: string){

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    })        

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime()
    };

    console.log('trigger ' + JSON.stringify(trigger))
    console.log('data ' + date)

  await notifee.createTriggerNotification(
    {
      title: title,
      body: title,
      android: {
        channelId: channelId
      }
      
    },
    trigger,
  );  

  }

  console.log('texto ' + title)  

  return (
    <SafeAreaView>
      <ScrollView>
      <View style={styles.container} >
        <Text style={styles.text}>Registre sua conta a pagar</Text>
        <TextInput style={styles.input} placeholder='Nome da conta' onChangeText={(text) => setTitle(text)} />
        <Text style={styles.text}>Escolha uma data para te lembrar</Text>        
        <View>
        {/* <CalendarPicker        
            onDateChange={setSelectedStartDate}
        />         */}
        <Text>Data selecionada {startDate} </Text>

        </View>
        <View>
            
        </View>
        <Button title='ver triggers' onPress={()=> notifee.getTriggerNotifications().then(ids => console.log('All trigger notifications: ', ids)) } />
        <Button title='marcar notificacao' onPress={()=> marcarNotificacao(title) } />
        <Button title="Display Notification" onPress={handleDisplayNotification} />
        <Button title="Create Trigger Notification" onPress={handleCreateTriggerNotification} />
        <Button title="Cancel All Notifications" onPress={cancelAllNotifications} />
        <DatePicker locale='pt' date={date} onDateChange={setDate} />
      </View>

      </ScrollView>
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
