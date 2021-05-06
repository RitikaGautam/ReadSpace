import React from 'react';
import {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {connect} from 'react-redux';
import {deletetodo} from '../modules/action';
import Icons from 'react-native-vector-icons/AntDesign';
import Back from 'react-native-vector-icons/Ionicons';
class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  deleteData = (id) => {
    Alert.alert('Delete', 'Do you really want to delete this Note ?', [
      {text: 'Yes', onPress: () => this.props.deletetodo(id)},
      {text: 'No', onPress: () => null},
    ]);
  };
  updateData = (data) => {
    this.props.navigation.navigate('Addnotes', {data});
  };
  dataStyling = ({item}) => {
    return (
      <View
        style={[
          styles.dataContainer,
          this.props.dark ? styles.darkDataContainer : null,
        ]}>
        <View style={styles.middataContainer}>
          <TouchableOpacity
            onLongPress={() => this.deleteData(item.Id)}
            onPress={() => this.updateData(item)}>
            <Text style={styles.title}>{item.Title}</Text>
            <Text style={styles.note}>{item.Detail}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
            <Text style={styles.headerTxt}>My Notes</Text>
          </View>
          <View style={styles.midContainer}>
            <FlatList
              data={this.props.notes}
              renderItem={this.dataStyling}
              keyExtractor={(item, index) => item + index}
              numColumns={2}
            />

            {console.log('notes', this.props.notes)}
          </View>
          <View style={styles.plusButton}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Addnotes')}>
              <Icons name={'pluscircle'} color={'#1273de'} size={60} />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    dark: state.darkScreen,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deletetodo: (id) => dispatch(deletetodo(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notes);
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
    marginBottom: 20,
    flexDirection: 'row',
  },
  darkHeader: {
    backgroundColor: '#abb8c3',
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
    margin: 30,
  },
  dataContainer: {
    borderWidth: 1,
    borderColor: '#f7eef9',
    width: windowWidth / 2.2,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#b3cbe5',
    marginLeft: 10,
    marginRight: 5,
    marginBottom: 10,
  },
  darkDataContainer: {
    backgroundColor: '#ced5db',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  note: {
    fontSize: 16,
  },
  midContainer: {
    height: windowHeight / 1.4,
  },
  goback: {
    paddingHorizontal: 10,
  },
});
