import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from './screens/OnboardingScreen';
import RegistrationScreen from  './screens/RegistrationScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/LoginScreen';
import LandingScreen from './screens/LandingScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import InitialQuizScreen from './screens/InitialQuizScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import AudioPlayerScreen from './screens/AudioPlayerScreen';
import ArticleComponent from './components/ArticleComponent';
import ReadingScreen from './screens/ReadingScreen';
import VideoPlayerScreen from './screens/VideoPlayerScreen';
import SessionScreen from './screens/SessionScreen';
import ChatScreen from './screens/ChatScreen';
import MyChatScreen from './screens/MyChatScreen';

const Stack = createStackNavigator();

const App = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);

  React.useEffect( () => {
    async function initialLaunch()
    {
      const appData = await AsyncStorage.getItem('isAppFirstLaunched');
      if (appData == null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
      } 
      else 
      {
      setIsAppFirstLaunched(false);
      }
    }
    initialLaunch();

    // AsyncStorage.removeItem('isAppFirstLaunched');
  }, []);

  return (
    isAppFirstLaunched != null && (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {isAppFirstLaunched && (
            <Stack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
            />
          )}
          {/* adding a temp chat screen for testing chats */}
          <Stack.Screen name="MyChatScreen" component={MyChatScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="LandingScreen" component={LandingScreen} />
          <Stack.Screen name="SessionScreen" component={SessionScreen} />
          <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
          <Stack.Screen name="InitialQuizScreen" component={InitialQuizScreen} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />          
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="AudioPlayerScreen" component={AudioPlayerScreen} />   
          <Stack.Screen name="ArticleComponent" component={ArticleComponent} />   
          <Stack.Screen name="VideoPlayerScreen" component={VideoPlayerScreen} />   
          <Stack.Screen name="ReadingScreen" component={ReadingScreen} />   
        </Stack.Navigator>
      </NavigationContainer>

    )
  );
};

export default App;