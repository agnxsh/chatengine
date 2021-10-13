import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore';
const app = firebase
  .initializeApp({
    apiKey: "AIzaSyBYfjNS780s5ppUkP4Ff_Zm3iuBTft51w0",
    authDomain: "agnish-sopchat.firebaseapp.com",
    projectId: "agnish-sopchat",
    storageBucket: "agnish-sopchat.appspot.com",
    messagingSenderId: "588757864952",
    appId: "1:588757864952:web:736c4f3eaadb1e1efa060d",
    measurementId: "G-9NRKZVVYDQ",
  })
  export const auth = app.auth();
  export default app;
