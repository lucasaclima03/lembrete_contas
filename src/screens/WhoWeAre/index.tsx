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
    Modal,
    Pressable,
  } from 'react-native';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import 'react-native-gesture-handler';
  import React, {useState, useEffect, useCallback} from 'react';
  import {database} from '../../database';
  import {useFocusEffect} from '@react-navigation/native';
  import {ScrollView} from 'react-native-gesture-handler';  
  import { Q } from '@nozbe/watermelondb'
  
  export default function WhoWeAre() {    
  
    
    return (
      <SafeAreaView>
        <View style={styles.container}>
            <Text style={styles.headerText} > Olá! </Text>
            <Text style={styles.text}>Obrigado por usar nosso app! Lucas é desenvolvedor de softwares e Camila UX/UI designer. Juntos criamos esse app para facilitar o controle financeiro das pessoas. </Text>
          
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({       
   
    container: {
    //   padding: 10,
    //   marginBottom: 5,          
    //   justifyContent: 'center',
    },        
    headerText: {
      fontSize: 25,
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      marginTop: 15
    },    
    text: {
      fontSize: 20,      
      textAlign: 'justify',
      marginHorizontal: 15
      
    },
    
  });
  