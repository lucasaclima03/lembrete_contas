import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

export default function Home() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>TESTE</Text>
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
  text: {    
    fontSize: 50,
  },
});
