import { View, Text,Button,StyleSheet } from 'react-native'
import React, { useState,useEffect } from 'react'
import { Audio } from 'expo-av';
import { Avatar, IconButton, ProgressBar } from 'react-native-paper';
import CircularProgress from 'react-native-circular-progress-indicator';
import { ScrollView } from 'react-native-gesture-handler';

const AudioPlayerScreen = ({route}) => {

  const [artistThumbnail,setArtistThumbnail] = useState()
  const [podcastData, setPodcastData]=useState([]);
  const [soundObject, setSoundObject] = useState(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration]= useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setPodcastData(route.params.data);
    setArtistThumbnail(podcastData.thumbnail);    
  }, [])
  
  const handlePlayPause = async () => {
    setIsPlaying(!isPlaying);
    if(isPlaying===false)
    {
      handlePlaySound();
    }
    else {
      handleStopSound();
    }
  };

  const handleStopSound = async () => {
    if(soundObject){
    try {
        await soundObject.stopAsync();
        await soundObject.unloadAsync();
        setSoundObject(null);
      } catch (error) {
        console.log(`cannot stop or unload the sound file`, error);
    }
  }
  };

  const onPlaybackStatusUpdate = (status) => {

    if(status.isPlaying===false)
    setProgress(0);

    else if (status.isLoaded) {
      
      setDuration(status.durationMillis);

      const progressPercent = (status.positionMillis / status.playableDurationMillis);
      setProgress(progressPercent);
      
      if (status.didJustFinish) {
        setProgress(100);
      }
    }
  };

  const handlePlaySound = async () => {
    
    const newSoundObject = new Audio.Sound();
    try {  
      await newSoundObject.loadAsync(require('../assets/hello.mp3'));
      await newSoundObject.playAsync();
      setSoundObject(newSoundObject);
      newSoundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    } catch (error) {
      console.log(`cannot load or play the sound file`, error);
    }
  };

  return (
    <ScrollView className="bg-gray-400">
      <View className="bg-gray-200 rounded-b-xl">
      
      <View className="mr-3 mt-16 ">
      <Avatar.Image
        size={300}
        className=" absolute top-7 left-12 bottom-10"
       source={{
        uri: artistThumbnail,
          }}
      />    
    </View>
      <View className="justify-center ml-4">
        <CircularProgress
         radius ={180}
         value={progress*100}
         textColor={'blue'}
         fontSize={20}
         activeStrokeColor={'white'}
         inActiveStrokeColor={'blue'}
         inActiveStrokeOpacity={0.4}
         inActiveStrokeWidth={6}
         activeStrokeWidth={16}
         valueSuffix={'%'}
         />
      </View>
      <View>
        <Text className="text-2xl mt-10 text-center font-bold">
          {podcastData.podcastTitle}
        </Text>
      </View>
      <View className="mt-6 justify-center">
        <Text className="text-2xl text-center font-bold">
          {podcastData.artist}
        </Text>
      </View>
    <View className="justify-center ml-32 justify-items-center">
      <IconButton
          size={80}
          icon={isPlaying ? 'pause' : 'play'}
          onPress={handlePlayPause}
        />
    </View>    
   
    </View>
    <View>
      <Text  className="text-lg m-2" >
        {podcastData.podcastDescription}
      </Text>
    </View>
    </ScrollView>
    
  );
}

export default AudioPlayerScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    }, 
    progressBar: {
      width: '100%',
      height: 20,
      borderRadius: 20,
    },
});