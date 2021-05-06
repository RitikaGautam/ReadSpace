import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Button,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import {DarkMode, LoginAuthUser, LoginUser} from '../modules/action';
import {connect} from 'react-redux';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(1),
      user: [],
      email: '',
    };
  }

  componentDidMount() {
    this.Animation();
    this.getuserdata();
  }

  getuserdata = () => {
    const data = auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
        this.setState({
          email: user.email,
        });
        console.log('askjsk', user.displayName);
      } else {
        // User is signed out
        // ...
      }
    });
  };
  Animation = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start(() =>
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start(),
    );
  };
  logOut = () => {
    auth()
      .signOut()
      .then(() => Alert.alert('Log Out Login again'));
  };
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
    this.logOut();
    const data = null;
    this.props.LoginUser(data);
    this.props.navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };
  render() {
    return (
      <>
        <View style={this.props.dark ? styles.darkContainer : styles.container}>
          <Animated.View
            style={[
              styles.firstContainer,
              {
                transform: [{scaleX: this.state.fadeAnim}],
              },
            ]}>
            {this.props.loginData !== null ? (
              <View style={styles.imgContainer}>
                <Image
                  style={styles.img}
                  source={{uri: this.props.loginData.photo}}
                />
                <Text
                  style={[styles.txt, this.props.dark ? styles.darktxt : null]}>
                  {this.props.loginData.name}
                </Text>
                <Text
                  style={[styles.txt, this.props.dark ? styles.darktxt : null]}>
                  {this.props.loginData.email}
                </Text>
              </View>
            ) : (
              <View style={styles.imgContainer}>
                <Image
                  style={styles.img}
                  source={require('../assets/user.png')}
                />
                <Text
                  style={[styles.txt, this.props.dark ? styles.darktxt : null]}>
                  {this.state.email}
                </Text>
              </View>
            )}
          </Animated.View>
          <View style={styles.secondContainer}>
            <Text
              style={[
                styles.header,
                this.props.dark ? styles.darkheader : null,
              ]}>
              Theme
            </Text>
            <View style={styles.innersecondContainer}>
              <TouchableOpacity onPress={() => this.props.DarkMode(false)}>
                <Text
                  style={[
                    styles.button,
                    this.props.dark ? styles.darkbutton : null,
                  ]}>
                  Light
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.DarkMode(true)}>
                <Text
                  style={[
                    styles.button,
                    this.props.dark ? styles.darkbutton : null,
                  ]}>
                  Dark
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.downloadsContainer}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('DownloadScreen')
                }>
                <Text
                  style={[
                    styles.header,
                    this.props.dark ? styles.darkheader : null,
                  ]}>
                  Downloads
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.downloadsContainer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Notes')}>
                <Text
                  style={[
                    styles.header,
                    this.props.dark ? styles.darkheader : null,
                  ]}>
                  Notes
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.logContainer}>
              <TouchableOpacity
                onPress={this.signOut}
                style={this.props.dark ? styles.darklogout : styles.logout}>
                <Text
                  style={
                    this.props.dark ? styles.darklogoutTxt : styles.logoutTxt
                  }>
                  LogOut
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* {console.log('Downloads', this.props.downloads)}
          {console.log('Bookmarks', this.props.bookmark)} */}
          {/* {console.log('loginData', this.props.loginData)}
          {console.log('uSER', this.state.user)} */}
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  darkContainer: {
    flex: 1,
    backgroundColor: '#252726',
  },
  firstContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 100,
    margin: 15,
  },
  imgContainer: {
    alignItems: 'center',
  },
  txt: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    alignItems: 'center',
  },
  darktxt: {
    color: 'white',
  },
  secondContainer: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  darkheader: {
    color: 'white',
  },
  innersecondContainer: {
    flexDirection: 'row',
  },
  button: {
    color: '#004dcf',
    fontSize: 17,
    marginHorizontal: 20,
    marginVertical: 10,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#c4def6',
  },
  darkbutton: {
    color: 'lightgrey',
    backgroundColor: 'grey',
  },
  horizontalLine: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  darklogoutTxt: {
    color: 'white',
    fontSize: 17,
  },
  logoutTxt: {
    fontSize: 17,
    color: 'black',
  },
  darklogout: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    width: 100,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
  },
  logout: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    width: 100,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
  },
  logContainer: {
    marginBottom: 30,
  },
  downloadsContainer: {
    margin: 15,
  },
});
const mapDispatchToProps = (dispatch) => {
  return {
    DarkMode: (mode) => dispatch(DarkMode(mode)),
    LoginUser: (data) => dispatch(LoginUser(data)),
  };
};

const mapStateToProps = (state) => {
  return {
    loginData: state.LoginData,
    dark: state.darkScreen,
    downloads: state.downloads,
    bookmark: state.bookmark,
    Database: state.Database,
    login: state.Authlogin,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
