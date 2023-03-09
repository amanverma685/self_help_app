import React,{useEffect,useState} from 'react';
import {StyleSheet, View,Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();

const HomeScreen = () => {
    //TODO
    // Fetch Initial Survey Details and User Details  
    const [daysFirstLogin, setDaysFirstLogin] = useState(false)


    useEffect(() => {
      
    
    }, [])
    
    
    return (
      <SafeAreaView>
        <View>
          <Text>HomeScreen</Text>
          
        </View>
    </SafeAreaView>
  );
};

export default HomeScreen;