import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Card, Button } from 'react-native-paper';
const PodcastSeriesScreen = ({route}) => {

    const handlePress = id => {
        console.log(`Play button pressed for item with ID ${id}`);
      };

    const items = [
        {
          id: 1,
          name: 'John Doe',
          title: 'Item 1',
          avatar: 'https://picsum.photos/id/237/200/300',
        },
        {
          id: 2,
          name: 'Jane Doe',
          title: 'Item 2',
          avatar: 'https://picsum.photos/id/238/200/300',
        },
        {
          id: 3,
          name: 'Bob Smith',
          title: 'Item 3',
          avatar: 'https://picsum.photos/id/239/200/300',
        },
      ];
    
  return (
    <SafeAreaProvider>
    <ScrollView>
     <View className="bg-cyan-500 pl-3 rounded-2xl">
       <View className="pt-6 mt-16 ">
          <Text className="text-2xl font-bold mb-2 text-center"> Podcast Title </Text>
       </View>
     </View>
     <View style={styles.container}>
      {items.map(item => (
        <Card key={item.id} style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Image style={styles.avatar} source={{ uri: item.avatar }} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <Button onPress={() => handlePress(item.id)}>Play</Button>
          </Card.Content>
        </Card>
      ))}
    </View>
    </ScrollView>
    </SafeAreaProvider>
  )

};
export default PodcastSeriesScreen ;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F5F5F5',
      padding: 4,
    },
    card: {
      borderRadius: 16,
      margin: 8,
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 25,
      margin: 8,
    },
    details: {
      flex: 1,
      margin: 8,
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    title: {
      fontSize: 16,
      color: 'gray',
    },
  });