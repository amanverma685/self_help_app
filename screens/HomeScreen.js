import { View, Text,StyleSheet,FlatList,Image,ActivityIndicator } from 'react-native'
import React,{useEffect,useState} from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RefreshControl, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar, Button, IconButton } from "react-native-paper";
import SearchBar from '../components/SearchBar';
import Carousel from '../components/Carousel';
import { MD3Colors } from 'react-native-paper';
import FlipCardComponent from '../components/FlipCard';
import doctorArticleData from '../dummy_data/doctors_article'
import ArticleComponent from '../components/ArticleComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';
import CardComponent from '../components/CardComponent';
import PredefinedArticles from '../components/PredefinedArticles';

const HomeScreen = ({navigation}) => {
  
  const [randomJokes,setRandomJokes]=useState([]);
  const [isLoading, setLoading] = useState(true);
  const [articlesList,setArticlesList]=useState([]);
  const [articleLoading,setArticleLoading] = useState(true);
  const [firstName,setFirstName]=useState("");
  const [suggestionLoading,setSuggestionsLoading]=useState(false);
  const [suggestedArticle,setSuggestedArticle]=useState([]);
  
  useEffect(() => {
    getTenRandomJokes();
    getArticleList();
  }, []);

  const getTenRandomJokes = async () => {
    const value = await AsyncStorage.getItem('firstName');
    const lastSessionDone = await AsyncStorage.getItem('lastSessionDone');
    const lastWeekDone = await AsyncStorage.getItem('lastWeekDone');
    setFirstName(value);
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

  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

  const goToScreen=(screenName)=>
  {
    navigation.navigate(screenName);
  }
  

  const handleRefresh = () => {
    getTenRandomJokes();
  };

  function handleCheckProgress() {
  }

  return (
    
      <ScrollView >
        <View className="bg-cyan-500 pl-3 rounded-b-3xl">
            <View className="pt-3 mt-8 ">
              <View className="flex-row justify-between">
                <View>
                    <Text className="m-4 font-bold text-xl">Welcome Back, <Text style={{fontSize:25}}>{firstName}</Text> </Text>
                </View> 
                  <TouchableOpacity onPress={()=>{goToScreen('ProfileScreen')}}>
                    <View className="mr-3">
                      <Avatar.Image
                            className = {20}
                            size={50}
                            source={{
                                uri: `http://www.goodmorningimagesdownload.com/wp-content/uploads/2019/10/Happy-Whatsapp-DP-Profile-Images-4.jpg`,
                            }}
                        />
                    </View>
                  </TouchableOpacity>
              </View>
            {/* <View className="m-3 ml-1">
            <SearchBar/>
            </View> */}
            </View>
          </View>
      <View className="flex-row bg-slate-50">
        <Carousel />
      </View>
      <View  className="mt-5 ml-1 mr-2">
        <View className=" justify-between h-24 w-full bg-cyan-500 rounded-lg p-3">
          <View >
            <Text className="text-white text-xl  "> Continue With Your Progress</Text></View>
         
            <Button icon='run' buttonColor='white' onPress={()=>{goToScreen('SessionScreen')}} >Complete your journey with us..</Button>
        </View>
      </View>
      
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
              renderItem={({ item ,index}) => FlipCardComponent( item={item}, index ={index} )}
              keyExtractor={item => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={true}
            />
            </View>
            )}
          </>

      </View>
      <View>
        <PredefinedArticles navigation={navigation} />
      </View>
      <>
      {
        // TODO Something
        articleLoading ? (<ActivityIndicator size="large" color="#0000ff" />):

          (articlesList.length>0 && (
            <View className="ml-1 mt-2 ">
            <View className="flex-row justify-between	">
             <Text className="text-xl mt-3 ml-3 mb-2 font-bold"> Companion's Suggestions</Text>
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
      
      <View className="h-96 w-full bg-white rounded-3xl mt-4">
      <Card>
        <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
          <Card.Content>
            <Text variant="titleLarge">Card title</Text>
            <Text variant="bodyMedium">Card content</Text>
          </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
      </View>
      </ScrollView>
    
  );
}
export default HomeScreen


