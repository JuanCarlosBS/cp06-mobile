import firebase from "firebase";
import 'firebase/database'

const firebaseConfig = {

    apiKey: "AIzaSyCuXF2l8rxct9whWb2tlcbiEP8Ye3vbZX8",

    authDomain: "cp06-mobile.firebaseapp.com",

    databaseURL: "https://cp06-mobile-default-rtdb.firebaseio.com",

    projectId: "cp06-mobile",

    storageBucket: "cp06-mobile.appspot.com",

    messagingSenderId: "298659957599",

    appId: "1:298659957599:web:939835bf2f7387b28144ea"

};



firebase.initializeApp(firebaseConfig)

export { firebase }