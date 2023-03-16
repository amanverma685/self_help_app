import React from 'react';
import { FlatList, View } from 'react-native';
import tw from 'nativewind';

const data = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  { id: '4', title: 'Item 4' },
  { id: '5', title: 'Item 5' },
];

const Carousel = () => {
  const renderItem = ({ item }) => (
    <View style={tw`p-4 bg-white rounded-lg shadow-lg`}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={tw`px-4`}
      snapToInterval={350}
      decelerationRate="fast"
    />
  );
};

export default Carousel;
