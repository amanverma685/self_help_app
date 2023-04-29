import { View, Text,StyleSheet,Image, ImageBackground } from 'react-native'
import React,{useState,useEffect} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ArticleComponent = ({item}) => {
    const navigation = item.navigation;

    const [articleItem,setArticleItem]=useState({});

    useEffect(() => {
      setArticleItem(item.item);
    }, [])
    
    const handleArticle = (item) =>
    {    
        if(item.item.articleType==='audio')
        { 
          console.log(item.item)
          const navigationData = {
            "artist":item.item.articleAuthor,
            "podcastDescription":"Some important thing to hear",
            "podcastTitle":item.item.articleTitle,
            "podcastURL":item.item.articleUrl,
            "thumbnail":item.item.articleThumbnail
          }

          navigation.navigate('AudioPlayerScreen',{data:navigationData});
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
        <ImageBackground source={{ uri: ((articleItem.articleThumbnail==="" || articleItem.articleThumbnail===null || articleItem.articleThumbnail===undefined)?"https://img.freepik.com/free-vector/sharing-articles-concept-illustration_114360-5517.jpg?w=2000":articleItem.articleThumbnail )}} className=" flex-1 bg-cover  justify-center" />
        <Text className="justify-center text-center text-lg"> {articleItem.articleType}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ArticleComponent

