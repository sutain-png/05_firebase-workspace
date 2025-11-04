
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCfyd9B4jHiB-5xDcdqAwuqPSKnNj6BrnE",
  authDomain: "my-firebase-project-faab5.firebaseapp.com",
  projectId: "my-firebase-project-faab5",
  storageBucket: "my-firebase-project-faab5.firebasestorage.app",
  messagingSenderId: "697301585367",
  appId: "1:697301585367:web:baa86e7427702465574f92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


//firestore 라이브러리 사용을 위한 객체 가져오기

export const db = getFirestore(app);