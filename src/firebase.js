import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtrl0wwAyXj5EfWU78BmOYpkryNbnFGiw",
  authDomain: "birdy-de2d0.firebaseapp.com",
  projectId: "birdy-de2d0",
  storageBucket: "birdy-de2d0.appspot.com",
  messagingSenderId: "1064381062259",
  appId: "1:1064381062259:web:6d1b8e49c9116ee7035e06",
  measurementId: "G-PQ0LKF5EY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
export default getFirestore();