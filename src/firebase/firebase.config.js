import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyC0bkItHuS0xL9Wk3ClQH52yaOU0wK3Oto",
    authDomain: "twitter-ui-clone-4172f.firebaseapp.com",
    databaseURL: "https://twitter-ui-clone-4172f.firebaseio.com",
    projectId: "twitter-ui-clone-4172f",
    storageBucket: "twitter-ui-clone-4172f.appspot.com",
    messagingSenderId: "718638954600",
    appId: "1:718638954600:web:49f8675175597ca2bd23dd",
    measurementId: "G-8Q0GFQ3QG5"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  export default db;