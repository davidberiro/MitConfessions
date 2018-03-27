import * as firebase from 'firebase';

// Mit firebase
// var config = {
//   apiKey: "AIzaSyDYaBSb8t7kQkRat7k-PXlHYTkYENArh3s",
//   authDomain: "mitconfessions-f127f.firebaseapp.com",
//   databaseURL: "https://mitconfessions-f127f.firebaseio.com",
//   projectId: "mitconfessions-f127f",
//   storageBucket: "",
//   messagingSenderId: "65581099978"
// };

//huji firebase
var config = {
  apiKey: "AIzaSyBkPzxch8JGq6gQYgFCKFPSNtsNFDk8GyM",
  authDomain: "hujiconfessions-de0d3.firebaseapp.com",
  databaseURL: "https://hujiconfessions-de0d3.firebaseio.com",
  projectId: "hujiconfessions-de0d3",
  storageBucket: "",
  messagingSenderId: "938333630721"
};
firebase.initializeApp(config);

export default firebase;