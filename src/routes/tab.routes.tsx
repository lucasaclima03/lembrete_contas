import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from '../screens/Home';
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
        <Drawer.Navigator>
            <Drawer.Screen name='drawer' component={Home}  />
        </Drawer.Navigator>

    )

}

export function TabRoutes(){
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={DrawerRoutes} options={{ headerShown: false, tabBarIcon: ({color, size})  => (
                <MaterialIcons name="home" color={color} size={size} />
            )}} />
            <Tab.Screen name='Conteúdos' component={Home} options={{headerShown: false, tabBarIcon: ({color, size}) => (
                <MaterialIcons name="list" color={color} size={size} />
            )}} />
            <Tab.Screen name='Favoritos' component={DrawerRoutes} options={{headerShown: false, tabBarIcon: ({color, size}) => (
                <MaterialIcons name="favorite" color={color} size={size} />
            )}} />                        
        </Tab.Navigator>
    )
}