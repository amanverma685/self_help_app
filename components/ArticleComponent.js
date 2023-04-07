import { View, Text,StyleSheet,Image, ImageBackground } from 'react-native'
import React,{useState,useEffect} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ArticleComponent = ({item}) => {
    const navigation = item.navigation;

    const [articleItem,setArticleItem]=useState({});
    // const navigation = item.navigation;

    useEffect(() => {
      setArticleItem(item.item);
    }, [])
    
    const handleArticle = (item) =>
    {    
        if(item.item.articleType==='audio')
        {
          navigation.navigate('AudioPlayerScreen',{item});
        }
        else if(item.item.articleType==='video')
        {
          navigation.navigate('VideoPlayerScreen',{item});
        }
        else if(item.item.articleType==='reading')
        {
          navigation.navigate('ReadingScreen',{item});
        }
        else if(item.item.articleType==='you tube')
        {
          navigation.navigate('YouTubeScreen',{item});
        }

    }

  return (
    <TouchableOpacity onPress={() => handleArticle(item)}>
      <View className="h-40 w-32 rounded-xl bg-cyan-500  m-3">
        <ImageBackground source={{ uri: articleItem.articleThumbnail }} className=" flex-1 bg-cover  justify-center" />
        <Text className="justify-center text-center text-lg"> {articleItem.articleType}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ArticleComponent

