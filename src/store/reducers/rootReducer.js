import authReducer from './authReducer';
import ansøgReducer from './ansøgReducer';
import adminReducer from './adminReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  ansøg: ansøgReducer,
  admin: adminReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;

// the key name will be the data property on the state object
