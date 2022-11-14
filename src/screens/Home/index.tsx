import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function Home() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.card}>
            <View style={styles.icon} >
            <MaterialIcons name='android' size={50} />
            </View>
            <View style={styles.textArea}>
                <Text style={styles.headerText} >Unimed plano</Text>
                <Text>Pagar boleto adiantado desconto</Text>
            </View>
        </View>        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  card: {    
    alignItems: 'center',     
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 1,
    backgroundColor: 'green',
    height: 120    
  },
  icon: {
    width: 80,
    height: 80,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textArea: {    
    width: 250,
    height: 100,
    backgroundColor: 'orange'   ,
    justifyContent: 'space-evenly'
  },
  headerText: {
    fontSize: 25,
  },
  descriptionText: {   

  },
  text: {    
    fontSize: 50,
  },
});
