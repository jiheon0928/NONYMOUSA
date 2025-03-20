import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvvMBjTm6qitIPgD6BZcqxV7eHehqz7DM",
  authDomain: "nonymousaa.firebaseapp.com",
  databaseURL:
    "https://nonymousaa-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nonymousaa",
  storageBucket: "nonymousaa.firebasestorage.app",
  messagingSenderId: "1073324719510",
  appId: "1:1073324719510:web:05c0a70a34b9dc073671b7",
  measurementId: "G-2XVT4GCYFY",
};
// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
