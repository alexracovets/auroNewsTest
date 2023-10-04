import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyAWhtPH6vjSqyp3eV1ajAA3kYmioV8Mu0k",
    authDomain: "auroranewstest.firebaseapp.com",
    databaseURL: "https://auroranewstest-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "auroranewstest",
    storageBucket: "auroranewstest.appspot.com",
    messagingSenderId: "208974671200",
    appId: "1:208974671200:web:365116daa02a390e3c8205",
    measurementId: "G-SLMB59D1YP"
};
firebase.initializeApp(firebaseConfig)

export const firestore = firebase.database();
