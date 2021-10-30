import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import LogoTitle from '../components/LogoTitle';

export default function SplashScreen({navigation}) {
  return <LogoTitle type="splash" />;
}
