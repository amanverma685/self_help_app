import React, { useState,useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';

const ProfileScreen = ({navigation}) => {

  useEffect(() => {

    
  }, [])
  
  const [firstName, setFirstName] = useState("First Name");
  const [lastName, setLastName] = useState('Last Name');
  const [aim, setAim] = useState('I want to be an astronaut');
  const [hobby, setHobby] = useState('Swimming\nDancing\nPlaying Cricket');
  const [age, setAge] = useState('35');
  const [education, setEducation] = useState('M.Tech from IIIT Bangalore');

  const handleSave = () => {
    Alert.alert(
      'Saved Successfully',
      'Your data has been saved successfully',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed')
        }
      ]
    );
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    })
  };


  return (
    <ScrollView>
      <View className="flex-1">
      <View className="h-96">
        <Image  source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80' }} className="h-full w-full  rounded-b-3xl" />
      </View>
      <TouchableOpacity onPress={handleLogout} className="bg-blue-200 rounded-lg absolute top-10 right-3">
         <View className="flex-row">
         <IconButton icon='logout' onPress={handleLogout} />
         </View>
      </TouchableOpacity>

      <View className="p-6">
        <Text className="text-2xl font-bold mb-4">Profile Details</Text>
        <View className="mb-4">
          <Text className="text-gray-600 text-lg">First Name</Text>
          <TextInput value={firstName} onChangeText={setFirstName} className="border-2 border-gray-400 p-2 rounded" />
        </View>

        <View className="mb-4">
          <Text className="text-gray-600 text-lg">Last Name</Text>
          <TextInput value={lastName} onChangeText={setLastName} className="border-2 border-gray-400 p-2 rounded" />
        </View>

        <View className="mb-4">
          <Text className="text-gray-600 text-lg">Aim</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            value={aim}
            onChangeText={setAim} className=" border-2 border-gray-400 p-2 rounded-lg " />
        </View>
        
        <View className="mb-4">
          <Text className="text-gray-600 text-lg">Hobbies</Text>
          <TextInput value={hobby} multiline={true}
            numberOfLines={4}
            onChangeText={setHobby} className="border-2 border-gray-400 p-2 rounded" />
        </View>

        <View className="mb-4">
          <Text className="text-gray-600 text-lg">Age</Text>
          <TextInput value={age}  inputMode='decimal' onChangeText={setAge} className="border-2 border-gray-400 p-2 rounded" />
        </View>

        <View className="mb-4">
          <Text className="text-gray-600 text-lg">Highest Education</Text>
          <TextInput value={education} 
          onChangeText={setEducation} 
          className="border-2 border-gray-400 p-2 rounded" />
        </View>

        <TouchableOpacity onPress={handleSave} className="bg-blue-500 py-2 px-4 rounded text-white">
          <Text className="text-center font-bold text-lg">Save</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
