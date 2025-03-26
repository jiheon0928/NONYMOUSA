import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// 클라이언트 사이드에서만 실행되도록 조건 추가
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app); // 클라이언트에서만 실행
}

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, firestore, storage };
