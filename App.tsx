import { Jost_400Regular, Jost_600SemiBold, useFonts } from '@expo-google-fonts/jost';
import AppLoading from 'expo-app-loading';
import * as Notifications from "expo-notifications";
import React, { useEffect } from 'react';
import Routes from './src/routes';

export default function App() {
  let [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      async notification =>{
        const data = notification.request.content.data.plant as PlantProps;
        console.log(data);
      }
    )

      return () => subscription.remove();
  }, [])

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Routes />
  )
}
