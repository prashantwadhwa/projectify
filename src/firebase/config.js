import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDCC5S-YVN7B_QaoI-pKEfhixc2eQo3QgY',
  authDomain: 'the-dojo-5884c.firebaseapp.com',
  projectId: 'the-dojo-5884c',
  storageBucket: 'the-dojo-5884c.appspot.com',
  messagingSenderId: '1063077776584',
  appId: '1:1063077776584:web:aad0f43e92e4052d6da9fd',
  measurementId: 'G-LE7MZ90CVC',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp

const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
