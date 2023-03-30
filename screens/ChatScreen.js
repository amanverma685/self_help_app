import { View, Text, TextInput, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import {doc, onSnapshot, updateDoc, arrayUnion, serverTimestamp, Timestamp} from 'firebase/firestore'
import {db} from '../services/FirebaseConfig'
import 'react-native-get-random-values'
import {v4 as uuid} from 'uuid'
import Message from '../components/MessageTextComponent'
import {IconButton} from 'react-native-paper'
const ChatScreen = () => {


  //////////////////////////////////////////////
  //////////////////////////////////////////////
  // CHAT ID IS HARD CODED  - 123f8044340-3290-4c44-b2f2-f66f1683838a

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const currentuserId = "123";

  console.log(text);

  useEffect(()=>{
    const unsub = onSnapshot(doc(db, "chats", "123f8044340-3290-4c44-b2f2-f66f1683838a"), (doc) => {
      doc.exists() && setMessages(doc.data());
    });

    return ()=>{
      unsub();
    }
  }, [currentuserId]);

  const handleSend = async() => {

    await updateDoc(doc(db, "chats", '123f8044340-3290-4c44-b2f2-f66f1683838a'), { //need chat id here -> both are hardcoded
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentuserId,
        date: Timestamp.now()
      })
    });
    setText(""); //clear text input

    await updateDoc(doc(db, "userChats", `f8044340-3290-4c44-b2f2-f66f1683838a`), { //need doctor id here -> hardcoded
      ['123f8044340-3290-4c44-b2f2-f66f1683838a' + ".lastMessage"]:{
        text
      },
      [`123f8044340-3290-4c44-b2f2-f66f1683838a`+".date"]: serverTimestamp()
    });
  }

  const handleInputChange = (text) => {
    setText(text);
  };

  return (
    <ScrollView className="mt-10">
      <ScrollView className='p-3 mx-5'>
        {
          messages.messages?.map((msg, index) => {
            return(
              <Message message={msg} key={index}/>
            )
          })
        }
      </ScrollView>
      <View className="d-flex mx-2" style={{flexDirection:"row"}}>
        <TextInput
          className="px-3 border rounded"
          placeholder='Enter Text'
          value={text}
          onChangeText={handleInputChange}
          style={{
            width:"90%"
          }}
        />
        <IconButton
          icon={"send"}
          onPress={handleSend}
          disabled={!text}
        />
      </View>
    </ScrollView  >
  );
}

export default ChatScreen;