import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import FlipCard from 'react-native-flip-card'

const FlipCardComponent = (item) => {
    
  return (
    <View >
        <FlipCard 
        style={styles.card}
            friction={7}
            perspective={800}
            flipHorizontal={true}
            flipVertical={false}
            flip={false}
            clickable={true}
            onFlipEnd={(isFlipEnd)=>{{}}}>

            <View>           
                <Text className ="text-lg">{item.setup}</Text>
            </View>
            <View>
                <Text className="text-lg font-bold">{item.punchline}</Text>
            </View>
        </FlipCard>
    </View>
  )
}

export default FlipCardComponent


const styles = StyleSheet.create({
    card: {
      shadowColor:'black',
      shadowOffset:3,
      backgroundColor: 'white',
      borderRadius: 15,
      padding: 10,
      marginHorizontal: 10,
      width: 150,
      height: 150,
    },
  });