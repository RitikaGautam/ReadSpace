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
        <SafeAreaView />
        <View style={styles.container}>
          <View style={styles.header}>
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
                style={styles.note}
                placeholder="Title"
                multiline={true}
                selectionColor={'green'}
                onChangeText={(text) => this.setState({title: text})}
              />
            </View>
            <View style={styles.input}>
              <TextInput
                style={styles.note}
                placeholder="Notes"
                multiline={true}
                selectionColor={'red'}
                onChangeText={(text) => this.setState({detail: text})}
              />
            </View>
          </View>
          <View style={styles.plusButton}>
            <TouchableOpacity onPress={this.handleText}>
              <Icons name={'checkcircle'} color={'#c579d2'} size={50} />
            </TouchableOpacity>
          </View>
          <Modal visible={this.state.ismodalVisible}>
            <View style={styles.Mheader}>
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
                  style={styles.note}
                  placeholder="Title"
                  multiline={true}
                  selectionColor={'green'}
                  value={this.state.updatedtitle}
                  onChangeText={(text) => this.setState({updatedtitle: text})}
                />
              </View>
              <View style={styles.input}>
                <TextInput
                  style={styles.note}
                  placeholder="Notes"
                  multiline={true}
                  selectionColor={'red'}
                  value={this.state.updateddetail}
                  onChangeText={(text) => this.setState({updateddetail: text})}
                />
              </View>
            </View>
            <View style={styles.plusButton}>
              <TouchableOpacity onPress={this.handleUpdatedText}>
                <Icons name={'checkcircle'} color={'#c579d2'} size={50} />
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  todo: (data, value) => dispatch(todo(data, value)),
  Updatedtodo: (data) => dispatch(Updatedtodo(data)),
});
export default connect(null, mapDispatchToProps)(Addnotes);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#ba68c8',
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
  },
  Mheader: {
    backgroundColor: '#ba68c8',
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
  },
  midContainer: {
    height: windowHeight / 1.4,
  },
});
