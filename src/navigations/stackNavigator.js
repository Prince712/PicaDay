import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabBar} from './tabNavigator';
import Details from '../screens/Details';
import AddPost from '../screens/AddPost';
import LogoTitle from '../components/LogoTitle';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: props => <LogoTitle {...props} />,
        headerTitleAlign:'center'
      }}>
      <Stack.Screen
        name="HomeTabs"
        component={TabBar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        // options={{title: 'Details'}}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPost}
        // options={{title: 'Add Post'}}
      />
    </Stack.Navigator>
  );
}
