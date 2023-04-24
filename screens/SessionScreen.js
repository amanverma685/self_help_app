import React, { useState,useEffect} from 'react';
import { View, Text, FlatList,Image, TouchableOpacity,TouchableHighlight, Alert } from 'react-native';
import Seperator from '../components/Seperator';
import { Avatar, Button, IconButton } from "react-native-paper";
import { getUserProfile } from '../services/URLs';
// import SessionList from '../components/SessionList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWeekSession } from '../services/URLs';
import axios from 'axios';
import SessionButtonComponent from '../components/SessionButtonComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { style } from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';



const SessionScreen = ({navigation}) => {
  
  const [currentWeek,setCurrentWeek]=useState(1);
  const [selectedWeek,setSelectedWeek] = useState(1);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  useEffect(() => {
    getUserProfileData();
  }, [selectedWeek])

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
        setSelectedButtonIndex(res.data.weekDone)
        setCurrentWeek(res.data.weekDone+1);
        setCurrentSession(res.data.sessionDone+1)
    })
      .catch(err => {
        console.log(err)});
    };
  
  const handleButtonPress = (index) => {
    
    setSelectedButtonIndex(index);
    // console.log("selectedWeek -- "+selectedWeek)
    // console.log("selectedButtonIndex --- "+selectedButtonIndex)

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
    else 
    setSelectedWeek(index+1);

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
        <FlatList
        data={allSessionData['1']}
        keyExtractor={(item) => item.session_id.toString()}
        renderItem={({ item }) => <SessionButtonComponent item={item}  navigation={navigation} />}
      />
    </View>
  );
};

export default SessionScreen;

const allSessionData={
  "1":[
     {   "session_id":1,
         "session_number":1,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"Week 1"
     },
     {
         "session_id":2,
         "session_number":2,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"week 1"        },
     {
         "session_id":3,
         "session_number":3,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"week 1"        },
     {
         "session_id":4,
         "session_number":4,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"week 1"        },
     {
         "session_id":5,
         "session_number":5,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"week 1"        }],
 "2" :[
     
     {   "session_id":11,
         "session_number":1,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"Week 2"        },
         {
         "session_id":12,
         "session_number":2,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"Week 2"        },
         {
         "session_id":13,
         "session_number":3,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"Week 2"        },
         {
         "session_id":14,
         "session_number":4,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"Week 2"        },
         {
         "session_id":15,
         "session_number":5,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"Week 2"        },
     {
         "session_id":16,
         "session_number":6,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"Week 2"
     },
     {
         "session_id":20,
         "session_number":7,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"Week 2"
     },{
         "session_id":17,
         "session_number":8,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"Week 2"
     },{
         "session_id":18,
         "session_number":9,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"Week 2"
     },{
         "session_id":19,
         "session_number":10,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"Week 2"
     }
 ]
 
}