import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput.js';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator } from '../helpers/EmailValidator';
import { passwordValidator } from '../helpers/PasswordValidator'
import { loginURL, loginURL_v2 } from '../services/urls';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Alert from 'react-native-alert-component';

export default function LoginScreen({ navigation }) {
  
  const [email, setEmail] = useState({ value: "", error: '' })
  const [password, setPassword] = useState({ value: "", error: '' })
  const [isVisible, setIsVisible] = useState(false);
  const [error,setError]=useState("");
  const [token, setToken]=useState("");
  const [userData,setUserData]=useState({});

  const handleLogin = async(event) => {

    try {
            const response1 = await axios.post(loginURL, 
              {
                username: email['value'],
                password: password['value']
              },{
              headers:{'ngrok-skip-browser-warning':'true'}
            });
          
          const token = response1.headers['authorization'];
          
          let config = {
            headers: {
                Authorization: token,
                'ngrok-skip-browser-warning':'true'
                }
        };

        const response2 = await axios.post(loginURL_v2, {
          username:email['value'],
          password:password['value']
          }, config);

          console.log(response2['data']);

        } catch (error) {
          console.log(error);
        }
        
    //     await axios.post ( loginURL, {
    //             username: email['value'],
    //             password: password['value']
    //         }).then((response) => 
    //         {
    //         setToken(response.headers['authorization']);
            
    //     })
    //     .catch((error) => {
    //         setError(error);
    //         setIsVisible(true);
    //     });

    //     let config = {
    //       headers: {
    //           Authorization: token   
    //               }
    //   };

    //     await axios.post(loginURL_v2, {
    //       username: email['value'],
    //       password: password['value']
    //     }, config)
    //     .then((response) => {
    //       console.log(response);
    //         setUserData(response['data']);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })  
    // //   navigation.reset({
    // //   index: 0,
    // //   routes: [{ name: 'LandingScreen',
    // //   params :{data:userData}
    // // }],
    // // })
        
    }
    

  const onLoginPressed = async() => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    
    await handleLogin();

    const isUserLoggedIn =  AsyncStorage.setItem('isUserLoggedIn','true');
    
   
  }

  return (
    (isVisible===false) ? (<Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Welcome back...</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegistrationScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>):
    (<Alert
    visible={isVisible}
    title="Alert Title"
    message={error}
    onCancelPressed={setIsVisible(false)}
    onConfirmPressed={setIsVisible(false)}
  />)

  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})