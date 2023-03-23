import { View, Text } from 'react-native'
import React, { useState,useEffect } from 'react'

const AudioPlayerScreen = ({route}) => {
  
  const [audioData,setAudioData]=useState({});
  useEffect(() => {
    setAudioData(route.params.item.item);
  }, [])
  
  return (
    <View>
      <Text>AudioPlayerScreen</Text>
    </View>
  )
}

export default AudioPlayerScreen