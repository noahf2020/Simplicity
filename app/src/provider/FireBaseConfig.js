import { initializeApp, getApps } from "firebase/app";
import {getAuth , getReactNativePersistence,initializeAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
    apiKey: "AIzaSyDacwAZiVyqYQXELSLg1JSXwZ59JTmJ8bk",
    authDomain: "test-f5b33.firebaseapp.com",
    databaseURL: "https://test-f5b33-default-rtdb.firebaseio.com",
    projectId: "test-f5b33",
    storageBucket: "test-f5b33.appspot.com",
    messagingSenderId: "1046513344002",
    appId: "1:1046513344002:web:8800e5ac3b972acf32911b",
    measurementId: "G-JPLT50LW01"
  };
 
   
  export const app =  initializeApp(firebaseConfig);
  if (getApps().length === 0) {
   auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),})
    
}
 export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),});
 export  const db = getFirestore(app);

