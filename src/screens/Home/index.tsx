import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import 'react-native-gesture-handler';
import React, {useState, useEffect, useCallback} from 'react';
import {database} from '../../database';
import {useFocusEffect} from '@react-navigation/native';

export default function Home() {
  useFocusEffect(
    useCallback(() => {
      getReminders();
    }, []),
  );

  const [savedReminders, setSavedReminders] = useState();

  const getReminders = async () => {
    const remindersCollection = database.get('reminder');
    const response = await remindersCollection.query().fetch();
    setSavedReminders(response);
  };

  async function removeReminder(reminder){
    Alert.alert("Atenção", "Deseja realmente remover o item?",[
        {
          text: "Cancel"
        },
        {
          text: "Ok",
          onPress: async() => await database.write( async() => {
            await reminder.destroyPermanently();
            getReminders();            
          })
        }
    ])
  
  
} 

  function formatDate(date){
    const newDate = new Date(date)
    // const result = date.
    const day = newDate.getDay()
    const month = newDate.getMonth()
    const formatedDate = `${day}/${month}   `    
    return formatedDate
  }
  function returnDay(date){
    const newDate = new Date(date)
    const day = newDate.getDay()    
    return day
  }
  function returnMonth(date){
    const newDate = new Date(date)
    const month = newDate.getMonth()
    return month
  }


  return (
    <SafeAreaView>
      <FlatList
        style={styles.billsList}
        data={savedReminders}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onLongPress={()=> removeReminder(item) } >
              <View style={styles.container}>
                <View style={styles.containerDate}>
                  <Text style={styles.containerDay}>{returnDay(item.due_date)} </Text>
                  <Text style={styles.containerMonth}>{returnMonth(item.due_date)} </Text>
                </View>
                <View style={styles.containerContent}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                  <Text style={styles.description}>vencimento em: {item.due_date ? formatDate(item.due_date) : 'sem data cadastrada' } </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  billsList: {
    marginTop: 20,
  },
  container: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
  },
  containerDate: {
    flexDirection: 'column',    
    // paddingLeft: 5,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 50,    
    // width: '100%'
  },
  containerDay: {
    fontSize: 30,
    color: 'white',
    fontWeight: '600',
    alignSelf: 'center',
    alignContent: 'center',
    backgroundColor: '#8B008B',
    width: '100%',    
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',    
    paddingLeft: 5   

  },
  containerMonth: {
    fontSize: 30,
    color: 'white',
    fontWeight: '600',
    // alignSelf: 'center',
    backgroundColor: '#8B008B',
    textAlign: 'center',
    width: '100%',   
    paddingLeft: 5   
    
  },
  containerContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
  },
  description: {
    fontSize: 15,
    color: '#646464',
  },
  title: {
    fontSize: 16,
    color: '#151515',
  },
  card: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 1,
    backgroundColor: 'green',
    height: 120,
  },
  icon: {
    width: 80,
    height: 80,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textArea: {
    width: 250,
    height: 100,
    backgroundColor: 'orange',
    justifyContent: 'space-evenly',
  },
  headerText: {
    fontSize: 25,
  },
  descriptionText: {},
  text: {
    fontSize: 50,
  },
});
