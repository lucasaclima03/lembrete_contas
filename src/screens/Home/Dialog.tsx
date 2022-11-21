import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Dialog(props){
    
    return (
        <Modal transparent visible={props.visible} >
            <View style={styles.container} >
                <View style={styles.messageArea} >
                    <Text style= {styles.title} >{props.item.item.title}</Text>
                    <Text style= {styles.title} > {props.message} </Text>
                    <TouchableOpacity style={styles.cancelButton} onPress={props.negativeButton} >
                        <Text>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.confirmButton} onPress={props.positiveButton} >
                        <Text>Confirmar</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0, 0.2 )'
    },
    messageArea: {
        width: '90%',
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#FFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor:'white'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color:'white'
    },
    cancelButton: {
        backgroundColor: 'pink',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 5,
        margin: 5
    },
    confirmButton: {
        backgroundColor: 'green',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 5,
        margin: 5

    }

})