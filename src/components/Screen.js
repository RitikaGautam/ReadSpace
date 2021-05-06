import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  Switch,
  Alert,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
  KeyboardAvoidingView,
  StatusBar,
  ScrollView,
} from 'react-native';
import database from '@react-native-firebase/database';
import LinearGradient from 'react-native-linear-gradient';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import Icons from 'react-native-vector-icons/AntDesign';
import Book from 'react-native-vector-icons/Ionicons';
import Sort from 'react-native-vector-icons/MaterialIcons';

import {
  updateData,
  getdata,
  searchdata,
  sortbook,
  filterbook,
  restoreData,
  restoreNotes,
} from '../modules/action';

class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentbook: 'My Books',
      ismodalVisible: false,
      partial: false,
      full: false,
      freeebooks: false,
      paidebooks: false,
      ebooks: false,
      grid: false,
      isRefreshing: false,
      isloader: false,
      isfiction: false,
      isbiography: false,
      iscomic: false,
      isscience: false,
      isaeronautics: false,
      isthriller: false,
      ismathematics: false,
      iscomputer: false,
      istechnology: false,
      ismystery: false,
      isromance: false,
      ishealth: false,
      ishumor: false,
      ishistory: false,
      iscooking: false,
      isfantasy: false,
      ishorror: false,
      ismotivational: false,
      istravel: false,
      isparanormal: false,
    };
  }
  refreshList = (refresh) => {
    this.setState({
      isRefreshing: refresh,
    });
  };
  async componentDidMount() {
    this.props.getdata(this.state.currentbook);
    const value = await AsyncStorage.getItem('Database');
    const result = JSON.parse(value);
    // console.log('resut', result);
    this.props.restoreData(result);
    const newvalue = await AsyncStorage.getItem('NotesDatabase');
    const newresult = JSON.parse(newvalue);
    this.props.restoreNotes(newresult);
  }

  Fiction = () => {
    this.props.getdata('subject:fiction');
    this.setState({
      isfiction: true,
      currentbook: 'subject:fiction',
    });
  };
  Biography = () => {
    this.props.getdata('subject:biography & autobiography');
    this.setState({
      isbiography: true,
      currentbook: 'subject:biography & autobiography',
    });
  };
  Comic = () => {
    this.props.getdata('subject:comic');
    this.setState({
      iscomic: true,
      currentbook: 'subject:comic',
    });
  };
  Science = () => {
    this.props.getdata('subject:science');
    this.setState({
      isscience: true,
      currentbook: 'subject:science',
    });
  };
  Aeronautics = () => {
    this.props.getdata('subject:Aeronautics');
    this.setState({
      isaeronautics: true,
      currentbook: 'subject:Aeronautics',
    });
  };
  Thriller = () => {
    this.props.getdata('subject:thriller');
    this.setState({
      isthriller: true,
      currentbook: 'subject:thriller',
    });
  };
  Mathematics = () => {
    this.props.getdata('subject:mathematics');
    this.setState({
      ismathematics: true,
      currentbook: 'subject:mathematics',
    });
  };
  Computer = () => {
    this.props.getdata('subject:computer');
    this.setState({
      iscomputer: true,
      currentbook: 'subject:computer',
    });
  };
  Technology = () => {
    this.props.getdata('subject:Technology & Engineering');
    this.setState({
      istechnology: true,
      currentbook: 'subject:Technology & Engineering',
    });
  };
  Mystery = () => {
    this.props.getdata('subject:Mystery');
    this.setState({
      ismystery: true,
      currentbook: 'subject:Mystery',
    });
  };
  Romance = () => {
    this.props.getdata('subject:Romance');
    this.setState({
      isromance: true,
      currentbook: 'subject:Romance',
    });
  };
  Health = () => {
    this.props.getdata('subject:Health');
    this.setState({
      ishealth: true,
      currentbook: 'subject:Health',
    });
  };
  Humor = () => {
    this.props.getdata('subject:Humor');
    this.setState({
      ishumor: true,
      currentbook: 'subject:Humor',
    });
  };
  History = () => {
    this.props.getdata('subject:History');
    this.setState({
      ishistory: true,
      currentbook: 'subject:History',
    });
  };
  Cooking = () => {
    this.props.getdata('subject:Cooking');
    this.setState({
      iscooking: true,
      currentbook: 'subject:Cooking',
    });
  };
  Fantasy = () => {
    this.props.getdata('subject:Fantasy');
    this.setState({
      isfantasy: true,
      currentbook: 'subject:Fantasy',
    });
  };
  Horror = () => {
    this.props.getdata('subject:Horror');
    this.setState({
      ishorror: true,
      currentbook: 'subject:Horror',
    });
  };
  Motivational = () => {
    this.props.getdata('subject:Motivational');
    this.setState({
      ismotivational: true,
      currentbook: 'subject:Motivational',
    });
  };
  Travel = () => {
    this.props.getdata('subject:Travel');
    this.setState({
      istravel: true,
      currentbook: 'subject: Travel',
    });
  };
  Paranormal = () => {
    this.props.getdata('subject:Paranormal');
    this.setState({
      isparanormal: true,
      currentbook: 'subject:Paranormal',
    });
  };
  modalVisible = (visible) => {
    this.setState({
      ismodalVisible: visible,
    });
  };
  onpartialClick = (value) => {
    this.setState({
      partial: value,
      full: false,
      freeebooks: false,
      paidebooks: false,
      ebooks: false,
    });
  };
  onFullClick = (value) => {
    this.setState({
      partial: false,
      full: value,
      freeebooks: false,
      paidebooks: false,
      ebooks: false,
    });
  };
  onFreeClick = (value) => {
    this.setState({
      partial: false,
      full: false,
      freeebooks: value,
      paidebooks: false,
      ebooks: false,
    });
  };
  onPaidClick = (value) => {
    this.setState({
      partial: false,
      full: false,
      freeebooks: false,
      paidebooks: value,
      ebooks: false,
    });
  };
  onEBookClick = (value) => {
    this.setState({
      partial: false,
      full: false,
      freeebooks: false,
      paidebooks: false,
      ebooks: value,
    });
  };

  handleFilter = () => {
    if (this.state.partial) {
      // console.log('Cureebt', this.state.currentbook);
      this.props.filterbook(this.state.currentbook, 'partial');
    } else if (this.state.full) {
      this.props.filterbook(this.state.currentbook, 'full');
    } else if (this.state.freeebooks) {
      this.props.filterbook(this.state.currentbook, 'free-ebooks');
    } else if (this.state.paidebooks) {
      this.props.filterbook(this.state.currentbook, 'paid-ebooks');
    } else if (this.state.ebooks) {
      this.props.filterbook(this.state.currentbook, 'ebooks');
    }
    this.modalVisible(false);
  };
  Navigate = (item) => {
    this.props.navigation.navigate('Details', {item});
    // this.props.navigation.reset({
    //   index: 0,
    //   routes: [{name: 'Details', params: {item}}],
    // });
  };
  dataStyling = ({item}) => {
    return (
      <View>
        <TouchableOpacity onPress={() => this.Navigate(item)}>
          <View style={styles.innerdataContainer}>
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
                  color={this.props.dark ? 'white' : 'black'}
                />
              )}
            </View>
            <View style={styles.rightContainer}>
              <Text
                style={[styles.txt, this.props.dark ? styles.darktxt : null]}>
                {item.volumeInfo.title}
              </Text>
              <View style={styles.innerRightContainer}>
                <View style={styles.categorie}>
                  <Text style={styles.categorieTxt}>
                    {item.volumeInfo.averageRating
                      ? item.volumeInfo.averageRating
                      : 'NA'}
                  </Text>
                  <Text style={styles.categorieTxt}>Rating</Text>
                </View>
                <View style={styles.pages}>
                  <Text style={styles.pagesTxt}>
                    {item.volumeInfo.pageCount
                      ? item.volumeInfo.pageCount
                      : 'NA'}
                  </Text>
                  <Text style={styles.categorieTxt}>Pages</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  gridStyling = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Details', {item})}>
          <View style={styles.gridimgContainer}>
            {item.volumeInfo.imageLinks ? (
              <Image
                style={styles.gridimg}
                resizeMode="stretch"
                source={{
                  uri: item.volumeInfo.imageLinks.smallThumbnail,
                }}
              />
            ) : (
              <Book
                style={styles.gridimg}
                resizeMode="stretch"
                name={'book'}
                size={170}
                color={this.props.dark ? 'white' : 'black'}
              />
            )}
          </View>
          <Text
            style={[
              styles.gridtxt,
              this.props.dark ? styles.darkgridtxt : null,
            ]}>
            {item.volumeInfo.title.slice(0, 15)}...
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  loader = () => {
    return this.state.isloader ? (
      <ActivityIndicator
        animating={this.state.isloader}
        size={'large'}
        color={'red'}
      />
    ) : null;
  };
  endReached = () => {
    this.setState({
      isloader: true,
    });
    setTimeout(() => {
      this.setState({
        isloader: false,
      });
    }, 5000);
    if (this.state.isfiction) {
      this.props.updateData('subject:fiction', this.props.page + 1);
    } else if (this.state.isbiography) {
      this.props.updateData(
        'subject:biography & autobiography',
        this.props.page + 1,
      );
    } else if (this.state.iscomic) {
      this.props.updateData('subject:comic', this.props.page + 1);
    } else if (this.state.isscience) {
      this.props.updateData('subject:science', this.props.page + 1);
    } else if (this.state.isaeronautics) {
      this.props.updateData('subject:Aeronautics', this.props.page + 1);
    } else if (this.state.isthriller) {
      this.props.updateData('subject:thriller', this.props.page + 1);
    } else if (this.state.ismathematics) {
      this.props.updateData('subject:mathematics', this.props.page + 1);
    } else if (this.state.iscomputer) {
      this.props.updateData('subject:computer', this.props.page + 1);
    } else if (this.state.istechnology) {
      this.props.updateData(
        'subject:Technology & Engineering',
        this.props.page + 1,
      );
    } else if (this.state.ismystery) {
      this.props.updateData('subject:Mystery', this.props.page + 1);
    } else if (this.state.isromance) {
      this.props.updateData('subject:Romance', this.props.page + 1);
    } else if (this.state.ishealth) {
      this.props.updateData('subject:Health', this.props.page + 1);
    } else if (this.state.ishumor) {
      this.props.updateData('subject:Humor', this.props.page + 1);
    } else if (this.state.ishistory) {
      this.props.updateData('subject:History', this.props.page + 1);
    } else if (this.state.iscooking) {
      this.props.updateData('subject:Cooking', this.props.page + 1);
    } else if (this.state.isfantasy) {
      this.props.updateData('subject:Fantasy', this.props.page + 1);
    } else if (this.state.ishorror) {
      this.props.updateData('subject:Horror', this.props.page + 1);
    } else if (this.state.istravel) {
      this.props.updateData('subject:Travel', this.props.page + 1);
    } else if (this.state.isparanormal) {
      this.props.updateData('subject:Paranormal', this.props.page + 1);
    } else {
      this.props.updateData(this.state.currentbook, this.props.page + 1);
    }
  };
  handleChange = (book) => {
    this.props.searchdata(book);
    this.setState({
      currentbook: book,
    });
  };
  sortData = () => {
    Alert.alert(
      'Sort',
      'Do you really want to sort data on the basis of latest release??',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => null,
        },
        {
          text: 'Ok',
          style: 'default',
          onPress: () => this.props.sortbook(this.state.currentbook),
        },
      ],
    );
  };
  render() {
    return (
      <>
        {this.props.dark ? (
          <LinearGradient
            style={styles.linear}
            colors={['white', 'black']}></LinearGradient>
        ) : (
          <LinearGradient
            style={styles.linear}
            colors={['#0693e3', 'white']}></LinearGradient>
        )}

        {/* <SafeAreaView /> */}

        <View style={this.props.dark ? styles.darkcontainer : styles.container}>
          <View
            style={[
              styles.innerContainer,
              this.props.dark ? styles.darkinnerContainer : null,
            ]}>
            <View
              style={[
                styles.header,
                this.props.dark ? styles.darkheader : null,
              ]}>
              <View style={styles.headerTitleContainer}>
                <Text
                  style={
                    this.props.dark
                      ? styles.darkheaderTitle
                      : styles.headerTitle
                  }>
                  {/* {this.state.currentbook} */}
                  ReadSpace
                </Text>
              </View>
              <View style={styles.boxContainer}>
                <TouchableOpacity onPress={() => this.sortData()}>
                  <View style={styles.icons}>
                    <Sort name={'sort'} size={30} color={'white'} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.modalVisible(true)}>
                  <View style={styles.icons}>
                    <Icons name={'filter'} size={30} color={'white'} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.searchFieldContainer}>
              <View style={styles.searchField}>
                <Icons name={'search1'} size={20} />
                <TextInput
                  style={styles.textinput}
                  placeholder="Search"
                  onChangeText={(book) => this.handleChange(book)}
                />
              </View>
              <View style={styles.gridContainer}>
                <TouchableOpacity
                  onPress={() => this.setState({grid: !this.state.grid})}>
                  {this.state.grid ? (
                    <Book name={'grid'} size={35} color={'white'} />
                  ) : (
                    <Book name={'grid-outline'} size={35} color={'white'} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <KeyboardAvoidingView>
            <View style={styles.categorieButtonsContainer}>
              <ScrollView horizontal={true}>
                <View
                  style={[
                    styles.categoryButton,
                    this.props.dark ? styles.datacategoryButton : null,
                  ]}>
                  <TouchableOpacity onPress={() => this.Fiction()}>
                    <Text style={styles.categoryButtonTxt}>Fiction</Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={[
                    styles.categoryButton,
                    this.props.dark ? styles.datacategoryButton : null,
                  ]}>
                  <TouchableOpacity onPress={() => this.Comic()}>
                    <Text style={styles.categoryButtonTxt}>Comics</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.categoryButton,
                    this.props.dark ? styles.datacategoryButton : null,
                  ]}>
                  <TouchableOpacity onPress={() => this.Science()}>
                    <Text style={styles.categoryButtonTxt}>Science</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.categoryButton,
                    this.props.dark ? styles.datacategoryButton : null,
                  ]}>
                  <TouchableOpacity onPress={() => this.Aeronautics()}>
                    <Text style={styles.categoryButtonTxt}>Aeronautics</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.categoryButton,
                    this.props.dark ? styles.datacategoryButton : null,
                  ]}>
                  <TouchableOpacity onPress={() => this.Thriller()}>
                    <Text style={styles.categoryButtonTxt}>Thriller</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.categoryButton,
                    this.props.dark ? styles.datacategoryButton : null,
                  ]}>
                  <TouchableOpacity onPress={() => this.Mathematics()}>
                    <Text style={styles.categoryButtonTxt}>Mathematics</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.categoryButton,
                    this.props.dark ? styles.datacategoryButton : null,
                  ]}>
                  <TouchableOpacity onPress={() => this.Computer()}>
                    <Text style={styles.categoryButtonTxt}>Computer</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.categoryButton,
                    this.props.dark ? styles.datacategoryButton : null,
                  ]}>
                  <TouchableOpacity onPress={() => this.Technology()}>
                    <Text style={styles.categoryButtonTxt}>
                      Technology & Engineering
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.categoryButton,
                    this.props.dark ? styles.datacategoryButton : null,
                  ]}>
                  <TouchableOpacity onPress={() => this.Mystery()}>
                    <Text style={styles.categoryButtonTxt}>Mystery</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.categoryButton,
                    this.props.dark ? styles.datacategoryButton : null,
                  ]}>
                  <TouchableOpacity onPress={() => this.Romance()}>
                    <Text style={styles.categoryButtonTxt}>Romance</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.categoryButton,
                    this.props.dark ? styles.datacategoryButton : null,
                  ]}>
                  <TouchableOpacity onPress={() => this.Health()}>
                    <Text style={styles.categoryButtonTxt}>Health</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.categoryButton,
                    this.props.dark ? styles.datacategoryButton : null,
                  ]}>
                  <TouchableOpacity onPress={() => this.Humor()}>
                    <Text style={styles.categoryButtonTxt}>Humor</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.categoryButton,
                    this.props.dark ? styles.datacategoryButton : null,
                  ]}>
                  <TouchableOpacity onPress={() => this.History()}>
                    <Text style={styles.categoryButtonTxt}>History</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.categoryButton,
                    this.props.dark ? styles.datacategoryButton : null,
                  ]}>
                  <TouchableOpacity onPress={() => this.Cooking()}>
                    <Text style={styles.categoryButtonTxt}>Cooking</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.categoryButton,
                    this.props.dark ? styles.datacategoryButton : null,
                  ]}>
                  <TouchableOpacity onPress={() => this.Biography()}>
                    <Text style={styles.categoryButtonTxt}>
                      Biography & Autobiography{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.categoryButton,
                    this.props.dark ? styles.datacategoryButton : null,
                  ]}>
                  <TouchableOpacity onPress={() => this.Fantasy()}>
                    <Text style={styles.categoryButtonTxt}>Fantasy</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.categoryButton,
                    this.props.dark ? styles.datacategoryButton : null,
                  ]}>
                  <TouchableOpacity onPress={() => this.Horror()}>
                    <Text style={styles.categoryButtonTxt}>Horror</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.categoryButton,
                    this.props.dark ? styles.datacategoryButton : null,
                  ]}>
                  <TouchableOpacity onPress={() => this.Motivational()}>
                    <Text style={styles.categoryButtonTxt}>Motivational</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.categoryButton,
                    this.props.dark ? styles.datacategoryButton : null,
                  ]}>
                  <TouchableOpacity onPress={() => this.Travel()}>
                    <Text style={styles.categoryButtonTxt}>Travel</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.categoryButton,
                    this.props.dark ? styles.datacategoryButton : null,
                  ]}>
                  <TouchableOpacity onPress={() => this.Paranormal()}>
                    <Text style={styles.categoryButtonTxt}>Paranormal</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
            {this.state.grid ? (
              <FlatList
                data={this.props.listData}
                renderItem={this.gridStyling}
                keyExtractor={(item) => item.etag}
                numColumns={2}
                key={'#'}
                onEndReached={this.endReached}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={() => {
                      this.refreshList(true);
                      setTimeout(() => {
                        this.refreshList(false);
                      }, 5000);
                    }}
                  />
                }
              />
            ) : (
              <FlatList
                key={'&'}
                data={this.props.listData}
                renderItem={this.dataStyling}
                keyExtractor={(item) => item.etag}
                onEndReached={this.endReached}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={() => {
                      this.refreshList(true);
                      setTimeout(() => {
                        this.refreshList(false);
                      }, 5000);
                    }}
                  />
                }
                ListFooterComponent={() => this.loader()}
              />
            )}
          </KeyboardAvoidingView>
          <Modal
            isVisible={this.state.ismodalVisible}
            swipeDirection="down"
            onBackdropPress={() => this.modalVisible(false)}
            style={styles.modal}>
            <View style={styles.Mcontainer}>
              <View style={styles.MinnerContainer}>
                <Text style={styles.Mtext}>Partial</Text>
                <Switch
                  value={this.state.partial}
                  trackColor={{false: 'grey', true: 'azure'}}
                  thumbColor={this.state.partial ? 'darkcyan' : 'white'}
                  onValueChange={(text) => this.onpartialClick(text)}
                />
              </View>
              <View style={styles.MinnerContainer}>
                <Text style={styles.Mtext}>Full</Text>
                <Switch
                  value={this.state.full}
                  trackColor={{false: 'grey', true: 'azure'}}
                  thumbColor={this.state.full ? 'darkcyan' : 'white'}
                  onValueChange={(text) => this.onFullClick(text)}
                />
              </View>

              <View style={styles.MinnerContainer}>
                <Text style={styles.Mtext}>Free Ebook</Text>
                <Switch
                  value={this.state.freeebooks}
                  trackColor={{false: 'grey', true: 'azure'}}
                  thumbColor={this.state.freeebooks ? 'darkcyan' : 'white'}
                  onValueChange={(text) => this.onFreeClick(text)}
                />
              </View>
              <View style={styles.MinnerContainer}>
                <Text style={styles.Mtext}>Paid Ebook</Text>
                <Switch
                  value={this.state.paidebooks}
                  trackColor={{false: 'grey', true: 'azure'}}
                  thumbColor={this.state.paidebooks ? 'darkcyan' : 'white'}
                  onValueChange={(text) => this.onPaidClick(text)}
                />
              </View>

              <View style={styles.MinnerContainer}>
                <Text style={styles.Mtext}>Ebooks</Text>
                <Switch
                  value={this.state.ebooks}
                  trackColor={{false: 'grey', true: 'azure'}}
                  thumbColor={this.state.ebooks ? 'darkcyan' : 'white'}
                  onValueChange={(text) => this.onEBookClick(text)}
                />
              </View>

              <View style={styles.Mbutton}>
                <TouchableOpacity onPress={this.handleFilter}>
                  <Text style={styles.Mtext}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {/* {console.log('Page', this.props.page)}
          {console.log('Books', this.props.dark)} */}
          {/* {console.log('login', this.props.loginData)}
          {console.log('bookmark', this.props.bookmark)}
          {console.log('downloads', this.props.downloads)} */}
        </View>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listData: state.list,
    page: state.page,
    dark: state.darkScreen,
    loginData: state.LoginData,
    bookmark: state.bookmark,
    downloads: state.downloads,
    uid: state.Authlogin,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getdata: (book) => dispatch(getdata(book)),
  updateData: (book, page) => dispatch(updateData(book, page)),
  searchdata: (book) => dispatch(searchdata(book)),
  sortbook: (book) => dispatch(sortbook(book)),
  filterbook: (book, filter) => dispatch(filterbook(book, filter)),
  restoreData: (book) => dispatch(restoreData(book)),
  restoreNotes: (notes) => dispatch(restoreNotes(notes)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Screen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  darkcontainer: {
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
  innerContainer: {
    backgroundColor: '#1273de',
    borderBottomColor: 'rgba(18, 115, 112,0.8)',
    borderBottomWidth: 5,
    borderTopColor: 'rgba(18, 115, 112,0.8)',
    borderTopWidth: 2,
    // shadowColor: 'rgba(152, 43, 196,1)',
    // shadowOffset: {
    //   width: 0,
    //   height: 11,
    // },
    // shadowOpacity: 0.57,
    // shadowRadius: 15.19,
    // elevation: 23,
    width: windowWidth,
  },
  darkinnerContainer: {
    backgroundColor: 'rgba(22, 23, 23,0.6)',
    borderBottomColor: 'rgba(22, 23, 23,1)',
    borderBottomWidth: 5,
    borderTopColor: 'rgba(22, 23, 23,1)',
    borderTopWidth: 2,
  },
  header: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  headerContainer: {
    alignSelf: 'center',
  },

  boxContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  icons: {
    marginRight: 15,
  },
  griddataConatiner: {
    ...Platform.select({
      ios: {
        width: 185,
        marginLeft: 10,
        marginRight: 10,
      },
      android: {
        width: 165,
        marginLeft: 10,
        marginRight: 10,
      },
    }),
  },
  dataConatiner: {
    ...Platform.select({
      ios: {
        width: 185,
        marginLeft: 10,
        marginRight: 10,
      },
      android: {
        width: 165,
        marginLeft: 10,
        marginRight: 10,
      },
    }),
    backgroundColor: 'orange',
  },
  innerdataContainer: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    margin: 10,
  },
  rightContainer: {
    // backgroundColor: 'orange',
    marginTop: 20,
    width: windowWidth / 2,
    alignItems: 'center',
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: '500',
    color: 'white',
    textShadowColor: 'white',
    textShadowOffset: {width: 1, height: 4},
    textShadowRadius: 5,
  },
  darkheaderTitle: {
    fontSize: 25,
    fontWeight: '500',
    color: 'white',
  },
  headerTitleContainer: {
    alignSelf: 'center',
    marginLeft: 15,
  },
  gridtxt: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: 'black',
    marginBottom: 10,
  },
  darkgridtxt: {
    color: 'white',
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
  gridimg: {
    width: '100%',
    height: '100%',
    // borderWidth: 1,
    //borderColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    //resizeMode: 'contain',
    // resizeMode: 'stretch',
    ...Platform.select({
      ios: {
        borderRadius: 10,
      },
      android: {
        borderRadius: 3,
      },
    }),
  },
  img: {
    width: '100%',
    height: '100%',
    // resizeMode: 'stretch',
    //borderWidth: 1,
    //borderColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    //resizeMode: 'contain',

    ...Platform.select({
      ios: {
        borderRadius: 10,
      },
      android: {
        borderRadius: 3,
      },
    }),
  },
  innerRightContainer: {
    flexDirection: 'row',
    margin: 20,
  },
  categorie: {
    alignItems: 'center',
    // marginTop: 130,
    borderColor: 'rgba(255, 26, 60,0.8)',
    borderWidth: 1,
    //borderRadius: 10,
    backgroundColor: 'rgba(255, 26, 60,0.4)',
    // paddingLeft: 10,
    // paddingRight: 10,
    // paddingTop: 5,
    // paddingBottom: 5,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 5,
  },
  categorieTxt: {
    color: 'white',
    fontWeight: '500',
    fontSize: 17,
  },
  pages: {
    alignItems: 'center',

    borderColor: 'rgba(61, 0, 153,0.8)',
    borderWidth: 1,
    backgroundColor: 'rgba(61, 0, 153,0.4)',
    padding: 5,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  pagesTxt: {
    color: 'white',
    fontWeight: '500',
    fontSize: 17,
  },

  gridimgContainer: {
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
  imgContainer: {
    alignItems: 'center',
    // margin: 10,
    ...Platform.select({
      ios: {
        width: windowWidth / 2.6,
        height: windowHeight / 4,
      },
      android: {
        width: windowWidth / 2.4,
        height: windowHeight / 3.2,
      },
    }),

    shadowColor: '#194D48',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  searchFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
    marginLeft: 10,
  },
  searchField: {
    width: windowWidth / 1.5,
    height: 45,
    borderColor: 'white',
    borderWidth: 2,
    margin: 10,
    paddingLeft: 10,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textinput: {
    fontSize: 20,
    color: 'grey',
    paddingLeft: 10,
  },

  iconTxt: {
    marginLeft: 8,
    fontSize: 20,
    lineHeight: 22,
  },
  Mcontainer: {
    height: 450,
    backgroundColor: '#2b2c2b',
    borderRadius: 10,
    paddingTop: 20,
  },
  MinnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 30,
    marginBottom: 15,
    marginRight: 20,
    marginTop: 15,
  },
  modal: {
    justifyContent: 'flex-end',
  },
  Mtext: {
    fontSize: 17,
    fontWeight: '500',
    color: 'white',
  },
  Mheader: {
    fontSize: 17,
    fontWeight: '500',
    margin: 20,
    color: 'white',
  },
  Mbutton: {
    margin: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkgray',
  },
  gridContainer: {
    marginRight: 15,
  },
  categorieButtonsContainer: {
    margin: 10,
  },
  categoryButton: {
    borderColor: '#2d6686',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#36adf0',
    margin: 5,
  },
  datacategoryButton: {
    backgroundColor: 'grey',
  },
  categoryButtonTxt: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});
