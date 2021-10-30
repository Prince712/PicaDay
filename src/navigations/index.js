import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import SplashScreen from '../screens/SplashScreen';
import HomeStack from './stackNavigator';

export default function RouteComponent() {
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 1500);
  }, []);
  return (
    <NavigationContainer>
      {loading ? <SplashScreen /> : <HomeStack />}
    </NavigationContainer>
  );
}
