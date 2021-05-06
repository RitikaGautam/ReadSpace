import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
// import Firebase from '../config/Firebase';
import {connect} from 'react-redux';
import {LoginAuthUser} from '../modules/action';
import auth from '@react-native-firebase/auth';
import Eye from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/MaterialIcons';
import User from 'react-native-vector-icons/Entypo';
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      issecure: true,
      isconfirmsecure: true,
    };
  }

  login = async () => {
    try {
      if (this.state.password !== this.state.confirmPassword) {
        Alert.alert('Password Not match');
      } else if (
        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
          this.state.password,
        ) &&
        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
          this.state.confirmpassword,
        )
      ) {
        Alert.alert(' Not a correct password format');
      } else if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(this.state.email)) {
        Alert.alert('Email should be valid email');
      } else {
        const doRegister = await auth().createUserWithEmailAndPassword(
          this.state.email,
          this.state.password,
        );

        if (doRegister.user) {
          this.props.navigation.reset({
            index: 0,
            routes: [{name: 'LoginAuth'}],
          });
        }
      }
    } catch (e) {
      Alert.alert(e.message);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.InputContainer}>
          <User name={'user'} size={30} color={'orange'} />
          <TextInput
            style={styles.inputBox}
            value={this.state.name}
            onChangeText={(name) => this.setState({name})}
            placeholder="Full Name"
          />
        </View>
        <View style={styles.InputContainer}>
          <Icons name={'email'} size={30} color={'orange'} />
          <TextInput
            style={styles.inputBox}
            value={this.state.email}
            onChangeText={(email) => this.setState({email})}
            placeholder="Email"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.passwordContainer}>
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
        <View style={styles.passwordContainer}>
          <Icons name={'lock'} size={30} color={'orange'} />
          <TextInput
            style={styles.inputBox}
            value={this.state.confirmPassword}
            onChangeText={(confirmPassword) => this.setState({confirmPassword})}
            placeholder="Confirm Password"
            secureTextEntry={this.state.isconfirmsecure}
          />
          <TouchableOpacity
            onPress={() =>
              this.setState({isconfirmsecure: !this.state.isconfirmsecure})
            }>
            <Eye name={'eye'} size={30} color={'orange'} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.login}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
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
    padding: 15,
    fontSize: 16,
    // borderColor: '#d3d3d3',
    // borderBottomWidth: 1,
    // textAlign: 'center',
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#FFA611',
    borderColor: '#FFA611',
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
  InputContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    height: 70,
    borderRadius: 30,
    marginBottom: 20,
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
  },
  passwordContainer: {
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
});
const mapStateToProps = (state) => {
  return {
    downloadedBook: state.downloads,
    dark: state.darkScreen,
  };
};
const mapDispatchToProps = (dispatch) => ({
  LoginAuthUser: (data) => dispatch(LoginAuthUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
