import React, {useEffect} from 'react';
import { Routes } from './src/routes';
import Home from './src/screens/Home';
import 'react-native-gesture-handler';
import notifee, {EventType} from '@notifee/react-native'

export default function App(){

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);
  return (
    <Routes/>

  )
}