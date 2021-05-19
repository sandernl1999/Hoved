import firebase from 'firebase';

const firebaseConfig = {
    // apiKey: "AIzaSyDDFlPnkwHN65BiMUPwoythfOJPSdEnG9Q",
    // authDomain: "next-firebase-project.firebaseapp.com",
    // projectId: "next-firebase-project",
    // storageBucket: "next-firebase-project.appspot.com",
    // messagingSenderId: "314748682659",
    // appId: "1:314748682659:web:e6f4912319adbfc5961a16",
    measurementId: "G-G3D14K5ZPH",
    apiKey: "AIzaSyBcprAyw-vpJd7fh5E0RPhoPEuCzhLZTy0",
    authDomain: "mapbox-firebase-project.firebaseapp.com",
    projectId: "mapbox-firebase-project",
    storageBucket: "mapbox-firebase-project.appspot.com",
    messagingSenderId: "641858781681",
    appId: "1:641858781681:web:47241282935b38dce90450"
};
try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}
const fire = firebase;

export default fire;