import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../modules/reducer';
const store = createStore(reducer, applyMiddleware(thunk));
// console.log('store: ', store.getState());
export default store;
