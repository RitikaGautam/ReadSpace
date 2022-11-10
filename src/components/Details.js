import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Dimensions,
  Linking,
  TouchableOpacity,
  ScrollView,
  Platform,
  SafeAreaView,
  TextInput,
  Button,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Book from 'react-native-vector-icons/Ionicons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {connect} from 'react-redux';
import {bookmark, download, ReviewsData, AddReviews} from '../modules/action';
import Icons from 'react-native-vector-icons/Ionicons';
import Thumb from 'react-native-vector-icons/Entypo';
import Tag from 'react-native-vector-icons/AntDesign';
import User from 'react-native-vector-icons/Entypo';
import database from '@react-native-firebase/database';
// import Pdf from 'react-native-pdf';
const array = [];
const LineDivider = () => {
  return (
    <View style={{width: 1, paddingVertical: 5}}>
      <View
        style={{
          flex: 1,
          borderLeftColor: '#EFEFF0',
          borderLeftWidth: 1,
        }}></View>
    </View>
  );
};
class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      name: '',
      review: '',
      ismodalVisible: false,
      bookid: '',
      reviewArray: [],
    };
  }
  addBookMark = async (book) => {
    const value = await AsyncStorage.getItem('Database');
    this.props.bookmark(book, JSON.parse(value));
    this.setState({like: !this.state.like});
  };

  downloadBook = async (book) => {
    Linking.openURL(
      book.accessInfo.pdf.downloadLink
        ? book.accessInfo.pdf.downloadLink
        : null,
    );
    const value = await AsyncStorage.getItem('Database');
    this.props.download(book, JSON.parse(value));
  };
  componentDidMount() {
    this.props.ReviewsData(this.props.route.params.item.id);
  }

  // componentDidUpdate(previousprops, previousstate) {
  //   console.log('Hello');
  //   if (
  //     previousprops.route.params.item.id !== this.props.route.params.item.id
  //   ) {
  //     this.props.ReviewsData(this.props.route.params.item.id);
  //   }
  //   console.log(previousprops.route.params.item.id);
  //   console.log(this.props.route.params.item.id);
  // }

  AddReview = (bookid) => {
    const obj = {name: this.state.name, comment: this.state.review};
    this.props.AddReviews(bookid, obj);
    this.setState({
      ismodalVisible: false,
    });
  };

  ReviewStyling = ({item}) => {
    return (
      <View style={styles.reviewContainer}>
        <View style={styles.innerReviewContainer}>
          <Text>{item.name}</Text>
        </View>
        <View style={styles.innerReviewContainer}>
          <Text>{item.comment}</Text>
        </View>
      </View>
    );
  };
  render() {
    const {item} = this.props.route.params;
    return (
      <>
        <SafeAreaView />
        <View style={this.props.dark ? styles.darkcontainer : styles.container}>
          <ScrollView
            style={[
              styles.innerContainer,
              this.props.dark ? styles.darkinnerContainer : null,
            ]}>
            <View style={styles.imgContainer}>
              <ImageBackground
                style={styles.imgBackground}
                imageStyle={this.props.dark ? {opacity: 0.4} : {opacity: 0.2}}
                source={{
                  uri:
                    item.volumeInfo.imageLinks &&
                    item.volumeInfo.imageLinks.smallThumbnail,
                }}>
                <View>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('TabScreen')}>
                    <Icons
                      name={'arrow-back-circle-outline'}
                      size={40}
                      color={this.props.dark ? 'white' : 'black'}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.imageInnerContainer}>
                  {item.volumeInfo.imageLinks ? (
                    <Image
                      style={styles.image}
                      source={{
                        uri: item.volumeInfo.imageLinks.smallThumbnail,
                      }}
                    />
                  ) : (
                    <Book style={styles.image} name={'book'} size={170} />
                  )}
                  <View style={styles.titleContainer}>
                    <Text
                      style={[
                        styles.title,
                        this.props.dark ? styles.darktitle : null,
                      ]}>
                      {item.volumeInfo.title}
                    </Text>
                    <TouchableOpacity
                      style={styles.preview}
                      onPress={() =>
                        Linking.openURL(
                          item.volumeInfo.previewLink
                            ? item.volumeInfo.previewLink
                            : null,
                        )
                      }>
                      <Text
                        style={[
                          styles.previewTxt,
                          this.props.dark ? styles.darkpreviewtxt : null,
                        ]}>
                        Preview
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.dataContainer}>
                    <View style={styles.ratingContainer}>
                      <Text style={styles.rating}>
                        {item.volumeInfo.averageRating
                          ? item.volumeInfo.averageRating
                          : 'NA'}
                      </Text>
                      <Text style={styles.ratingHeading}>Rating</Text>
                    </View>
                    <LineDivider />
                    <View style={styles.countryContainer}>
                      <Text style={styles.country}>
                        {item.accessInfo.country === 'IN' ? 'India' : 'Other'}
                      </Text>
                      <Text style={styles.countryHeading}> Country</Text>
                    </View>
                    <LineDivider />

                    <View style={styles.YearContainer}>
                      <Text style={styles.year}>
                        {item.volumeInfo.publishedDate
                          ? item.volumeInfo.publishedDate.slice(0, 4)
                          : 'NA'}
                      </Text>
                      <Text style={styles.yearHeading}>Published</Text>
                    </View>
                    <LineDivider />
                    <View style={styles.bookmark}>
                      <TouchableOpacity onPress={() => this.addBookMark(item)}>
                        {this.state.like ? (
                          <Icons name={'bookmark'} size={30} color={'white'} />
                        ) : (
                          <Icons
                            name={'bookmark-outline'}
                            size={30}
                            color={'white'}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.innerDescription}>
              <Text
                style={[
                  styles.heading,
                  this.props.dark ? styles.darkheading : null,
                ]}>
                Subtitle
              </Text>
              <Text
                style={
                  this.props.dark ? styles.darkdescription : styles.description
                }>
                {item.volumeInfo.subtitle ? item.volumeInfo.subtitle : 'NA'}
              </Text>
              <Text
                style={[
                  styles.heading,
                  this.props.dark ? styles.darkheading : null,
                ]}>
                Description
              </Text>
              <Text
                style={
                  this.props.dark ? styles.darkdescription : styles.description
                }>
                {item.volumeInfo.description
                  ? item.volumeInfo.description
                  : 'Description not available'}
              </Text>
              <Text
                style={[
                  styles.heading,
                  this.props.dark ? styles.darkheading : null,
                ]}>
                Maturity Rating
              </Text>
              <Text
                style={
                  this.props.dark ? styles.darkdescription : styles.description
                }>
                {item.volumeInfo.maturityRating !== 'MATURE' ? (
                  item.volumeInfo.maturityRating
                ) : (
                  <View>
                    <Image
                      source={require('../assets/mature.png')}
                      style={styles.mature}
                    />
                    <Text
                      style={
                        this.props.dark
                          ? styles.darkdescription
                          : styles.description
                      }>
                      {item.volumeInfo.maturityRating}
                    </Text>
                  </View>
                )}
              </Text>

              <Text
                style={[
                  styles.heading,
                  this.props.dark ? styles.darkheading : null,
                ]}>
                Publisher
              </Text>
              <Text
                style={
                  this.props.dark ? styles.darkdescription : styles.description
                }>
                {item.volumeInfo.publisher ? item.volumeInfo.publisher : 'NA'}
              </Text>
              <Text
                style={[
                  styles.heading,
                  this.props.dark ? styles.darkheading : null,
                ]}>
                Category
              </Text>
              <Text
                style={
                  this.props.dark ? styles.darkdescription : styles.description
                }>
                {item.volumeInfo.categories ? item.volumeInfo.categories : 'NA'}
              </Text>
              {/* <Pdf
                source={{
                  uri: item.accessInfo.pdf.downloadLink,
                  cache: true,
                }}
              /> */}
              {item.saleInfo.retailPrice ? (
                <View>
                  <Text
                    style={[
                      styles.heading,
                      this.props.dark ? styles.darkheading : null,
                    ]}>
                    Price
                  </Text>
                  <View style={styles.thumbContainer}>
                    <Tag
                      style={styles.user}
                      name={'tags'}
                      size={30}
                      color={this.props.dark ? 'white' : 'purple'}
                    />
                    <Text
                      style={
                        this.props.dark
                          ? styles.darkdescription
                          : styles.description
                      }>
                      {item.saleInfo.retailPrice.amount}
                    </Text>
                  </View>
                </View>
              ) : null}

              <Text
                style={[
                  styles.heading,
                  this.props.dark ? styles.darkheading : null,
                ]}>
                Author
              </Text>

              {item.volumeInfo.authors ? (
                item.volumeInfo.authors.map((author, index) => {
                  return (
                    <View key={index} style={styles.thumbContainer}>
                      <User
                        style={styles.user}
                        name={'user'}
                        size={20}
                        color={this.props.dark ? 'white' : 'purple'}
                      />
                      <Text
                        style={
                          this.props.dark
                            ? styles.darkdescription
                            : styles.description
                        }>
                        {author}{' '}
                      </Text>
                    </View>
                  );
                })
              ) : (
                <Text
                  style={
                    this.props.dark
                      ? styles.darkdescription
                      : styles.description
                  }>
                  NA
                </Text>
              )}
              <Text
                style={[
                  styles.heading,
                  this.props.dark ? styles.darkheading : null,
                ]}>
                Review
              </Text>
              {/* <FlatList
                key={'&'}
                data={this.props.review}
                renderItem={this.ReviewStyling}
                keyExtractor={(dataitem, index) => dataitem + index}
              /> */}
              {this.props.review.map((item, index) => (
                <View key={index} style={styles.mainReviewContainer}>
                  <View style={styles.reviewContainer}>
                    <Tag
                      name={'user'}
                      size={20}
                      color={this.props.dark ? 'white' : 'purple'}
                    />
                    <Text
                      style={[
                        styles.reviewTxtName,
                        this.props.dark ? styles.darkreviewTxtName : null,
                      ]}>
                      {item.name}
                    </Text>
                  </View>
                  <View style={styles.innerReviewContainer}>
                    <Text
                      style={[
                        styles.reviewTxt,
                        this.props.dark ? styles.darkreviewTxt : null,
                      ]}>
                      {item.comment}
                    </Text>
                  </View>
                </View>
              ))}
              <View style={styles.reviewAddButton}>
                <TouchableOpacity
                  onPress={() => this.setState({ismodalVisible: true})}>
                  <Tag
                    name={'pluscircle'}
                    size={40}
                    color={this.props.dark ? 'white' : 'purple'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            {item.accessInfo.epub.acsTokenLink ? (
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() =>
                  Linking.openURL(
                    item.accessInfo.webReaderLink
                      ? item.accessInfo.webReaderLink
                      : null,
                  )
                }>
                <View style={styles.thumbContainer}>
                  <Text style={styles.buttontxt}>Sample</Text>
                  <Thumb
                    style={styles.icons}
                    name={'thumbs-up'}
                    size={30}
                    color={'white'}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.downloadButton}>
                <View style={styles.thumbContainer}>
                  <Text style={styles.buttontxt}>Sample</Text>
                  <Thumb
                    style={styles.icons}
                    name={'thumbs-down'}
                    size={30}
                    color={'white'}
                  />
                </View>
              </TouchableOpacity>
            )}
            {item.saleInfo.buyLink ? (
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() =>
                  Linking.openURL(
                    item.saleInfo.buyLink ? item.saleInfo.buyLink : null,
                  )
                }>
                <View style={styles.thumbContainer}>
                  <Text style={styles.buttontxt}>Buy</Text>
                  <Icons
                    style={styles.icons}
                    name={'cart'}
                    size={30}
                    color={'white'}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.downloadButton}>
                <View style={styles.thumbContainer}>
                  <Text style={styles.buttontxt}>Not For Sale</Text>
                  <Thumb
                    style={styles.icons}
                    name={'emoji-sad'}
                    size={30}
                    color={'white'}
                  />
                </View>
              </TouchableOpacity>
            )}
            {item.accessInfo.pdf.downloadLink ? (
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => this.downloadBook(item)}>
                <Icons name={'download'} size={30} color={'white'} />
              </TouchableOpacity>
            ) : null}
          </View>

          <Modal
            style={styles.modal}
            isVisible={this.state.ismodalVisible}
            swipeDirection="down"
            onBackdropPress={() => this.setState({ismodalVisible: false})}>
            <KeyboardAvoidingView style={styles.Mcontainer}>
              <Text style={styles.modalHeader}>Add Your Review</Text>
              <ScrollView>
                <TextInput
                  style={styles.inputBox}
                  // value={this.state.name}
                  onChangeText={(name) => this.setState({name})}
                  placeholder="Name"
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.inputBox}
                  // value={this.state.review}
                  onChangeText={(review) => this.setState({review})}
                  placeholder="Your Review"
                  autoCapitalize="none"
                  multiline={true}
                />
                <Button
                  title={'Confirm'}
                  onPress={() => this.AddReview(item.id)}
                />
              </ScrollView>
            </KeyboardAvoidingView>
          </Modal>

          {console.log('REDUCER REVIEW========>', this.props.review)}
        </View>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    bookList: state.bookmark,
    dark: state.darkScreen,
    review: state.review,
    // array: state.array,
  };
};
const mapDispatchToProps = (dispatch) => ({
  bookmark: (book, value) => dispatch(bookmark(book, value)),
  download: (book, value) => dispatch(download(book, value)),
  ReviewsData: (bookid) => dispatch(ReviewsData(bookid)),
  AddReviews: (bookid, data) => dispatch(AddReviews(bookid, data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Details);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  darkcontainer: {
    flex: 1,
    backgroundColor: '#252726',
  },
  inputBox: {
    width: '75%',
    margin: 10,
    padding: 10,
    fontSize: 20,
  },
  modal: {
    justifyContent: 'flex-end',
  },
  Mcontainer: {
    height: 450,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 20,
  },
  innerContainer: {
    width: windowWidth,
    marginBottom: 10,
  },
  darkinnerContainer: {
    backgroundColor: '#252726',
  },
  dataContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderRadius: 12,
    margin: 24,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  title: {
    fontSize: 20,
    opacity: 1,
    fontWeight: '700',
    marginBottom: 10,
    color: '#43255e',
    textAlign: 'center',
  },
  darktitle: {
    color: 'white',
  },
  subtitle: {
    fontSize: 18,
    opacity: 1,
    fontWeight: '500',
    marginBottom: 10,
  },
  imgBackground: {
    resizeMode: 'cover',
    width: windowWidth,
    ...Platform.select({
      ios: {
        height: 'auto',
      },
      android: {
        height: 'auto',
      },
    }),
  },

  imageInnerContainer: {
    alignItems: 'center',
    shadowColor: 'rgba(152, 43, 196,1)',

    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  image: {
    width: 200,
    height: 300,
    marginRight: 5,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginLeft: 20,
    marginTop: 30,
  },
  countryContainer: {
    flex: 1,
    alignItems: 'center',
  },
  country: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    lineHeight: 22,
  },
  countryHeading: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
    lineHeight: 22,
  },
  ratingContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rating: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    lineHeight: 22,
  },
  ratingHeading: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
    lineHeight: 22,
  },

  heading: {
    fontSize: 25,
    fontWeight: '700',
    margin: 10,
    color: '#ba68c8',
  },
  darkheading: {
    color: '#ffe0b2',
  },
  description: {
    fontSize: 18,
    fontWeight: '400',
    margin: 10,
  },
  darkdescription: {
    fontSize: 18,
    fontWeight: '400',
    margin: 10,
    color: 'white',
  },
  preview: {
    fontSize: 18,
    opacity: 1,
    fontWeight: '600',
  },
  previewTxt: {
    fontWeight: '600',
    fontSize: 20,
    color: 'blue',
    textShadowColor: 'red',
    textShadowOffset: {width: 1, height: 4},
    textShadowRadius: 5,
  },
  darkpreviewtxt: {
    color: '#e9d8bf',
  },
  YearContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  yearHeading: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
    lineHeight: 22,
  },
  year: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    lineHeight: 22,
  },
  bookmark: {
    flex: 1,
    alignItems: 'center',
  },
  // authors: {
  //   marginLeft: 10,
  //   marginRight: 5,
  //   fontSize: 18,
  //   fontWeight: '700',
  //   color: 'black',
  // },
  // darkauthors: {
  //   color: '#e9d8bf',
  // },
  // authorContainer: {
  //   height: 40,

  // },
  like: {
    position: 'absolute',
    right: 40,
    bottom: 10,
  },
  downloadButton: {
    flex: 1,
    backgroundColor: 'rgba(6,147,227,0.8)',
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        height: 65,
        marginBottom: 20,
      },
      android: {
        height: 65,
        marginBottom: 10,
      },
    }),
    // backgroundColor: 'lightgrey',
  },
  buttontxt: {
    color: 'white',
    fontSize: 20,
    lineHeight: 22,
    textAlign: 'center',
    fontWeight: '600',
    alignSelf: 'center',
  },
  mature: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  thumbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icons: {
    margin: 5,
    alignItems: 'center',
  },
  innerDescription: {
    margin: 10,
  },
  user: {
    marginLeft: 10,
  },
  reviewContainer: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: 'red',
  },
  innerReviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewTxt: {
    fontSize: 18,
    margin: 5,
    fontWeight: '400',
  },
  reviewTxtName: {
    fontSize: 20,
    margin: 5,
    fontWeight: '600',
    color: 'black',
  },
  darkreviewTxtName: {
    color: 'white',
  },
  darkreviewTxt: {
    color: 'white',
  },
  reviewAddButton: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 20,
  },
  mainReviewContainer: {
    width: '90%',
  },
  modalHeader: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: '700',
    color: 'purple',
  },
});
