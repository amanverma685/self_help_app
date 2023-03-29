import React, { useState,useEffect } from 'react';
import { View, Text,Image, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const MCQQuestion = ({ question, option1,option2,option3,option4,value1,value2,value3,value4, onSelect,imageURL }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options,setOptions]=useState([]);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  useEffect(() => {
    setOptions([option1,option2,option3,option4]);
  }, [])
  

  return (
    <SafeAreaProvider>
      <View>
        <View>
        <Image source={require('../assets/ballon.png')} />
          <Text className=" font-bold text-xl p-2">{question}</Text>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => handleSelectOption(option)}
              style={{
                backgroundColor: option === selectedOption ? 'lime' : 'white',
                padding: 10,
                margin: 8,
                borderRadius:8,
              }}>
              <Text className="text-lg text-black font-bold">{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default MCQQuestion;
