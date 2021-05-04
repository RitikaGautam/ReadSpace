import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {connect} from 'react-redux';
import Back from 'react-native-vector-icons/Ionicons';
import {bookmark, deletebook, MyDatabase} from '../modules/action';
import Book from 'react-native-vector-icons/Ionicons';
import Sad from 'react-native-vector-icons/Ionicons';
import Delete from 'react-native-vector-icons/AntDesign';
class BookMarkScreen extends Component {
  constructor(props) {
    super(props);
  }
  dataStyling = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Details', {item})}>
          <View style={styles.imgContainer}>
            {item.volumeInfo.imageLinks ? (
              <Image
                style={styles.img}
                resizeMode="stretch"
                source={{
                  uri: item.volumeInfo.imageLinks.smallThumbnail,
                }}
              />
            ) : (
              <Book
                style={styles.img}
                resizeMode="stretch"
                name={'book'}
                size={170}
              />
            )}
            <View style={styles.DeleteIcon}>
              <TouchableOpacity onPress={() => this.props.deletebook(item.id)}>
                <Delete name={'delete'} size={20} />
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
            <Text style={styles.headerTxt}>BOOKMARKS</Text>
          </View>
          <View style={styles.middleContainer}>
            {this.props.bookmark.length !== 0 ? (
              <FlatList
                data={this.props.bookmark}
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
                  Please Add Your Favourite Book
                </Text>
              </View>
            )}
          </View>
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookmark: state.bookmark,
    dark: state.darkScreen,
    BookDatabase: state.BookDatabase,
    loginData: state.LoginData,
    downloads: state.downloads,
  };
};
const mapDispatchToProps = (dispatch) => ({
  deletebook: (bookid) => dispatch(deletebook(bookid)),
  // MyDatabase: () => dispatch(MyDatabase()),
});
export default connect(mapStateToProps, mapDispatchToProps)(BookMarkScreen);
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
    //backgroundColor: 'orange',
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
    // resizeMode: 'contain',
    // borderWidth: 2,
    // borderColor: 'lightgrey',
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
        width: windowWidth / 2.3,
        height: windowHeight / 3.5,
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
    right: 5,
    top: 5,
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
  middleContainer: {
    flex: 1,
  },
  middleTxt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
