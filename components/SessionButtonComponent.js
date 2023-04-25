import { View, Text,TouchableOpacity,Image } from 'react-native'
import React,{useEffect} from 'react'
import { Avatar, IconButton } from 'react-native-paper'
import { useState } from 'react'

const SessionButtonComponent = ({item,currentSession,currentWeek,navigation}) => {
  
  const [sessionQuiz,setSessionQuiz] = useState([]);

  useEffect(() => {
    setSessionQuiz(item['sessionQuestions']);
  }, [])
  

  const navigateToQuizScreen=()=>{
    sessionQuiz['currentSession']= currentSession;
    sessionQuiz['currentWeek']=currentWeek;
    
    navigation.navigate('SessionQuizComponent',{item:sessionQuiz})  }

  return (
    <View className="flex flex-row m-3">
      <Avatar.Text color='black' className="bg-cyan-500 mt-4" size={52} label={item.session_number} />
      <View className="h-20 w-4/6 ml-2 bg-gray-600  rounded-md">
        <TouchableOpacity  onPress={navigateToQuizScreen}>
          < Image className="h-20 w-full rounded-md bg-cover" source={require('../assets/yoga_session.jpg')} />
          <View className="justify-center absolute top-7 left-12" >
          <Text className="text-black font-bold text-lg"> {item.session_title}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <IconButton icon="run" iconColor='black' onPress={navigateToQuizScreen} size={50} />
      </View>
    </View>
  )
}

export default SessionButtonComponent