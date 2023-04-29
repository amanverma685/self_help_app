import React, { useState,useEffect} from 'react';
import { View, Text, FlatList,Image, TouchableOpacity, Alert,ActivityIndicator } from 'react-native';
import { getSessionsInAWeek, getUserProfile } from '../services/URLs';
// import SessionList from '../components/SessionList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SessionButtonComponent from '../components/SessionButtonComponent';
import { BackHandler } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { async } from '@firebase/util';

const SessionScreen = ({navigation}) => {

  const [currentSession,setCurrentSession]=useState(1);
  const [currentWeek,setCurrentWeek]=useState(1);
  const [selectedWeek,setSelectedWeek] = useState(1);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const [sessionData,setSessionData]= useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const isFocused = useIsFocused();
  const [firstTimeCall,setFirstTimeCall]=useState(true);

  useEffect(() => {
    
    if(firstTimeCall===true)
    { 
      getUserProfileData();
    }

    getSessionsInSelectedWeek(currentWeek);

  }, [])

  const weekButtons =["Week 1","Week 2","Week 3","Week 4","Week 5"]

  
  const getUserProfileData=async()=>{

    const id = await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('token');
    const userProfileURL = getUserProfile+id;

    let config = {
      headers:{
          Authorization:token,
          "ngrok-skip-browser-warning":"69420"
      }
  }
  await axios.get(userProfileURL,config)
      .then((res) => {
        if(res.data.weekDone === -1 || res.data.sessionDone === -1)
        {
          setSelectedButtonIndex(res.data.weekDone);
          setCurrentWeek(res.data.weekDone+2);
          setCurrentSession(res.data.sessionDone+2);
        }
        else {
          setSelectedButtonIndex(res.data.weekDone);
          setCurrentWeek(res.data.weekDone+1);;
          setCurrentSession(res.data.sessionDone+1);
        }

    })
      .catch(err => {
        console.log(err)});
        setFirstTimeCall(false);
    };
  
  const handleButtonPress =async (index) => {

    setSelectedButtonIndex(index);
    setSelectedWeek(index+1);
    
    if(currentWeek<index+1)
      return (
        Alert.alert("Are you want to skip sessions?",
        "Sorry you are not allowed skip sessions. Please complete the previous sessions and then move forward. Thank you",
        [{
          text:"Yes I will complete previous one first",
          onPress:()=>{},
          style:'cancel'
        }])
      );

    else{
      getSessionsInSelectedWeek(index+1) ; 
    }
  


  };

  const getSessionsInSelectedWeek=async(currentWeek)=>{
    setIsLoading(true);
    const token = await AsyncStorage.getItem('token');

    let config = {
      headers:{
          Authorization:token,
          "ngrok-skip-browser-warning":"69420"
      }
  }
  const sessionsInAWeek = getSessionsInAWeek+"/full-week/"+currentWeek;
  
  console.log(sessionsInAWeek)

  await axios.get(sessionsInAWeek,config)
      .then((res) => {
        setSessionData(res.data);
    })
      .catch(err => {
        console.log(err)});

    setIsLoading(false);
    };


  return (
    <View>
      <View className="bg-cyan-500 pl-3 rounded-b-3xl">
            <View className="pt-3 mt-8">
              <View className="flex-row m-4 justify-between">
                  <Text className="font-bold text-lg">Hey Thanks for coming</Text>
              </View>
            </View>
      </View>
      <View className="mt-3">
      <FlatList
        data={weekButtons}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
        <TouchableOpacity 
        className="border-black border-1 m-2 ml-3 shadow-lg shadow-black"
          onPress={() => handleButtonPress(index)}
          style={{
            backgroundColor: index === selectedButtonIndex ? 'teal' : 'white',
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginHorizontal: 10,
            borderRadius: 5,
          }}
        >
          <Text className="text-black text-lg font-bold">{item}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item}
    />

    </View>
    <View className="m-2">
      </View>
      <>
      {isLoading ?(<ActivityIndicator size="large" color="#0000ff" />):
        <FlatList
        data={sessionData}
        keyExtractor={(item) => item.session_id.toString()}
        renderItem={({ item,index}) =>
        <SessionButtonComponent item={item} index={index} currentSession={currentSession} currentWeek={currentWeek} navigation={navigation} />
      }
        />}
        </>
    </View>
    
  );
};

export default SessionScreen;

