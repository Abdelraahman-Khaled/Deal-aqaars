import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1sPeiuYCgdHAq2eObxSuhA4xyK31CBCQ",
  authDomain: "deal-3f32b.firebaseapp.com",
  projectId: "deal-3f32b",
  storageBucket: "deal-3f32b.firebasestorage.app",
  messagingSenderId: "401098635618",
  appId: "1:401098635618:web:acc9fe5922bcb50344143b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// التصدير للاستخدام في الـ Components
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
