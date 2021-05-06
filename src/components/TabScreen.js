import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Screen from './Screen';
import BookmarkScreen from './BookmarkScreen';
import Icons from 'react-native-vector-icons/Ionicons';
import BookMark from 'react-native-vector-icons/Entypo';
import Profile from 'react-native-vector-icons/Entypo';
import ProfileScreen from './ProfileScreen';
import {connect} from 'react-redux';
const Tab = createBottomTabNavigator();

class TabScreen extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Screen"
        tabBarOptions={{
          activeTintColor: this.props.dark ? '#ffe0b2' : '#8ed1fc',
          inactiveTintColor: 'white',
          labelStyle: {fontSize: 15},
          style: {
            ...Platform.select({
              ios: {
                height: 90,
              },
              android: {
                height: 70,
              },
            }),

            backgroundColor: this.props.dark ? 'rgba(12, 12, 12,1)' : '#1273DE',
          },
        }}>
        <Tab.Screen
          name="Screen"
          component={Screen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({focused}) => {
              if (focused) {
                return (
                  <Icons
                    name={'home'}
                    size={30}
                    color={this.props.dark ? '#ffe0b2' : '#8ed1fc'}
                  />
                );
              }
              return <Icons name={'home-outline'} size={30} color={'white'} />;
            },
          }}
        />
        <Tab.Screen
          name="BookmarkScreen"
          component={BookmarkScreen}
          options={{
            tabBarLabel: 'BookMark',
            tabBarIcon: ({focused}) => {
              if (focused) {
                return (
                  <Icons
                    name={'bookmarks'}
                    size={30}
                    color={this.props.dark ? '#ffe0b2' : '#8ed1fc'}
                  />
                );
              }
              return <Icons name={'bookmarks'} size={30} color={'white'} />;
            },
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({focused}) => {
              if (focused) {
                return (
                  <Profile
                    name={'user'}
                    size={30}
                    color={this.props.dark ? '#ffe0b2' : '#8ed1fc'}
                  />
                );
              }
              return <Profile name={'user'} size={30} color={'white'} />;
            },
          }}
        />
      </Tab.Navigator>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  icon: {
    height: 30,
    width: 30,
  },
  common: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const mapStateToProps = (state) => {
  return {
    dark: state.darkScreen,
  };
};

export default connect(mapStateToProps, null)(TabScreen);
