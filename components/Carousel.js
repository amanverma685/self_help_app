import React from 'react';
import { View, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const images = [
  {
    id: 1,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0j2iyfpMN3kWQgkzOpXu0xrKxkF7STUIZDw&usqp=CAU',
  },
  {
    id: 2,
    url: 'https://wallpaperset.com/w/full/a/e/5/36131.jpg',
  },
  {
    id: 3,
    url: 'https://www.pixelstalk.net/wp-content/uploads/images6/Calming-Wallpaper-High-Resolution.jpg',
  },
];

const CarouselWithImages = () => {
  const renderItem = ({ item }) => (
    <View className="mt-4">
      <View className="w-full h-40">
        <Image className="w-full h-full" source={{ uri: item.url }} />
      </View>
    </View>
  );

  return (
    <Carousel
      data={images}
      renderItem={renderItem}
      sliderWidth={400}
      itemWidth={300}
      loop={true}
      autoplay={true}
      autoplayInterval={5000}
    />
  );
};

export default CarouselWithImages;
