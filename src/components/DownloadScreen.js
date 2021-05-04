import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  Dimensions,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Sad from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {deleteDownloadedbook} from '../modules/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Book from 'react-native-vector-icons/Ionicons';
import Back from 'react-native-vector-icons/Ionicons';
import Delete from 'react-native-vector-icons/AntDesign';
class DownloadScreen extends Component {
  dataStyling = ({item}) => {
    return (
      <View style={styles.dataContainer}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Details', {item})}>
          <View style={styles.imgContainer}>
            {item.volumeInfo.imageLinks ? (
              <Image
                style={styles.img}
                source={{
                  uri: item.volumeInfo.imageLinks.smallThumbnail,
                }}
              />
            ) : (
              <Book style={styles.img} name={'book'} size={170} />
            )}
            <View style={styles.DeleteIcon}>
              <TouchableOpacity
                onPress={() => this.props.deleteDownloadedbook(item.id)}>
                <Delete name={'delete'} size={25} />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={[styles.txt, this.props.dark ? styles.darktxt : null]}>
            {item.volumeInfo.title.slice(0, 15)}...
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <>
        <SafeAreaView />
        <View style={this.props.dark ? styles.darkContainer : styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.goback}
              onPress={() => this.props.navigation.goBack()}>
              <Back name={'arrow-back-sharp'} color={'white'} size={30} />
            </TouchableOpacity>
            <Text style={styles.headerTxt}>Downloads</Text>
          </View>
          {this.props.downloadedBook.length !== 0 ? (
            <FlatList
              data={this.props.downloadedBook}
              renderItem={this.dataStyling}
              keyExtractor={(item) => item.etag}
              numColumns={2}
            />
          ) : (
            <View style={styles.middleTxt}>
              <Sad name={'sad-sharp'} size={100} color={'#ba68c8'} />
              <Text
                style={[
                  styles.midText,
                  this.props.dark ? styles.darkmidText : null,
                ]}>
                No Book Downloaded
              </Text>
            </View>
          )}
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    downloadedBook: state.downloads,
    dark: state.darkScreen,
  };
};
const mapDispatchToProps = (dispatch) => ({
  deleteDownloadedbook: (bookid) => dispatch(deleteDownloadedbook(bookid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DownloadScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  darkContainer: {
    flex: 1,
    backgroundColor: '#252726',
  },
  dataConatiner: {
    width: 185,
    margin: 10,
  },
  txt: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: 'black',
    marginBottom: 10,
  },
  darktxt: {
    color: 'white',
  },
  midText: {
    flexDirection: 'column',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '600',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  darkmidText: {
    color: 'white',
  },
  img: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        borderRadius: 10,
      },
      android: {
        borderRadius: 3,
      },
    }),
  },
  imgContainer: {
    alignItems: 'center',
    margin: 10,
    ...Platform.select({
      ios: {
        width: windowWidth / 2.3,
        height: windowHeight / 4,
      },
      android: {
        width: windowWidth / 2.2,
        height: windowHeight / 3,
      },
    }),
    //backgroundColor: 'red',
    shadowColor: '#194D48',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  DeleteIcon: {
    position: 'absolute',
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 5,
    right: 0,
  },
  searchField: {
    height: 50,
    borderColor: 'black',
    borderWidth: 2,
    margin: 10,
    justifyContent: 'center',
    padding: 5,
    borderRadius: 10,
  },
  textinput: {
    fontSize: 20,
    color: 'blue',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#ba68c8',
    height: 40,

    flexDirection: 'row',
  },
  headerTxt: {
    fontWeight: '800',
    fontSize: 20,
    color: 'white',
  },
  goback: {
    paddingHorizontal: 10,
  },
  middleTxt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
