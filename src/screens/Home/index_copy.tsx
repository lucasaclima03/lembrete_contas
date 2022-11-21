import {
  Alert,
  FlatList,
  SafeAreaView,
  SectionList,
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
import { ScrollView } from 'react-native-gesture-handler';

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

  function NearToDueDate(){
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity onLongPress={()=> removeReminder(item) } style={styles.touchableOpacity} >
              <View style={styles.container}>
                <View style={styles.containerDate}>
                  <Text style={styles.containerDay}>{returnDay(item.due_date)} </Text>
                  <Text style={styles.containerMonth}>{returnMonth(item.due_date)} </Text>
                </View>
                <View style={styles.containerContent}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                  {/* <Text style={styles.description}>vencimento em: {item.due_date ? formatDate(item.due_date) : 'sem data cadastrada' } </Text> */}
                </View>
              </View>
            </TouchableOpacity>
      )
    }
    return (
      <FlatList                        
        horizontal={true}        
        style={styles.billsList}
        data={savedReminders}
        renderItem={renderItem}        
        // renderItem={({item}) => {
        //   return (
        //     <TouchableOpacity onLongPress={()=> removeReminder(item) } >
        //       <View style={styles.container}>
        //         <View style={styles.containerDate}>
        //           <Text style={styles.containerDay}>{returnDay(item.due_date)} </Text>
        //           <Text style={styles.containerMonth}>{returnMonth(item.due_date)} </Text>
        //         </View>
        //         <View style={styles.containerContent}>
        //           <Text style={styles.title}>{item.title}</Text>
        //           <Text style={styles.description}>{item.description}</Text>
        //           {/* <Text style={styles.description}>vencimento em: {item.due_date ? formatDate(item.due_date) : 'sem data cadastrada' } </Text> */}
        //         </View>
        //       </View>
        //     </TouchableOpacity>
        //   );
        // }}
      />

    )
  }

  function PaydBills() {
    const renderItem = ({item}) => {
      return (        
        <TouchableOpacity onLongPress={()=> removeReminder(item) } style={styles.touchableOpacity} >
              <View style={styles.container}>
                <View style={styles.containerDate}>
                  <Text style={styles.containerDay}>{returnDay(item.due_date)} </Text>
                  <Text style={styles.containerMonth}>{returnMonth(item.due_date)} </Text>
                </View>
                <View style={styles.containerContent}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                  {/* <Text style={styles.description}>vencimento em: {item.due_date ? formatDate(item.due_date) : 'sem data cadastrada' } </Text> */}
                </View>
              </View>
        </TouchableOpacity>

        
      )
    }
    return (
      <FlatList               
        horizontal={true}
        style={styles.billsList}
        data={savedReminders}
        renderItem={renderItem}
        // contentContainerStyle={{flexDirection: 'row', height: 150}}
        
        
        // renderItem={({item}) => {
        //   return (
        //     <TouchableOpacity onLongPress={()=> removeReminder(item) } >
        //       <View style={styles.container}>
        //         <View style={styles.containerDate}>
        //           <Text style={styles.containerDay}>{returnDay(item.due_date)} </Text>
        //           <Text style={styles.containerMonth}>{returnMonth(item.due_date)} </Text>
        //         </View>
        //         <View style={styles.containerContent}>
        //           <Text style={styles.title}>{item.title}</Text>
        //           <Text style={styles.description}>{item.description}</Text>
        //           {/* <Text style={styles.description}>vencimento em: {item.due_date ? formatDate(item.due_date) : 'sem data cadastrada' } </Text> */}
        //         </View>
        //       </View>
        //     </TouchableOpacity>
        //   );
        // }}
      />
    )

  }

  function OverdueBills(){
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity onLongPress={()=> removeReminder(item) } style={styles.touchableOpacity}  >
              <View style={styles.container}>
                <View style={styles.containerDate}>
                  <Text style={styles.containerDay}>{returnDay(item.due_date)} </Text>
                  <Text style={styles.containerMonth}>{returnMonth(item.due_date)} </Text>
                </View>
                <View style={styles.containerContent}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                  {/* <Text style={styles.description}>vencimento em: {item.due_date ? formatDate(item.due_date) : 'sem data cadastrada' } </Text> */}
                </View>
              </View>
            </TouchableOpacity>
      )
    }

    return ( 
      
      <FlatList
        horizontal={true}
        style={styles.billsList}
        data={savedReminders}
        renderItem={renderItem}
      />        
    )

  }


  return (
    <SafeAreaView style={{flex: 1,  }}>
      <ScrollView>
        <SafeAreaView  >
          <Text style={styles.nearToDueDateText} >Próximas ao vencimento</Text>
          <NearToDueDate />
          <Text style={styles.listFooter} >Ver todas</Text>      
        </SafeAreaView>
        <SafeAreaView  >
          <Text style={styles.paydBillsText} >Contas pagas</Text>
          <PaydBills />
          <Text style={styles.listFooter} >Ver todas</Text>      
        </SafeAreaView>
        <SafeAreaView >
          <Text style={styles.overdueBillsText} >Atrasadas</Text>
            <OverdueBills />      
          <Text style={styles.listFooter} >Ver todas</Text>      
        <Text  >FIM</Text>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  billsList: {
    marginTop: 5,    
    height: 200,    
  },
  touchableOpacity:{
    // width: '100%',
    // backgroundColor: 'black',
    // borderRadius: 50,
    alignSelf: 'center',    
    // flexDirection: 'column',
    // flexWrap: 'wrap'
    // borderWidth: 1,
    marginHorizontal: 8,    
    
  },
  container: {
    padding: 10,
    marginTop: 0,
    marginBottom: 5,
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center', 
    // backgroundColor:'gray',
    borderRadius: 20,
    // borderWidth: 1,    
    height: 150
    
    

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
    paddingLeft: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10    
  },
  containerMonth: {
    fontSize: 30,
    color: 'white',
    fontWeight: '600',
    // alignSelf: 'center',
    backgroundColor: '#8B008B',
    textAlign: 'center',
    width: '100%',   
    paddingLeft: 5,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    shadowColor: 'black',
    shadowRadius: 8,
    elevation: 10
  },
  containerContent: {    
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 20,        
    width: 200,
    shadowColor: 'black',
    shadowRadius: 8,
    elevation: 10,
    height: '100%'

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
  nearToDueDateText:{
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
    marginTop: 10,    
  },
  paydBillsText:{
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
    marginTop: 10

  },
  overdueBillsText:{
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
    marginTop: 10
  },
  listFooter:{
    fontSize: 15,
    paddingTop: 5,
    marginLeft: 10
  }
});
