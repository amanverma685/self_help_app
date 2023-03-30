import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Message({message}) {
  const currentUserId = "123";

  const ref = useRef();

  useEffect(()=>{
    ref.current?.scrollView({behaviour:"smooth"})
  }, [message]);

  return (
    <View style={styles.container}>
        {/* <Text>
            Date
        </Text> */}
        <Text style={message.senderId === currentUserId ? styles.rightText : styles.leftText} className='mb-2' >
            {message.text}
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   alignItems: 'center',
      justifyContent: 'center',
    },
    leftText: {
      textAlign: 'left',
      fontSize: 20,
    //   fontWeight: 'bold',
      padding: 10,
    //   backgroundColor:'green'
    },
    rightText: {
      textAlign: 'right',
      fontSize: 20,
    //   fontWeight: 'bold',
      padding: 10,
    //   backgroundColor:"blue"
    },
  });


export default Message;