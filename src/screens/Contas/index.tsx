import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

import DatePicker from 'react-native-date-picker';

import CalendarPicker from 'react-native-calendar-picker';
import 'react-native-gesture-handler';

import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native'
import { useNotification } from '../../services/notifee';
import { ScrollView } from 'react-native-gesture-handler';
import {useForm, Controller} from 'react-hook-form';
import { buildUnavailableHoursBlocks } from 'react-native-calendars/src/timeline/Packer';

export default function Contas() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: ''
    }
  });
  const onSubmit = data => console.log(data);

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
  return (
    <SafeAreaView style={styles.container} >
      <ScrollView>
        <View style={styles.contentArea} >
          <Text style={styles.text}>Registre sua conta a pagar</Text>
          <Controller 
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value} }) => (            
              <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}            
              />
            )}            
            name="title"       
          />
          {errors.title && <Text>This is required</Text> }
          <Text style={styles.text}>Descrição (opcional)</Text>
          <Controller
            control={control}
            rules={{
            maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="description"
            />
            <Text style={styles.text}>Valor</Text>
            <Controller
            control={control}
            rules={{
            maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="description"
            />
            <Text style={styles.text}>Escolha uma data para te lembrar</Text>
            <View style={styles.datePickerArea} >
              <Controller          
                control={control}
                rules={{
                maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <DatePicker style={styles.datePicker} locale='pt' date={date} onDateChange={setDate} />
                )}
                name="description"
              />
            </View>          

            <TouchableOpacity style={styles.submitFormButton} onPress={handleSubmit(onSubmit)} >
              <Text style={styles.submitFormButtonText} > Salvar </Text>
            </TouchableOpacity>            
            
          <View style={styles.container} >            
            <Button title='ver triggers' onPress={()=> notifee.getTriggerNotifications().then(ids => console.log('All trigger notifications: ', ids)) } />
            <Button title='marcar notificacao' onPress={()=> marcarNotificacao(title) } />                    
            <Button title="Cancel All Notifications" onPress={cancelAllNotifications} />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {    
    backgroundColor: 'white'
  },
  contentArea: {
    marginTop: 20
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    alignContent: 'flex-start',
    marginLeft: '8%',    
    marginTop: 10,
    color: 'black'
  },
  datePicker: {
    marginVertical: 25,         
  },
  datePickerArea: {
    alignItems: 'center',      
  },
  input: {    
    padding: 5,
    marginLeft: '8%',
    marginHorizontal: 10,
    borderBottomWidth: 1,
    width: '80%',
    marginBottom: 5
  },
  submitFormButton: {
    backgroundColor: 'pink',
    alignItems: 'center',
    alignSelf: 'center',    
    width: '50%',
    height: 50,
    borderWidth: 1,
    marginVertical: 15,
    borderRadius: 12
  },
  submitFormButtonText: {    
    flex: 1,    
    fontSize: 20,
    
    
    // justifyContent: 'center',
    // width: '100%',
    // height: '100%'    
  }
});
