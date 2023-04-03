import React, { useState, useEffect } from 'react'
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import {View} from 'react-native'
import { arrayUnion, doc, Timestamp, updateDoc, onSnapshot, getDoc, setDoc, serverTimestamp} from 'firebase/firestore';
import { db } from '../services/FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestDoctorScreen from './RequestDoctorScreen';

export function ChatScreen() {
  const [messages, setMessages] = useState([]);

  const [doctorID, setDoctorId] = useState('');
  const [patientID, setPatientId] = useState('');
  const [patientFirstname, setPatientFirstname] = useState('');
  const [patientLastname, setPatientLastname] = useState('');
  const [doctorAssigned,setDoctorAssigned]= useState(false);
  var chatId;
  

  const initializeDoctorIdPatientId = async() => {

    //I commented the below code because patient was not loggin in and there was no patient data in there!!!

    const doctorId  = await AsyncStorage.getItem('assignedDoctorId');
    if(doctorId=="")
    setPatientId(false);
    else
    setPatientId(true);

    const patientId = await AsyncStorage.getItem('id');
    setPatientId(patientId);

    const firstname = await AsyncStorage.getItem('firstName');
    setPatientFirstname(firstname);

    const lastname = await AsyncStorage.getItem('lastName');
    setPatientLastname(lastname);

    // const patientId = "38dbfec8-4a72-48a0-bca0-92f21db6840e";
    // setPatientId(patientId);
    // setPatientFirstname("Rohit");
    // setPatientLastname("Patnaik");

    //to be fetched from async storage in future

    // const doctorId = "f8044340-3290-4c44-b2f2-f66f1683838a"; //userid+doctorid = combined id -> used to uniquely identify chats
    setDoctorId(doctorId);
    
  
    chatId = `chat-${doctorId}+${patientId}`
  }


  //create chat if not created -> i.e., patient will initiallise chat from his end
  const checkChatHistory = async() => {
    //passing chatId as chatId and not as `${chatId}` was throwing this error -> 
    // **************** FirebaseError: Invalid document reference. Document references must have an even number of segments, but chats has 1.
    const res = await getDoc(doc(db, "chats", chatId));
    
    if(!res.exists()){
        //create a chat with no messages
        await setDoc(doc(db, "chats", chatId),{messages: []});

        // The below is our structure
        // userChats:{
        //   user's id:{
        //     combinedId:{
        //       userInfo:{
        //          dn, id
        //       },
        //       lastMessage:"",
        //       date:
        //     }
        //   }
        // }

        //this is of no use from patient end, but it is for doctor portal to show last text he received
        await updateDoc(doc(db, "userChats", doctorID), {
          [chatId+".userInfo"]: {
            uid: patientID,
            name: `${patientFirstname} ${patientLastname}`
          },
          [chatId+".date"]:serverTimestamp()
        });
    }
  }

  useEffect(() => {

    initializeDoctorIdPatientId();
    checkChatHistory();

    //getting realtime messages
    const unsub = onSnapshot(doc(db, "chats", chatId), (doc) => {
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
        //unsubscribe from firebase -> stop listening
        unsub();
      }

    console.log(chatId);

  }, [])

  //this is gifted chats method
  const onSend = async(messageArray) => {
    const msg = messageArray[0];
    const myMsg = {...msg, senderId: patientID}
    setMessages(
        previousMessages => 
        GiftedChat.append(previousMessages, myMsg)
        );
    //add message to firebase chats collection
    await updateDoc(doc(db, "chats", chatId),{
        messages: arrayUnion({
            ...myMsg,
            createdAt: Timestamp.now()
        })
    });
  };

  return (
    (doctorAssigned===true) ? (
      <View style={{flex:1, backgroundColor:'#fff'}}>
        <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
            _id: patientID,
            name: `${patientFirstname} ${patientLastname}`
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
    ):
    (<View>
      <RequestDoctorScreen />
    </View>)

  )
}

export default ChatScreen;