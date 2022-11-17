import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import 'react-native-gesture-handler';



export default function Home() {
  const data = [
    {id:1, day:1, month: 'Sep'}, 
    {id:2, day:2, month: 'Jan'}, 
    {id:3, day:3, month: 'Aug'}, 
    {id:4, day:4, month: 'Dec'}, 
    {id:5, day:5, month: 'Jul'}, 
    {id:6, day:6, month: 'Oct'}, 
    {id:7, day:7, month: 'Sep'},
    {id:8, day:8, month: 'Jan'},
    {id:9, day:9, month: 'May'},
  ]


  return (

    <SafeAreaView>
      <FlatList 
        style={styles.billsList}
        data={data}        
        renderItem={({item}) => {
          return (
            <TouchableOpacity>
              <View style={styles.container}>
                <View style={styles.containerDate}>
                  <Text style={styles.containerDay}>{item.day}</Text>
                  <Text style={styles.containerMonth}>{item.month}</Text>
                </View>
                <View style={styles.containerContent}>
                  <Text style={styles.title}>Unimed plano</Text>
                  <Text style={styles.description}>Pagar boleto adiantado desconto</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        } }

      />
    </SafeAreaView>    
      
    
  );
}

const styles = StyleSheet.create({
  billsList: {
    marginTop: 20
  },
  container: {
    padding:10,
    marginTop:5,
    marginBottom:5,
    flexDirection: 'row',
  },
  containerDate: {
    flexDirection: 'column',
  },
  containerDay: {
    fontSize:50,
    color: "#0099FF",
    fontWeight: "600",
  },
  containerMonth: {
    fontSize:16,
    color: "#0099FF",
    fontWeight: "600",
  },
  containerContent: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft:10,
    backgroundColor: '#FFFFFF',
    padding:10,
    borderRadius:10
  },
  description: {
    fontSize:15,
    color: "#646464",
  },
  title: {
    fontSize:16,
    color:"#151515",

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
