import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDxtqJdv7jQPV08cp8t6hl6KgulRRe5100",
  authDomain: "house-marketplace-app-6c173.firebaseapp.com",
  projectId: "house-marketplace-app-6c173",
  storageBucket: "house-marketplace-app-6c173.appspot.com",
  messagingSenderId: "944003561404",
  appId: "1:944003561404:web:346b249c6f2ffc2bf9ddb9"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()
