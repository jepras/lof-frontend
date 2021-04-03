import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/functions';

// Replace this with your own config details
var config = {
  apiKey: 'AIzaSyC6SgeqbhD2HOfIz3kM8ckPNZAEky9Mkt0',
  authDomain: 'lof-fond.firebaseapp.com',
  databaseURL: 'https://lof-fond.firebaseio.com',
  projectId: 'lof-fond',
  storageBucket: 'lof-fond.appspot.com',
  messagingSenderId: '83727268255',
  appId: '1:83727268255:web:c5fc64775357eac0c9a5aa',
  measurementId: 'G-B4HN517RB8',
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
export const functions = firebase.functions();
