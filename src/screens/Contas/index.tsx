import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import DatePicker from 'react-native-date-picker';

import CalendarPicker from 'react-native-calendar-picker';
import 'react-native-gesture-handler';

import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';
import {useNotification} from '../../services/notifee';
import {ScrollView} from 'react-native-gesture-handler';
import {useForm, Controller} from 'react-hook-form';
import {buildUnavailableHoursBlocks} from 'react-native-calendars/src/timeline/Packer';

import {ReminderModel} from '../../database/models/Reminder';
import {database} from '../../database';

export default function Contas() {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    register
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      amount: '',
      reminderDate: new Date((Date.now()) - 86400000 )
    },
  });

  // const onSubmit = (data) =>  {
  //   console.log('data ' + data)
  //   setReminderData(data);

  // }

  async function handleReminderData(reminderData ) {    
    console.log('REMINDER DATA ' + JSON.stringify(reminderData))    
    await database.write(async () => {
      const response = await database
      .get<ReminderModel>('reminder')
      .create(data => {
        data.title = reminderData.title;
        data.description = reminderData.description;
        data.amount = parseInt(reminderData.amount) ;
        data.due_date = reminderData.reminderDate.toString();
        data.payd = 0
      });
    });    
    Alert.alert('Lembre salvo com sucesso!')
    reset()          
  }
  
  const {
    displayNotification,
    displayTriggerNotification,
    cancelAllNotifications,
  } = useNotification();

  const handleDisplayNotification = async () => {
    // Display notification
    displayNotification('NotificationTitle', 'NotificationBody');
  };

  const handleCreateTriggerNotification = () => {
    // Display notification in 3 seconds
    displayTriggerNotification(
      'NotificationTitle',
      'NotificationBody',
      Date.now() + 5000,
    );
  };

  const [reminderData, setReminderData] = useState('');

  const [open, setOpen] = useState(false);

  const [selectedStartDate, setSelectedStartDate] = useState(null);

  const startDate = selectedStartDate
    ? selectedStartDate.format('YYYY-MM-DD').toString()
    : '';

  const [date, setDate] = useState(new Date() );

  const [title, setTitle] = useState([]);
  
  async function marcarNotificacao(title: string) {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    };

    await notifee.createTriggerNotification(
      {
        title: title,
        body: title,
        android: {
          channelId: channelId,
        },        
      },
      trigger,
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.contentArea}>
          <Text style={styles.text}>Registre sua conta a pagar</Text>
          <Controller
            control={control}
            rules={{
              required: true,
              maxLength: 50
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}                
                onChangeText={onChange}
                value={value}
              />
            )}
            name="title"
          />
          {errors.title && <Text style={styles.textError} >O campo é obrigatório</Text> }          
          <Text style={styles.text}>Descrição (opcional)</Text>
          <Controller
            control={control}            
            rules={{
              maxLength: 80,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput                
                style={styles.input}
                // onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="description"
          />
          {errors.description && <Text style={styles.textError} >O campo deve ter no máximo 80 caracteres</Text> }
          <Text style={styles.text}>Valor</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                // onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="amount"
          />
          <Text style={styles.text}>Escolha uma data para te lembrar</Text>
          <View style={styles.datePickerArea}>
            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <DatePicker
                  style={styles.datePicker}
                  locale="pt-br"
                  date={date}
                  onDateChange={onChange}                  
                  // minimumDate={new Date((Date.now()) + 86400000) }
                />
              )}
              name="reminderDate"
            />
          </View>

          <TouchableOpacity
            style={styles.submitFormButton}
            onPress={               
              handleSubmit(handleReminderData)
            }>
            <Text style={styles.submitFormButtonText}> Salvar </Text>
          </TouchableOpacity>          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  contentArea: {
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    alignContent: 'flex-start',
    marginLeft: '8%',
    marginTop: 10,
    color: 'black',
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
    marginBottom: 5,
  },
  submitFormButton: {
    backgroundColor: '#8B008B',
    alignItems: 'center',
    alignSelf: 'center',
    width: '50%',
    height: 50,
    borderWidth: 1,
    marginVertical: 15,
    borderRadius: 12,
    justifyContent: 'center',
  },
  submitFormButtonText: {
    fontSize: 18,
    color: 'white',
  },
  textError: {
    color: 'red',
    marginLeft: 35
  }
});
