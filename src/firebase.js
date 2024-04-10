// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-HbZf3HPh5XkhhYrVvILL4d_P130G9Lo",
  authDomain: "roof-ae70b.firebaseapp.com",
  projectId: "roof-ae70b",
  storageBucket: "roof-ae70b.appspot.com",
  messagingSenderId: "595922366407",
  appId: "1:595922366407:web:f855f20c7b519cac53b3e2",
  measurementId: "G-HV0MLM9EJ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };