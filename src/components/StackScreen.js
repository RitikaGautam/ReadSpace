// In App.js in a new project

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Screen from './Screen';
import Details from './Details';
import TabScreen from './TabScreen';
import DownloadScreen from './DownloadScreen';
import Login from './Login';
import Notes from './Notes';
import Addnotes from './Addnotes';
import LoginAuth from './LoginAuth';
import Signup from './Signup';
const Stack = createStackNavigator();

class StackScreen extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTitle: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TabScreen"
            component={TabScreen}
            options={{
              headerTitle: false,
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Details"
            component={Details}
            options={{
              headerTitle: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DownloadScreen"
            component={DownloadScreen}
            options={{
              headerTitle: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Notes"
            component={Notes}
            options={{
              headerTitle: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Addnotes"
            component={Addnotes}
            options={{
              headerTitle: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="LoginAuth"
            component={LoginAuth}
            options={{
              headerTitle: 'Login',
              // headerShown: false,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerTitle: 'SignUp',
              // headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default StackScreen;
