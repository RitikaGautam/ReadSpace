import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import {LoginAuthUser} from '../modules/action';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';
import Eye from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/MaterialIcons';
import database from '@react-native-firebase/database';
class LoginAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      issecure: true,
      ismodal: false,
      newpassword: '',
      uid: '',
    };
  }

  login = async () => {
    try {
      const doLogin = await auth().signInWithEmailAndPassword(
        this.state.email,
        this.state.password,
      );

      if (doLogin.user) {
        this.setState({
          uid: doLogin.user.uid,
        });
        console.log('UID', this.state.uid);
        this.props.navigation.navigate('TabScreen');
        this.props.LoginAuthUser(this.state.uid);
        this.saveData();
      }
    } catch (e) {
      Alert.alert(e.message);
    }
  };
  saveData = () => {
    database()
      .ref(`MyDatabase${this.state.uid}`)
      .set({
        name: this.state.uid,
        bookmark: this.props.bookmark,
        downloads: this.props.downloads,
      })
      // .push({
      //   name: this.state.uid,
      //   bookmark: this.props.bookmark,
      //   downloads: this.props.downloads,
      // })
      .then(() => console.log('Data set.'));
  };

  forgott = async (Email) => {
    const reset = auth()
      .sendPasswordResetEmail(Email)
      .then(function (user) {
        Alert.alert('Please check your email...');
      })
      .catch(function (e) {
        console.log(e);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.emailContainer}>
          <Icons name={'email'} size={30} color={'orange'} />
          <TextInput
            style={styles.inputBox}
            value={this.state.email}
            onChangeText={(email) => this.setState({email})}
            placeholder="Email"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.passContainer}>
          <Icons name={'lock'} size={30} color={'orange'} />
          <TextInput
            style={styles.inputBox}
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
            placeholder="Password"
            secureTextEntry={this.state.issecure}
          />
          <TouchableOpacity
            onPress={() => this.setState({issecure: !this.state.issecure})}>
            <Eye name={'eye'} size={30} color={'orange'} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.login}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.forgott(this.state.email)}>
          <Text style={styles.buttonText}>ForgotPassword</Text>
        </TouchableOpacity>
        <Button
          title="Don't have an account yet? Sign up"
          onPress={() => this.props.navigation.navigate('Signup')}
        />
        {/* {console.log('Login', this.props.login)} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: '75%',
    margin: 10,
    padding: 10,
    fontSize: 20,
  },
  modal: {
    backgroundColor: 'white',
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#F6820D',
    borderColor: '#F6820D',
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonSignup: {
    fontSize: 12,
  },
  passContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    height: 70,
    borderRadius: 30,
    margin: 20,
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
  },
  emailContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    height: 70,
    borderRadius: 30,
    margin: 10,
    backgroundColor: 'white',
    paddingLeft: 20,
  },
});
const mapStateToProps = (state) => {
  return {
    login: state.Authlogin,
    bookmark: state.bookmark,
    downloads: state.downloads,
  };
};
const mapDispatchToProps = (dispatch) => ({
  LoginAuthUser: (data) => dispatch(LoginAuthUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginAuth);
