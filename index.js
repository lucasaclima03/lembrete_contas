/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, {EventType} from '@notifee/react-native'
import 'react-native-gesture-handler';



notifee.onBackgroundEvent(async({type, detail})=>{

    const {notification} = detail

    console.log('Detalhe ' + JSON.stringify(detail) )
    console.log('type ' + type)   

    // await notifee.cancelNotification(notification.id);

})

AppRegistry.registerComponent(appName, () => App);
