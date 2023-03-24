import { View,ActivityIndicator, StyleSheet,Text,Image,Linking } from 'react-native'
import React, { useState,useEffect } from 'react'
import { WebView } from 'react-native-webview';

const ReadingScreen = ({route}) => {

  const navigation = route.params.navigation;
  const [readingArticle,setReadingArticle] = useState({});
  const [readingURL,setReadingURL] = useState("");

    useEffect(() => {
      setReadingArticle(route.params.item.item);

      
      setReadingURL(route.params.item.item.url);
      console.log(readingURL);
    }, [])
    

    const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loadingIndicator}
        />
      )}
      <WebView
        source={{ uri: readingURL}}
        onLoad={handleLoad}
      />
    </View>
  );
}

export default ReadingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
});