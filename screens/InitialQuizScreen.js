import { View, Text,Button,Image,ActivityIndicator } from 'react-native'
import React,{useEffect,useState} from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import MCQQuestion from '../components/QuizComoponentMCQ'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getInitialSession} from '../services/urls';
import axios from 'axios'

const InitialQuizScreen = ({ onPress }) => {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [firstName,setFirstName]=useState()
  const [questions,setQuestions]=useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setFirstNameMethod();
    getInitialQuiz();
  }, [])
  
  const getInitialQuiz=async()=>{
    setLoading(true);
    const token = await AsyncStorage.getItem('token');
    try {

        let config = {
          headers: {
              Authorization: token,
              'ngrok-skip-browser-warning':'true'
              }
      };

      const response2 = await axios.get(getInitialSession,config);

      console.log(response2.data[0]);
      setQuestions(response2.data);
      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  }

  const setFirstNameMethod=async()=>{
    const fName = await AsyncStorage.getItem('firstName');
    setFirstName(fName);
  }
  
  const handleSubmit=()=>{
    AsyncStorage.setItem('initialSessionCompleted',"Yes");
    onPress();
  }

  const handleAnswer = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if(currentQuestion== questions.length-2)
    { setIsVisible(true); }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log(answers); 
    }
  };


  const handlePreviousQuestion = () => {
    if(currentQuestion<questions.length)
    setIsVisible(false);
    if (currentQuestion > 0 ) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      console.log(answers); // Do something with the answers
    }
  };

  return (
    
    <SafeAreaProvider>
      <ScrollView className="p-2">
        <View>
            <Text className="text-black font-bold text-xl mb-2 mt-6">
              Hey {firstName}, We have some questions for you
            </Text>
            <>
            {isLoading ?(<ActivityIndicator size="large" color="#0000ff" />): (
            <View className=" p-1">
            <MCQQuestion
              question={questions[currentQuestion].question}
              option1={questions[currentQuestion].option1}
              option2={questions[currentQuestion].option2}
              option3={questions[currentQuestion].option3}
              option4={questions[currentQuestion].option4}
              value1={questions[currentQuestion].value1}
              value2={questions[currentQuestion].value2}
              value3={questions[currentQuestion].value3}
              value4={questions[currentQuestion].value4}
              onSelect={handleAnswer}
              imageLocation = {questions[currentQuestion].imageLocation}
            />
            </View>
            )}
            </>
          <View className="flex-row justify-between ml-3 mr-3 pt-3">
            <Button title="Previous" onPress={handlePreviousQuestion} />
            <Button title="  Next  " onPress={handleNextQuestion} />
          </View>
          <View className="w-36 text-white font-bold py-2 px-4 rounded ml-28 justify-center">
          {isVisible && (
            <Button 
            title="Submit"
            onPress={handleSubmit}
            />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  )
}

export default InitialQuizScreen




// const questions = [
//   {
//     question: 'What is the capital of France?',
//     options: ['Paris', 'London', 'Berlin', 'Madrid'],
//     answer: 'Paris',
//     imageLocation:'../assets/ballon.png',
//   },
//   {
//     question: 'What is the currency of Japan?',
//     options: ['Yen', 'Euro', 'Dollar', 'Pound'],
//     answer: 'Yen',
//     imageLocation:'../assets/logo.png',
//   },
//   {
//     question: 'What is the largest country in the world by land area?',
//     options: ['Russian', 'China', 'USA', 'Canada'],
//     answer: 'Russian',
//     imageLocation:'../assets/ballon.png',
//   },
// ];
// 