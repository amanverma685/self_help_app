import { View, Text,FlatList,StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState,useEffect } from 'react'
import session_data from '../dummy_data/session_data';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ImageButton from './ImageButton';

const ListOfSessions = (weekNum) => {
  
  const [weekNumber,setWeekNumber]=useState(0);

  const [sessionList,setSessionList]=useState([]);


  useEffect(() => {
    setWeekNumber(weekNum.weekNumber);
    setSessionList(session_data[weekNumber]);
    
  }, []);
  

  const renderSessionList = ({ item, index }) => {
    const imageURL = item.session_image_url;
    return (
          <SafeAreaProvider >
            <TouchableOpacity>
              <View className="h-24 m-2 rounded-lg bg-gray">
              <ImageButton
              source={{ uri: imageURL }}
              title={item.session_title}
              description ={item.session_description}
              onPress={() => console.log('Button 1 pressed')}
            />
              </View>
            </TouchableOpacity>
            
          </SafeAreaProvider>
    );
  };


  return (
    
      <View className=" p-2">
        <FlatList style={styles.horizontalButton}
          data={sessionList}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderSessionList}
        />
      </View>
    
  )
}

export default ListOfSessions

const styles = StyleSheet.create({
  horizontalButton:{
    height: '86.8%',
    width:'100%'
  },
  imageContainer: {
    flex: 1,
    resizeMode: 'cover',
   
  },
})