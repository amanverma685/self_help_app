import React, { useState,useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const ProfileScreen = ({navigation}) => {

  useEffect(() => {

    //TODO API to get user details
    
  }, [])
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [aim, setAim] = useState('');
  const [hobby, setHobby] = useState('');
  const [age, setAge] = useState('');
  const [education, setEducation] = useState('');

  const handleSave = () => {
    // Handle saving user profile data
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
      
      <View className="h-96 bg-gray-300">
        <Image source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80' }} className="h-full w-full" />
      </View>
      <TouchableOpacity onPress={handleLogout} className="bg-gray-500 p-2 rounded-lg absolute top-10 right-2">
          <Text className="text-black">Logout</Text>
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
          <Text className="text-gray-600 text-lg">Hobby</Text>
          <TextInput value={hobby} onChangeText={setHobby} className="border-2 border-gray-400 p-2 rounded" />
        </View>
        <View className="mb-4">
          <Text className="text-gray-600 text-lg">Age</Text>
          <TextInput value={age} onChangeText={setAge} className="border-2 border-gray-400 p-2 rounded" />
        </View>
        <View className="mb-4">
          <Text className="text-gray-600 text-lg">Highest Education</Text>
          <TextInput value={education} onChangeText={setEducation} className="border-2 border-gray-400 p-2 rounded" />
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
