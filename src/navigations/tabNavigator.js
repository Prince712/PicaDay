import React from 'react';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Info from '../screens/Info';
import Icon from 'react-native-vector-icons/Ionicons';
import LogoTitle from '../components/LogoTitle';
import FabButton from '../components/FabButton';
import {useSelector} from 'react-redux';
import moment from 'moment';
const BottomBar = createBottomTabNavigator();

export const TabBar = ({navigation}) => {
  const Posts = useSelector(state => state.posts.data);

  return (
    <BottomBar.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Info') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#314743',
        tabBarInactiveTintColor: '#6C6C6C',
        tabBarShowLabel: false,
        headerTitle: props => <LogoTitle {...props} />,
        headerTitleAlign:'center'
      })}>
      <BottomBar.Screen name="Home" component={Home} />
      <BottomBar.Screen
        name="Postbutton"
        component={Info}
        options={{
          tabBarButton: props => <FabButton bgColor={'white'} {...props} />,
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
             
            navigation.navigate('AddPost');                      
          },
        })}
      />
      <BottomBar.Screen name="Info" component={Info} />
    </BottomBar.Navigator>
  );
};
