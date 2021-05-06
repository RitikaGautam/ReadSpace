import ApiTypes from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
export const updateData = (book, pageNo) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${book}&key=AIzaSyABvnk8EpnRARUJX3PdwBf-hBnnqLYhyMU&maxResults=40&startIndex=${pageNo}`,
      {
        method: 'GET',
      },
    );

    const data = await response.json();

    dispatch({
      type: ApiTypes.List_Api,
      payload: data.items,
      page: pageNo,
    });
  } catch (error) {
    alert('page Error');
  }
};

export const getdata = (book) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${book}&key=AIzaSyABvnk8EpnRARUJX3PdwBf-hBnnqLYhyMU&maxResults=40`,
      {
        method: 'GET',
      },
    );

    const data = await response.json();

    dispatch({
      type: ApiTypes.GET_DATA,
      payload: data.items,
    });
  } catch (error) {
    alert('Get Error');
  }
};

export const searchdata = (book) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${book}&key=AIzaSyABvnk8EpnRARUJX3PdwBf-hBnnqLYhyMU&maxResults=40`,
      {
        method: 'GET',
      },
    );

    const data = await response.json();

    dispatch({
      type: ApiTypes.Search_Data,
      payload: data.items,
    });
  } catch (error) {
    alert('Get Error');
  }
};

export const sortbook = (book) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${book}&orderBy=newest&key=AIzaSyABvnk8EpnRARUJX3PdwBf-hBnnqLYhyMU&maxResults=40`,
      {
        method: 'GET',
      },
    );

    const data = await response.json();

    dispatch({
      type: ApiTypes.SortBook,
      payload: data.items,
    });
  } catch (error) {
    alert('Get Error');
  }
};

export const filterbook = (book, filter) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${book}&filter=${filter}&key=AIzaSyABvnk8EpnRARUJX3PdwBf-hBnnqLYhyMU&maxResults=40`,
      {
        method: 'GET',
      },
    );

    const data = await response.json();

    dispatch({
      type: ApiTypes.FilterBook,
      payload: data.items,
    });
  } catch (error) {
    alert('Get Error');
  }
};

export const DarkMode = (mode) => {
  return {
    type: ApiTypes.DARK_MODE,
    payload: mode,
  };
};
export const LoginwithGoogle = (mode) => {
  console.log('Mode', mode);
  return {
    type: ApiTypes.Google,
    payload: mode,
  };
};
export const LoginwithAuth = (mode) => {
  return {
    type: ApiTypes.Authentication,
    payload: mode,
  };
};
export const LoginUser = (user) => {
  return {
    type: ApiTypes.Login,
    payload: user,
  };
};
export const LoginAuthUser = (user) => {
  return {
    type: ApiTypes.AuthLogin,
    payload: user,
  };
};
export const download = (book, value) => async (dispatch, getState) => {
  //await AsyncStorage.clear();
  const google = getState().google;
  const loginid = getState().LoginData.id;
  if (value !== null) {
    const newdownloads = [...value.downloads, book];
    const data = {
      id: value.id,
      bookmark: value.bookmark,
      downloads: newdownloads,
    };
    const newresult = JSON.stringify(data);
    const newdata = await AsyncStorage.setItem('Database', newresult);
    const uid = getState().Authlogin;
    if (google) {
      database()
        .ref(`MyDatabase${loginid}`)
        .update({
          downloads: newdownloads,
        })
        .then(() => console.log('Data set.'));
    } else {
      database()
        .ref(`MyDatabase${uid}`)
        .update({
          downloads: newdownloads,
        })
        .then(() => console.log('Data set.'));
    }
    dispatch({
      type: ApiTypes.DownloadBook,
      payload: newdownloads,
    });
  } else {
    const id = getState().LoginData;
    const obj = {id: id, bookmark: [], downloads: [book]};
    const newdata = await AsyncStorage.setItem('Database', JSON.stringify(obj));
    dispatch({
      type: ApiTypes.DownloadBook,
      payload: [book],
    });
  }
};
export const bookmark = (book, value) => async (dispatch, getState) => {
  //await AsyncStorage.clear();

  //console.log('value', value);
  const download = getState().downloads;
  const google = getState().google;
  const loginid = getState().LoginData.id;
  console.log('Prince', loginid);
  if (value !== null) {
    const newbookmark = [...value.bookmark, book];

    const data = {
      id: value.id,
      bookmark: newbookmark,
      downloads: value.downloads,
    };
    const uid = getState().Authlogin;
    if (google) {
      database()
        .ref(`MyDatabase${loginid}`)
        .update({
          bookmark: newbookmark,
        })
        .then(() => console.log('Data set.'));
    } else {
      database()
        .ref(`MyDatabase${uid}`)
        .update({
          bookmark: newbookmark,
        })
        .then(() => console.log('Data set.'));
    }

    const newresult = JSON.stringify(data);
    const newdata = await AsyncStorage.setItem('Database', newresult);

    dispatch({
      type: ApiTypes.BookMark,
      payload: newbookmark,
    });
  } else {
    console.log('else');
    const id = getState().LoginData;
    const obj = {id: id, bookmark: [book], downloads: []};
    const newdata = await AsyncStorage.setItem('Database', JSON.stringify(obj));
    dispatch({
      type: ApiTypes.BookMark,
      payload: [book],
    });
  }
};
export const deletebook = (bookid) => async (dispatch, getState) => {
  const value = getState().bookmark;
  const result = value.filter((item) => item.id !== bookid);
  const uid = getState().Authlogin;
  const google = getState().google;
  const loginid = getState().LoginData.id;
  if (google) {
    database()
      .ref(`MyDatabase${loginid}`)
      .update({
        bookmark: result,
      })
      .then(() => console.log('Data set updated.'));
  } else {
    database()
      .ref(`MyDatabase${uid}`)
      .update({
        bookmark: result,
      })
      .then(() => console.log('Data set updated.'));
  }
  console.log(result, bookid);
  const id = getState().id;
  const downloads = getState().downloads;
  const obj = {id: id, bookmark: result, downloads: downloads};
  const newdata = await AsyncStorage.setItem('Database', JSON.stringify(obj));
  dispatch({
    type: ApiTypes.BookMark,
    payload: result,
  });
};
export const deleteDownloadedbook = (bookid) => async (dispatch, getState) => {
  const value = getState().downloads;
  const result = value.filter((item) => item.id !== bookid);
  const uid = getState().Authlogin;
  const google = getState().google;
  const loginid = getState().LoginData.id;
  if (google) {
    database()
      .ref(`MyDatabase${loginid}`)
      .update({
        downloads: result,
      })
      .then(() => console.log('Data set updated.'));
  } else {
    database()
      .ref(`MyDatabase${uid}`)
      .update({
        downloads: result,
      })
      .then(() => console.log('Data set updated.'));
  }

  console.log(result, bookid);
  const id = getState().id;
  const bookmarks = getState().bookmark;
  const obj = {id: id, bookmark: bookmarks, downloads: result};
  const newdata = await AsyncStorage.setItem('Database', JSON.stringify(obj));
  dispatch({
    type: ApiTypes.DownloadBook,
    payload: result,
  });
};
export const restoreData = (bookid) => {
  const data = {
    bookmark: [...bookid.bookmark],
    downloads: [...bookid.downloads],
  };
  return {
    type: ApiTypes.RestoreData,
    payload: data,
  };
};

export const todo = (data, value) => async (dispatch) => {
  //await AsyncStorage.clear();
  console.log('value', value);
  console.log('data', data);
  if (value !== null) {
    console.log('if');
    const newdata = [...value.data, data];
    console.log('newdata', newdata);
    const notedata = {
      data: newdata,
    };
    console.log('notedata', notedata);
    const newresult = JSON.stringify(notedata);
    console.log('newresult', newresult);
    const newValue = await AsyncStorage.setItem('NotesDatabase', newresult);
    dispatch({
      type: ApiTypes.ADD_TODO,
      payload: newdata,
    });
  } else {
    console.log('else');
    const obj = {data: [data]};
    console.log('Obj', obj);
    const newValue = await AsyncStorage.setItem(
      'NotesDatabase',
      JSON.stringify(obj),
    );
    dispatch({
      type: ApiTypes.ADD_TODO,
      payload: [data],
    });
  }
};
export const restoreNotes = (notes) => {
  const data = {
    data: [...notes.data],
  };
  return {
    type: ApiTypes.RestoreNotes,
    payload: data,
  };
};

export const deletetodo = (id) => async (dispatch, getState) => {
  const result = getState().notes;
  const finalresult = result.filter((item) => item.Id !== id);
  console.log(finalresult, id);
  const obj = {data: finalresult};
  const newData = await AsyncStorage.setItem(
    'NotesDatabase',
    JSON.stringify(obj),
  );
  dispatch({
    type: ApiTypes.ADD_TODO,
    payload: finalresult,
  });
};
export const Updatedtodo = (data) => async (dispatch, getState) => {
  const notes = getState().notes;
  console.log('updatednotes', notes);
  const newdata = notes.map((item) => (item.Id !== data.Id ? item : data));
  const obj = {data: newdata};
  const newData = await AsyncStorage.setItem(
    'NotesDatabase',
    JSON.stringify(obj),
  );
  dispatch({
    type: ApiTypes.ADD_TODO,
    payload: newdata,
  });
};

export const ReviewsData = (bookid) => async (dispatch) => {
  const user = await firestore().collection('Reviews').doc(bookid).get();
  console.log('USER', user._data);
  if (user._data) {
    dispatch({
      type: ApiTypes.Reviews,
      review: user._data.comments,
    });
  } else {
    dispatch({
      type: ApiTypes.Reviews,
      review: [],
    });
  }
};

export const AddReviews = (bookid, data) => async (dispatch) => {
  const user = await firestore().collection('Reviews').doc(bookid).get();

  console.log('USER', user);
  if (!user._data) {
    console.log('No matching documents.');
    const Result = firestore()
      .collection('Reviews')
      .doc(bookid)
      .set({
        comments: [data],
      })
      .then((data) => {
        console.log('User added!', data);
      });
    dispatch({
      type: ApiTypes.Reviews,
      review: [data],
    });
    return;
  } else {
    const newdata = [...user._data.comments, data];
    const Result = firestore()
      .collection('Reviews')
      .doc(bookid)
      .set({
        comments: newdata,
      })
      .then(() => {
        console.log('User added!');
      });
    dispatch({
      type: ApiTypes.Reviews,
      review: newdata,
    });
    return;
  }
};
