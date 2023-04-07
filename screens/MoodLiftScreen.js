import React from 'react'
import { View, Text, ImageBackground,Image } from 'react-native'
import { Avatar } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import podcastdata from '../dummy_data/podcasts_by_artists';

const MoodLiftScreen = ({navigation}) => {
  
  const PodcastArtistThumbnail = ({item}) => {
  
    return (
      <TouchableOpacity onPress={()=>{navigation.navigate('AudioPlayerScreen',{data:item})}}>
        <View className="h-40 w-32 rounded-xl bg-orange-200 m-3">
          <View className="justify-center m-3">
          <Avatar.Image size={100}  source={{ uri: item.thumbnail }} className="justify-center" />
          </View>
          <View className=" justify-items-center ">
            <Text className="text-lg text-black text-center">{item.artist}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const renderPodcastSeries = ({item}) => {
  
    return (
      <TouchableOpacity onPress={()=>{navigation.navigate('PodcastSeriesScreen',{data:item})}}>
        <View className="h-40 w-52 rounded-xl bg-sky-200 shadow-black shadow-sm m-3">
          <View className="justify-center">
          <Image source={{ uri:'https://i.pinimg.com/564x/a8/c7/81/a8c781b8d81cb55bbc0faf9fa2aca055.jpg' }} className=" justify-center top-1 left-5 justify-items-center h-32 w-40 rounded-xl" />
          </View>
          <Image source={{ uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRghTRcGozvp_H92lqdbOE3mHjShUeE8UI5Gc9zVy6CsTSzGeYckMLBQ3CGvQwa4faWz6c&usqp=CAU' }} className=" absolute justify-center right-6 bottom-3 justify-items-center h-12 w-12 rounded-xl" />  
          <View className=" justify-items-center">
            <Text className="text-center text-lg text-black ">Podcast Title</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaProvider>
      <ScrollView>
        <View className="bg-cyan-500 pl-3 rounded-2xl">
          <View className="pt-6 mt-16 ">
            <Text className="text-2xl font-bold mb-2"> Some Mindful Suggestions for you </Text>
          </View>
        </View>

        <View>
          <Text className="text-2xl font-bold mt-4 ml-2"> Suggested Artists </Text>
          <View>
          <FlatList
              data={podcastdata}
              renderItem={({ item }) => PodcastArtistThumbnail( item={item})}
              keyExtractor={item => item.podcast_id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
          />
          </View>
        </View>

        <View>
          <Text className="text-2xl font-bold mt-4 ml-2"> Popular Podcast Series  </Text>
          <View>
          <FlatList
              data={podcastdata}
              renderItem={({ item ,index}) => renderPodcastSeries( item={item})}
              keyExtractor={item => item.podcast_id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
          />
          </View>
        </View>

        <View>
          <Text className="text-2xl font-bold mt-4 ml-2"> You Tube channels for self development </Text>
          <View>
          <FlatList
              data={podcastdata}
              renderItem={({ item ,index}) =>renderPodcastSeries(item={item}) }
              keyExtractor={item => item.podcast_id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
          />
          </View>
        </View>

        <View>
          <Text className="text-2xl font-bold mt-4 ml-2"> Book Links for Self Improvements  </Text>
          <View>
          <FlatList
              data={podcastdata}
              renderItem={({ item ,index}) => PodcastArtistThumbnail( item={item})}
              keyExtractor={item => item.podcast_id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
          />
          </View>
        </View>

      </ScrollView>
    </SafeAreaProvider>
  )
}

export default MoodLiftScreen