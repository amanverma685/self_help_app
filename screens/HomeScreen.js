import { View, Text,StyleSheet,FlatList,Image,ActivityIndicator } from 'react-native'
import React,{useEffect,useState} from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RefreshControl, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar, Button, IconButton } from "react-native-paper";
import SearchBar from '../components/SearchBar';
import Carousel from '../components/Carousel';
import Seperator from '../components/Seperator'
// import CardComponent from '../components/CardComponent';
import { MD3Colors } from 'react-native-paper';
import FlipCardComponent from '../components/FlipCard';
import doctorArticleData from '../dummy_data/doctors_article'
import ArticleComponent from '../components/ArticleComponent';

const HomeScreen = ({navigation}) => {

  const [randomJokes,setRandomJokes]=useState([]);
  const [isLoading, setLoading] = useState(true);
  const [articlesList,setArticlesList]=useState([]);
  const [articleLoading,setArticleLoading] = useState(true);

  const getTenRandomJokes = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_ten');
      const jokes = await response.json();
      setRandomJokes(jokes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getArticleList = async () => {
    setArticleLoading(false);
    try {
      setArticlesList(doctorArticleData);
      
    } catch (error) {
      console.error(error);
    } finally {
      setArticleLoading(false);
    }
  };

  const handleRefresh = () => {
    getTenRandomJokes();
  };

  useEffect(() => {
    getTenRandomJokes();
    getArticleList();
  }, []);


  function handleCheckProgress() {
  }

  return (
    <SafeAreaProvider>
      <ScrollView >
      <View >
        <View className="bg-blue-500 pl-3 rounded-b-3xl">
            <View className="pt-3">
              <View className="flex-row justify-between">
                <View>
                    <Text className="m-4 font-bold text-lg"> Good Morning, <Text style={{fontSize:30}}> Aman</Text> </Text>
                </View> 
                  <View className="mr-3">
                    <Avatar.Image
                          className = {20}
                          size={50}
                          source={{
                              uri: `http://www.goodmorningimagesdownload.com/wp-content/uploads/2019/10/Happy-Whatsapp-DP-Profile-Images-4.jpg`,
                          }}
                      />
                  </View>
              </View>
            <View className="m-3 ml-1">
            <SearchBar/>
            </View>
            </View>
          </View>
      </View>
      <View className="flex-row">
        <Carousel />
      </View>
      <TouchableOpacity className="mt-3 ml-1 mr-2">
        <View className="flex-row  justify-between h-14 w-full bg-blue-500 rounded-lg p-3">
          <Text className="text-white text-xl "> Complete Your Journey</Text>
          <View className="h-14">
          <Button  mode="contained" onPress={() => navigation.navigate('SessionScreen')}>
              Check Progress
          </Button>
          </View>
        </View>
      </TouchableOpacity>
      <View className="ml-1 mt-2 ">
          <View className="flex-row justify-between	">
           <Text className="text-xl mt-3 ml-3 font-bold">Happy Thoughts</Text>

           <TouchableOpacity onPress={handleRefresh}>
            <View className="flex-row">
              <Text className="mt-3 font-bold text-lg">Refresh</Text>
              <IconButton
                  icon="refresh"
                  iconColor={MD3Colors.primary20}
                  size={25}
                  onPress={() =>{} }
                />
            </View>
           </TouchableOpacity>
          </View>
          <>
            {isLoading ?(<ActivityIndicator size="large" color="#0000ff" />): (<View className=" p-1">
            <FlatList
              data={randomJokes}
              renderItem={({ item }) => FlipCardComponent(item)}
              keyExtractor={item => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={true}
            />
            </View>
            )}</>
      </View>

      <>
      {
        // TODO Something
        articleLoading ? (<ActivityIndicator size="large" color="#0000ff" />):

          (articlesList.length>0 && (
            <View className="ml-1 mt-2 ">
            <View className="flex-row justify-between	">
             <Text className="text-xl mt-3 ml-3 mb-2 font-bold">Your Companion's Suggestions</Text>
            </View>
              <FlatList
                data={doctorArticleData}
                renderItem={({ item }) => <ArticleComponent item={item} navigation={navigation} />}
                keyExtractor={item => item.article_id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={true}
              />
            </View>
          ))
          }
      </>
            
      
      </ScrollView>
    </SafeAreaProvider>
  )
}

export default HomeScreen


