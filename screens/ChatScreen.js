import React, { useState, useEffect } from 'react'
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import {View} from 'react-native'
import { arrayUnion, doc, Timestamp, updateDoc, onSnapshot} from 'firebase/firestore';
import { db } from '../services/FirebaseConfig';

export function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const userId = "123";
  const combinedId = "123f8044340-3290-4c44-b2f2-f66f1683838a"; //userid+doctorid = combined id -> used to uniquely identify chats

  useEffect(() => {

    //writing database query
    // const querySnapshot = query(collection(db, "chats"), where("name", "==", username))
    

    const unsub = onSnapshot(doc(db, "chats", combinedId), (doc) => {
        //storing the messages returned
        const allMessages = doc.data().messages;

        //sorting all messages by timestamp
        allMessages.sort(function(x, y){
            return y.createdAt - x.createdAt
        });
        doc.exists() && setMessages(
                            allMessages?.map((msg) => {
                                return {
                                    ...msg,
                                    createdAt: msg.createdAt.toDate() //converting firebase Timestamp t0 Date -> required by gifted chats
                                }
                            })
                        );

        // console.log("documents in messages", messages);

      });
  
      return ()=>{
        unsub();
      }
  }, [])

  const onSend = async(messageArray) => {
    const msg = messageArray[0];
    const myMsg = {...msg, senderId: userId}
    setMessages(
        previousMessages => 
        GiftedChat.append(previousMessages, myMsg)
        );
    //add message to firebase chats collection
    await updateDoc(doc(db, "chats", combinedId),{
        messages: arrayUnion({
            ...myMsg,
            createdAt: Timestamp.now()
        })
    });
  };

  return (
    <View style={{flex:1, backgroundColor:'#fff'}}>
        <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
            _id: userId,
            name: "user name"
        }}
        renderBubble={
            props => {
                return <Bubble {...props} wrapperStyle={{right:{
                    backgroundColor:'grey',
                }}} />
            }
        }
        />
    </View>
  )
}

export default ChatScreen;