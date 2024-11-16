import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNe5K6mBqiuPCeVjMnT9hYZu0KmBnJfJ4",
  authDomain: "restup-c098e.firebaseapp.com",
  projectId: "restup-c098e",
  storageBucket: "restup-c098e.firebasestorage.app",
  messagingSenderId: "689814934139",
  appId: "1:689814934139:web:fdef4027267088b41908de",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, app };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
