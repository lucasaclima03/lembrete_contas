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
      reminderDate: Date.now(),
    },
  });

  // const onSubmit = (data) =>  {
  //   console.log('data ' + data)
  //   setReminderData(data);

  // }

  async function handleReminderData(reminderData ) {
    // reset({
      //   title: '',
      //   description: '',
    //   amount: '',
    //   reminderDate: Date.now()
    
    // })
    console.log('REMINDER DATA ' + JSON.stringify(reminderData))
    await database.write(async () => {
      const response = await database
      .get<ReminderModel>('reminder')
      .create(data => {
        data.title = reminderData.title;
        data.description = reminderData.description;
        data.amount = reminderData.amount;
        data.due_date = reminderData.reminderDate.toString() ;
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

  const [date, setDate] = useState(new Date());

  const [title, setTitle] = useState([]);

  // const saveReminder = async (reminderData) => {
  //   console.log('reminder data ' +reminderData)
  //   await database.write(async () => {
  //     const response = await database
  //       .get<ReminderModel>('reminder')
  //       .create(data => {
  //         data.title = reminderData.title;
  //         data.description = reminderData.description;
  //         data.amount = reminderData.amount;
  //         data.reminder_date = reminderData.reminderDate;
  //       });
  //       const getCircularReplacer = () => {
  //         const seen = new WeakSet();
  //         return (key, value) => {
  //           if (typeof value === "object" && value !== null) {
  //             if (seen.has(value)) {
  //               return;
  //             }
  //             seen.add(value);
  //           }
  //           return value;
  //         };
  //       };

  //       console.log(JSON.stringify(response, getCircularReplacer()));
  //   });
  //   Alert.alert('Lembre salvo com sucesso!')
  // };

  // console.log('lembrete ' + JSON.stringify(reminderData));

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
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                // onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="title"
          />
          {errors.title && <Text>This is required</Text>}
          <Text style={styles.text}>Descrição (opcional)</Text>
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
            name="description"
          />
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
                  locale="pt"
                  date={date}
                  onDateChange={onChange}                  
                />
              )}
              name="reminderDate"
            />
          </View>

          <TouchableOpacity
            style={styles.submitFormButton}
            onPress={               
              handleSubmit(handleReminderData)

            
              // saveReminder(reminderData);
            }>
            <Text style={styles.submitFormButtonText}> Salvar </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.submitFormButton}
            onPress={ async() => {
              await getReminders()
            } }>
            <Text style={styles.submitFormButtonText}> Listar </Text>
          </TouchableOpacity> */}

          {/* <View style={styles.container} >            
            <Button title='ver triggers' onPress={()=> notifee.getTriggerNotifications().then(ids => console.log('All trigger notifications: ', ids)) } />
            <Button title='marcar notificacao' onPress={()=> marcarNotificacao(title) } />                    
            <Button title="Cancel All Notifications" onPress={cancelAllNotifications} />
          </View> */}
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
});
