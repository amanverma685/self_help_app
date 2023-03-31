import React, { useState,useEffect} from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import Seperator from '../components/Seperator';
import SessionList from '../components/SessionList';

const SessionScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [sessionData,setSessionData]=useState([]);
  const [selectedWeekIndex,setSelectedWeekIndex]=useState(0);

  useEffect(() => {
    getSessionData(0)
  },[])

  const getSessionData = (index) => {
    setSelectedWeekIndex(index);
    setSessionData([]);
    setSessionData(allSessionData[index+1]);
    console.log("Insise SessionScreen"+sessionData);
    console.log(sessionData);

  };

  const weekList =['Week 1','Week 2','Week 3','Week 4','Week 5']


  const renderItem = ({ item, index }) => {
    const isSelected = index === selectedWeekIndex;
    return (
            <View className="mt-3 ">
              <TouchableHighlight
                className="rounded-lg m-2 p-3 border-black"
                onPress={() => getSessionData(index)}
                style={{ padding: 10, backgroundColor: isSelected ? '#ccc' : '#fff' }}
                underlayColor="#ccc">
                <Text className="text-xl font-bold">{item}</Text>
              </TouchableHighlight>
          </View>
    );
  };

  return (
    <View>
      <View className="bg-blue-500 rounded-b-2xl">
      <Text className=" font-bold text-2xl mt-12 ml-28">Let's Get Started</Text>
      </View>
      <View>
        <FlatList
          data={weekList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    <Seperator />
    <Seperator />
     <View>
    <SessionList item={sessionData} />

     </View>
    </View>
  );
};

export default SessionScreen;

const allSessionData={
  "1":[
     
     {   "session_id":1,
         "session_number":1,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"Week 1"
     },
     {
         "session_id":2,
         "session_number":2,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"week 1"        },
     {
         "session_id":3,
         "session_number":3,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"week 1"        },
     {
         "session_id":4,
         "session_number":4,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"week 1"        },
     {
         "session_id":5,
         "session_number":5,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"week 1"        },
     {
         "session_id":6,
         "session_number":6,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"week 1"        },
     {
         "session_id":7,
         "session_number":7,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"week 1"        },{
         "session_id":8,
         "session_number":8,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"week 1"        },
     {
         "session_id":9,
         "session_number":9,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"week 1"        },
     { "session_id":10,
         "session_number":10,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"week 1"        }
 ],
 "2" :[
     
     {   "session_id":11,
         "session_number":1,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"Week 2"        },{
         "session_id":12,
         "session_number":2,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"Week 2"        },{
         "session_id":13,
         "session_number":3,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"Week 2"        },{
         "session_id":14,
         "session_number":4,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"Week 2"        },{
         "session_id":15,
         "session_number":5,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"Week 2"        },
     {
         "session_id":16,
         "session_number":6,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"Week 2"
     },
     {
         "session_id":20,
         "session_number":7,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"Week 2"
     },{
         "session_id":17,
         "session_number":8,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"Week 2"
     },{
         "session_id":18,
         "session_number":9,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"Week 2"
     },{
         "session_id":19,
         "session_number":10,
         "session_image_url":"https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=1600",
         "session_title":"ABC Session 1",
         "session_type":"",
         "session_description":"Week 2"
     }
 ]
 
}