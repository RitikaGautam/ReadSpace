import React from 'react';
import {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Modal,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {connect} from 'react-redux';
import {todo, Updatedtodo} from '../modules/action';
import Icons from 'react-native-vector-icons/AntDesign';
import Back from 'react-native-vector-icons/Ionicons';
var id = 0;
class Addnotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      detail: '',
      updatedid: '',
      updatedtitle: '',
      updateddetail: '',
      ismodalVisible: false,
    };
  }
  componentDidMount() {
    this.updatedValue();
  }
  async updatedValue() {
    if (this.props.route.params) {
      this.setState({
        updatedid: this.props.route.params.data.Id,
        updatedtitle: this.props.route.params.data.Title,
        updateddetail: this.props.route.params.data.Detail,
        ismodalVisible: true,
      });
    }
  }
  handleText = async () => {
    const value = await AsyncStorage.getItem('NotesDatabase');

    this.props.todo(
      {
        Id: id++,
        Title: this.state.title,
        Detail: this.state.detail,
      },
      JSON.parse(value),
    );

    this.props.navigation.navigate('Notes');
  };
  handleUpdatedText = () => {
    this.props.Updatedtodo({
      Id: this.state.updatedid,
      Title: this.state.updatedtitle,
      Detail: this.state.updateddetail,
    });
    this.props.navigation.navigate('Notes');
  };
  render() {
    return (
      <>
        {this.props.dark ? (
          <LinearGradient style={styles.linear} colors={['white', 'black']} />
        ) : (
          <LinearGradient style={styles.linear} colors={['#0693e3', 'white']} />
        )}
        <View style={this.props.dark ? styles.darkContainer : styles.container}>
          <View
            style={[styles.header, this.props.dark ? styles.darkHeader : null]}>
            <TouchableOpacity
              style={styles.goback}
              onPress={() => this.props.navigation.goBack()}>
              <Back name={'arrow-back-sharp'} color={'white'} size={30} />
            </TouchableOpacity>

            <Text style={styles.headerTxt}>Add Notes</Text>
          </View>
          <View style={styles.midContainer}>
            <View style={styles.input}>
              <TextInput
                style={[styles.note, this.props.dark ? styles.darknote : null]}
                placeholder="Title"
                placeholderTextColor={this.props.dark ? 'grey' : null}
                multiline={true}
                selectionColor={'green'}
                onChangeText={(text) => this.setState({title: text})}
              />
            </View>
            <View style={styles.input}>
              <TextInput
                style={[styles.note, this.props.dark ? styles.darknote : null]}
                placeholder="Notes"
                placeholderTextColor={this.props.dark ? 'grey' : null}
                multiline={true}
                selectionColor={'red'}
                onChangeText={(text) => this.setState({detail: text})}
              />
            </View>
          </View>
          <View style={styles.plusButton}>
            <TouchableOpacity onPress={this.handleText}>
              <Icons name={'checkcircle'} color={'#1273de'} size={50} />
            </TouchableOpacity>
          </View>
          <Modal visible={this.state.ismodalVisible}>
            <View
              style={[
                styles.Mheader,
                this.props.dark ? styles.MdarkHeader : null,
              ]}>
              <TouchableOpacity
                style={styles.goback}
                onPress={() => this.props.navigation.goBack()}>
                <Back name={'arrow-back-sharp'} color={'white'} size={30} />
              </TouchableOpacity>

              <Text style={styles.headerTxt}>Update Notes</Text>
            </View>
            <View style={styles.midContainer}>
              <View style={styles.input}>
                <TextInput
                  style={[
                    styles.Mnote,
                    this.props.dark ? styles.Mdarknote : null,
                  ]}
                  placeholder="Title"
                  multiline={true}
                  placeholderTextColor={this.props.dark ? 'grey' : 'grey'}
                  selectionColor={'green'}
                  value={this.state.updatedtitle}
                  onChangeText={(text) => this.setState({updatedtitle: text})}
                />
              </View>
              <View style={styles.input}>
                <TextInput
                  style={[
                    styles.Mnote,
                    this.props.dark ? styles.Mdarknote : null,
                  ]}
                  placeholder="Notes"
                  placeholderTextColor={this.props.dark ? 'grey' : 'grey'}
                  multiline={true}
                  selectionColor={'red'}
                  value={this.state.updateddetail}
                  onChangeText={(text) => this.setState({updateddetail: text})}
                />
              </View>
            </View>
            <View style={styles.plusButton}>
              <TouchableOpacity onPress={this.handleUpdatedText}>
                <Icons name={'checkcircle'} color={'#1273de'} size={50} />
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dark: state.darkScreen,
  };
};
const mapDispatchToProps = (dispatch) => ({
  todo: (data, value) => dispatch(todo(data, value)),
  Updatedtodo: (data) => dispatch(Updatedtodo(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Addnotes);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  darkContainer: {
    flex: 1,
    backgroundColor: '#252726',
  },
  linear: {
    ...Platform.select({
      ios: {
        height: 30,
      },
      android: {
        height: 0,
      },
    }),
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#0693e3',
    height: 50,
    flexDirection: 'row',
  },
  darkHeader: {
    backgroundColor: '#abb8c3',
  },
  Mheader: {
    backgroundColor: '#1273de',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

    ...Platform.select({
      ios: {
        marginTop: 40,
      },
    }),
  },
  MdarkHeader: {
    backgroundColor: '#abb8c3',
  },
  goback: {
    paddingHorizontal: 10,
  },
  headerTxt: {
    fontSize: 20,
    color: 'white',
    fontWeight: '800',
  },
  plusButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    margin: 40,
  },
  input: {
    margin: 20,
  },
  note: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  darknote: {
    color: 'white',
  },
  Mnote: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  Mdarknote: {
    color: '#004dcf',
  },
  midContainer: {
    height: windowHeight / 1.4,
  },
});
