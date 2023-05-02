import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton, Card, Button, Modal } from "react-native-paper";
import Seperator from "../components/Seperator";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ProfileScreen = ({ navigation }) => {
  useEffect(() => {
    (async() => {
      const email = await AsyncStorage.getItem('email');
      setEmailId(email);
    })();
   }, []);

  const [emailId,setEmailId]=useState("");
  const [passwordOne,setPasswordOne]=useState("")
  const [passwordTwo,setPasswordTwo]=useState("")
  const [currentPassword,setCurrentPassword]=useState("")
    //for showing edit profile form
    const [showForm, setShowForm] = useState(false);
    const [isModelVisible, setIsModalVisible] = useState(false)
  
  const [userDetails, setUserDetails] = useState({
    firstName: "First Name",
    middleName: "Middle Name",
    lastName: "Last Name",
    email: "testmail@gmail.com",
    gender: "Male",
    dob: "1234567890",
    contact: "8520741963",
    address: "IIIT bangalore",
    password: "",
  });


  const submitPassword=()=>
  { 

    console.log(emailId)
    if(passwordOne===passwordTwo)
    {

    }
    else 
    return (
      Alert.alert("Password didn't match Please enter matching password..","",[{
        text:"Try Again",
        onPress:null
      },
    {
      text:"Continue",
      onPress:null
    }])
    )
  }

  const isModelVisibleFunction = () => {

    setIsModalVisible(!isModelVisible);
  }

  const handleSave = () => {
    Alert.alert("Saved Successfully", "Your data has been saved successfully", [
      {
        text: "OK",
        onPress: () => console.log("OK Pressed"),
      },
    ]);
    setShowForm(!showForm);
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
  };

  const editProfileDetails = async () => {
    setShowForm(!showForm);
  };

  // console.log(userDetails.firstName)

  return (
    <>
      <ScrollView>
        <View className="flex-1">
          <View className="h-96">
            <Image
              source={require("../assets/profile.png")}
              className="h-full w-full rounded-b-3xl"
            />
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-blue-200 rounded-lg absolute top-10 right-3"
          >
            <View className="flex-row">
              <IconButton icon="logout" onPress={handleLogout} />
            </View>
          </TouchableOpacity>

          <View className="justify-between flex-row p-6">
            <Text className="text-2xl font-bold mb-4">
              {showForm ? "Edit Details" : "Profile Details"}
            </Text>
            <Text>
              {" "}
              <IconButton icon="pencil" onPress={editProfileDetails} />
            </Text>
          </View>

          {showForm ? (
            <View className="px-6">
              <View className="mb-4">
                <Text className="text-gray-600 text-lg">Contact</Text>
                <TextInput
                  value={userDetails.contact}
                  onChangeText={(e) => {
                    setUserDetails({ ...userDetails, contact: e });
                  }}
                  className="border-2 border-gray-400 p-2 rounded"
                />
              </View>

              <View className="mb-4">
                <Text className="text-gray-600 text-lg">Address</Text>
                <TextInput
                  value={userDetails.address}
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(e) => {
                    setUserDetails({ ...userDetails, address: e });
                  }}
                  className="border-2 border-gray-400 p-2 rounded"
                />
              </View>

              <View className="mb-4">
                <TouchableOpacity
                  onPress={handleSave}
                  className="bg-blue-500 py-2 px-4 rounded text-white"
                >
                  <Text className="text-center font-bold text-lg">Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Card className="mx-6">
              <Card.Title
                title={`${userDetails.firstName} ${userDetails.middleName} ${userDetails.lastName}`}
              />
              <Card.Content>
                <Text className="mt-3 text-purple-700 font-bold text-30">Email</Text>
                <Text variant="bodyMedium">{userDetails.email}</Text>
                <Seperator />
                <Text className="mt-3 text-purple-700 font-bold text-36">Gender</Text>

                <Text variant="bodyMedium">{userDetails.gender}</Text>
                <Seperator />
                <Text className="mt-3 text-purple-700 font-bold text-36">DOB</Text>

                <Text variant="bodyMedium">{userDetails.dob}</Text>
                <Seperator />
                <Text className="mt-3 text-purple-700 font-bold text-36">Contact</Text>

                <Text variant="bodyMedium">{userDetails.contact}</Text>
                <Seperator />
                <Text className="mt-3 text-purple-700 font-bold text-36">Address</Text>

                <Text variant="bodyMedium">{userDetails.address}</Text>

                <Button className="mt-2 font-bold" onPress={isModelVisibleFunction}>
                  <Text className="text-red-700">Change Password</Text></Button>
              </Card.Content>
            </Card>
          )}
        </View>
      </ScrollView>

      <Modal visible={isModelVisible} className="bg-white mt-96 rounded-t-2xl" >
        <View className="bg-white">
            <IconButton size={32} icon='sword-cross' onPress={isModelVisibleFunction} />
          <Text className="justify-center text-center m-4 font-bold text-lg">Change Your Password</Text>
          <Text className="ml-5">Current Password</Text>
          <TextInput
                  value={currentPassword}
                  multiline={true}
                  numberOfLines={1}
                  onChangeText={(e) =>setCurrentPassword(e)}
                  className="border-2 mx-5 border-gray-400 p-2 rounded"
          />
          <Text className="ml-5 mt-2">New Password</Text>
          <TextInput
                  value={passwordOne}
                  multiline={true}
                  onChangeText={(e) =>setPasswordOne(e)}
                  className="border-2 mx-5 border-gray-400 p-2 rounded"
          />
          <Text className="ml-5 mt-2">Retype New Password</Text>
          <TextInput
                  value={passwordTwo}
                  multiline={true}
                  onChangeText={(e) => setPasswordTwo(e)}
                  returnKeyType="done"
                  className="border-2 mx-5 border-gray-400 p-2 rounded"
          />
          <Button onPress={submitPassword} className="justify-center text-purple-700 justify-items-center mx-20 mt-4 mb-40 ">
            <Text className="text-lg">Submit Password</Text>
          </Button>
        </View>
      </Modal>
    </>
  );
};

export default ProfileScreen;
