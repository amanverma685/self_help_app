import React, { useState } from 'react';
import { View, Text,Image, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const MCQQuestion = ({ question, options, onSelect,imageURL }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

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
