// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqBndl9ateG6wCY6KcA2u1UiDiol0WTzg",
  authDomain: "lpym-deb39.firebaseapp.com",
  projectId: "lpym-deb39",
  storageBucket: "lpym-deb39.appspot.com",
  messagingSenderId: "602949318511",
  appId: "1:602949318511:web:6653771968db0f7f995a9a",
  measurementId: "G-6QFT0P0HG7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {
  app,
  analytics
}