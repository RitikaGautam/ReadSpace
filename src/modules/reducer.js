import ApiTypes from './types';
const initialState = {
  list: [],
  page: 1,
  bookmark: [],
  darkScreen: false,
  LoginData: [],
  downloads: [],
  notes: [],
  Authlogin: '',
  google: false,
  authentication: false,
  review: [],
  // array: [],
};
export default function ApiReducer(state = initialState, action) {
  // console.log('Action ', action);
  // console.log('State', state);
  switch (action.type) {
    case ApiTypes.GET_DATA:
      return {
        ...state,
        list: action.payload,
      };
    case ApiTypes.List_Api:
      return {
        ...state,
        page: action.page,
        list: [...state.list, ...action.payload],
      };
    case ApiTypes.Search_Data:
      return {
        ...state,
        list: action.payload,
      };
    case ApiTypes.BookMark:
      return {
        ...state,
        bookmark: [...action.payload],
      };
    case ApiTypes.SortBook:
      return {
        ...state,
        list: action.payload,
      };
    case ApiTypes.FilterBook:
      return {
        ...state,
        list: action.payload,
      };

    case ApiTypes.Login:
      return {
        ...state,
        LoginData: action.payload,
      };
    case ApiTypes.AuthLogin:
      return {
        ...state,
        Authlogin: action.payload,
      };
    case ApiTypes.DARK_MODE:
      return {
        ...state,
        darkScreen: action.payload,
      };
    case ApiTypes.DownloadBook:
      return {
        ...state,
        downloads: [...action.payload],
      };
    case ApiTypes.ADD_TODO:
      return {
        ...state,
        notes: [...action.payload],
      };
    case ApiTypes.RestoreData:
      return {
        ...state,
        bookmark: action.payload.bookmark,
        downloads: action.payload.downloads,
      };
    case ApiTypes.RestoreNotes:
      return {
        ...state,
        notes: action.payload.data,
      };
    case ApiTypes.Google:
      return {
        ...state,
        google: action.payload,
      };
    case ApiTypes.Authentication:
      return {
        ...state,
        authentication: action.payload,
      };
    case ApiTypes.Reviews:
      return {
        ...state,
        review: action.review,
      };
    default:
      return state;
  }
}
