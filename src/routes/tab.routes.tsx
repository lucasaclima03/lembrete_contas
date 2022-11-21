import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from '../screens/Home';
import Contas from '../screens/Contas';
import PaydBills from '../screens/PaydBills';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator()

export function StackRoutes(){
    return (
        <Stack.Navigator>            
            <Stack.Screen name='tab-stack' component={TabRoutes} options={{headerShown: false }}  />   
        </Stack.Navigator>
    )
}

function DrawerRoutes(){
    return (
        <Drawer.Navigator         
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#4b8582',                                        
                },
                drawerActiveTintColor: 'white',
                drawerInactiveTintColor: 'white',
                drawerLabelStyle: {
                    fontSize: 18,
                    alignContent: 'center',
                }
            }}
        >
            <Drawer.Screen name='Minhas contas' component={Home}  />
            <Drawer.Screen name='Categorias' component={Home}  />
            <Drawer.Screen name='Configurações' component={Home}  />
            <Drawer.Screen name='Armazenamento' component={Home}  />
            <Drawer.Screen name='Ajuda' component={Home}  />
            <Drawer.Screen name='Quem Somos' component={Home}  />
        </Drawer.Navigator>

    )

}

export function TabRoutes(){
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={DrawerRoutes} options={{ headerShown: false, tabBarIcon: ({color, size})  => (
                <MaterialIcons name="home" color={color} size={size} />
            )}} />
            <Tab.Screen name='Conteúdos' component={Contas} options={{headerShown: false, tabBarIcon: ({color, size}) => (
                <MaterialIcons name="add-box" color={color} size={size} />
            )}} />
            <Tab.Screen name='Resumo' component={PaydBills} options={{headerShown: false, tabBarIcon: ({color, size}) => (
                <MaterialIcons name="favorite" color={color} size={size} />
            )}} />                        
        </Tab.Navigator>
    )
}