import React, { useState } from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ListOfSessions from '../components/ListOfSessions';

const SessionScreen = () => {
  
  const [activeTab, setActiveTab] = useState(0);

  const [sessionData,setSessionData]=useState([]);

  const [selectedWeekIndex,setSelectedWeekIndex]=useState(0);

  const getSessionData = (index) => {
    setSelectedWeekIndex(index);
    setActiveTab(index)
    
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
                <Text className="text-xl font-bold">{weekList[index]}</Text>
              </TouchableHighlight>
          </View>
    );
  };

  return (
    <View>
      <View className="bg-blue-500 rounded-b-2xl">
      <Text className=" font-bold text-2xl mt-10 ml-28">Let's Get Started</Text>
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

     <View>
      <ListOfSessions weekNumber={activeTab+1}/>
     </View>
    </View>
  );
};

export default SessionScreen;
