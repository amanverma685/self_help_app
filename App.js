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
          <Stack.Screen name="LoginScreen"   component={LoginScreen} />
          <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
          <Stack.Screen name="InitialQuizScreen" component={InitialQuizScreen} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          <Stack.Screen name="LandingScreen" component={LandingScreen} />
        </Stack.Navigator>
      </NavigationContainer>

    )
  );
};

export default App;