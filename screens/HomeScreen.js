import { View, Text } from 'react-native'
import React,{useEffect,useState} from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar } from "react-native-paper";
import Carousel from '../components/Carousel';

const HomeScreen = ( ) => {

  return (
    <SafeAreaProvider>
      <ScrollView className="p-5">
        <View className="pt-4 pl-2">
          <View>
            <View className="flex-row">
              <TouchableOpacity onPress={()=>navigation.navigate('ProfileScreen')}>
                <Avatar.Image
                        className = {20}
                        size={50}
                        source={{
                            uri: `https://media.geeksforgeeks.org/wp-content/uploads/20220305133853/gfglogo-300x300.png`,
                        }}
                    />
              </TouchableOpacity>
              <View>
                  <Text className="m-4 font-bold text-lg">Good Morning, <Text style={{fontSize:30}}> Aman</Text> </Text>
              </View>  
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  )
}

export default HomeScreen