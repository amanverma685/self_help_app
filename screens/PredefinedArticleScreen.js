import { View, Text,FlatList } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { IconButton } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PredefinedArticleScreen = () => {
  
  const route = useRoute();
  const predefinedData=route.params.data;
  const subarticleData = route.params.data.subarticle;
  const navigation = route.params.navigation;

  const renderItem = ({ item }) => (
        <View className="justify-center flex-row">
            <View>
                <View>
                    <Text className="text-lg"> {item.title}</Text>
                    <TouchableOpacity onPress={()=>{navigation.navigate('RenderSubarticleScreen',{data:item.subarticleData, navigation:navigation})}}>
                        <View className="h-36 w-28 mb-6 rounded-lg bg-red-600">
                            <Text className="p-4">
                                {item.description}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            
            <View>

            </View>
        </View>
  );

  return (
        <View >
           <View className="h-32 rounded-b-2xl  bg-cyan-600 flex-row">
            <IconButton className=" self-end" onPress={() => {}} size={24} icon='arrow-left' />
                <Text className="flex-row self-end mb-3 justify-center  items-center  justify-self-center font-bold text-2xl">{predefinedData.articleTitle}</Text>
            </View>
            <View className="justify-center items-center">
                <Text className=" text-2xl mt-5 mb-3" >{predefinedData.articleDescription}</Text>
            </View>
        <FlatList
            data={subarticleData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal={false} 
        />
            
        </View>
    
  )
}

export default PredefinedArticleScreen