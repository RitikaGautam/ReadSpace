import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Modal,
  Dimensions,
  ImageBackground,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import Icons from 'react-native-vector-icons/AntDesign';
import TwitterIcons from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';

import {LoginUser} from '../modules/action';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      photo: '',
      socialId: null,
      password: true,
      userDetails: [],
      islogin: false,
      login: false,
      iscoverPageVisible: true,
      uriIcon: require('../assets/user.png'),
    };
  }
  componentDidMount() {
    GoogleSignin.configure({
      webClientId:
        '752074671249-r2lnn7rg7ntt1s1shttbcjeqff27eqok.apps.googleusercontent.com',
    });
    if (this.props.loginData) {
      this.getCurrentUserInfo();
    }

    this.coverpage();
  }
  coverpage = () => {
    setTimeout(() => {
      this.setState({
        iscoverPageVisible: false,
      });
    }, 3000);
  };
  signIn = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();
      this.setState({userDetails: userInfo.user, login: true});
      this.props.LoginUser(this.state.userDetails);
    } catch (error) {}
  };
  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({userDetails: userInfo.user, login: true});
      this.props.LoginUser(this.state.userDetails);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }
  };
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({userDetails: null, login: false});
    } catch (error) {
      console.error(error);
    }
  };
  isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      this.setState({login: true});
      // Alert.alert('Already Login', 'Continue with same account or logout');
      //this.props.navigation.navigate('TabScreen');
    }
    console.log('isSignin', isSignedIn);
  };
  checkFeild = async () => {
    if (this.state.login) {
      this.props.navigation.navigate('TabScreen');
    } else {
      Alert.alert('Not Login', 'Please Login First');
    }
  };

  render() {
    return (
      <>
        <SafeAreaView />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.txt}>Login</Text>
            <TouchableOpacity onPress={this.signOut}>
              <Text style={styles.signuptxt}>Log Out</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              source={
                this.state.login
                  ? {uri: this.state.userDetails.photo}
                  : this.state.uriIcon
              }
            />
          </View>
          <View style={styles.txtInputContainer}>
            <View style={styles.userContainer}>
              <TextInput
                style={styles.txtInput}
                value={this.state.login ? this.state.userDetails.name : null}
                placeholder="Username or email address"
                onChangeText={(text) => this.setState({user: text})}
              />
            </View>

            {/* <View style={styles.passContainer}>
              <TextInput
                style={styles.txtInput}
                placeholder="Password"
                onChangeText={(text) => this.setState({pass: text})}
                secureTextEntry={this.state.password}
              />
              <TouchableOpacity
                onPress={() => this.setState({password: false})}>
                <Icons name={'eyeo'} size={30} />
              </TouchableOpacity>
            </View> */}
          </View>
          <View style={styles.loginButton}>
            <TouchableOpacity style={styles.touch} onPress={this.checkFeild}>
              <Icons name={'check'} size={20} color={'blue'} />
              <Text style={styles.loginButtontxt}>LOG IN</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.bottomtxt}>Login With</Text>
            <View style={styles.iconsContainer}>
              {/* <TouchableOpacity onPress={this.signIn}>
                <Icons
                  style={styles.icons}
                  name={'googleplus'}
                  size={60}
                  color={'red'}
                />
              </TouchableOpacity> */}
              <GoogleSigninButton
                style={{width: 250, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this.signIn}
              />
              {/* <TouchableOpacity>
                <Icons
                  style={styles.icons}
                  name={'github'}
                  size={40}
                  color={'blue'}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <TwitterIcons
                  style={styles.icons}
                  name={'twitter-with-circle'}
                  size={40}
                  color={'skyblue'}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <TwitterIcons
                  style={styles.icons}
                  name={'facebook-with-circle'}
                  size={40}
                  color={'darkblue'}
                />
              </TouchableOpacity> */}
            </View>
            <View style={styles.AuthButton}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('LoginAuth')}>
                <Text style={styles.AuthButtonTxt}>Authentication</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modal visible={this.state.iscoverPageVisible}>
            <ImageBackground
              imageStyle={{opacity: 0.6}}
              style={styles.backgroundImg}
              source={require('../assets/book.jpeg')}>
              <View style={styles.Mheader}>
                <Text style={styles.MheaderTxt}>READSPACE</Text>
              </View>
              <View style={styles.MinnerHeader}>
                <Text style={styles.MinnerHeaderTxt}>YOUR OWN HAPPY PLACE</Text>
              </View>
            </ImageBackground>
          </Modal>
        </View>
        {/* {console.log('Data', this.props.loginData)} */}
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    margin: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txt: {
    fontSize: 30,
    fontWeight: '900',
  },
  signuptxt: {
    fontSize: 20,
    fontWeight: '600',
    color: 'grey',
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  imgContainer: {
    alignItems: 'center',
  },
  txtInputContainer: {
    alignItems: 'center',
  },
  txtInput: {
    textAlign: 'left',
    marginTop: 30,
    fontSize: 20,
  },
  passContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    width: 250,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  userContainer: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    width: 250,
    paddingBottom: 10,
  },
  loginButton: {
    alignItems: 'center',
    marginTop: 90,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    borderRadius: 20,
    width: 200,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'lightgrey',
  },
  loginButtontxt: {
    color: 'blue',
    fontWeight: '600',
    fontSize: 17,
    marginLeft: 10,
  },
  touch: {
    flexDirection: 'row',
  },
  bottomContainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomtxt: {
    fontSize: 15,
    color: 'grey',
    margin: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  icons: {
    margin: 10,
  },
  backgroundImg: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
  Mheader: {
    marginTop: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MheaderTxt: {
    fontSize: 50,
    color: 'white',
    textShadowColor: 'red',
    textShadowOffset: {width: 1, height: 4},
    textShadowRadius: 5,
  },
  MinnerHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  MinnerHeaderTxt: {
    fontSize: 30,
    color: 'white',
    textShadowColor: 'orange',
    textShadowOffset: {width: 1, height: 4},
    textShadowRadius: 5,
  },
  AuthButton: {
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,

    width: 250,
    alignSelf: 'center',

    backgroundColor: '#376fcc',
  },
  AuthButtonTxt: {
    color: 'white',
    fontWeight: '600',
    fontSize: 17,
    marginLeft: 10,
  },
});
const mapStateToProps = (state) => {
  return {
    loginData: state.LoginData,
  };
};
const mapDispatchToProps = (dispatch) => ({
  LoginUser: (data) => dispatch(LoginUser(data)),

  // NotesGet: (id) => dispatch(NotesGet(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
