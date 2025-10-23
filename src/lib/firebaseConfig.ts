import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuSk83nmP5SbZ_zzner1t9pAJKY7J8VAw",
  authDomain: "jaxtina-course-test.firebaseapp.com",
  projectId: "jaxtina-course-test",
  storageBucket: "jaxtina-course-test.firebasestorage.app",
  messagingSenderId: "325653764329",
  appId: "1:325653764329:web:fa0e25e0ac2c269a7ff878",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
