import { View, Text,Image,Linking } from 'react-native'
import React, { useState,useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
// import Header from '../components/Header';
import { WebView } from 'react-native-webview';

const ReadingScreen = ({route}) => {

  const navigation = route.params.navigation;
  const [readingArticle,setReadingArticle] = useState({});
  const [imageURL,setImageURL] = useState("");
  const [readingURL,setReadingURL] = useState("");

    useEffect(() => {
      setReadingArticle(route.params.item.item);

      setImageURL(route.params.item.item.imageURL);

      setReadingURL(route.params.item.item.url);
    }, [])
    

    return (
    <SafeAreaProvider>
      <ScrollView className="bg-slate-500">
        <View className=" h-20 w-full bg-blue-500">
        <View>
          <Text className="mt-10 ml-16 font-bold text-2xl justify-center"> Reading Material for you</Text>
        </View>
        </View>
        <View >
          <Image
            source={{uri:imageURL}}
            style={{width: 350, height: 350}}
          />
          <Text className=" mt-3 font-bold text-3xl align-middle text-center ">{readingArticle.title}</Text>
          <View className="m-3">
            <Text className="font-bold text-lg ">{readingArticle.reading_text}</Text>
            <Text className="mt-3 text-xl"> Link for further readings :- </Text>
            {/* <Text style={{color: 'blue'}} className ="text-xl" onPress={() => Linking.openURL(readingURL)}>Click Here if you want to read further </Text> */}
          </View>
          <WebView
            source={{uri:readingURL}}
            style={{marginTop: 20}}
          />
        </View>
      </ScrollView>
    </SafeAreaProvider>
  )
}

export default ReadingScreen