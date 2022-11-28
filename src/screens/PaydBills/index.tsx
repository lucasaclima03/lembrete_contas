import {
  Alert,
  FlatList,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import 'react-native-gesture-handler';
import React, {useState, useEffect, useCallback} from 'react';
import {database} from '../../database';
import {useFocusEffect} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import { Q } from '@nozbe/watermelondb';

export default function PaydBills() {
  useFocusEffect(
    useCallback(() => {
      getPaydBills();
    }, []),
  );

  const [paydBills, setPaydBills] = useState();

  const getPaydBills = async () => {
    const remindersCollection = database.get('reminder');
    const response = await remindersCollection.query(Q.where('payd', 1)).fetch();
    setPaydBills(response);
  };

  async function removeReminder(reminder) {
    Alert.alert('Atenção', 'Deseja realmente remover o item?', [
      {
        text: 'Cancel',
      },
      {
        text: 'Ok',
        onPress: async () =>
          await database.write(async () => {
            await reminder.destroyPermanently();
            getPaydBills();
          }),
      },
    ]);
  }

  function formatDate(date) {
    const newDate = new Date(date);
    // const result = date.
    const day = newDate.getDay();
    const month = newDate.getMonth();
    const formatedDate = `${day}/${month}   `;
    return formatedDate;
  }
  function returnDay(date) {
    const newDate = new Date(date);
    const day = newDate.getDay();
    return day;
  }
  function returnMonth(date) {
    const newDate = new Date(date);
    const month = newDate.getMonth();
    return month;
  }

  function PaydBillsCard() {
    const renderItem = ({item}) => {
      return (
        <View style={styles.cardContainer} >          
            <View style={styles.container}>
              <View style={styles.containerDate}>
                <Text style={styles.containerDay}>
                  {returnDay(item.due_date)}{' '}
                </Text>
                <Text style={styles.containerMonth}>
                  {returnMonth(item.due_date)}{' '}
                </Text>
              </View>
              <View style={styles.containerContent}>
                <TouchableOpacity activeOpacity={0.8} style={styles.moreIcon} onPress={() => removeReminder(item)}>
                  <MaterialIcons name="more-vert" size={22} />
                </TouchableOpacity>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.amount} > R$ {item.amount}</Text>
              </View>
            </View>          
        </View>
      );
    };
    return (
      <FlatList
        style={styles.billsList}
        data={paydBills}
        renderItem={renderItem}        
      />
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.containerList}>
        <Text style={styles.nearToDueDateText}>Faturas Pagas</Text>
        <PaydBillsCard />        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  amount: {
    color: 'black',
    marginLeft: -3,
    marginTop: 15    
  },
  moreIcon: {    
    alignSelf: 'flex-end',
  },
  containerList: {
    height: '100%',    
    width: '100%',
    alignSelf: 'center'    
  },
  billsList: {
    marginTop: 5,
    marginBottom: 5,    
  },  
  cardContainer: {    
    alignSelf: 'center',
    width: '100%'
  },
  container: {
    padding: 10,    
    marginBottom: 5,
    flexDirection: 'row',    
    // alignSelf: 'center',    
    height: 160,
    justifyContent: 'center'
  },
  containerDate: {        
    
  },
  containerDay: {
    fontSize: 30,
    color: 'white',
    fontWeight: '600',    
    backgroundColor: '#8B008B',        
    textAlign: 'center',
    textAlignVertical: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingLeft: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,    
    height: '50%',
  },
  containerMonth: {
    fontSize: 30,
    color: 'white',
    fontWeight: '600',    
    backgroundColor: '#8B008B',
    textAlign: 'center',
    textAlignVertical: 'center',    
    paddingLeft: 5,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    shadowColor: 'black',
    shadowRadius: 8,
    elevation: 10,
    height: '50%'
  },
  containerContent: {    
    // alignItems: 'flex-start',
    marginLeft: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 20,
    width: '80%',
    shadowColor: 'black',
    shadowRadius: 8,
    elevation: 10,
    height: '100%',    
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
    height: 120,    
  },  
  textArea: {
    // width: 250,
    // height: 100,
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
  nearToDueDateText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
    marginTop: 10,
  },
  paydBillsText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
    marginTop: 10,
  },
  overdueBillsText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
    marginTop: 10,
  },
  listFooter: {
    fontSize: 15,
    paddingTop: 5,
    marginLeft: 10,
  },
});
