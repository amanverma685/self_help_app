import { View, Text } from 'react-native'
import React,{useState,useEffect} from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from './HomeScreen';
import ChatScreen from './ChatScreen';
import SessionScreen from './SessionScreen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InitialQuizScreen from './InitialQuizScreen';
import ProfileScreen from './ProfileScreen';
const Tab = createMaterialBottomTabNavigator();


const LandingScreen = () => {

  const [isIntialSessionCompleted,setInitialSessionCompleted]= useState(true);
  
  useEffect(() => {
    
  
    return () => {
      
    }
  }, []);

  return (

    (isIntialSessionCompleted==true) && (<Tab.Navigator
    initialRouteName="HomeScreen"
    activeColor="blue"
    inactiveColor="black"
    activeBackgroundColor="gray"
    inactiveBackgroundColor="green"
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="SessionScreen"
        component={SessionScreen}
        options={{
          tabBarLabel: 'Session',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar-today" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Relax"
        component={SessionScreen}
        options={{
          tabBarLabel: 'MoodLift',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="baby-face-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>)||
    
    (isIntialSessionCompleted==false)  && <InitialQuizScreen />
    

  );
}

export default LandingScreen