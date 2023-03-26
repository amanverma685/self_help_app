import { View, Text,StyleSheet,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconButton } from 'react-native-paper'

const ArticleComponent = (item) => {
    const [article_item,setArticleItem]=useState({});
    const navigation = item.navigation;

    useEffect(() => {
      setArticleItem(item.item);
      console.log(article_item.imageURL);
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

    }

  return (
    <View className="m-1">
        <View style={styles.container_outer}>
            <View style={styles.container}>
                <Image
                source={{ uri: article_item.imageURL }}
                style={styles.image}
                resizeMode="cover"
                />
                <View style={styles.playButton}>
                    <TouchableOpacity onPress={() => handleArticle(item)}>
                        <Image
                        source={require('../assets/play_button.png')}
                        style={styles.playIcon}
                        resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
  )
}

export default ArticleComponent

const styles = StyleSheet.create({
    container: {
      width: 140,
      height: 140,
      borderRadius: 10,
      overflow: 'hidden',
    },
    container_outer: {
        width: 140,
        height: 140,
        borderRadius: 10,
        overflow: 'hidden',
        borderColor:'black',
        borderWidth:2
      },
    image: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    playButton: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: -25 }, { translateY: -25 }],
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    playIcon: {
      width: 30,
      height: 30,
    },
  });