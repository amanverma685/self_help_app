import { View, Text,StyleSheet,Image, ImageBackground } from 'react-native'
import React,{useState,useEffect} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconButton } from 'react-native-paper'

const ArticleComponent = (item) => {
    const [article_item,setArticleItem]=useState({});
    const navigation = item.navigation;

    useEffect(() => {
      setArticleItem(item.item);
    }, [])
    
    const handleArticle = (item) =>
    {    
        if(item.item.article_type==='audio')
        {
          navigation.navigate('AudioPlayerScreen',{item});
        }
        else if(item.item.article_type==='video')
        {
          navigation.navigate('VideoPlayerScreen',{item});
        }
        else if(item.item.article_type==='reading')
        {
          navigation.navigate('ReadingScreen',{item});
        }
        else if(item.item.article_type==='you tube')
        {
          navigation.navigate('YouTubeScreen',{item});
        }

    }

  return (
    <TouchableOpacity onPress={() => handleArticle(item)}>
      <View className="h-40 w-32 rounded-xl bg-cyan-500  m-3">
        <ImageBackground source={{ uri: article_item.imageURL }} className=" flex-1 bg-cover  justify-center" />
        <Text className="justify-center text-center text-lg"> {article_item.article_type}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ArticleComponent

