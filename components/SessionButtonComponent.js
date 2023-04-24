import { View, Text,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { Avatar, IconButton } from 'react-native-paper'

const SessionButtonComponent = ({item,navigation}) => {
  const navigateToQuizScreen=()=>{
    navigation.navigate('SessionQuizComponent',{item:item})  }

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
        <IconButton icon="arrow-right" onPress={navigateToQuizScreen} size={50} />
      </View>
    </View>
  )
}

export default SessionButtonComponent