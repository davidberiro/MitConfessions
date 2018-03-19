import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDYaBSb8t7kQkRat7k-PXlHYTkYENArh3s",
  authDomain: "mitconfessions-f127f.firebaseapp.com",
  databaseURL: "https://mitconfessions-f127f.firebaseio.com",
  projectId: "mitconfessions-f127f",
  storageBucket: "",
  messagingSenderId: "65581099978"
};
firebase.initializeApp(config);

export default firebase;